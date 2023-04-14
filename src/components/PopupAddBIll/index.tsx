// PopupAddBill/index.jsx
import { forwardRef, useState, useImperativeHandle, useRef, useEffect, ChangeEvent } from 'react'
import { Popup, Icon, Keyboard, Toast } from 'zarm'
import s from './style.module.less'
import cx from 'classnames'
import PopupDate from '../PopupDate'
import dayjs from 'dayjs'
import { PopupDateRef } from '@/typings/global'
import { IconOrigin, MyIcon } from '../CustomIcon'
import { typeMap, get, post } from '../../utils/index'
import { TypeType, BillType } from '@/typings/global'
import { Input } from 'zarm'
type Props = {
  onReload: () => void

  // 编辑账单需要接受这个数据
  detail?: BillType
}
const PopupAddBill = forwardRef((props: Props, ref) => {
  const [show, setShow] = useState(false) // 内部控制弹窗显示隐藏。
  const [payType, setPayType] = useState('expense') // 支出或收入类型
  const [amount, setAmount] = useState('') // 账单价格
  const [currentType, setCurrentType] = useState<TypeType>() // 当前选择类型
  const [expenseType, setExpenseType] = useState([]) // 支出类型数组
  const [incomeType, setIncomeType] = useState([]) // 收入类型数组
  const [remark, setRemark] = useState('') // 备注
  const [showRemark, setShowRemark] = useState(false)
  const dateRef = useRef<PopupDateRef>()
  const [date, setDate] = useState(new Date().toString())
  // 日期选择回调
  const selectDate = (val: string) => {
    setDate(val)
  }
  // 切换支出和收入类型
  const changeType = (type: string) => {
    setPayType(type)
  }

  // 获取类型
  useEffect(() => {
    getTypeList()
  }, [props.detail])

  // 获取列表类型 如果是detail界面编辑  则把数据也渲染出来
  const getTypeList = async () => {
    const {
      data: { list }
    } = await get('/type/list')
    const _expense = list.filter((i: TypeType) => i.type == 1) // 支出类型
    const _income = list.filter((i: TypeType) => i.type == 2) // 收入类型
    setExpenseType(_expense)
    setIncomeType(_income)
    setCurrentType(_expense[0]) // 新建账单，类型默认是支出类型数组的第一项
    if (props.detail?.id) {
      setPayType(props.detail?.pay_type == 1 ? 'expense' : 'income')
      setCurrentType({
        id: props.detail?.type_id,
        name: props.detail?.type_name
      })
      setRemark(props.detail?.remark)
      setAmount(props.detail?.amount)
      setDate(dayjs(Number(props.detail?.date)).format('MM-DD'))
    }
  }
  useImperativeHandle(ref, () => {
    return {
      show: () => {
        setShow(true)
      },
      close: () => {
        setShow(false)
      }
    }
  })
  // 监听输入框改变值
  const handleMoney = (value: number | string | undefined) => {
    value = String(value)
    if (value == 'delete') {
      let _amount = amount.slice(0, amount.length - 1)
      setAmount(_amount)
      return
    }
    // ok 则添加账单
    if (value == 'ok') {
      addBill()
      return
    }
    // 当输入值为'.'且已经存在'.' 则 不继续增加字符串
    if (value == '.' && amount.includes('.')) return
    // 保留两位
    if (value != '.' && amount.includes('.') && amount && amount.split('.')[1].length >= 2) return
    setAmount(amount + value)
  }

  // 添加账单
  const addBill = async () => {
    if (!amount) {
      Toast.show('请输入具体金额')
      return
    }
    const params = {
      amount: Number(amount).toFixed(2),
      type_id: currentType?.id,
      type_name: currentType?.name,
      date: dayjs(date).unix() * 1000,
      pay_type: payType == 'expense' ? 1 : 2,
      remark: remark || ''
    }
    if (props.detail?.id) {
      let id = props.detail?.id
      // param中date转化为字符串
      params.date = dayjs(Number(props.detail?.date)).valueOf()
      // 如果有 id 需要调用详情更新接口
      const result = await post('/bill/update', { ...params, id })
      Toast.show('修改成功')
    } else {
      const result = await post('/bill/add', params)
      // 重制数据
      setAmount('')
      setPayType('expense')
      setCurrentType(expenseType[0])
      setDate(new Date().toString())
      setRemark('')
      Toast.show('添加成功')
    }
    setShow(false)
    if (props.onReload) props.onReload()
  }
  return (
    <Popup
      visible={show}
      direction="bottom"
      onMaskClick={() => setShow(false)}
      destroy={false}
      mountContainer={() => document.body}
      afterClose={() => {
        setShowRemark(false)
      }}
    >
      <div className={s.addWrap}>
        {/* 右上角关闭弹窗 */}
        <header className={s.header}>
          <span className={s.close} onClick={() => setShow(false)}>
            <Icon type="wrong" />
          </span>
        </header>
        {/* 「收入」和「支出」类型切换 */}
        <div className={s.filter}>
          <div className={s.type}>
            <span
              onClick={() => changeType('expense')}
              className={cx({ [s.expense]: true, [s.active]: payType == 'expense' })}
            >
              支出
            </span>
            <span
              onClick={() => changeType('income')}
              className={cx({ [s.income]: true, [s.active]: payType == 'income' })}
            >
              收入
            </span>
          </div>
          <div className={s.time} onClick={() => dateRef.current && dateRef.current.show()}>
            {dayjs(date).format('MM-DD')} <MyIcon className={s.arrow} type="icon-arrow-down" />
          </div>
        </div>
        <div className={s.money}>
          <span className={s.sufix}>¥</span>
          <span className={cx(s.amount, s.animation)}>{amount}</span>
        </div>
        <div className={s.typeWarp}>
          <div className={s.typeBody}>
            {/* 通过 payType 判断，是展示收入账单类型，还是支出账单类型 */}
            {(payType == 'expense' ? expenseType : incomeType).map((item: TypeType) => (
              <div onClick={() => setCurrentType(item)} key={item.id} className={s.typeItem}>
                {/* 收入和支出的字体颜色，以及背景颜色通过 payType 区分，并且设置高亮 */}
                <span
                  className={cx({
                    [s.iconfontWrap]: true,
                    [s.expense]: payType == 'expense',
                    [s.income]: payType == 'income',
                    [s.active]: currentType?.id == item.id
                  })}
                >
                  <IconOrigin className={s.iconfont} type={typeMap[item.id as number].icon} />
                </span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* 备注 */}
        <div className={s.remark}>
          {showRemark ? (
            <Input
              autoHeight
              showLength
              maxLength={50}
              type="text"
              rows={3}
              value={remark}
              placeholder="请输入备注信息"
              onChange={(val: ChangeEvent<HTMLInputElement>) => setRemark(val.target.value)}
              onBlur={() => setShowRemark(false)}
            />
          ) : (
            <span onClick={() => setShowRemark(true)}>{remark || '添加备注'}</span>
          )}
        </div>
        <Keyboard type="price" onKeyClick={(value) => handleMoney(value)} />
      </div>
      {/* 弹框 */}
      <PopupDate columnType={['year', 'month', 'day']} ref={dateRef} onSelect={selectDate} />
    </Popup>
  )
})

export default PopupAddBill

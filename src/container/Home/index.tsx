import { useEffect, useState, useRef, Ref } from 'react'
import s from './style.module.less'
import BillItem from '@/components/BillItem'
import { ListBillType, TypeType } from '@/typings/global'
import { MyIcon } from '@/components/CustomIcon'
import dayjs from 'dayjs'
import { LOAD_STATE, REFRESH_STATE } from '@/utils'
import { get } from '@/utils'
import { Pull } from 'zarm';
import PopupType from '@/components/PopupType'
import PopupDate from '@/components/PopupDate'
import { IconOrigin } from '@/components/CustomIcon'
import PopupAddBill from '@/components/PopupAddBIll'
import { PopupAddRef, PopupDateRef, PopupTypeRef } from '@/typings/global'


function Home() {
  const addRef = useRef<PopupAddRef>()
  const typeRef = useRef<PopupTypeRef>()
  const monthRef = useRef<PopupDateRef>() // 月份筛选 ref
  const [currentSelect, setCurrentSelect] = useState<TypeType>({ id: '' })
  const [list, setList] = useState<ListBillType>([
    {
      bills: [
        {
          amount: '25.00',
          date: '1623390740000',
          id: 911,
          pay_type: 1,
          remark: '',
          type_id: 1,
          type_name: '餐饮'
        }
      ],
      date: '2021-06-11'
    }
  ]) // 账单列表
  const [page, setPage] = useState(1) // 分页
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM')) // 当前筛选时间
  const [totalPage, setTotalPage] = useState(0) // 分页总数
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal) // 下拉刷新状态
  const [loading, setLoading] = useState(LOAD_STATE.normal) // 上拉加载状态
  // 总收入，总支出
  const [totalExpense, setTotalExpense] = useState(0) // 支出
  const [totalIncome, setTotalIncome] = useState(0) // 收入

  useEffect(() => {
    getBillList()
  }, [page, currentSelect, currentTime])

  async function getBillList() {
    setRefreshing(REFRESH_STATE.loading)
    const { data } = await get(
      `/bill/list?page=${page}&page_size=5&date=${currentTime}&type_id=${currentSelect.id || 'all'} `
    )
    if (page == 1) {
      setList(data.list)
    } else {
      setList(list.concat(data.list))
    }
    //收入支出
    setTotalIncome(data.totalIncome.toFixed(2))
    setTotalExpense(data.totalExpense.toFixed(2))
    setTotalPage(data.totalPage)

    setLoading(LOAD_STATE.success)
    setTimeout(() => {
      setRefreshing(REFRESH_STATE.success)
    }, 0)
  }
  // 获取数据
  const refreshData = () => {
    setRefreshing(REFRESH_STATE.loading)
    getBillList()
  }
  const loadData = () => {
    if (page < totalPage) {
      setLoading(LOAD_STATE.loading)
      setPage(page + 1)
    }
  }

  // 类型弹窗
  const toggle = () => {
    typeRef.current && typeRef.current.show()
  }
  // 筛选类型
  const select = (item: TypeType) => {
    setRefreshing(REFRESH_STATE.loading)
    if (page != 1) {
      setPage(1)
    }
    // 触发刷新列表, 分页重置为1
    setCurrentSelect(item)
  }

  // 选择月份的弹窗
  const monthToggle = () => {
    monthRef.current && monthRef.current.show()
  }
  // 添加弹窗
  const addToggle = () => {
    addRef.current && addRef.current.show()
  }
  // 筛选月份
  const selectMonth = (item: string) => {
    setRefreshing(REFRESH_STATE.loading)
    setPage(1)
    setCurrentTime(item)
  }
  return (
    <>
      <div className={s.home}>
        <div className={s.header}>
          <div className={s.dataWrap}>
            <span className={s.expense}>
              总支出：<b>¥ {totalExpense}</b>
            </span>
            <span className={s.income}>
              总收入：<b>¥ {totalIncome}</b>
            </span>
          </div>
          <div className={s.typeWrap}>
            <div className={s.left} onClick={toggle}>
              <span className={s.title}>
                {currentSelect.name || '类型'} <MyIcon className={s.arrow} type="icon-arrow-down" />
              </span>
            </div>
            <div className={s.right}>
              <span className={s.time} onClick={monthToggle}>
                {currentTime}
                <MyIcon className={s.arrow} type="icon-arrow-down" />
              </span>
            </div>
          </div>
        </div>
        <div className={s.contentWrap}>
          {list.length ? (
            <Pull
              animationDuration={400}
              stayTime={1000}
              refresh={{ state: refreshing, handler: refreshData }}
              load={{ state: loading, distance: 200, handler: loadData }}
            >
              {list.map((item, index) => (
                <BillItem bills={item.bills} date={item.date} key={index} />
              ))}
            </Pull>
          ) : null}
        </div>
        <PopupType ref={typeRef} onSelect={select} />
        <PopupDate columnType={['year', 'month']} ref={monthRef} onSelect={selectMonth} />
        <PopupAddBill ref={addRef} onReload={refreshData}/>
        <div className={s.add} onClick={addToggle}>
          <IconOrigin type="tianjia" />
        </div>
      </div>
    </>
  )
}

export default Home

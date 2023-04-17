// PopupType/index.jsx
import { forwardRef, useEffect, useState, useImperativeHandle } from 'react'
import { Popup, Icon } from 'zarm'
import cx from 'classnames'
import { get } from '@/utils'
import { TypeType } from '@/typings/global'

import s from './style.module.less'
type Props = {
  onSelect: (item: TypeType) => void
}
type PopupTypeRef = {
  show: () => void
  close: () => void
}
// forwardRef 用于拿到父组件传入的 ref 属性，这样在父组件便能通过 ref 控制子组件。
const PopupType = forwardRef((props: Props, ref) => {
  const [show, setShow] = useState(false) // 组件的显示和隐藏
  const [active, setActive] = useState('all') // 激活的 type
  const [expense, setExpense] = useState([]) // 支出类型标签
  const [income, setIncome] = useState([]) // 收入类型标签

  useEffect(() => {
    async function fetchTags() {
      const {
        data: { list }
      } = await get('/type/list')
      setExpense(list.filter((i: TypeType) => i.type === 1))
      setIncome(list.filter((i: TypeType) => i.type === 2))
    }

    fetchTags()
  }, [])

  useImperativeHandle(
    ref,
    () => {
      return {
        show() {
          setShow(true)
        },
        close() {
          setShow(false)
        }
      }
    },
    []
  )
  // 选择类型回调
  const choseType = (item: TypeType) => {
    setActive(item.id as string)
    setShow(false)
    // 父组件传入的 onSelect，为了获取类型
    props.onSelect(item)
  }

  return (
    <Popup
      visible={show}
      direction="bottom"
      onMaskClick={() => setShow(false)}
      destroy={false}
      mountContainer={() => document.body}
    >
      <div className={s.popupType}>
        <div className={s.header}>
          请选择类型
          <Icon type="wrong" className={s.cross} onClick={() => setShow(false)} />
        </div>
        <div className={s.content}>
          <div onClick={() => choseType({ id: 'all' })} className={cx({ [s.all]: true, [s.active]: active == 'all' })}>
            全部类型
          </div>
          <div className={s.title}>支出</div>
          <div className={s.expenseWrap}>
            {expense.map((item: TypeType, index) => (
              <p key={index} onClick={() => choseType(item)} className={cx({ [s.active]: active == item.id })}>
                {item.name}
              </p>
            ))}
          </div>
          <div className={s.title}>收入</div>
          <div className={s.incomeWrap}>
            {income.map((item: TypeType, index) => (
              <p key={index} onClick={() => choseType(item)} className={cx({ [s.active]: active == item.id })}>
                {item.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Popup>
  )
})

export default PopupType

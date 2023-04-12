import { Icon } from 'zarm'
import { useState } from 'react'
import s from './style.module.less'
import BillItem from '@/components/BillItem'
import { ListBillType } from '@/typings/global'
import { MyIcon } from '@/components/CustomIcon'
function Home() {
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
  return (
    <>
      <div className={s.home}>
        <div className={s.header}>
          <div className={s.dataWrap}>
            <span className={s.expense}>
              总支出：<b>¥ 200</b>
            </span>
            <span className={s.income}>
              总收入：<b>¥ 500</b>
            </span>
          </div>
          <div className={s.typeWrap}>
            <div className={s.left}>
              <span className={s.title}>
                类型 <MyIcon className={s.arrow} type="icon-arrow-down" />
              </span>
            </div>
            <div className={s.right}>
              <span className={s.time}>
                2022-06
                <MyIcon className={s.arrow} type="icon-arrow-down" />
              </span>
            </div>
          </div>
        </div>
        <div className={s.contentWrap}>
          {list.map((item) => (
            <BillItem bills={item.bills} date={item.date} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home

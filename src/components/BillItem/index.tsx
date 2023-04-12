import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconOrigin } from '../CustomIcon'
import { List } from 'zarm'
import s from './style.module.less'
import { typeMap } from '@/utils'
import dayjs from 'dayjs'
import { MonthlyBillType, BillDetail } from '@/typings/global'
import PropTypes from 'prop-types'
import cl from 'classnames';
function BillItem(bill: MonthlyBillType) {
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const navigateTo = useNavigate()

  useEffect(() => {
    const _income = bill.bills
      .filter((i) => i.pay_type == 2)
      .reduce((curr, item) => {
        curr += Number(item.amount)
        return curr
      }, 0)
    setIncome(_income)
    const _expense = bill.bills
      .filter((i) => i.pay_type == 1)
      .reduce((curr, item) => {
        curr += Number(item.amount)
        return curr
      }, 0)
    setExpense(_expense)
  }, [bill.bills])

  function goToDetail(item: BillDetail) {
    navigateTo(`/detail?id=${item.id}`)
  }
  return (
    <>
      <div className={s.item}>
        <div className={s.headerDate}>
          <div className={s.date}>{bill.date}</div>
          <div className={s.money}>
            <span>
              <img src="//s.yezgea02.com/1615953405599/zhi%402x.png" alt="支" />
              <span>¥{expense.toFixed(2)}</span>
            </span>
            <span>
              <img src="//s.yezgea02.com/1615953405599/shou%402x.png" alt="收" />
              <span>¥{income.toFixed(2)}</span>
            </span>
          </div>
        </div>
        <List>
          {bill &&
            bill.bills.map((item) => (
              <List.Item
                key={item.id}
                onClick={() => goToDetail(item)}
                title={
                  <>
                    <IconOrigin
                      className={s.itemIcon}
                      type={(item.type_id ? typeMap[item.type_id].icon : 1) as string}
                    />
                    <span className={s.type_name}>{item.type_name}</span>
                  </>
                }
                description={
                  <div style={{color: '#000'}}>
                    {dayjs(Number(item.date)).format('HH:mm')} {item.remark ? `| ${item.remark}` : ''}
                  </div>
                }
              >
                <span style={{ color: item.pay_type == 2 ? 'red' : '#39be77' }}>
                  {`${item.pay_type == 1 ? '-' : '+'}${item.amount}`}
                </span>
              </List.Item>
            ))}
        </List>
      </div>
    </>
  )
}
BillItem.propTypes = {
  bill: PropTypes.object
}

export default BillItem

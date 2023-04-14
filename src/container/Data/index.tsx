import React, { useEffect, useRef, useState } from 'react'
import { Icon, Progress } from 'zarm'
import cx from 'classnames'
import dayjs from 'dayjs'
import { get, typeMap } from '@/utils'
import { IconOrigin, MyIcon } from '@/components/CustomIcon'
import PopupDate from '@/components/PopupDate'
import s from './style.module.less'
import { PopupDateRef, PerTypeData } from '@/typings/global'
const Data = () => {
  const monthRef = useRef<PopupDateRef>()
  const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY-MM'))
  const [totalType, setTotalType] = useState('expense') // 收入或支出类型
  const [totalExpense, setTotalExpense] = useState(0) // 总支出
  const [totalIncome, setTotalIncome] = useState(0) // 总收入
  const [expenseData, setExpenseData] = useState([]) // 支出数据
  const [incomeData, setIncomeData] = useState([]) // 收入数据

  useEffect(() => {
    getData()
  }, [currentMonth])

  // 获取数据详情
  const getData = async () => {
    const { data } = await get(`/bill/data?date=${currentMonth}`)
    console.log(data)

    // 总收支
    setTotalExpense(data.total_expense)
    setTotalIncome(data.total_income)

    // 过滤支出和收入
    const expense_data = data.total_data
      .filter((item: PerTypeData) => item.pay_type == 1)
      .sort((a: PerTypeData, b: PerTypeData) => b.number - a.number) // 过滤出账单类型为支出的项
    const income_data = data.total_data
      .filter((item: PerTypeData) => item.pay_type == 2)
      .sort((a: PerTypeData, b: PerTypeData) => b.number - a.number) // 过滤出账单类型为收入的项
    setExpenseData(expense_data)
    setIncomeData(income_data)
  }

  // 月份弹窗开关
  const monthShow = () => {
    monthRef.current && monthRef.current.show()
  }
  // 改变收支类型
  const changeTotalType = (val: string) => {
    setTotalType(val)
  }
  const selectMonth = (item: string) => {
    setCurrentMonth(item)
  }
  return (
    <div className={s.data}>
      <div className={s.total}>
        <div className={s.time} onClick={monthShow}>
          <span>{currentMonth}</span>
          <MyIcon className={s.date} type="icon-date" />
        </div>
        <div className={s.title}>共支出</div>
        <div className={s.expense}>{totalExpense}</div>
        <div className={s.income}>共收入¥{totalIncome}</div>
      </div>
      <div className={s.structure}>
        <div className={s.head}>
          <span className={s.title}>收支构成</span>
          <div className={s.tab}>
            <span
              onClick={() => changeTotalType('expense')}
              className={cx({ [s.expense]: true, [s.active]: totalType == 'expense' })}
            >
              支出
            </span>
            <span
              onClick={() => changeTotalType('income')}
              className={cx({ [s.income]: true, [s.active]: totalType == 'income' })}
            >
              收入
            </span>
          </div>
        </div>
        <div className={s.content}>
          {(totalType == 'expense' ? expenseData : incomeData).map((item: PerTypeData) => (
            <div key={item.type_id} className={s.item}>
              <div className={s.left}>
                <div className={s.type}>
                  <span className={cx({ [s.expense]: totalType == 'expense', [s.income]: totalType == 'income' })}>
                    <IconOrigin type={item.type_id ? typeMap[item.type_id].icon : '1'} />
                  </span>
                  <span className={s.name}>{item.type_name}</span>
                </div>
                <div className={s.progress}>¥{Number(item.number).toFixed(0) || 0}</div>
              </div>
              <div className={s.right}>
                <div className={s.percent}>
                  <Progress
                    shape="line"
                    percent={Number(
                      Number((item.number / Number(totalType == 'expense' ? totalExpense : totalIncome)) * 100).toFixed(
                        2
                      )
                    )}
                    theme="primary"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PopupDate ref={monthRef} columnType={['year', 'month']} onSelect={selectMonth} />
    </div>
  )
}

export default Data

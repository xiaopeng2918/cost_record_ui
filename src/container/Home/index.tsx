import { useEffect, useState } from 'react'
import s from './style.module.less'
import BillItem from '@/components/BillItem'
import { ListBillType,MonthlyBillType } from '@/typings/global'
import { MyIcon } from '@/components/CustomIcon'
import dayjs from 'dayjs';
import { LOAD_STATE, REFRESH_STATE } from '@/utils'
import { get } from '@/utils'
import { Pull } from 'zarm'
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
  const [page, setPage] = useState(1) // 分页
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM')) // 当前筛选时间
  const [totalPage, setTotalPage] = useState(0)// 分页总数
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal) // 下拉刷新状态
  const [loading, setLoading] = useState(LOAD_STATE.normal) // 上拉加载状态

  useEffect(() => {
    getBillList()
  },[page])

  async function getBillList(){
    const {data} = await get(`/bill/list?page=${page}&page_size=5&date=${currentTime}`)
    if(page == 1){
      setList(data.list)
    }else{
      setList(list.concat(data.list))
    }

    setTotalPage(data.totalPage)
    setLoading(LOAD_STATE.success)
    setRefreshing(REFRESH_STATE.success)
  }
  // 获取数据
  const refreshData = () => {
    setRefreshing(REFRESH_STATE.loading)
    if(page != 1){
      setPage(1)
    }else {
      getBillList()
    }
  }
  const loadData = () => {
    if(page < totalPage){
      setLoading(LOAD_STATE.loading)
      setPage(page + 1)
    }
  }
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
          {list.length ? (
            <Pull
              animationDuration={200}
              stayTime={400}
              refresh={{ state: refreshing, handler: refreshData }}
              load={{ state: loading, distance: 200, handler: loadData }}
            >
              {list.map((item, index) => (
                <BillItem bills={item.bills} date={item.date} key={index} />
              ))}
            </Pull>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Home

import BillItem from '@/components/BillItem'
declare module 'zarm/lib/config-provider/locale/zh_CN'

// bills类型声明
type BillType = {
  amount: string
  date: string
  id: number
  pay_type: number
  remark: string
  type_id: number
  type_name: string
}

export interface BillItemProps {
  bill: {
    bills: BillType[]
    date: string
  }
}
export interface MonthlyBillType {
  bills: BillType[]
  date: string
}
// 账单详情
export type ListBillType = Array<MonthlyBillType>
export interface BillDetail {
  amount: string
  date: string
  id: number
  pay_type: number
  remark: string
  type_id: number
  type_name: string
}
// 图表
export type TypeMap = {
  [key: number]: {
    icon: string
  }
}

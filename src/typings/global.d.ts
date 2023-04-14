import BillItem from '@/components/BillItem'
declare module 'zarm/lib/config-provider/locale/zh_CN'

// 单个bill
type BillType = {
  amount: string
  date: string
  id: number
  pay_type: number
  remark: string
  type_id: number
  type_name: string
  user_id: number
}
// 每天的bill声明
export interface MonthlyBillType {
  bills: BillType[]
  date: string
}
// 数据返回形式 
export type ListBillType = Array<MonthlyBillType>
// 图标数据结构
export type TypeMap = {
  [key: number]: {
    icon: string
  }
}

// 单个type标签
export type TypeType  = {
  id: string | number // string兼容'all'
  name?: string
  type?: number
  user_id?: number
}
// type arr
export type TypeArr = Array<TypeType>

// 控制 几个弹出框  ref所具有的方法
type PopupTypeRef = {
  show: () => void
  close: () => void
}
type PopupDateRef = PopupTypeRef
type PopupAddRef = PopupTypeRef
type PopupEditRef = PopupTypeRef


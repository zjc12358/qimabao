import { SupplierProductOrderDetail } from './SupplierProductOrderDetali'
export interface SupplierProductOrder {
  orderDetailList: Array<SupplierProductOrderDetail>
  order_amount: any
  order_id: string
  order_status: number
  over_time: number
  pay_china_status: string
  pay_status: number
  product_count: number
}

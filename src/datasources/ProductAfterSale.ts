import { ProductAfterSaleDetail } from './ProductAfterSaleDetail'

export interface ProductAfterSale {
  create_time: string
  orderDetailList: Array<ProductAfterSaleDetail>
  order_amount: any
  order_id: string
  order_status: number
  over_time: number
  pay_china_status: string
  pay_status: number
  product_count: number
}

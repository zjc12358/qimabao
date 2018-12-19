import { OrderDetailListBean } from './OrderDetailListBean'

export interface OrderDetailBean {
  buyer_address: string,
  create_time: string,
  orderDetailList: Array<OrderDetailListBean>,
  order_amount: number,
  order_id: string,
  order_status: number,
  over_time: number,
  pay_china_status: string,
  pay_status: number,
  product_count: number
}

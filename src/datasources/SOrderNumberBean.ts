export interface SOrderNumberBean {
  shipped: number // 待评价订单总数
  paid: number // 已付款订单总数
  tqCount: number // 待收货订单总数
  received: number // 待发货订单总数
  unpaid: number // 退款订单总数
  commented: number // 未付款订单总数
}

import { PayAction, Type } from '../actions/pay_data'

export interface PayData {
  outTradeNo: string // 订单号
  totalAmount: string // 金额
  subject: string // 主题
  body: string // 描述 可 null
}

const initialState: PayData = {
  outTradeNo: null, // 订单号
  totalAmount: null, // 金额
  subject: null, // 主题
  body: null // 描述 可 null
}

export default (state = initialState, action: PayAction) => {
  switch (action.type) {
    case Type.SET_PAY_INFO:
      return {
        ...state,
        outTradeNo: action.outTradeNo,
        totalAmount: action.totalAmount,
        subject: action.subject,
        body: action.body
      }
    default:
      return state
  }
}

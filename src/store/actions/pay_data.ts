import { Action } from 'redux'

export enum Type {
  SET_PAY_INFO = 'SET_PAY_INFO'
}

export interface PayAction extends Action {
  type: Type
  outTradeNo: string // 订单号
  totalAmount: string // 金额
  subject: string // 主题
  body: string // 描述 可 null
}

/**
 * 设置支付信息
 * @param outTradeNo
 * @param totalAmount
 * @param subject
 * @param body
 */
export const setPayInfo = (outTradeNo: string, totalAmount: string, subject: string, body: string) =>
  (dispatch) => dispatch({
    type: Type.SET_PAY_INFO,
    outTradeNo: outTradeNo,
    totalAmount: totalAmount,
    subject: subject,
    body: body
  })

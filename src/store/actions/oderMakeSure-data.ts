import { Action } from 'redux'
import { OrderMakeSureBean } from '../../datasources/OrderMakeSureBean'

export enum Type {
  UPDATE_ORDERMAKESURE = 'UPDATE_ORDERMAKESURE'
}

export interface OrderMakeSureAction extends Action {
  type: Type
  OrderMakeSureData: OrderMakeSureBean,
  reload: boolean
}

export const updataOrderMakeSure = (orderMakeSure: OrderMakeSureBean) =>
  (dispatch) => dispatch({
    type: Type.UPDATE_ORDERMAKESURE,
    OrderMakeSureData: orderMakeSure,
    reload: true
  })

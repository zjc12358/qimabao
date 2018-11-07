import { Action } from 'redux'
import { OrderMakeSureBean } from '../../datasources/OrderMakeSureBean'

export enum Type {
  UPDATE_ORDERMAKESURE = 'UPDATE_ORDERMAKESURE',
  UPDATA_NEEDRELOAD = 'UPDATA_NEEDRELOAD'
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

export const needReload = (reload: boolean) =>
  (dispatch) => dispatch({
    type: Type.UPDATA_NEEDRELOAD,
    reload: true
  })

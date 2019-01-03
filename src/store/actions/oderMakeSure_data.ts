import { Action } from 'redux'
import { OrderMakeSureBean } from '../../datasources/OrderMakeSureBean'

export enum Type {
  UPDATE_ORDERMAKESURE = 'UPDATE_ORDERMAKESURE',
  UPDATA_NEEDRELOAD = 'UPDATA_NEEDRELOAD',
  UPDATE_ADDRESS = 'UPDATE_ADDRESS'
}

export interface OrderMakeSureAction extends Action {
  type: Type
  OrderMakeSureData: OrderMakeSureBean,
  reload: boolean
  updateAddress: boolean
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
    reload: reload
  })

export const updateAddress = (update: boolean) =>
  (dispatch) => dispatch({
    type: Type.UPDATE_ADDRESS,
    updateAddress: update
  })

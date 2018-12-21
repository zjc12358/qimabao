import { Action } from 'redux'
import { ProductOrder } from '../../datasources/ProductOrder'

export enum Type {
  UPDATE_PRODUCTORDER = 'UPDATE_PRODUCTORDER',
  CHANGE_TAB = 'CHANGE_TAB',
  CHANGE_INDEX = 'CHANGE_INDEX'
}

export interface ProductOrderAction extends Action {
  type: Type
  ProductOrderData: Array<ProductOrder>
  index: number
  tab: number
}

export const updateProductOrder = (ProductOrderData: Array<ProductOrder>) =>
  (dispatch) => dispatch({
    type: Type.UPDATE_PRODUCTORDER,
    ProductOrderData: ProductOrderData
  })

export const changeTab = (tab: number) =>
  (dispatch) => dispatch({
    type: Type.CHANGE_TAB,
    tab: tab
  })

export const changeIndex = (index: number) =>
  (dispatch) => dispatch({
    type: Type.CHANGE_INDEX,
    index: index
  })

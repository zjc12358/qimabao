import { Action } from 'redux'
import { ProductOrder } from '../../datasources/ProductOrder'

export enum Type {
  UPDATE_PRODUCTORDER = 'UPDATE_PRODUCTORDER',
  CHANGE_TAB = 'CHANGE_TAB'
}

export interface ProductOrderAction extends Action {
  type: Type
  ProductOrderData: Array<ProductOrder>
  index: number
  tab: number
}

export const updateProductOrder = (ProductOrderData: Array<ProductOrder>,index) =>
  (dispatch) => dispatch({
    type: Type.UPDATE_PRODUCTORDER,
    ProductOrderData: ProductOrderData,
    index: index
  })

export const changeTab = (tab: number) =>
  (dispatch) => dispatch({
    type: Type.CHANGE_TAB,
    tab: tab
  })

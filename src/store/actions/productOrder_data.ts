import { Action } from 'redux'
import { ProductOrder } from '../../datasources/ProductOrder'

export enum Type {
  UPDATE_PRODUCTORDER = 'UPDATE_PRODUCTORDER',
  CHANGE_INDEX = 'CHANGE_INDEX'
}

export interface ProductOrderAction extends Action {
  type: Type
  ProductOrderData: Array<ProductOrder>
  index: number
}

export const updateProductOrder = (ProductOrderData: Array<ProductOrder>,index) =>
  (dispatch) => dispatch({
    type: Type.UPDATE_PRODUCTORDER,
    ProductOrderData: ProductOrderData,
    index: index
  })

export const changeIndex = (index: number) =>
  (dispatch) => dispatch({
    type: Type.CHANGE_INDEX,
    index: index
  })

import { Action } from 'redux'
import { ProductAfterSale } from '../../datasources/ProductAfterSale'

export enum Type {
  UPDATE_PRODUCTAFTERSALE = 'UPDATE_PRODUCTAFTERSALE',
  CHANGE_TAB = 'CHANGE_TAB',
  CHANGE_INDEX = 'CHANGE_INDEX'
}

export interface ProductAfterSaleAction extends Action {
  type: Type
  ProductAfterSaleData: Array<ProductAfterSale>
  index: number
  tab: number
}

export const updateProductAfterSale = (ProductAfterSaleData: Array<ProductAfterSale>) =>
  (dispatch) => dispatch({
    type: Type.UPDATE_PRODUCTAFTERSALE,
    ProductAfterSaleData: ProductAfterSaleData
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

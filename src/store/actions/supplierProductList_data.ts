import { Action } from 'redux'
import { ProductList } from '../../datasources/ProductList'

export enum Type {
  UPDATE_PRODUCTLIST = 'UPDATE_PRODUCTLIST',
  UPDATE_PRODUCTLISTDETAIL = 'UPDATE_PRODUCTLISTDETAIL',
  CHANGE_TAB = 'CHANGE_TAB',
  CHANGE_INDEX = 'CHANGE_INDEX'
}

export interface ProductListAction extends Action {
  type: Type
  ProductListData: Array<ProductList>
  ProductListDetailData: ProductList
  index: number
  tab: number
}

export const updateProductList = (ProductListData: Array<ProductList>) =>
  (dispatch) => dispatch({
    type: Type.UPDATE_PRODUCTLIST,
    ProductListData: ProductListData
  })

export const updateProductListDetail = (ProductListDetailData: ProductList) =>
  (dispatch) => dispatch({
    type: Type.UPDATE_PRODUCTLISTDETAIL,
    ProductListDetailData: ProductListDetailData
  })

export const changeTabl = (tab: number) =>
  (dispatch) => dispatch({
    type: Type.CHANGE_TAB,
    tab: tab
  })

export const changeIndex = (index: number) =>
  (dispatch) => dispatch({
    type: Type.CHANGE_INDEX,
    index: index
  })

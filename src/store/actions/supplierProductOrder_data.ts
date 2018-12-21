import { Action } from 'redux'
import { SupplierProductOrder } from '../../datasources/SupplierProductOrder'

export enum Type {
  UPDATE_SUPPLIERPRODUCTORDER = 'UPDATE_SUPPLIERPRODUCTORDER',
  CHANGE_TAB = 'CHANGE_TAB',
  CHANGE_INDEX = 'CHANGE_INDEX'
}

export interface SupplierProductOrderAction extends Action {
  type: Type
  SupplierProductOrderData: Array<SupplierProductOrder>
  index: number
  tab: number
}

export const updateSupplierProductOrder = (SupplierProductOrderData: Array<SupplierProductOrder>) =>
  (dispatch) => dispatch({
    type: Type.UPDATE_SUPPLIERPRODUCTORDER,
    SupplierProductOrderData: SupplierProductOrderData
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

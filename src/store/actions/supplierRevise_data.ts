import { Action } from 'redux'

export enum Type {
  UPDATE_PRODUCTMSG = 'UPDATE_PRODUCTMSG'
}

/**
 * 修改供应商
 */
export interface SupplierReviseAction extends Action {
  type: Type
  productMsg: any
}

/**
 * 保存 供应商下的 供应商id与商品的cartid
 * @param productMsg
 */
export const updateSupplierRevise = (productMsg: any) =>
  (dispatch) => dispatch({
    type: Type.UPDATE_PRODUCTMSG,
    productMsg: productMsg
  })

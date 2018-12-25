import { Action } from 'redux'
import { ShopCartSupplierBean } from '../../datasources/ShopCartSupplierBean'

export enum Type {
  UPDATA_SHOPCART = 'UPDATA_SHOPCART',
  UPDATA_NEEDRELOAD = 'UPDATA_NEEDRELOAD',
  UPDATA_ALLSUPPLIERITEMCHECK = 'UPDATA_ALLSUPPLIERITEMCHECK'
}

export interface ShopCartAction extends Action {
  type: Type
  ShopCartData: Array<ShopCartSupplierBean>,
  AllSupplierCheckBoolean: Boolean,
  reload: boolean
}

export const updataShopCart = (shopCart?: Array<ShopCartSupplierBean>) =>
  (dispatch) => dispatch({
    type: Type.UPDATA_SHOPCART,
    ShopCartData: shopCart,
    reload: true
  })

export const needReload = (reload: boolean) =>
  (dispatch) => dispatch({
    type: Type.UPDATA_NEEDRELOAD,
    reload: reload
  })

export const updataAllSupplierItemCheck = (allSupplierItemCheck: boolean) =>
  (dispatch) => dispatch({
    type: Type.UPDATA_ALLSUPPLIERITEMCHECK,
    AllSupplierCheckBoolean: allSupplierItemCheck
  })

import { Action } from 'redux'
import { ShopCartSupplierBean } from '../../datasources/ShopCartSupplierBean'

export enum Type {
  UPDATA_SHOPCART = 'UPDATA_SHOPCART',
  UPDATA_NEEDRELOAD = 'UPDATA_NEEDRELOAD'
}

export interface ShopCartAction extends Action {
  type: Type
  ShopCartData: Array<ShopCartSupplierBean>,
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
// export const updataTotal = (total: number) =>
//   (dispatch) => dispatch({
//     type: Type.UPDATA_NEEDRELOAD
//   })

import { Action } from 'redux'
import { ShopCartTestBean } from '../../datasources/ShopCartTestBean'

export enum Type {
  UPDATE_ShopCartTest = 'UPDATE_ShopCartTest'
}

export interface ShopCartTestAction extends Action {
  type: Type
  ShopCartTestDate: ShopCartTestBean
}

export const updateShopCartTest = (shopCartTest: ShopCartTestBean) =>
  (dispatch) => dispatch({
    type: Type.UPDATE_ShopCartTest,
    ShopCartTestDate: shopCartTest
  })

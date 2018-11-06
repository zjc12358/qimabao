import { Action } from 'redux'

export enum Type {
  CHOOSE_PRODUCT = 'CHOOSE_PRODUCT'
}

export interface ProductDetailsAction extends Action {
  type: Type,
  productId: number
}

export const chooseProduct = (id: number) =>
  (dispatch) => dispatch({
    type: Type.CHOOSE_PRODUCT,
    productId: id
  })

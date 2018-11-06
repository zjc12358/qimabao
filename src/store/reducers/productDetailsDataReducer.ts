import { Type, ProductDetailsAction } from '../actions/productDetails_data'

export interface ProductDetailsData {
  productId: number
}

const initialState: ProductDetailsData = {
  productId: 0
}

export default (state = initialState, action: ProductDetailsAction) => {
  switch (action.type) {
    case Type.CHOOSE_PRODUCT:
      return {
        ...state,
        productId: action.productId
      }
    default:
      return state
  }
}

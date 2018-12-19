import { ReleaseAction, Type } from '../actions/release_data'

export interface ShopCartData {
  categoryId: number,
  categoryClassId: number,
  productDescription: string
}

const initialState: ShopCartData = {
  categoryId: null,
  categoryClassId: null,
  productDescription: ''
}

export default (state = initialState, action: ReleaseAction) => {
  switch (action.type) {
    case Type.UPDATA_CATEGORYID:
      return {
        ...state,
        categoryId: action.categoryId
      }
    case Type.UPDATA_CATEGORYCLASSID:
      return {
        ...state,
        categoryClassId: action.categoryClassId
      }
    case Type.UPDATA_PRODUCTDESCRIPTION:
      return {
        ...state,
        productDescription: action.productDescription
      }
    default:
      return state
  }
}

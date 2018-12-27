import { ReleaseAction, Type } from '../actions/release_data'

export interface ShopCartData {
  categoryId: number,
  categoryClassId: number,
  productDescription: string
  categoryName: string,
  productMsg: any
}

const initialState: ShopCartData = {
  categoryId: null,
  categoryClassId: null,
  productDescription: '',
  categoryName: '',
  productMsg: {
    productName: '',
    productPrice: '',
    productStock: '',
    productLabel: ''
  }
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
        categoryClassId: action.categoryClassId,
        categoryName: action.categoryName
      }
    case Type.UPDATA_PRODUCTDESCRIPTION:
      return {
        ...state,
        productDescription: action.productDescription
      }
    case Type.SAVE_PRODUCTMSG:
      return {
        ...state,
        productMsg: action.productMsg
      }
    default:
      return state
  }
}

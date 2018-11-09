import { ShopCartSupplierBean } from '../../datasources/ShopCartSupplierBean'
import { ShopCartAction, Type } from '../actions/shopCart_data'

export interface ShopCartData {
  ShopCartData: Array<ShopCartSupplierBean>,
  reload: boolean
}

const initialState: ShopCartData = {
  ShopCartData: [],
  reload: true
}

export default (state = initialState, action: ShopCartAction) => {
  switch (action.type) {
    case Type.UPDATA_SHOPCART:
      console.log(11111)
      return {
        ...state,
        ShopCartData: action.ShopCartData
      }
    case Type.UPDATA_NEEDRELOAD:
      console.log('UPDATA_NEEDRELOAD')
      return {
        ...state,
        reload: action.reload
      }
    // case Type.UPDATA_TOTAL:
    //   return {
    //     ...state,
    //     total: action.
    //   }
    default:
      return state
  }
}

import { ShopCartSupplierBean } from '../../datasources/ShopCartSupplierBean'
import { ShopCartAction, Type } from '../actions/shopCart_data'
import { number } from 'prop-types'

export interface ShopCartData {
  ShopCartData: Array<ShopCartSupplierBean>,
  AllSupplierCheckBoolean: Boolean,
  reload: boolean
}

const initialState: ShopCartData = {
  ShopCartData: [],
  AllSupplierCheckBoolean: false,
  reload: true
}

export default (state = initialState, action: ShopCartAction) => {
  switch (action.type) {
    case Type.UPDATA_SHOPCART:
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
    case Type.UPDATA_ALLSUPPLIERITEMCHECK:
      return {
        ...state,
        AllSupplierCheckBoolean: action.AllSupplierCheckBoolean
      }
    default:
      console.log(state)
      return state
  }
}

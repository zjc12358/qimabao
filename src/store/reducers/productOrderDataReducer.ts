import { ProductOrderAction, Type } from '../actions/productOrder_data'
import { ProductOrder } from '../../datasources/ProductOrder'

export interface ProductOrderData {
  ProductOrderData: Array<ProductOrder>
  index: number
  tab: number
}

const initialState: ProductOrderData = {
  ProductOrderData: [],
  index: 0,
  tab: 0
}

export default (state = initialState, action: ProductOrderAction) => {
  switch (action.type) {
    case Type.UPDATE_PRODUCTORDER:
      return {
        ...state,
        ProductOrderData: action.ProductOrderData,
        index: action.index
      }
    case Type.CHANGE_TAB:
      return{
        ...state,
        tab: action.tab
      }
    default:
      return state
  }
}

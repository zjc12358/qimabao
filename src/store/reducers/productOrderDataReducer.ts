import { ProductOrderAction, Type } from '../actions/productOrder_data'
import { ProductOrder } from '../../datasources/ProductOrder'

export interface ProductOrderData {
  ProductOrderData: Array<ProductOrder>
  index: number
}

const initialState: ProductOrderData = {
  ProductOrderData: [],
  index: 0
}

export default (state = initialState, action: ProductOrderAction) => {
  switch (action.type) {
    case Type.UPDATE_PRODUCTORDER:
      return {
        ...state,
        ProductOrderData: action.ProductOrderData
      }
    case Type.CHANGE_INDEX:
      return{
        ...state,
        index: action.index
      }
    default:
      return state
  }
}

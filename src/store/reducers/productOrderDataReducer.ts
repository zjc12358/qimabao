import { ProductOrderAction, Type } from '../actions/productOrder_data'
import { ProductOrder } from '../../datasources/ProductOrder'

export interface ProductOrderData {
  ProductOrderData: Array<ProductOrder>
  ProductOrderDetailData: ProductOrder
  index: number
  tab: number
}

const initialState: ProductOrderData = {
  ProductOrderData: [],
  ProductOrderDetailData: {} as ProductOrder,
  index: 0,
  tab: 0
}

export default (state = initialState, action: ProductOrderAction) => {
  switch (action.type) {
    case Type.UPDATE_PRODUCTORDER:
      return {
        ...state,
        ProductOrderData: action.ProductOrderData
      }
    case Type.UPDATE_PRODUCTORDERDETAIL:
      return {
        ...state,
        ProductOrderDetailData: action.ProductOrderDetailData
      }
    case Type.CHANGE_TAB:
      return{
        ...state,
        tab: action.tab
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

import { ProductAfterSaleAction, Type } from '../actions/productAfterSale_data'
import { ProductAfterSale } from '../../datasources/ProductAfterSale'

export interface ProductAfterSaleData {
  ProductAfterSaleData: Array<ProductAfterSale>
  index: number
  tab: number
}

const initialState: ProductAfterSaleData = {
  ProductAfterSaleData: [],
  index: 0,
  tab: 0
}

export default (state = initialState, action: ProductAfterSaleAction) => {
  switch (action.type) {
    case Type.UPDATE_PRODUCTAFTERSALE:
      return {
        ...state,
        ProductAfterSaleData: action.ProductAfterSaleData
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

import { ProductListAction, Type } from '../actions/supplierProductList_data'
import { ProductList } from '../../datasources/ProductList'

export interface ProductListData {
  ProductListData: Array<ProductList>
  index: number
  tab: number
}

const initialState: ProductListData = {
  ProductListData: [],
  index: 0,
  tab: 0
}

export default (state = initialState, action: ProductListAction) => {
  switch (action.type) {
    case Type.UPDATE_PRODUCTLIST:
      return {
        ...state,
        ProductListData: action.ProductListData
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

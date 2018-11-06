import { combineReducers } from 'redux'
import globalDataReducer from './globalDataReducer'
import categoryItemDataReducer from './categoryItemDataReducer'
import productDetailsDataReducer from '@store/reducers/productDetailsDataReducer'
import searchDataReducer from '@store/reducers/searchDataReducer'
import outSideShadeDataReducer from '@store/reducers/outSideShadeDataReducer'

const rootReducer = combineReducers<any>({
  globalData: globalDataReducer as any,
  categoryItemData: categoryItemDataReducer as any,
  productDetailsData: productDetailsDataReducer as any,
  searchData: searchDataReducer as any,
  outSideShadeData: outSideShadeDataReducer as any
})

export default rootReducer

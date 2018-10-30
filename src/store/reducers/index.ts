import { combineReducers } from 'redux'
import globalDataReducer from './globalDataReducer'
import categoryItemDataReducer from './categoryItemDataReducer'
import productDetailsDataReducer from '@store/reducers/productDetailsDataReducer'

const rootReducer = combineReducers<any>({
  globalData: globalDataReducer as any,
  categoryItemData: categoryItemDataReducer as any,
  productDetailsData: productDetailsDataReducer as any
})

export default rootReducer

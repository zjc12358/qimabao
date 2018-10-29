import { combineReducers } from 'redux'
import globalDataReducer from './globalDataReducer'
import categoryItemDataReducer from './categoryItemDataReducer'

const rootReducer = combineReducers<any>({
  globalData: globalDataReducer as any,
  categoryItemData: categoryItemDataReducer as any
})

export default rootReducer

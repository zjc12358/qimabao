import { combineReducers } from 'redux'
import globalDataReducer from './globalDataReducer'

const rootReducer = combineReducers<any>({
  globalData: globalDataReducer as any
})

export default rootReducer

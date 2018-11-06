import { combineReducers } from 'redux'
import globalDataReducer from './globalDataReducer'
import categoryItemDataReducer from './categoryItemDataReducer'
import productDetailsDataReducer from '@store/reducers/productDetailsDataReducer'
import shopCartTestDataReducer from './shopCartTestDataReducer'
import orderMakeSureDataReducer from '@store/reducers/orderMakeSureDataReducer'

const rootReducer = combineReducers<any>({
  globalData: globalDataReducer as any,
  categoryItemData: categoryItemDataReducer as any,
  productDetailsData: productDetailsDataReducer as any,
  shopCartTestData: shopCartTestDataReducer as any,
  orderMakeSure: orderMakeSureDataReducer as any
})

export default rootReducer

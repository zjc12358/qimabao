import { combineReducers } from 'redux'
import globalDataReducer from './globalDataReducer'
import categoryItemDataReducer from './categoryItemDataReducer'
import productDetailsDataReducer from '@store/reducers/productDetailsDataReducer'
import shopCartTestDataReducer from './shopCartTestDataReducer'
import orderMakeSureDataReducer from '@store/reducers/orderMakeSureDataReducer'
import searchDataReducer from '@store/reducers/searchDataReducer'
import menuDataReducer from '@store/reducers/menuDataReducer'

const rootReducer = combineReducers<any>({
  globalData: globalDataReducer as any,
  categoryItemData: categoryItemDataReducer as any,
  productDetailsData: productDetailsDataReducer as any,
  shopCartTestData: shopCartTestDataReducer as any,
  orderMakeSure: orderMakeSureDataReducer as any,
  searchData: searchDataReducer as any,
  menuData: menuDataReducer as any
})

export default rootReducer

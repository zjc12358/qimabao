import { combineReducers } from 'redux'
import globalDataReducer from './globalDataReducer'
import categoryItemDataReducer from './categoryItemDataReducer'
import productDetailsDataReducer from '@store/reducers/productDetailsDataReducer'
import shopCartTestDataReducer from './shopCartTestDataReducer'
import orderMakeSureDataReducer from '@store/reducers/orderMakeSureDataReducer'
import searchDataReducer from '@store/reducers/searchDataReducer'
import outSideShadeDataReducer from '@store/reducers/outSideShadeDataReducer'
import shopCartDataReducer from '@store/reducers/shopCartDataReducer'

const rootReducer = combineReducers<any>({
  globalData: globalDataReducer as any,
  categoryItemData: categoryItemDataReducer as any,
  productDetailsData: productDetailsDataReducer as any,
  shopCartData: shopCartDataReducer as any,
  shopCartTestData: shopCartTestDataReducer as any,
  orderMakeSure: orderMakeSureDataReducer as any,
  searchData: searchDataReducer as any,
  outSideShadeData: outSideShadeDataReducer as any
})

export default rootReducer

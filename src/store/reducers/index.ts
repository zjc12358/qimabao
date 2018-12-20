import { combineReducers } from 'redux'
import globalDataReducer from './globalDataReducer'
import categoryItemDataReducer from './categoryItemDataReducer'
import productDetailsDataReducer from '@store/reducers/productDetailsDataReducer'
import orderMakeSureDataReducer from '@store/reducers/orderMakeSureDataReducer'
import searchDataReducer from '@store/reducers/searchDataReducer'
import shopCartDataReducer from '@store/reducers/shopCartDataReducer'
import menuDataReducer from '@store/reducers/menuDataReducer'
import menuDetailDataReducer from '@store/reducers/menuDetailDataReducer'
import productOrderDataReducer from '@store/reducers/productOrderDataReducer'
import addressDetailDataReducer from '@store/reducers/addressDetailDataReducer'

const rootReducer = combineReducers<any>({
  globalData: globalDataReducer as any,
  categoryItemData: categoryItemDataReducer as any,
  productDetailsData: productDetailsDataReducer as any,
  shopCartData: shopCartDataReducer as any,
  orderMakeSure: orderMakeSureDataReducer as any,
  searchData: searchDataReducer as any,
  menuData: menuDataReducer as any,
  menuDetailData: menuDetailDataReducer as any,
  productOrderData: productOrderDataReducer as any,
  addressDetailData: addressDetailDataReducer as any
})

export default rootReducer

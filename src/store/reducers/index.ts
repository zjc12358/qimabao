import { combineReducers } from 'redux'
import globalDataReducer from './globalDataReducer'
import categoryItemDataReducer from './categoryItemDataReducer'
import productDetailsDataReducer from '@store/reducers/productDetailsDataReducer'
import orderMakeSureDataReducer from '@store/reducers/orderMakeSureDataReducer'
import searchDataReducer from '@store/reducers/searchDataReducer'
import shopCartDataReducer from '@store/reducers/shopCartDataReducer'
import menuDataReducer from '@store/reducers/menuDataReducer'
import menuDetailDataReducer from '@store/reducers/menuDetailDataReducer'
import bookingSheetDataReducer from '@store/reducers/bookingSheetDataReducer'
import productOrderDataReducer from '@store/reducers/productOrderDataReducer'
import addressDetailDataReducer from '@store/reducers/addressDetailDataReducer'
import supplierReviseDataReducer from '@store/reducers/supplierReviseDataReducer'
import productAfterSaleDataReducer from '@store/reducers/productAfterSaleDataReducer'
import SupplierInfoDataReducer from '@store/reducers/SupplierInfoDataReducer'
import releaseDataReducer from '@store/reducers/releaseDataReducer'
import supplierProductListDataReducer from '@store/reducers/supplierProductListDataReducer'
import payDataReducer from '@store/reducers/payDataReducer'
import jumpDataReducer from '@store/reducers/jumpDataReducer'

const rootReducer = combineReducers<any>({
  globalData: globalDataReducer as any,
  categoryItemData: categoryItemDataReducer as any,
  productDetailsData: productDetailsDataReducer as any,
  shopCartData: shopCartDataReducer as any,
  BookingSheetFood: bookingSheetDataReducer as any,
  orderMakeSure: orderMakeSureDataReducer as any,
  searchData: searchDataReducer as any,
  menuData: menuDataReducer as any,
  menuDetailData: menuDetailDataReducer as any,
  productOrderData: productOrderDataReducer as any,
  addressDetailData: addressDetailDataReducer as any,
  supplierReviseData: supplierReviseDataReducer as any,
  productAfterSaleData: productAfterSaleDataReducer as any,
  SupplierInfoDate: SupplierInfoDataReducer as any,
  releaseData: releaseDataReducer as any,
  supplierProductListData: supplierProductListDataReducer as any,
  payData: payDataReducer as any,
  jumpData: jumpDataReducer as any
})

export default rootReducer

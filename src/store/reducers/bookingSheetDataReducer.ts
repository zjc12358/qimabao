import { BookingSheetAction, Type } from '../actions/bookingSheet_data'
import { ShopCartSupplierBean } from '../../datasources/ShopCartSupplierBean'

export interface BookingSheetData {
  BookingSheetFood: Array<ShopCartSupplierBean>,
  orderId: string,
  total: number
}

const initialState: BookingSheetData = {
  BookingSheetFood: [],
  orderId: null,
  total: 0
}

export default (state = initialState, action: BookingSheetAction) => {
  switch (action.type) {
    case Type.UPDATA_BOOKINGSHEETFOOD:
      return {
        ...state,
        BookingSheetFood: action.BookingSheetFood
      }
    case Type.UPDATA_ORDERID:
      return {
        ...state,
        orderId: action.orderId
      }
    case Type.UPDATA_TOTAL:
      console.log(121221212)
      return {
        ...state,
        total: action.total
      }
    default:
      return state
  }
}

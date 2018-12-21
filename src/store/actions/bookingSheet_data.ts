import { Action } from 'redux'
import { ShopCartSupplierBean } from '../../datasources/ShopCartSupplierBean'

export enum Type {
  UPDATA_BOOKINGSHEETFOOD = 'UPDATA_BOOKINGSHEETFOOD',
  UPDATA_ORDERID = 'UPDATA_ORDERID',
  UPDATA_TOTAL = 'UPDATA_TOTAL'
}

export interface BookingSheetAction extends Action {
  type: Type
  BookingSheetFood: Array<ShopCartSupplierBean>,
  orderId: number,
  total: string
}

export const updataBookingSheetFood = (shopCart?: Array<ShopCartSupplierBean>) =>
  (dispatch) => dispatch({
    type: Type.UPDATA_BOOKINGSHEETFOOD,
    BookingSheetFood: shopCart
  })

export const updataOrderId = (orderId: string) =>
  (dispatch) => dispatch({
    type: Type.UPDATA_ORDERID,
    orderId: orderId
  })
export const updataToTal = (total: number) =>
  (dispatch) => dispatch({
    type: Type.UPDATA_TOTAL,
    total: total
  })

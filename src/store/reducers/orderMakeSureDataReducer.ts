import { OrderMakeSureAction, Type } from '../actions/oderMakeSure-data'
import { OrderMakeSureBean } from '../../datasources/OrderMakeSureBean'

export interface OrderMakeSureData {
  OrderMakeSureData: OrderMakeSureBean,
  reload: boolean
}

const initialState: OrderMakeSureData = {
  OrderMakeSureData: {
    user: null,
    total: 0,
    addressData: null,
    supplier: []
  },
  reload: true
}

export default (state = initialState, action: OrderMakeSureAction) => {
  switch (action.type) {
    case Type.UPDATE_ORDERMAKESURE:
      console.log(11111)
      return {
        ...state,
        OrderMakeSureData: action.OrderMakeSureData
      }
    default:
      return state
  }
}

import { OrderMakeSureAction, Type } from '../actions/oderMakeSure_data'
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
    case Type.UPDATA_NEEDRELOAD:
      console.log('UPDATA_NEEDRELOAD')
      return {
        ...state,
        reload: action.reload
      }
    default:
      return state
  }
}

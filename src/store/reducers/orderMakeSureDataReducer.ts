import { OrderMakeSureAction, Type } from '../actions/oderMakeSure_data'
import { OrderMakeSureBean } from '../../datasources/OrderMakeSureBean'

export interface OrderMakeSureData {
  OrderMakeSureData: OrderMakeSureBean,
  reload: boolean
  update: boolean
}

const initialState: OrderMakeSureData = {
  OrderMakeSureData: {
    user: null,
    total: 0,
    addressData: null,
    supplier: []
  },
  reload: true,
  update: true
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
    case Type.UPDATE_ADDRESS:
      return{
        ...state,
        update: action.updateAddress
      }
    default:
      return state
  }
}

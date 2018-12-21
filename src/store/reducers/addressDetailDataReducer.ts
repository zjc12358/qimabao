import { AddressDetailAction, Type } from '../actions/address_detail_data'

export interface AddressDetailData {
  receivingId: number
}

const initialState: AddressDetailData = {
  receivingId: null
}

export default (state = initialState, action: AddressDetailAction) => {
  switch (action.type) {
    case Type.SET_ID:
      return {
        ...state,
        receivingId: action.receivingId
      }
    default:
      return state
  }
}

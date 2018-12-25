import { SupplierReviseAction, Type } from '../actions/supplierRevise_data'

export interface SupplierProductOrderData {
  productMsg: any
}

const initialState: SupplierProductOrderData = {
  productMsg: null
}

export default (state = initialState, action: SupplierReviseAction) => {
  switch (action.type) {
    case Type.UPDATE_PRODUCTMSG:
      return {
        ...state,
        productMsg: action.productMsg
      }
    default:
      return state
  }
}

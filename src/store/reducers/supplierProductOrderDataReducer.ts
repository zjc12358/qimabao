import { SupplierProductOrderAction, Type } from '../actions/SupplierProductOrder_data'
import { SupplierProductOrder } from '../../datasources/SupplierProductOrder'

export interface SupplierProductOrderData {
  SupplierProductOrderData: Array<SupplierProductOrder>
  index: number
  tab: number
}

const initialState: SupplierProductOrderData = {
  SupplierProductOrderData: [],
  index: 0,
  tab: 0
}

export default (state = initialState, action: SupplierProductOrderAction) => {
  switch (action.type) {
    case Type.UPDATE_SUPPLIERPRODUCTORDER:
      return {
        ...state,
        SupplierProductOrderData: action.SupplierProductOrderData
      }
    case Type.CHANGE_TAB:
      return{
        ...state,
        tab: action.tab
      }
    case Type.CHANGE_INDEX:
      return{
        ...state,
        index: action.index
      }
    default:
      return state
  }
}

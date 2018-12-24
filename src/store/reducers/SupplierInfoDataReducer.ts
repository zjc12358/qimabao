import { SupplierStateInfoBean } from '../../datasources/SupplierStateInfoBean'
import { SupplierInfoAction, Type } from '../actions/supplier_info_data'

export interface SupplierInfoData {
  supplierStateInfo: SupplierStateInfoBean
  businessState: 'Y' | 'N'
  appointmentState: 'Y' | 'N'
}

const initialState: SupplierInfoData = {
  supplierStateInfo: {
    create_time: '',
    evaluate_id: 0,
    mode: '',
    status: '',
    supplier_appointment: 'N',
    supplier_description_service: '',
    supplier_icon: '',
    supplier_id: 0,
    supplier_iphone: '',
    supplier_logistics_service: '',
    supplier_name: '',
    supplier_normal_business: 'Y',
    supplier_service_attitude: '',
    supplier_user_name: '',
    update_time: '',
    user_id: 0
  },
  businessState: 'Y',
  appointmentState: 'N'
}

export default (state = initialState, action: SupplierInfoAction) => {
  switch (action.type) {
    case Type.UPDATE_S_INFO:
      return {
        ...state,
        supplierStateInfo: action.supplierStateInfo
      }
    case Type.UPDATE_BUSINESS_STATES:
      return{
        ...state,
        businessState: action.businessState
      }
    case Type.UPDATE_APPOINTMENT_STATES:
      return{
        ...state,
        appointmentState: action.appointmentState
      }
    default:
      return state
  }
}

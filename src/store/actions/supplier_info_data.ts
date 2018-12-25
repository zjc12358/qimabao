import { Action } from 'redux'
import { SupplierStateInfoBean } from '../../datasources/SupplierStateInfoBean'

export enum Type {
  UPDATE_S_INFO = 'UPDATE_S_INFO',
  UPDATE_BUSINESS_STATES = 'UPDATE_S_STATES',
  UPDATE_APPOINTMENT_STATES = 'UPDATE_APPOINTMENT_STATES'
}

export interface SupplierInfoAction extends Action {
  type: Type
  supplierStateInfo: SupplierStateInfoBean
  supplierOrderInfo: any
  supplierProductInfo: any
  businessState: 'Y' | 'N'
  appointmentState: 'Y' | 'N'
}

export const updateSupplierInfo = (supplierStateInfo: SupplierStateInfoBean) =>
  (dispatch) => dispatch({
    type: Type.UPDATE_S_INFO,
    supplierStateInfo: supplierStateInfo
  })

export const updateBusinessState = (state: 'Y' | 'N') =>
  (dispatch) => dispatch({
    type: Type.UPDATE_BUSINESS_STATES,
    businessState: state
  })

export const updateAppointmentState = (state: 'Y' | 'N') =>
  (dispatch) => dispatch({
    type: Type.UPDATE_APPOINTMENT_STATES,
    appointmentState: state
  })

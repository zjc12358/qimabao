import { Action } from 'redux'
import { SupplierStateInfoBean } from '../../datasources/SupplierStateInfoBean'

export enum Type {

}

export interface SupplierInfoAction extends Action {
  type: Type
  supplierStateInfo: SupplierStateInfoBean
  supplierOrderInfo: any
  supplierProductInfo: any
}

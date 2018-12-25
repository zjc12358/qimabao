import { ShopCartSupplierBean } from './ShopCartSupplierBean'
import { MenuSupplierBean } from '@datasources/MenuSupplierBean'

export interface MenuDetailBean {
  menu_id: number
  resultVO: Array<MenuSupplierBean>
  menu_detail: string
}

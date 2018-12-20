import { ShopCartSupplierBean } from './ShopCartSupplierBean'
import { MenuSupplierBean } from '@datasources/MenuSupplierBean'

export interface MenuDetailBean {
  total: number
  menuSupplierList: Array<MenuSupplierBean>
  name: string
}

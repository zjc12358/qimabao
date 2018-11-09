import { ShopCartSupplierBean } from './ShopCartSupplierBean'

export interface MenuDetailBean {
  total: number
  storeList: Array<ShopCartSupplierBean>
  name: string
}

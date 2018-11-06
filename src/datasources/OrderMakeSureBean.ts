import { ShopCartSupplierBean } from './ShopCartSupplierBean'

export interface OrderMakeSureBean {
  user: object,
  total: number,
  addressData: object,
  supplier: Array<ShopCartSupplierBean>
}

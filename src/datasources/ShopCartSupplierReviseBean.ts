import { ShopCartSupplierReviseNowSupplierBean } from './ShopCartSupplierReviseNowSupplierBean'
import { ShopCartSupplierReviseOtherSupplierBean } from './ShopCartSupplierReviseOtherSupplierBean'

export interface ShopCartSupplierReviseBean {
  id: number,
  name: string,
  price: number,
  count: number,
  img: string,
  unit: string,
  nowSupplierMsg: ShopCartSupplierReviseNowSupplierBean,
  otherSupplierList: Array<ShopCartSupplierReviseOtherSupplierBean>
}

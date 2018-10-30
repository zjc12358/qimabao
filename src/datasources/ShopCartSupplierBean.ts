import { ShopCartProductBean } from './ShopCartProductBean'

export interface ShopCartSupplierBean {
  name: string,
  allChecked: boolean,
  foodList: Array<ShopCartProductBean>
}

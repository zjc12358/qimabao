import { ShopCartProductBean } from './ShopCartProductBean'

export interface ShopCartSupplierBean {
  supplier_id: number,
  company_name: string,
  allChecked: boolean,
  shoppingCartDetails: Array<ShopCartProductBean>
}

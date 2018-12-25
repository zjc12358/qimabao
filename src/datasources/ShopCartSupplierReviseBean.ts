import { ShopCartSupplierReviseOtherSupplierFoodBean } from '@datasources/ShopCartSupplierReviseOtherSupplierFoodBean'

export interface ShopCartSupplierReviseBean {
  cart_id: number,
  user_id: number,
  product_id: number,
  supplier_id: number,
  product_name: string,
  product_price: number,
  product_weight: string,
  product_total_price: number,
  product_icon: string,
  company_name: string,
  shoppingCartList: Array<ShopCartSupplierReviseOtherSupplierFoodBean>
}

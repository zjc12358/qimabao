import { MenuProductBean } from './MenuProductBean'

export interface MenuSupplierBean {
  supplier_id: number
  company_name: string
  menuBasketList: Array<MenuProductBean>
}

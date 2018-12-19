import { MenuProductInfoBean } from '@datasources/MenuProductInfoBean'

export interface MenuInfoListBean {
  menu_id: number
  menu_detail: string
  menuBasketList: Array<MenuProductInfoBean>
  isCheck: boolean
  isShow: boolean
}

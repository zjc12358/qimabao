import { ProductBean } from './ProductBean'

export interface MenuBean {
  productList: Array<ProductBean>
  productNameList: Array<string>
  menuName: string
  isShow: boolean
  isCheck: boolean
  id: number
}

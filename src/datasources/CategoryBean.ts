import { SecondCategoryBean } from './SecondCategoryBean'

export interface CategoryBean {
  category_id: number
  category_name: string
  category_picture: string
  productCategoryClassList: Array<SecondCategoryBean>
  show: boolean
}

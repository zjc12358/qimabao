import { PicBean } from '@datasources/PicBean'
import { EvaluationBean } from '@datasources/EvaluationBean'

export interface ProductDetailBean {
  product_id: number
  product_name: string
  product_price: number
  product_weight: string
  product_describe: string
  product_sales: number
  product_inventory: number
  product_origin: string
  product_evaluation_number: number
  product_evaluation_item: EvaluationBean
  product_bottom_pic: Array<PicBean>
}

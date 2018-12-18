import { PicBean } from '@datasources/PicBean'
import { EvaluationBean } from '@datasources/EvaluationBean'

export interface ProductDetailBean {
  category_class_id: number // 二级类目ID
  category_id: number
  product_id: number
  product_icon: string
  product_label: string // 商品标签
  product_name: string
  product_price: number
  product_status: number // 商品状态
  product_weight: string
  product_stock: number // 商品库存
  product_description: string
  product_volume: number // 商品销量
  product_inventory: number
  product_origin: string
  product_collect: boolean
  product_evaluation_number: number
  product_evaluation_item: EvaluationBean
  product_bottom_pic: Array<PicBean>
  supplier_id: number // 供应商id
}

export interface ProductBean {
  category_id?: number // 一级类目ID
  category_class_id?: number // 二级类目ID
  product_description: string // 商品描述
  product_icon: string
  product_id: number
  product_label?: string // 商品标签
  product_name: string
  product_status?: number // 商品状态
  product_stock?: number // 商品库存
  product_volume?: number // 商品销量
  supplier_id: number // 供应商id
  supplier_name: string
  product_price: number
  product_weight: string // 商品份量
  userId?: number // 用户id
}

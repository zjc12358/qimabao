export interface SupplierStateInfoBean {
  create_time: string // 创建时间
  evaluate_id: number // 评论Id
  mode: string // ?
  status: string // 状态
  supplier_appointment: 'Y' | 'N' // 是否接受预约
  supplier_description_service: string // 描述符合分
  supplier_icon: string // 供货商头像
  supplier_id: number // 供货商Id
  supplier_iphone: string // 供货商手机号
  supplier_logistics_service: string // 物流服务分
  supplier_name: string //  供货商公司名称
  supplier_normal_business: 'Y' | 'N'  // 是否正常营业 Y/N
  supplier_service_attitude: string // 服务态度分
  supplier_user_name: string // 供货商名称
  update_time: string // 修改时间
  user_id: number  // 用户Id
}

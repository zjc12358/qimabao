export interface AddressDetailBean {
  id: string // 唯一ID
  name: string // 名称 (地址标题)    这2个显示
  address: string // 地址 (地址详情)
  type: string // 兴趣点类型 顺序为大类、中类、小类 例如：餐饮服务;中餐厅;特色/地方风味餐厅
  typecode: string // 兴趣点类型编码 例如：050118
  biz_type: any // 行业类型
  location: string // 经纬度 格式：X,Y
  distance: any // 离中心点距离 单位：米 必须说明， 此结果仅在周边搜索的时候有值
}

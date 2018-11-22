export interface AddressListBean {
  status: 0 | 1 // 0：请求失败；1：请求成功
  info: string // status为0时，info返回错误原因，否则返回“OK”。详情参阅info状态表
  count: number // 搜索方案数目(最大值为1000)
  suggestion: any // 当用户输入的词语为泛搜索词的时候，将显示城市列表
}

export interface LoginBean {
  userId: string
  token: string
  jsticket: string,
  signature: string,
  nonceStr: string,
  timeStamp: string,
  corpId: string,
  agentId: string // 企业自建应用，agentId可以不传
}

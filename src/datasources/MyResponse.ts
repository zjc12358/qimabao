export interface MyResponse<T> {
  code: number
  data: T
  msg: string
  count: number
}

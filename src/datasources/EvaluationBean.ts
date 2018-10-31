import { PicBean } from './PicBean'

export interface EvaluationBean {
  head: string
  name: string
  evaluation: string
  start: number
  date: string
  pic_list: Array<PicBean>
}

import { Action } from 'redux'

export enum Type {
  UPDATA_CATEGORYID = 'UPDATA_CATEGORYID',
  UPDATA_CATEGORYCLASSID = 'UPDATA_CATEGORYCLASSID',
  UPDATA_PRODUCTDESCRIPTION = 'UPDATA_PRODUCTDESCRIPTION',
  SAVE_PRODUCTMSG = 'SAVE_PRODUCTMSG'
}

export interface ReleaseAction extends Action {
  type: Type
  categoryId: number
  categoryClassId: number
  categoryName: string
  productDescription: string,
  productMsg: any
}

export const updataCategoryId = (categoryId: number) =>
  (dispatch) => dispatch({
    type: Type.UPDATA_CATEGORYID,
    categoryId: categoryId
  })

export const updataCategoryClassId = (categoryClassId: number, categoryName: string) =>
  (dispatch) => dispatch({
    type: Type.UPDATA_CATEGORYCLASSID,
    categoryClassId: categoryClassId,
    categoryName: categoryName
  })

export const updataProductDescription = (productDescription: string) =>
  (dispatch) => dispatch({
    type: Type.UPDATA_PRODUCTDESCRIPTION,
    productDescription: productDescription
  })

export const saveProductMsg = (productMsg: any) =>
  (dispatch) => dispatch({
    type: Type.SAVE_PRODUCTMSG,
    productMsg: productMsg
  })

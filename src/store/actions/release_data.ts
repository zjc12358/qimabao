import { Action } from 'redux'

export enum Type {
  UPDATA_CATEGORYID = 'UPDATA_CATEGORYID',
  UPDATA_CATEGORYCLASSID = 'UPDATA_CATEGORYCLASSID',
  UPDATA_PRODUCTDESCRIPTION = 'UPDATA_PRODUCTDESCRIPTION'
}

export interface ReleaseAction extends Action {
  type: Type
  categoryId: number
  categoryClassId: number
  productDescription: string
}

export const updataCategoryId = (categoryId: number) =>
  (dispatch) => dispatch({
    type: Type.UPDATA_CATEGORYID,
    categoryId: categoryId
  })

export const updataCategoryClassId = (categoryClassId: number) =>
  (dispatch) => dispatch({
    type: Type.UPDATA_CATEGORYCLASSID,
    categoryClassId: categoryClassId
  })

export const updataProductDescription = (productDescription: string) =>
  (dispatch) => dispatch({
    type: Type.UPDATA_PRODUCTDESCRIPTION,
    productDescription: productDescription
  })

import { Action } from 'redux'
import { HomeCategoryItemBean } from '../../datasources/HomeCategoryItemBean'

export enum Type {
  UPDATE_CATEGORYITEM = 'UPDATE_CATEGORYITEM',
  CHANGE_INDEX = 'CHANGE_INDEX'
}

export interface CategoryItemAction extends Action {
  type: Type
  categoryItemData: Array<HomeCategoryItemBean>
  index: number
}

export const updateCategoryItem = (categoryItem: Array<HomeCategoryItemBean>, index: number) =>
  (dispatch) => dispatch({
    type: Type.UPDATE_CATEGORYITEM,
    categoryItemData: categoryItem,
    index: index
  })

export const changeCategoryIndex = (index: number) =>
  (dispatch) => dispatch({
    type: Type.CHANGE_INDEX,
    index: index
  })

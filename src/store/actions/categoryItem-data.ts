import { Action } from 'redux'
import { HomeCategoryItemBean } from '../../datasources/HomeCategoryItemBean'

export enum Type {
  UPDATE_CATEGORYITEM = 'UPDATE_CATEGORYITEM'
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

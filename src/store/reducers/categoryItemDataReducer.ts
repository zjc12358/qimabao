import { CategoryItemAction, Type } from '../actions/categoryItem_data'
import { HomeCategoryItemBean } from '@datasources/HomeCategoryItemBean'

export interface CategoryItemData {
  categoryItemData: Array<HomeCategoryItemBean>
  index: number
}

const initialState: CategoryItemData = {
  categoryItemData: [
    {
      category_id: 0,
      category_name: '类别0',
      category_picture: '0',
      show: false
    }
  ],
  index: 0
}

export default (state = initialState, action: CategoryItemAction) => {
  switch (action.type) {
    case Type.UPDATE_CATEGORYITEM:
      return {
        ...state,
        categoryItemData: action.categoryItemData,
        index: action.index
      }
    case Type.CHANGE_INDEX:
      return{
        ...state,
        index: action.index
      }
    default:
      return state
  }
}

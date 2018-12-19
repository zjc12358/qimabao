import { MenuAction, Type } from '../actions/menu_data'
import { MenuInfoListBean } from '@datasources/MenuInfoListBean'

export interface MenuData {
  selectMenu: boolean
  reload: boolean
  menuList: Array<MenuInfoListBean>
}

const initialState: MenuData = {
  selectMenu: false,
  reload: true,
  menuList: []
}

export default (state = initialState, action: MenuAction) => {
  switch (action.type) {
    case Type.CHANGE_MENU_STATE:
      return {
        ...state,
        selectMenu: action.selectMenu
      }
    case Type.UPDATE_MENU_LIST:
      return {
        ...state,
        menuList: action.menuList
      }
    case Type.SET_RELOAD:
      return {
        ...state,
        reload: action.reload
      }
    default:
      return state
  }
}

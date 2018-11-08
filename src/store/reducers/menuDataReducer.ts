import { MenuAction, Type } from '../actions/menu_data'

export interface MenuData {
  selectMenu: boolean
}

const initialState: MenuData = {
  selectMenu: false
}

export default (state = initialState, action: MenuAction) => {
  switch (action.type) {
    case Type.CHANGE_MENU_STATE:
      return {
        ...state,
        selectMenu: action.selectMenu
      }
    default:
      return state
  }
}

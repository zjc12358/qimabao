import { Action } from 'redux'

export enum Type {
  CHANGE_MENU_STATE = 'CHANGE_MENU_STATE'
}

export interface MenuAction extends Action {
  type: Type
  selectMenu: boolean
}

export const changeMenuState = (selectMenu: boolean) =>
  (dispatch) => dispatch({
    type: Type.CHANGE_MENU_STATE,
    selectMenu: selectMenu
  })

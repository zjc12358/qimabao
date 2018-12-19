import { Action } from 'redux'
import { MenuInfoListBean } from '@datasources/MenuInfoListBean'

export enum Type {
  CHANGE_MENU_STATE = 'CHANGE_MENU_STATE',
  UPDATE_MENU_LIST = 'UPDATE_MENU_LIST',
  SET_RELOAD = 'SET_RELOAD'
}

export interface MenuAction extends Action {
  type: Type
  selectMenu: boolean,
  menuList: Array<MenuInfoListBean>
  reload: boolean
}

export const changeMenuState = (selectMenu: boolean) =>
  (dispatch) => dispatch({
    type: Type.CHANGE_MENU_STATE,
    selectMenu: selectMenu
  })

export const updateMenuList = (menuList: Array<MenuInfoListBean>) =>
  (dispatch) => dispatch({
    type: Type.UPDATE_MENU_LIST,
    menuList: menuList
  })

export const setReload = (reload: boolean) =>
  (dispatch) => dispatch({
    type: Type.SET_RELOAD,
    reload: reload
  })

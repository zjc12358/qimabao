import { Action } from 'redux'
import { UserInfo } from '@datasources/UserInfo'

export enum Type {
  UPDATE_USERINFO = 'UPDATE_USERINFO',
  UPDATE_PAGE = 'UPDATE_PAGE',
  ADD_PAGEINDEX = 'ADD_PAGEINDEX',
  DELETE_PAGEINDEX = 'DELETE_PAGEINDEX',
  CHANGE_MODE = 'CHANGE_MODE',
  SET_ID = 'SET_ID'
}

export interface GlobalDataAction extends Action {
  id: number
  type: Type
  mode: 'supplier' | 'purchaser'
  userInfo: UserInfo
  pageIndex: number
  pageTab: string
  error?: any
  fetchFlag?: boolean // 传递是否loading状态
}

export const setID = (id: number) =>
  (dispatch) => dispatch({ type: Type.SET_ID, id })

export const updateUserInfo = (userInfo: UserInfo) =>
  (dispatch) => dispatch({ type: Type.UPDATE_USERINFO, userInfo })

export const addPageIndex = (pageIndex: number) =>
  (dispatch) => dispatch({ type: Type.ADD_PAGEINDEX, pageIndex })

export const deletePageIndex = (pageIndex: number) =>
  (dispatch) => dispatch({ type: Type.DELETE_PAGEINDEX, pageIndex })

export const updatePageTab = (pageTab: string) =>
  (dispatch) => dispatch({ type: Type.UPDATE_PAGE, pageTab })

export const changeMode = (mode: 'supplier' | 'purchaser') =>
  (dispatch) => dispatch({ type: Type.CHANGE_MODE, mode })

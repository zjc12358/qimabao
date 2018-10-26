import { Action } from 'redux'
import { UserInfo } from '@datasources/UserInfo'
import { PageTab } from '@datasources/PageTab'

export enum Type {
  UPDATE_USERINFO = 'UPDATE_USERINFO',
  UPDATE_PAGE = 'UPDATE_PAGE',
  ADD_PAGEINDEX = 'ADD_PAGEINDEX',
  DELETE_PAGEINDEX = 'DELETE_PAGEINDEX'
}

export interface GlobalDataAction extends Action {
  type: Type
  userInfo: UserInfo
  pageIndex: number
  pageTab: PageTab
  error?: any
  fetchFlag?: boolean // 传递是否loading状态
}

export const updateUserInfo = (userInfo: UserInfo) =>
  (dispatch) => dispatch({ type: Type.UPDATE_USERINFO, userInfo })

export const addPageIndex = (pageIndex: number) =>
  (dispatch) => dispatch({ type: Type.ADD_PAGEINDEX, pageIndex })

export const deletePageIndex = (pageIndex: number) =>
  (dispatch) => dispatch({ type: Type.DELETE_PAGEINDEX, pageIndex })

export const updatePageTab = (pageTab: PageTab) =>
  (dispatch) => dispatch({ type: Type.UPDATE_PAGE, pageTab })

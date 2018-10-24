import { Action } from 'redux'
import { UserInfo } from '@datasources/UserInfo'

export enum Type {
  UPDATE_USERINFO = 'UPDATE_USERINFO',
  ADD_PAGEINDEX = 'ADD_PAGEINDEX',
  DELETE_PAGEINDEX = 'DELETE_PAGEINDEX'
}

export interface GlobalDataAction extends Action {
  type: Type
  pageIndex: number
  response?: any
  error?: any
  fetchFlag?: boolean // 传递是否loading状态
}

export const upateUserInfo = (userInfo: UserInfo) =>
  (dispatch) => dispatch({ type: Type.UPDATE_USERINFO, userInfo })

export const addPageIndex = (pageIndex: number) =>
  (dispatch) => dispatch({ type: Type.ADD_PAGEINDEX, pageIndex })

export const deletePageIndex = (pageIndex: number) =>
  (dispatch) => dispatch({ type: Type.DELETE_PAGEINDEX, pageIndex })

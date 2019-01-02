import { Action } from 'redux'
import { UserInfo } from '@datasources/UserInfo'

export enum Type {
  UPDATE_USERINFO = 'UPDATE_USERINFO',
  UPDATE_PAGE = 'UPDATE_PAGE',
  ADD_PAGEINDEX = 'ADD_PAGEINDEX',
  DELETE_PAGEINDEX = 'DELETE_PAGEINDEX',
  CHANGE_MODE = 'CHANGE_MODE',
  SET_ID = 'SET_ID',
  SET_PHONE = 'SET_PHONE',
  SET_IPHONE = 'SET_IPHONE',
  UPDATEUSERNAME = 'UPDATEUSERNAME',
  UPDATEUSERSEX = 'UPDATEUSERSEX',
  SET_DD_CONFIG = 'SET_DD_CONFIG'
}

export interface GlobalDataAction extends Action {
  id: number
  type: Type
  mode: 'supplier' | 'purchaser'
  userInfo: UserInfo
  name: string
  sex: string
  phone: string
  iphone: string
  pageIndex: number
  pageTab: string
  error?: any
  fetchFlag?: boolean // 传递是否loading状态
  agentId: string
  corpId: string
  timeStamp: string
  nonceStr: string
  signature: string
}

export const setID = (id: number) =>
  (dispatch) => dispatch({ type: Type.SET_ID, id })

export const updateUserInfo = (userInfo: UserInfo) =>
  (dispatch) => dispatch({ type: Type.UPDATE_USERINFO, userInfo })

export const updateUserName = (name: string) =>
  (dispatch) => dispatch({ type: Type.UPDATEUSERNAME, name })

export const updateUserSex = (sex: string) =>
  (dispatch) => dispatch({ type: Type.UPDATEUSERSEX, sex })

export const addPageIndex = (pageIndex: number) =>
  (dispatch) => dispatch({ type: Type.ADD_PAGEINDEX, pageIndex })

export const deletePageIndex = (pageIndex: number) =>
  (dispatch) => dispatch({ type: Type.DELETE_PAGEINDEX, pageIndex })

export const updatePageTab = (pageTab: string) =>
  (dispatch) => dispatch({ type: Type.UPDATE_PAGE, pageTab })

export const changeMode = (mode: 'supplier' | 'purchaser') =>
  (dispatch) => dispatch({ type: Type.CHANGE_MODE, mode })

export const setPhone = (phone: string) =>
  (dispatch) => dispatch({ type: Type.SET_PHONE, phone })

export const setIPhone = (iphone: string) =>
  (dispatch) => dispatch({ type: Type.SET_IPHONE, iphone })

/**
 * 保存钉钉鉴权信息
 * @param agentId
 * @param corpId
 * @param timeStamp
 * @param nonceStr
 * @param signature
 */
export const setDDConfig = (agentId: string, corpId: string, timeStamp: string,
                            nonceStr: string, signature: string) =>
  (dispatch) => dispatch({
    type: Type.SET_DD_CONFIG,
    agentId: agentId,
    corpId: corpId,
    timeStamp: timeStamp,
    nonceStr: nonceStr,
    signature: signature
  })

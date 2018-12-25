import { GlobalDataAction, Type } from '../actions/global_data'
import { UserInfo } from '@datasources/UserInfo'

export interface GlobalData {
  id: number
  userInfo: UserInfo
  phone: string
  iphone: string
  pageTab: string
  isFetching: boolean
  pageIndex: number
  mode: 'supplier' | 'purchaser'
  errMsg?: string // update form date error message
}

const initialState: GlobalData = {
  userInfo: {} as UserInfo,
  id: 0,
  phone: '',
  iphone: '',
  mode: 'purchaser',
  pageTab: 'HomePageTabBar',
  isFetching: false,
  pageIndex: 0,
  errMsg: ''
}

export default (state = initialState, action: GlobalDataAction) => {
  switch (action.type) {
    case Type.SET_ID:
      return {
        ...state,
        id: action.id
      }
    case Type.UPDATE_USERINFO:
      return {
        ...state,
        userInfo: action.userInfo
      }
    case Type.UPDATE_PAGE:
      return {
        ...state,
        pageTab: action.pageTab
      }
    case Type.ADD_PAGEINDEX:
      console.log('xxx', action.pageIndex)
      return {
        ...state,
        pageIndex: action.pageIndex + 1
      }
    case Type.DELETE_PAGEINDEX:
      console.log('xxx', action.pageIndex)
      return {
        ...state,
        pageIndex: action.pageIndex - 1
      }
    case Type.CHANGE_MODE:
      return {
        ...state,
        mode: action.mode
      }
    case Type.SET_PHONE:
      return {
        ...state,
        phone: action.phone
      }
    case Type.SET_IPHONE:
      return {
        ...state,
        iphone: action.iphone
      }
    default:
      return state
  }
}

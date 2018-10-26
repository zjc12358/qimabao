import { GlobalDataAction, Type } from '../actions/global-data'
import { UserInfo } from '@datasources/UserInfo'
import { PageTab } from '@datasources/PageTab'

export interface GlobalData {
  userInfo: UserInfo
  pageTab: PageTab
  isFetching: boolean
  pageIndex: number
  errMsg?: string // update form date error message
}

const initialState: GlobalData = {
  userInfo: {} as UserInfo,
  pageTab: {} as PageTab,
  isFetching: false,
  pageIndex: 0,
  errMsg: ''
}

export default (state = initialState, action: GlobalDataAction) => {
  switch (action.type) {
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
    default:
      return state
  }
}

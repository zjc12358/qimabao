import { MenuDetailAction, Type } from '../actions/menuDetail_data'

export interface MenuDetailData {
  id: number
}

const initialState: MenuDetailData = {
  id: 0
}

export default (state = initialState, action: MenuDetailAction) => {
  switch (action.type) {
    case Type.SET_ID:
      return {
        ...state,
        id: action.id
      }
    default :
      return state
  }
}

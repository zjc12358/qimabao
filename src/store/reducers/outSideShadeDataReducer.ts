import { OutSideShadeAction, Type } from '../actions/outSideShade_data'

export interface OutSideShadeData {
  showShade: boolean
}

const initialState: OutSideShadeData = {
  showShade: false
}

export default (state = initialState, action: OutSideShadeAction) => {
  switch (action.type) {
    case Type.SHOW_SHADE:
      return {
        ...state,
        showShade: action.showShade
      }
    default:
      return state
  }
}

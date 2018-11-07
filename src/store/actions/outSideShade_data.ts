import { Action } from 'redux'

export enum Type {
  SHOW_SHADE = 'SHOW_SHADE'
}

export interface OutSideShadeAction extends Action {
  type: Type,
  showShade: boolean
}

export const showShade = (isShow: boolean) =>
  (dispatch) => dispatch({ type: Type.SHOW_SHADE, showShade: isShow })

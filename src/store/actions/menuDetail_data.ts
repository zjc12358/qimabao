import { Action } from 'redux'

export enum Type {
  SET_ID = 'SET_ID'
}

export interface MenuDetailAction extends Action {
  type: Type
  id: number
}

export const setMenuId = (id: number) =>
  (dispatch) => dispatch({
    type: Type.SET_ID,
    id: id
  })

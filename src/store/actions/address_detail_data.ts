import { Action } from 'redux'

export enum Type {
  SET_ID = 'SET_ID'
}

export interface AddressDetailAction extends Action {
  type: Type
  receivingId: number
}

export const setId = (receivingId: number) =>
  (dispatch) => dispatch({
    type: Type.SET_ID,
    receivingId: receivingId
  })

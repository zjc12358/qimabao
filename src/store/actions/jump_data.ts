import { Action } from 'redux'

export enum Type {
  JUMP_ORDER = 'JUMP_ORDER'
}

export interface JumpAction extends Action {
  type: Type
  jumpOrder: boolean
}

/**
 * 跳转到订单
 * @param go
 */
export const jumpToOrder = (go: boolean) =>
  (dispatch) => dispatch({
    type: Type.JUMP_ORDER,
    jumpOrder: go
  })

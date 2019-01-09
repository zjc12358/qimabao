import { JumpAction, Type } from '../actions/jump_data'

export interface JumpData {
  jumpOrder: boolean
}

const initialState: JumpData = {
  jumpOrder: false
}

export default (state = initialState, action: JumpAction) => {
  switch (action.type) {
    case Type.JUMP_ORDER:
      return {
        ...state,
        jumpOrder: action.jumpOrder
      }
    default:
      return state
  }
}

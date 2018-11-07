import { ShopCartTestAction, Type } from '../actions/shopCartTest-data'
import { ShopCartTestBean } from '@datasources/ShopCartTestBean'

export interface ShopCartTestDate {
  ShopCartTestDate: ShopCartTestBean
}

const initialState: ShopCartTestDate = {
  ShopCartTestDate: {
    name: '张三',
    img: '',
    price: 0,
    unit: '',
    count: 0
  }
}

export default (state = initialState, action: ShopCartTestAction) => {
  switch (action.type) {
    case Type.UPDATE_ShopCartTest:
      console.log(11111)
      return {
        ...state,
        ShopCartTestDate: action.ShopCartTestDate
      }
    default:
      return state
  }
}

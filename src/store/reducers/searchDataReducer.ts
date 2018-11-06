import { Type, SearchAction } from '../actions/search_data'

export interface SearchData {
  searchText: string
}

const initialState: SearchData = {
  searchText: ''
}

export default (state = initialState, action: SearchAction) => {
  switch (action.type) {
    case Type.UPDATE_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.searchText
      }
    default:
      return state
  }
}

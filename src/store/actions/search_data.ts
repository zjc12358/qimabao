import { Action } from 'redux'

export enum Type {
  UPDATE_SEARCH_TEXT = 'UPDATE_SEARCH_TEXT'
}

export interface SearchAction extends Action {
  type: Type,
  searchText: string
}

export const updateSearchText = (text: string) =>
  (dispatch) => dispatch({ type: Type.UPDATE_SEARCH_TEXT, searchText: text })

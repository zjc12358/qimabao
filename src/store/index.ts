
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'

export default (initialState?: any) => {
  const middleware = applyMiddleware(reduxThunk)
  const store = createStore(reducers, initialState, middleware)
  return { store }
}

import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
export default (function (initialState) {
    var middleware = applyMiddleware(reduxThunk);
    var store = createStore(reducers, initialState, middleware);
    return { store: store };
});
//# sourceMappingURL=index.js.map
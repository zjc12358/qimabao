var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Type } from '../actions/global-data';
var initialState = {
    userInfo: {},
    isFetching: false,
    pageIndex: 0,
    errMsg: ''
};
export default (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Type.UPDATE_USERINFO:
            return __assign({}, state, { userInfo: action.response });
        case Type.ADD_PAGEINDEX:
            console.log('xxx', action.pageIndex);
            return __assign({}, state, { pageIndex: action.pageIndex + 1 });
        case Type.DELETE_PAGEINDEX:
            console.log('xxx', action.pageIndex);
            return __assign({}, state, { pageIndex: action.pageIndex - 1 });
        default:
            return state;
    }
});
//# sourceMappingURL=globalDataReducer.js.map
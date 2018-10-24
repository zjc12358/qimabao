export var Type;
(function (Type) {
    Type["UPDATE_USERINFO"] = "UPDATE_USERINFO";
    Type["ADD_PAGEINDEX"] = "ADD_PAGEINDEX";
    Type["DELETE_PAGEINDEX"] = "DELETE_PAGEINDEX";
})(Type || (Type = {}));
export var upateUserInfo = function (userInfo) {
    return function (dispatch) { return dispatch({ type: Type.UPDATE_USERINFO, userInfo: userInfo }); };
};
export var addPageIndex = function (pageIndex) {
    return function (dispatch) { return dispatch({ type: Type.ADD_PAGEINDEX, pageIndex: pageIndex }); };
};
export var deletePageIndex = function (pageIndex) {
    return function (dispatch) { return dispatch({ type: Type.DELETE_PAGEINDEX, pageIndex: pageIndex }); };
};
//# sourceMappingURL=global-data.js.map
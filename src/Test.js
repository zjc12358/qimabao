var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { addPageIndex, deletePageIndex } from '@store/actions/global-data';
var Test = /** @class */ (function (_super) {
    __extends(Test, _super);
    function Test(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            collapsed: false
        };
        return _this;
    }
    Test.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { style: { flex: 1 } },
            React.createElement("span", null, "\u6D4B\u8BD5Redux"),
            React.createElement(Button, { onClick: function () { return _this.props.deletePageIndex(_this.props.globalData.pageIndex); } }, "\u4E0A\u4E00\u9875"),
            React.createElement(Button, { onClick: function () { return _this.props.addPageIndex(_this.props.globalData.pageIndex); } }, "\u4E0B\u4E00\u9875"),
            React.createElement("span", null, this.props.globalData.pageIndex)));
    };
    return Test;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        globalData: state.globalData
    };
};
var mapDispatchToProps = {
    addPageIndex: addPageIndex,
    deletePageIndex: deletePageIndex
};
export default connect(mapStateToProps, mapDispatchToProps)(Test);
//# sourceMappingURL=Test.js.map
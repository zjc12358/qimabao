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
import { connect } from 'react-redux';
var History = /** @class */ (function (_super) {
    __extends(History, _super);
    function History(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    History.prototype.render = function () {
        return (React.createElement("div", null, "Hello History"));
    };
    return History;
}(React.Component));
var mapStateToProps = function (state) {
    return {};
};
var mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(History);
//# sourceMappingURL=index.js.map
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
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(props) {
        var _this = _super.call(this, props) || this;
        _this.renderHead = function () {
            return (React.createElement("div", { style: {
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    overflowY: 'hidden',
                    backgroundColor: '#0084E7'
                } }));
        };
        _this.state = {};
        return _this;
    }
    User.prototype.render = function () {
        return (React.createElement("div", null, this.renderHead()));
    };
    return User;
}(React.Component));
var mapStateToProps = function (state) {
    return {};
};
var mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(User);
//# sourceMappingURL=index.js.map
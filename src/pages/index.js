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
import { TabBar } from 'antd-mobile';
import ReactSVG from 'react-svg';
import Home from '@pages/Home';
import Order from '@pages/Order';
import History from '@pages/History';
import User from '@pages/User';
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.onTabBarSelectChange = function (tabBarName) {
            var pageContent;
            switch (tabBarName) {
                case 'HomePageTabBar':
                    pageContent = _this.renderHomePage(); // 首页
                    break;
                case 'OrderPageTabBar':
                    pageContent = _this.renderOrderPage(); // 订单页面
                    break;
                case 'HistoryPageTabBar':
                    pageContent = _this.renderHistoryPage(); // 历史页面
                    break;
                default:
                    pageContent = _this.renderUserCenter(); // 用户中心页面
                    break;
            }
            _this.setState({
                selectedTabBar: tabBarName,
                pageContent: pageContent
            });
        };
        _this.renderHomePage = function () {
            return (React.createElement(Home, null));
        };
        _this.renderOrderPage = function () {
            return (React.createElement(Order, null));
        };
        _this.renderHistoryPage = function () {
            return (React.createElement(History, null));
        };
        _this.renderUserCenter = function () {
            return (React.createElement(User, null));
        };
        _this.state = {
            selectedTabBar: 'HomePageTabBar',
            pageContent: null,
            hidden: false
        };
        return _this;
    }
    App.prototype.componentDidMount = function () {
        this.setState({ pageContent: this.renderHomePage() });
    };
    App.prototype.renderTabBar = function () {
        var _this = this;
        return (React.createElement(TabBar, { unselectedTintColor: '#949494', tintColor: '#d91d37', barTintColor: '#262626', hidden: this.state.hidden, prerenderingSiblingsNumber: 0 },
            React.createElement(TabBar.Item, { title: '\u9996\u9875', key: 'HomePage', icon: React.createElement(ReactSVG, { path: './assets/images/foot_home.svg', svgStyle: { width: 22, height: 22 } }), selectedIcon: React.createElement(ReactSVG, { path: './assets/images/foot_home_on.svg', svgStyle: { width: 22, height: 22 } }), selected: this.state.selectedTabBar === 'HomePageTabBar', onPress: function () { return _this.onTabBarSelectChange('HomePageTabBar'); } }, this.state.pageContent),
            React.createElement(TabBar.Item, { title: '\u83DC\u8C31', key: 'OrderPage', icon: React.createElement(ReactSVG, { path: './assets/images/foot_jiaoyi.svg', svgStyle: { width: 22, height: 22 } }), selectedIcon: React.createElement(ReactSVG, { path: './assets/images/foot_jiaoyi_on.svg', svgStyle: { width: 22, height: 22 } }), selected: this.state.selectedTabBar === 'OrderPageTabBar', onPress: function () { return _this.onTabBarSelectChange('OrderPageTabBar'); } }, this.state.pageContent),
            React.createElement(TabBar.Item, { title: '\u83DC\u7BEE', key: 'HistoryPage', icon: React.createElement(ReactSVG, { path: './assets/images/foot_history.svg', svgStyle: { width: 22, height: 22 } }), selectedIcon: React.createElement(ReactSVG, { path: './assets/images/foot_history_on.svg', svgStyle: { width: 22, height: 22 } }), selected: this.state.selectedTabBar === 'HistoryPageTabBar', onPress: function () { return _this.onTabBarSelectChange('HistoryPageTabBar'); } }, this.state.pageContent),
            React.createElement(TabBar.Item, { title: '\u6211\u7684', key: 'UserPage', icon: React.createElement(ReactSVG, { path: './assets/images/foot_my.svg', svgStyle: { width: 22, height: 22 } }), selectedIcon: React.createElement(ReactSVG, { path: './assets/images/foot_my_on.svg', svgStyle: { width: 22, height: 22 } }), selected: this.state.selectedTabBar === 'UserPageTabBar', onPress: function () { return _this.onTabBarSelectChange('UserPageTabBar'); } }, this.state.pageContent)));
    };
    App.prototype.render = function () {
        return (React.createElement("div", { style: {
                position: 'fixed',
                height: '100%',
                width: '100%',
                top: 0
            } }, this.renderTabBar()));
    };
    return App;
}(React.Component));
var mapStateToProps = function (state) {
    return {};
};
var mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=index.js.map
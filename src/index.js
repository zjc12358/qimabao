import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, hashHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import getStore from './store';
var store = getStore().store;
import Test from './Test';
import Home from './pages';
ReactDOM.render(React.createElement(Provider, { store: store },
    React.createElement(HashRouter, { history: hashHistory },
        React.createElement(Switch, null,
            React.createElement(Route, { exact: true, path: '/', component: Home }),
            React.createElement(Route, { path: '/test', component: Test })))), document.getElementById('root'));
//# sourceMappingURL=index.js.map
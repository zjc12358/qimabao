import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, hashHistory } from 'react-router-dom'
import { Provider } from 'react-redux'
import getStore from './store'

const { store } = getStore()

import Test from './Test'
import Home from './pages'
import setting from './pages/User/setting'
import index1 from './pages/User/index'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter history={hashHistory}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/test' component={Test} />
        <Route path='/setting' component={setting} />
        <Route path='/index1' component={index1} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
)

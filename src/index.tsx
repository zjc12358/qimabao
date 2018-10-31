import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, hashHistory } from 'react-router-dom'
import { Provider } from 'react-redux'
import getStore from './store'

const { store } = getStore()

/*首页*/
import Test from './Test'
import Home from './pages'
import ProductList from './pages/Home/productList' /*商品列表页面*/
import ProductDetails from './pages/Home/productDetails' /*商品详情页*/
import MoreEvaluation from './pages/Home/moreEvaluation' /*评价详情页*/
/*首页*/
import setting from './pages/User/setting' /* 我的页面设置 */
import index1 from './pages/User/index' /* 我的页面 */
import NavBar from './pages/index'  /* 底部导航栏页面 */
import UserInfoEdit from './pages/User/userinfo' /* 用户信息修改页面 */
import settingSave from './pages/User/setting-save' /* 我的页面设置 --》安全设置 */
// import settingPay from './pages/User/setting-pay' /* 我的页面设置 --》支付设置 */
import settingAddress from './pages/User/setting-address' /* 我的页面设置 --》收货地址 */
// import settingAbout from './pages/User/setting-about' /* 我的页面设置 --》关于我们 */
import Message from './pages/User/message' /* 用户消息页面 */
import Coupon from './pages/User/coupon' /* 用户优惠券页面 */

ReactDOM.render(
  <Provider store={store}>
    <HashRouter history={hashHistory}>
      <Switch>
        {/*首页*/}
        <Route exact path='/' component={Home} />
        <Route path='/productList' component={ProductList}/>
        <Route path='/productDetails' component={ProductDetails}/>
        <Route path='/moreEvaluation' component={MoreEvaluation}/>
        <Route path='/test' component={Test} />
        {/*我的*/}
        {/*首页*/}
        {/*我的*/}
        <Route path='/setting' component={setting} />
        <Route path='/index1' component={index1} />
        <Route path='/NavBar' component={NavBar} />
        <Route path='/UserInfoEdit' component={UserInfoEdit} />
        <Route path='/message' component={Message} />
        <Route path='/coupon' component={Coupon} />
        <Route path='/setting-save' component={settingSave} />
        <Route path='/setting-address' component={settingAddress} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
)

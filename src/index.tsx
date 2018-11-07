import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, hashHistory } from 'react-router-dom'
import { Provider } from 'react-redux'
import getStore from './store'

const { store } = getStore()

/*首页*/
import Test from './Test'
import Home from './pages'
import Search from './pages/Home/search' /*搜索页面*/
import ProductList from './pages/Home/productList' /*商品列表页面*/
import ProductDetails from './pages/Home/productDetails' /*商品详情页*/
import MoreEvaluation from './pages/Home/moreEvaluation' /*评价详情页*/
import SearchResult from './pages/Home/searchResult' /*搜索结果页*/
/*首页*/
/*菜谱*/
import setting from './pages/User/setting' /* 我的页面设置 */
import index1 from './pages/User/index' /* 我的页面 */
import NavBar from './pages/index'  /* 底部导航栏页面 */
import UserInfoEdit from './pages/User/userinfo' /* 用户信息修改页面 */
import settingSave from './pages/User/setting_save' /* 我的页面设置 --》安全设置 */
import settingPay from './pages/User/setting_pay' /* 我的页面设置 --》支付设置 */
import settingAddress from './pages/User/setting_address' /* 我的页面设置 --》收货地址 */
import settingAbout from './pages/User/setting_about' /* 我的页面设置 --》关于我们 */
import Message from './pages/User/message' /* 用户消息页面 */
import Coupon from './pages/User/coupon' /* 用户优惠券页面 */
import BankCard from './pages/User/setting_pay_bankCard' /* 用户优惠券页面 */
import shoppingCart from './pages/User/shoppingCart' /* 用户优惠券页面 */

// 菜篮子
import supplierRevise from './pages/History/supplierRevise' /* 修改供应商页面 */
import index2 from './pages/History/index'
import orderMakeSure from './pages/History/orderMakeSure'
import cartTest from './pages/History/cartTest'
ReactDOM.render(
  <Provider store={store}>
    <HashRouter history={hashHistory}>
      <Switch>
        {/*首页*/}
        <Route exact path='/' component={Home} />
        <Route path='/productList' component={ProductList}/>
        <Route path='/productDetails' component={ProductDetails}/>
        <Route path='/moreEvaluation' component={MoreEvaluation}/>
        <Route path='/search' component={Search}/>
        <Route path='/searchResult' component={SearchResult}/>
        <Route path='/test' component={Test} />
        {/*首页*/}
        {/*我的*/}
        <Route path='/setting' component={setting} />
        <Route path='/index1' component={index1} />
        <Route path='/NavBar' component={NavBar} />
        <Route path='/UserInfoEdit' component={UserInfoEdit} />
        <Route path='/message' component={Message} />
        <Route path='/coupon' component={Coupon} />
        <Route path='/setting-save' component={settingSave} />
        <Route path='/setting-about' component={settingAbout} />
        <Route path='/setting-pay' component={settingPay} />
        <Route path='/setting-pay-bankCard' component={BankCard} />
        <Route path='/shoppingCart' component={shoppingCart} />
        {/*菜篮*/}
        <Route path='/supplierRevise' component={supplierRevise} />
        <Route path='/index2' component={index2} />
        <Route path='/orderMakeSure' component={orderMakeSure} />
        <Route path='/cartTest' component={cartTest}></Route>
        <Route path='/setting-address' component={settingAddress} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
)

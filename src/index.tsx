import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, hashHistory } from 'react-router-dom'
import { Provider } from 'react-redux'
import getStore from './store'
import AnimatedRouter from 'react-animated-router'
import 'react-animated-router/animate.css'

const { store } = getStore()
/* 供应商
 ============================================================================*/
import Supplier from './pages/Supplier/index'
/*首页*/
import Shop from './pages/Supplier/shop/shop'
/*店铺*/
import Category from './pages/Supplier/category'
/*分类页*/
import Release from './pages/Supplier/release/release'
/*发布*/
import Describe from './pages/Supplier/release/describe'
/*描述*/
import Withdrawal from './pages/Supplier/withdrawal/withdrawal'
/*提现*/
import AddBankCard from './pages/Supplier/addBankCard/index'
/*添加银行卡*/
import Detection from './pages/Supplier/detection/index'
/*检测申请*/
import SupplierAfterSale from './pages/Supplier/afterSale/index'
/*售后退款*/
import AfterSaleDetail from './pages/Supplier/afterSale/afterSaleDetail'
/*售后退款处理页面*/
import AfterSaleResult from './pages/Supplier/afterSale/afterSaleResult'
/*售后退款查询结果页面*/
import SupplierOrder from './pages/Supplier/order/index'
/*供应商商品管理*/
import SProductList from './pages/Supplier/productList/index'
/*供应商商品管理*/
import AfterSaleSuccess from './pages/Supplier/afterSale/afterSaleSuccess'
/*售后退款查询结果页面*/
/* 采购商
 ============================================================================*/
import NavBar from './pages/index'
/* 底部导航栏页面 */
/*首页*/
import Test from './Test'
import Home from './pages'
import Search from './pages/Home/search'
/*搜索页面*/
import ProductList from './pages/Home/productList'
/*商品列表页面*/
import ProductDetails from './pages/Home/productDetails'
/*商品详情页*/
import MoreEvaluation from './pages/Home/moreEvaluation'
/*评价详情页*/
import SearchResult from './pages/Home/searchResult'
/*搜索结果页*/
import SelectAddress from './pages/Home/selectAddress'
/*选择收货地址*/
/*首页*/
/*菜谱*/
import MenuDetail from './pages/Menu/menuDetail'
/*菜谱详情页*/
import MenuOrderCheck from './pages/Menu/menuOrderCheck'
/*菜谱下单确认页*/
/*菜谱*/
/*我的*/
import Setting from './pages/User/setting/index'
/* 我的页面设置 */
import Mine from './pages/User/index'
/* 我的页面 */
import UserInfoEdit from './pages/User/userinfo/index'
/* 用户信息页面 */
import UserInfoNameEdit from './pages/User/userinfo/nameEdit'
/* 用户信息页面 --》昵称修改 */
import UserInfoPhoneEdit from './pages/User/userinfo/phoneEdit'
/* 用户信息页面 --》手机号修改 */
import UserInfoPhoneEditConfirm from './pages/User/userinfo/phoneEditConfirm'
/* 用户信息页面 --》手机号修改验证短信 */
import SettingSafe from './pages/User/setting/setting_save/index'
/* 我的页面设置 --》安全设置 */
import Phone from './pages/User/setting/setting_save/phone'
/* 安全设置 --》显示当前手机号 */
import PhoneEdit from './pages/User/setting/setting_save/phoneEdit'
/* 安全设置 --》修改手机号 */
import PhoneEditConfirm from './pages/User/setting/setting_save/phoneEditConfirm'
/* 安全设置 --》修改手机号确认短信 */
import PaymentPasswordChoose from './pages/User/setting/setting_save/paymentPasswordChoose'
/* 安全设置 --》选择重置密码方式 */
import PaymentPasswordConfirm from './pages/User/setting/setting_save/paymentPasswordConfirm'
/* 安全设置 --》验证支付密码（6位数字界面） */
import PaymentPasswordReset from './pages/User/setting/setting_save/paymentPasswordReset'
/* 安全设置 --》支付密码重置 */
import PaymentPasswordResetConfirm from './pages/User/setting/setting_save/paymentPasswordResetConfirm'
/* 安全设置 --》重置短信确认 */
import CountryAndArea from './pages/User/setting/setting_save/countryAndArea'
/* 安全设置 --》归属地 */
import ResetPasswordMethod from './pages/User/setting/setting_save/resetPasswordMethod'
/* 安全设置 --》重置方式 */
import SettingPay from './pages/User/setting/settingPay'
/* 我的页面设置 --》支付设置 */
import SettingAddress from './pages/User/setting/setting_address/index'
/* 我的页面设置 --》收货地址 */
import SettingAddressEdit from './pages/User/setting/setting_address/settingAddressEdit'
/* 我的页面设置 --》编辑收货地址 */
import AddNewAddress from './pages/User/setting/setting_address/addNewAddress'
/* 我的页面设置 -> 新增收货地址*/
import SettingAbout from './pages/User/setting/settingAbout'
/* 我的页面设置 --》关于我们 */
import Message from './pages/User/message/index'
/* 用户消息页面 */
import Coupon from './pages/User/coupon'
/* 用户优惠券页面 */
import BankCard from './pages/User/setting/settingPayBankCard'
/* 添加银行卡页面 */
import MyOrder from './pages/User/order/index'
/* 我的订单页面 */
import AfterSale from './pages/User/afterSale/index'
/* 售后页面 */
import MessageLogistics from './pages/User/message/messageLogistics'
/* 物流助手页面 */
import MessageSystemInfo from './pages/User/message/messageSystemInfo'
/* 系统消息页面 */
import MessageTradeInfo from './pages/User/message/messageTradeInfo'
/* 交易信息页面 */
import LogisticsEvaluation from './pages/User/message/logisticsEvaluation'
/* 物流评价页面 */
import OrderDetail from './pages/User/order/orderDetails'
/* 订单详情 */
import PaySuccess from './pages/User/order/paySuccess'
/* 支付成功 */
/*我的*/
// 菜篮子
import supplierRevise from './pages/History/supplierRevise'
/* 修改供应商页面 */
// import index2 from './pages/History/index'
// /* 菜篮首页 */
import orderMakeSure from './pages/History/orderMakeSure'
/* 确认订单 */
import payOrder from './pages/History/payOrder'
/*支付订单*/

ReactDOM.render(
  <Provider store={store}>
    <HashRouter history={hashHistory}>
      <AnimatedRouter>
        /* 供应商
         ============================================================================*/
        <Route exact path='/supplier' component={Supplier}/>
        <Route exact path='/supplierAfterSale' component={SupplierAfterSale}/>
        <Route exact path='/afterSaleDetail' component={AfterSaleDetail}/>
        <Route exact path='/afterSaleResult' component={AfterSaleResult}/>
        <Route exact path='/afterSaleSuccess' component={AfterSaleSuccess}/>
        <Route path='/shop' component={Shop}/>
        <Route path='/category' component={Category}/>
        <Route path='/release' component={Release}/>
        <Route path='/describe' component={Describe}/>
        <Route path='/withdrawal' component={Withdrawal}/>
        <Route path='/addBankCard' component={AddBankCard}/>
        <Route path='/sProductList' component={SProductList}/>
        <Route path='/supplierOrder' component={SupplierOrder}/>
        <Route path='/detection' component={Detection}/>
        /* 采购商
         ============================================================================*/
        <Route path='/NavBar' component={NavBar}/>

        {/*首页*/}
        <Route exact path='/' component={Home}/>
        <Route path='/productList' component={ProductList}/>
        <Route path='/productDetails' component={ProductDetails}/>
        <Route path='/moreEvaluation' component={MoreEvaluation}/>
        <Route path='/search' component={Search}/>
        <Route path='/searchResult' component={SearchResult}/>
        <Route path='/selectAddress' component={SelectAddress}/>
        <Route path='/test' component={Test}/>
        {/*首页*/}

        {/*菜谱*/}
        <Route path='/menuDetail' component={MenuDetail}/>
        <Route path='/menuOrderCheck' component={MenuOrderCheck}/>
        {/*菜谱*/}

        {/*我的*/}
        <Route path='/setting' component={Setting}/>
        <Route path='/mine' component={Mine}/>
        <Route path='/userInfoEdit' component={UserInfoEdit}/>
        <Route path='/userInfoNameEdit' component={UserInfoNameEdit}/>
        <Route path='/userInfoPhoneEdit' component={UserInfoPhoneEdit}/>
        <Route path='/userInfoPhoneEditConfirm' component={UserInfoPhoneEditConfirm}/>
        <Route path='/message' component={Message}/>
        <Route path='/coupon' component={Coupon}/>
        <Route path='/settingSafe' component={SettingSafe}/>
        <Route path='/phone' component={Phone}/>
        <Route path='/phoneEdit' component={PhoneEdit}/>
        <Route path='/phoneEditConfirm' component={PhoneEditConfirm}/>
        <Route path='/paymentPasswordChoose' component={PaymentPasswordChoose}/>
        <Route path='/paymentPasswordConfirm' component={PaymentPasswordConfirm}/>
        <Route path='/paymentPasswordReset' component={PaymentPasswordReset}/>
        <Route path='/paymentPasswordResetConfirm' component={PaymentPasswordResetConfirm}/>
        <Route path='/resetPasswordMethod' component={ResetPasswordMethod}/>
        <Route path='/countryAndArea' component={CountryAndArea}/>
        <Route path='/settingAbout' component={SettingAbout}/>
        <Route path='/settingPay' component={SettingPay}/>
        <Route path='/settingPayBankCard' component={BankCard}/>
        <Route path='/myOrder' component={MyOrder}/>
        <Route path='/afterSale' component={AfterSale}/>
        <Route path='/messageLogistics' component={MessageLogistics}/>
        <Route path='/messageSystemInfo' component={MessageSystemInfo}/>
        <Route path='/messageTradeInfo' component={MessageTradeInfo}/>
        <Route path='/logisticsEvaluation' component={LogisticsEvaluation}/>
        <Route path='/settingAddressEdit' component={SettingAddressEdit}/>
        <Route path='/addNewAddress' component={AddNewAddress}/>
        <Route path='/orderDetail' component={OrderDetail}/>
        <Route path='/paySuccess' component={PaySuccess}/>
        {/*我的*/}

        {/*菜篮*/}
        <Route path='/supplierRevise' component={supplierRevise}/>
        {/*<Route path='/index2' component={index2}/>*/}
        <Route path='/orderMakeSure' component={orderMakeSure}/>
        <Route path='/settingAddress' component={SettingAddress}/>
        <Route path='/payOrder' component={payOrder}/>
      </AnimatedRouter>
    </HashRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
)

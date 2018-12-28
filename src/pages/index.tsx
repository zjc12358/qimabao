import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, Toast } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'

import ReactSVG from 'react-svg'

import Home from '@pages/Home'
import Menu from '@pages/Menu'
import History from '@pages/History'
import User from '@pages/User'
import Supplier from '@pages/Supplier'
import { PageTab } from '@datasources/PageTab'

import { cloneDeep, get } from 'lodash'
import '../assets/css/GeneralStyle.less'
import { updatePageTab, updateUserInfo, setID, setPhone } from '@store/actions/global_data'
import axios from 'axios'
import { MyResponse } from '@datasources/MyResponse'
import { LoginBean } from '@datasources/LoginBean'
import { UserInfo } from '@datasources/UserInfo'
import { Loading } from 'element-react'
import * as dd from 'dingtalk-jsapi'

export interface Props {
  id: number
  pageTab: string
  mode: 'supplier' | 'purchaser'
  updatePageTab: (pageName: string) => void
  updateUserInfo: (userInfo: UserInfo) => void
  setID: (id: number) => void
  setPhone: (phone: string) => void
}

interface State {
  selectedTabBar: string
  pageContent: JSX.Element
  hidden: boolean
  isLoading: boolean
}

class App extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      selectedTabBar: 'HomePageTabBar',
      pageContent: null,
      hidden: false,
      isLoading: false
    }
  }

  /**
   * 测试模拟用户登录
   */
  componentWillMount () {
/*    dd.runtime.permission.requestAuthCode(
      { corpId: 'dingff2af124327c79bd35c2f4657eb6378f' }
    )
      .then(res => this.getLogin(res))
      .catch(err => console.log(err))*/
    this.jj()
    if (this.state.isLoading) {
      return
    }
    this.setState({
      isLoading: false
    })
  }
  public jj = () => {
    let url = 'CanteenProcurementManager/user/nail/findNailOpenId?'
    let query = 'openId=maoxiaoyan'
    axios.get<MyResponse<LoginBean>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          this.props.setID(Number(data.data.data.userId))
          url = 'CanteenProcurementManager/user/nail/selectMean?'
          query = 'user_id=' + this.props.id
          axios.get<MyResponse<UserInfo>>(url + query)
            .then(data => {
              console.log('--- data =', data)
              if (data.data.code === 0) {
                this.props.updateUserInfo(cloneDeep(data.data.data))
                this.props.setPhone(data.data.data.user_phone)
              } else {
                Toast.info('获取用户信息失败,请重试', 2, null, false)
              }
            })
            .catch(() => {
              Toast.info('请检查网络设置!')
            })
        } else {
          Toast.info('登录失败', 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }
  public getLogin = (res) => {
    let url = 'CanteenProcurementManager/user/nail/tinkerFree?'
    let query = 'AuthCode=' + res.code
    axios.get<MyResponse<LoginBean>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          this.props.setID(Number(data.data.data.userId))
          url = 'CanteenProcurementManager/user/nail/selectMean?'
          query = 'user_id=' + this.props.id
          axios.get<MyResponse<UserInfo>>(url + query)
            .then(data => {
              console.log('--- data =', data)
              if (data.data.code === 0) {
                this.props.updateUserInfo(cloneDeep(data.data.data))
                this.props.setPhone(data.data.data.user_phone)
              } else {
                Toast.info('获取用户信息失败,请重试', 2, null, false)
              }
              this.setState({
                isLoading: false
              })
            })
            .catch(() => {
              Toast.info('请检查网络设置!')
              this.setState({
                isLoading: false
              })
            })
        } else {
          Toast.info('登录失败', 2, null, false)
          this.setState({
            isLoading: false
          })
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
        this.setState({
          isLoading: false
        })
      })
  }
  componentDidMount () {
    console.log(this.props.pageTab)
    this.onTabBarSelectChange(this.props.pageTab)
  }

  /**
   * 商家版 买家版
   */
  renderManager = () => {
    if (this.props.mode === 'purchaser') {
      return (
        <div
          style={{
            // position: 'fixed',
            // flex: 1,
            height: '100%',
            width: '100%'
            // top: 0
          }}
        >
          {this.renderTabBar()}
          {this.state.isLoading && <Loading fullscreen={true}/>}
        </div>
      )
    } else {
      return (
        <div>
          <Supplier/>
          {this.state.isLoading && <Loading fullscreen={true}/>}
        </div>
      )
    }
  }

  onTabBarSelectChange = (tabBarName) => {
    this.props.updatePageTab(tabBarName)
    let pageContent
    switch (tabBarName) {
      case 'HomePageTabBar':
        pageContent = this.renderHomePage()	// 首页
        break
      case 'OrderPageTabBar':
        pageContent = this.renderOrderPage()  	// 订单页面
        break
      case 'HistoryPageTabBar':
        pageContent = this.renderHistoryPage() // 历史页面
        break
      case 'UserPageTabBar':
        pageContent = this.renderUserCenter()	// 用户中心页面
        break
      default:
        pageContent = this.renderHomePage()	// 首页
        break
    }
    this.setState({
      selectedTabBar: tabBarName,
      pageContent
    })
  }

  renderHomePage = () => {
    return (
      <Home/>
    )
  }

  renderOrderPage = () => {
    return (
      <Menu/>
    )
  }

  renderHistoryPage = () => {
    return (
      <History/>
    )
  }

  renderUserCenter = () => {
    return (
      <User/>
    )
  }

  renderTabBar () {
    return (
      <TabBar
        unselectedTintColor='#363636'
        tintColor='#0385e7'
        barTintColor='#FFFFFF'
        hidden={this.state.hidden}
        prerenderingSiblingsNumber={0}
      >
        <TabBar.Item
          style={{ verticalAlign: 'midden' }}
          title='首页'
          key='HomePage'
          icon={<ReactSVG path='./assets/images/Cart/home.svg' svgStyle={{ width: 22, height: 22 }}/>}
          selectedIcon={<ReactSVG path='./assets/images/Cart/home_on.svg' svgStyle={{ width: 22, height: 22 }}/>}
          selected={this.props.pageTab === 'HomePageTabBar'}
          onPress={() => this.onTabBarSelectChange('HomePageTabBar')}
        >
          {this.state.pageContent}
        </TabBar.Item>

        <TabBar.Item
          style={{ verticalAlign: 'midden' }}
          title='菜谱'
          key='OrderPage'
          icon={<ReactSVG path='./assets/images/Cart/recipe.svg' svgStyle={{ width: 22, height: 22 }}/>}
          selectedIcon={<ReactSVG path='./assets/images/Cart/recipe_on.svg' svgStyle={{ width: 22, height: 22 }}/>}
          selected={this.props.pageTab === 'OrderPageTabBar'}
          onPress={() => this.onTabBarSelectChange('OrderPageTabBar')}
        >
          {this.state.pageContent}
        </TabBar.Item>

        <TabBar.Item
          style={{ verticalAlign: 'midden' }}
          title='菜篮'
          key='HistoryPage'
          icon={<ReactSVG path='./assets/images/Cart/cart.svg' svgStyle={{ width: 22, height: 22 }}/>}
          selectedIcon={<ReactSVG path='./assets/images/Cart/cart_on.svg' svgStyle={{ width: 22, height: 22 }}/>}
          selected={this.props.pageTab === 'HistoryPageTabBar'}
          onPress={() => this.onTabBarSelectChange('HistoryPageTabBar')}
        >
          {this.state.pageContent}
        </TabBar.Item>

        <TabBar.Item
          style={{ verticalAlign: 'midden' }}
          title='我的'
          key='UserPage'
          icon={<ReactSVG path='./assets/images/Cart/user.svg' svgStyle={{ width: 20, height: 20 }}/>}
          selectedIcon={<ReactSVG path='./assets/images/Cart/user_on.svg' svgStyle={{ width: 20, height: 20 }}/>}
          selected={this.props.pageTab === 'UserPageTabBar'}
          onPress={() => this.onTabBarSelectChange('UserPageTabBar')}
        >
          {this.state.pageContent}
        </TabBar.Item>
      </TabBar>
    )
  }

  public render () {
    return this.renderManager()
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    id: state.globalData.id,
    pageTab: state.globalData.pageTab,
    mode: state.globalData.mode
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updateUserInfo,
  updatePageTab,
  setID,
  setPhone
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

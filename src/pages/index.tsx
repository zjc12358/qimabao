import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'

import ReactSVG from 'react-svg'

import Home from '@pages/Home'
import Menu from '@pages/Menu'
import History from '@pages/History'
import User from '@pages/User'
import Supplier from '@pages/Supplier'
import { PageTab } from '@datasources/PageTab'

import '../assets/css/GeneralStyle.less'
export interface Props {
  pageTab: string
  mode: 'supplier' | 'purchaser'
}

interface State {
  selectedTabBar: string
  pageContent: JSX.Element
  hidden: boolean
}

class App extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      selectedTabBar: 'HomePageTabBar',
      pageContent: null,
      hidden: false
    }
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
          className='scroll'
          style={{
            position: 'fixed',
            height: '100%',
            width: '100%',
            top: 0
          }}
        >
          {this.renderTabBar()}
        </div>
      )
    } else {
      return (
        <div>
          <Supplier/>
        </div>
      )
    }
  }

  onTabBarSelectChange = (tabBarName) => {
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
          selected={this.state.selectedTabBar === 'HomePageTabBar'}
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
          selected={this.state.selectedTabBar === 'OrderPageTabBar'}
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
          selected={this.state.selectedTabBar === 'HistoryPageTabBar'}
          onPress={() => this.onTabBarSelectChange('HistoryPageTabBar')}
        >
          {this.state.pageContent}
        </TabBar.Item>

        <TabBar.Item
          style={{ verticalAlign: 'midden' }}
          title='我的'
          key='UserPage'
          icon={<ReactSVG path='./assets/images/foot_my.svg' svgStyle={{ width: 20, height: 20 }}/>}
          selectedIcon={<ReactSVG path='./assets/images/foot_my_on.svg' svgStyle={{ width: 20, height: 20 }}/>}
          selected={this.state.selectedTabBar === 'UserPageTabBar'}
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
    pageTab: state.globalData.pageTab,
    mode: state.globalData.mode
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)

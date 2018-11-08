import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, Calendar } from 'antd-mobile'
import Cal from 'react-calendar'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import './menuCss.css'
import { MenuBean } from '@datasources/MenuBean'
import { ProductBean } from '@datasources/ProductBean'

export interface Props {

}

interface State {
  data: Date
  hadOrder: boolean,
  chooseData: Date,
  menuList: Array<MenuBean>
}

class Menu extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: new Date(),
      hadOrder: false,
      chooseData: null,
      menuList: []
    }
  }

  componentWillMount () {
    let menuList: Array<MenuBean> = []
    for (let i = 0; i < 5; i++) {
      let productList: Array<ProductBean> = []
      for (let i = 0; i < 10; i++) {
        let product: ProductBean = {
          img: '',
          id: i,
          store: '蓝宇科技',
          describe: '和大家看撒谎的空间撒活动撒U盾OS爱都殴打的萨达哈萨克的哈萨克的哈萨克的哈萨克',
          price: '',
          weight: '200g',
          name: '商品' + i,
          store_id: 0
        }
        productList.push(product)
      }
      let menuItem: MenuBean = {
        productList: productList,
        menuName: '' + i
      }
      menuList.push(menuItem)

    }
    this.setState({
      menuList: menuList
    })
  }

  /**
   * 日历选择
   */
  renderCalendar = () => {
    return (
      <div className='cal'>
        <Cal
          // 当前日期
          value={this.state.data}
          //  默认值 ： US ，us表示第一天是周天， 其他的 都是 ISO8601 第一天是周一
          calendarType='US'
          // 允许选择的最大日期
          // maxDate={new Date(this.funDate(7))}
          // 允许选择的最小日期
          minDate={this.state.data}
          //  只有点击 “天” 时 触发 点击事件
          onClickDay={(value) => this.dayOnClick(value)}
        />
      </div>
    )
  }

  /**
   * 日历下方内容
   */
  renderContent = () => {
    return this.state.hadOrder ? this.renderOrderInfo() : this.renderMenuList()
  }

  /**
   * 菜谱列表
   */
  renderMenuList = () => {
    return (
      <div className='vertical'>
        {this.state.menuList.map((item) => this.renderMenuListItem(item))}
      </div>
    )
  }

  /**
   * 菜谱列表单项
   */
  renderMenuListItem = (item: MenuBean) => {
    return (
      <div className='vertical'
           style={{
             marginBottom: 10
           }}>
        <div className='horizontal'
             style={{
               justifyContent: 'space-between',
               height: 40
             }}>
          <div>
            <span>口</span>
            <span>{item.menuName}</span>
          </div>
          <span>↑</span>
        </div>
        <div>
          <div className='horizontal'
               style={{
                 flexWrap: 'wrap'
               }}>
            {item.productList.map((item) =>
              <div style={{
                marginLeft: 10,
                height: 20
              }}>{item.name}</div>
            )}
          </div>
        </div>
      </div>
    )
  }

  /**
   * 已下单信息
   */
  renderOrderInfo = () => {
    return (
      <div onClick={() => history().push('/orderDetail')}>
        已有订单,点击查看
      </div>
    )
  }

  /**
   * 点击日期
   */
  dayOnClick = (value: Date) => {
    console.log(value)
    this.setState({
      chooseData: value
    })
    this.getDataHadOrderInfo()
  }

  /**
   * 根据日期请求,是否下单信息
   */
  getDataHadOrderInfo = () => {
    // 模拟请求
    let i = Math.random()
    if (i > 0.5) {
      this.setState({
        hadOrder: true
      })
    } else {
      this.setState({
        hadOrder: false
      })
    }
    // TODO 2018/11/8 网络请求
  }

  funDate = (addDayCount) => {
    let dd = new Date()
    dd.setDate(dd.getDate() + addDayCount)// 获取AddDayCount天后的日期
    let y = dd.getFullYear()
    let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1)// 获取当前月份的日期，不足10补0
    let d = dd.getDate() < 10 ? dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
    return y + '-' + m + '-' + d
  }

  public render () {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#efeff5',
        height: '100%',
        width: '100%'
      }}>
        {this.renderCalendar()}
        {/*{this.renderContent()}*/}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

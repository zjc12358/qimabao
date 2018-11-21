import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, Calendar } from 'antd-mobile'
import Cal from 'react-calendar'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import { MenuBean } from '@datasources/MenuBean'
import { setMenuId } from '@store/actions/menuDetail_data'
import { updatePageTab } from '@store/actions/global_data'
import { ProductBean } from '@datasources/ProductBean'
import { changeMenuState, setReload, updateMenuList } from '@store/actions/menu_data'
import ReactSVG from 'react-svg'
import './menuCss.css'
import './menuSelectCss.css'

export interface Props {
  setMenuId?: (id: number) => void
  updatePageTab?: (pageTab: string) => void
  menuList?: Array<MenuBean>
  setReload?: (reload: boolean) => void
  updateMenuList?: (menuList: Array<MenuBean>) => void
  reload?: boolean
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
      menuList: this.props.menuList
    }
  }

  componentWillMount () {
    this.getMenuList()
  }

  componentWillReceiveProps (nextProps: Props) {
    if (nextProps !== this.props) {
      this.setState({
        menuList: nextProps.menuList
      })
      if (nextProps.reload) {
        this.getMenuList()
      }
    }
  }

  /**
   * 日历选择
   */
  renderCalendar = () => {
    return (
      <div className='cal' style={{ width: '100%' }}>
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
    return (
      <div style={{ flex: 1, width: '100%', marginTop: 1 }}>
        {this.state.hadOrder ? this.renderOrderInfo() : this.renderMenuList()}
      </div>

    )
  }

  /**
   * 推荐菜谱
   */
  renderFoot = () => {
    return (
      <div className='horizontal'
           style={{ justifyContent: 'center', marginBottom: 40 }}>
        推荐菜谱,暂未开放
      </div>
    )
  }

  /**
   * 菜谱列表
   */
  renderMenuList = () => {
    return (
      <div className='vertical'
           style={{ width: '100%' }}>
        <div className='vertical'
             style={{ width: '100%' }}>
          {this.state.menuList.map((item, index) => this.renderMenuListItem(item, index))}
        </div>
        <div onClick={this.downOrderOnClick}
             className='horizontal-center place-order-border'>
          下单
        </div>
      </div>

    )
  }

  /**
   * 菜谱列表单项
   */
  renderMenuListItem = (item: MenuBean, index: number) => {
    return (
      <div className='vertical'
           style={{
             marginBottom: 10,
             backgroundColor: 'white',
             width: '100%'
           }}>
        <div className='horizontal'
             style={{
               justifyContent: 'space-between',
               height: 40,
               width: '100%'
             }}>
          <div className='horizontal' onClick={() => this.menuChooseOnClick(index)}>
            <span style={{ paddingLeft: 20 }}>
              {this.state.menuList[index].isCheck ?
                (<ReactSVG path='./assets/images/ic_check.svg' svgStyle={{ width: 18, height: 18 }}/>)
                : (<ReactSVG path='./assets/images/ic_uncheck.svg' svgStyle={{ width: 18, height: 18 }}/>)}
              </span>
            <span style={{ marginLeft: 5 }}>{item.menuName}</span>
          </div>
          <span style={{ paddingRight: 20 }} onClick={() => this.showMenuOnClick(index)}>
            {this.state.menuList[index].isShow ?
              (<ReactSVG path='./assets/images/ic_up_arrow.svg' svgStyle={{ width: 24, height: 24 }}/>) :
              (<ReactSVG path='./assets/images/ic_down_arrow.svg' svgStyle={{ width: 24, height: 24 }}/>)}
          </span>
        </div>
        <span style={{ height: 1, width: '100%', backgroundColor: '#e5e5e5' }}></span>
        {this.state.menuList[index].isShow &&
        <div style={{ width: '100%' }}>
          <div className='horizontal'
               style={{
                 flexWrap: 'wrap',
                 marginTop: 10,
                 marginBottom: 10,
                 paddingRight: 10
               }} onClick={() => this.updateMenuOnClick(index)}>
            {item.productList.map((item) =>
              <div style={{
                marginLeft: 20,
                height: 20
              }}>{item.name}</div>
            )}
          </div>
        </div>
        }
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
   * 点击选择某个菜谱
   * @param index
   */
  menuChooseOnClick = (index: number) => {
    if (!this.state.menuList[index].isCheck) {
      let list = this.state.menuList
      for (let i = 0; i < this.state.menuList.length; i++) {
        if (i === index) {
          list[i].isCheck = true
        } else {
          list[i].isCheck = false
        }
      }
      this.setState({
        menuList: list
      })
    }
  }

  /**
   * 点击展开菜谱明细
   * @param index
   */
  showMenuOnClick = (index: number) => {
    if (!this.state.menuList[index].isShow) {
      let list = this.state.menuList
      for (let i = 0; i < this.state.menuList.length; i++) {
        if (i === index) {
          list[i].isShow = true
        } else {
          list[i].isShow = false
        }
      }
      this.setState({
        menuList: list
      })
    }
  }

  /**
   * 点击菜谱修改菜谱
   * @param index
   */
  updateMenuOnClick = (index: number) => {
    let id = this.state.menuList[index].id
    this.props.setMenuId(id)
    this.props.updatePageTab('OrderPageTabBar')
    history().push('/menuDetail')
  }

  /**
   * 下单点击
   */
  downOrderOnClick = () => {
    let menu: MenuBean
    for (let i = 0; i < this.state.menuList.length; i++) {
      if (this.state.menuList[i].isCheck) {
        menu = this.state.menuList[i]
      }
    }
    console.log('下单' + menu.id)
    this.props.updatePageTab('OrderPageTabBar')
    // TODO 2018/11/9 请求数据
    history().push('/menuOrderCheck')
  }

  /**
   * 获取菜谱列表
   */
  getMenuList () {
    if (this.props.reload) {
      // TODO 2018/11/9 请求获取菜谱数据
      console.log('获取菜谱数据')
      let menuList: Array<MenuBean> = []
      for (let i = 0; i < 5; i++) {
        let productList: Array<ProductBean> = []
        let productNameList: Array<string> = []
        for (let i = 0; i < Math.random() * 20; i++) {
          let product: ProductBean = {
            img: '',
            id: i,
            store: '蓝宇科技',
            describe: '和大家看撒谎的空间撒活动撒U盾OS爱都殴打的萨达哈萨克的哈萨克的哈萨克的哈萨克',
            price: '',
            weight: '200g',
            name: '商品' + (Math.random() * 10000).toFixed(0),
            store_id: 0
          }
          let name = '商品' + i
          productNameList.push(name)
          productList.push(product)
        }
        let menuItem: MenuBean = {
          productList: productList,
          menuName: '菜谱' + i,
          isShow: i === 0,
          isCheck: i === 0,
          id: i,
          productNameList: productNameList
        }
        menuList.push(menuItem)

      }
      this.props.updateMenuList(menuList)
      this.props.setReload(false)
    }
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
      <div className='vertical render-style'>
          {this.renderCalendar()}
          {this.renderContent()}
          {this.renderFoot()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    menuList: state.menuData.menuList,
    reload: state.menuData.reload
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  setMenuId,
  updatePageTab,
  setReload,
  updateMenuList
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

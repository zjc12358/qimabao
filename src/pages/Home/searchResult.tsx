import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, ListView } from 'antd-mobile'
import axios from 'axios'
import history from 'history/createHashHistory'
import { SearchData } from '@store/reducers/searchDataReducer'
import { updatePageTab } from '@store/actions/global_data'
import ChooseMenu from '@components/ChooseMenu'
import './homeCss.css'
import './searchResultCss.css'
import LoadMore from '@components/LoadMore'
import Drawer from '@material-ui/core/Drawer/Drawer'
import Input from '@material-ui/core/Input/Input'
import { TagBean } from '@datasources/TagBean'
import { MyResponse } from '@datasources/MyResponse'
import { ProductBean } from '@datasources/ProductBean'
import ReactSVG from 'react-svg'
import { needReload } from '@store/actions/shopCart_data'
import { Loading } from 'element-react'

const NUM_ROWS = 20
let sortTag = ['有机', '冷冻', '纯天然', '野生', '绿色', '深加工']

export interface Props {
  searchData: SearchData
  updatePageTab: (pageIndex: string) => void,
  needReload: (needReload: boolean) => void
}

interface State {
  sortData: Array<string>
  sortIndex: number
  searchResultList: Array<ProductBean>
  isLoading: boolean
  hasMore: boolean
  showChoose: boolean
  drawerOpen: boolean
  tagList: Array<TagBean>
  minPrice: number // 最低价
  maxPrice: number // 最高价
  pageNum: number
}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      sortData: ['价格高到低', '价格低到高', '销量高到低', '优惠优先'],
      sortIndex: null,
      searchResultList: [],
      isLoading: false,
      hasMore: true,
      showChoose: false,
      drawerOpen: false,
      tagList: [],
      minPrice: null,
      maxPrice: null,
      pageNum: 1
    }
  }

  componentDidMount () {
    this.refresh()
    this.getTagList()
  }

  refresh () {
    this.setState({
      pageNum: 1
    }, () => this.getSearchList())

  }

  loadMore () {
    this.setState({
      pageNum: this.state.pageNum + 1
    }, () => this.getSearchList())
  }

  getTagList () {
    let list: Array<TagBean> = []
    for (let i = 0; i < 6; i++) {
      let item: TagBean = {
        name: sortTag[i],
        id: i,
        checked: false
      }
      list.push(item)
    }
    this.setState({
      tagList: list
    })
  }

  /**
   * 头部
   */
  renderHead = () => {
    return (
      <div className='horizontal head'>
        <div className='horizontal head-back'
             onClick={this.goBackOnClick}>
          返回
        </div>
        <div className='horizontal head-search'
             onClick={this.goBackOnClick}>
          <span style={{ paddingLeft: 10 }}>搜索</span>
          <span className='head-search-text'>{this.props.searchData.searchText}</span>
        </div>
        <div className='horizontal head-shopCart'
             onClick={this.goShopCart}>
          购物车
        </div>
      </div>
    )
  }

  /**
   * 筛选按钮
   */
  renderChoose = () => {
    return (
      <div style={{ width: '100%' }}>
        <div className='horizontal'
             style={{
               height: 40,
               width: '100%',
               backgroundColor: 'white'
             }}>
          <span style={{ height: 30, width: 1, marginTop: 5, backgroundColor: '#e5e5e5' }}></span>
          <div className='horizontal-center'
               style={{ flex: 1, position: 'relative' }}
               onClick={this.chooseOnClick}>
            <span>{this.state.sortIndex === null ? '默认排序' : this.state.sortData[this.state.sortIndex]}</span>
            <span>↓</span>
          </div>
          <span style={{ height: 30, width: 1, marginTop: 5, backgroundColor: '#e5e5e5' }}></span>
          <div className='horizontal-center'
               style={{ flex: 1 }}
               onClick={() => this.toggleDrawer(true)}>
            <span>筛选</span>
            <span>→</span>
          </div>
        </div>
        <ChooseMenu chooseHandClick={this.chooseHandClick.bind(this)} data={this.state.sortData}
                    chooseIndex={this.state.sortIndex} isShow={this.state.showChoose}
                    closeHandClick={this.closeHandClick.bind(this)}/>
      </div>
    )
  }

  /**
   * 搜索结果ListView
   */
  renderContentList = () => {
    let list =
      <div className='horizontal search-list-content'>
        {this.state.searchResultList.map((item) => this.renderContentItem(item))}
      </div>
    return (
      <div className='scroll search-list'>
        <LoadMore loadHeight={10} getData={this.loadMore.bind(this)} list={list}
                  bodyName={'search-list'} itemHeight={110} listData={this.state.searchResultList}
                  hasMore={this.state.hasMore} isLoading={this.state.isLoading}/>
      </div>
    )
  }

  /**
   * 搜索结果单项
   */
  renderContentItem = (item: ProductBean) => {
    return (
      <div className='vertical' style={{ width: '49%', height: 220, backgroundColor: 'white', marginTop: 5 }}>
        <img style={{ height: 140, width: '100%' }} src={'./assets/images/SupplierTest/vegetable.png'}/>
        <div className='vertical' style={{ flex: 1, justifyContent: 'space-between', width: '100%' }}>
          <span style={{ marginTop: 10, width: '100%' }}>
            <span style={{ marginLeft: 10 }}>{item.product_name}</span>
            </span>
          <div className='horizontal' style={{
            justifyContent: 'space-between', marginBottom: 10, width: '100%'
          }}>
            <div style={{ marginLeft: 10 }}>
              <span style={{ color: '#ff6161' }}>{item.product_price}</span>
              <span>/</span>
              <span>500g</span>
            </div>
            <div style={{ marginRight: 10 }}
                 className='cart-circle' onClick={(e) => this.addCartOnClick(e, item)}>
              <div className='center'>
                <ReactSVG path='./assets/images/shop_cart_white.svg'
                          svgStyle={{ marginTop: 4, width: 12, height: 12 }}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /**
   * 抽屉内部布局
   */
  renderDrawer = () => {
    return (
      <div className='vertical' style={{ height: '100%' }}>
        <div className='vertical' style={{ flex: 1 }}>
          <span style={{ height: 40, fontSize: 20, marginTop: 20 }}>价格筛选</span>
          <div style={{ margin: 10 }}>
            <div className='price-area-border'>
              <div className='horizontal'>
                <Input className='center price-input-border' onChange={this.priceMinChange}
                       placeholder={'最低价'} type={'number'} disableUnderline={true}
                       value={this.state.minPrice === null ? null : this.state.minPrice.toString()}>
                  {this.state.minPrice === null ? '' : this.state.minPrice}
                </Input>
                <span style={{ width: 15, height: 1, backgroundColor: 'black', marginRight: 2, marginLeft: 2 }}/>
                <Input className='center price-input-border' onChange={this.priceMaxChange}
                       placeholder={this.state.maxPrice === null ? '最高价' : this.state.maxPrice.toString()}
                       type={'number'} disableUnderline={true}>
                  {this.state.maxPrice === null ? '' : this.state.maxPrice}
                </Input>
              </div>
            </div>
          </div>
          <span style={{ width: '100%', marginTop: 20 }}><span style={{ marginLeft: 20, fontSize: 14 }}>特色</span></span>
          <div className='horizontal'
               style={{ flexWrap: 'wrap', width: 200 }}>
            {this.state.tagList.map((item, index) => this.renderDrawerTagItem(item.name, item.checked, index))}
          </div>
        </div>
        <div className='vertical-center' onClick={this.drawerSure}
             style={{ fontSize: 20, width: '100%', height: 40, backgroundColor: '#d66b67' }}>
          确定搜索
        </div>
      </div>
    )
  }

  /**
   * 标签样式
   */
  renderDrawerTagItem = (item: string, checked: boolean, index: number) => {
    return (
      checked ?
        <div className='center drawer-tag-item-onClick' onClick={() => this.tagOnClick(index, checked)}>
          <span>{item}</span>
        </div>
        :
        <div className='center drawer-tag-item' onClick={() => this.tagOnClick(index, checked)}>
          <span>{item}</span>
        </div>
    )
  }

  /**
   * 返回
   */
  goBackOnClick = () => {
    history().goBack()
  }

  /**
   * 跳转到购物车
   */
  goShopCart = () => {
    this.props.updatePageTab('HistoryPageTabBar')
    history().push('/')
  }

  /**
   * 点击筛选栏
   */
  chooseOnClick = () => {
    this.setState({
      showChoose: true
    })
  }

  /**
   * 关闭弹窗
   */
  closeHandClick = () => {
    this.setState({
      showChoose: false
    })
  }

  /**
   * 筛选栏回调
   */
  chooseHandClick = (index: number) => {
    this.setState({
      sortIndex: index
    }, () => this.refresh())
  }

  /**
   * 抽屉显示控制
   * @param open
   */
  toggleDrawer = (open) => {
    this.setState({
      drawerOpen: open
    })
  }

  /**
   * 点击抽屉确定
   */
  drawerSure = () => {
    this.setState({
      drawerOpen: false
    })
    this.getSearchList()
  }

  /**
   * 改变最低价
   * @param key
   * @param event
   */
  priceMinChange = (event) => {
    this.setState({
      minPrice: event.target.value
    })
  }

  /**
   * 改变最高价
   * @param event
   */
  priceMaxChange = (event) => {
    this.setState({
      maxPrice: event.target.value
    })
  }

  /**
   * 点击标签
   */
  tagOnClick = (index: number, checked: boolean) => {
    let tagList = this.state.tagList
    tagList[index].checked = !checked
    this.setState({
      tagList
    })
  }

  /**
   * 添加到购物车
   * @param e
   * @param item
   */
  addCartOnClick = (e, item: ProductBean) => {
    // TODO 2018/10/29 添加到购物车
    // 阻止事件冒泡
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    console.log(item + '添加到购物车')
    this.addToCart(item)
  }

  /**
   * 获取搜索结果列表
   */
  getSearchList = () => {
    if (this.state.isLoading) {
      return
    }
    this.setState({
      isLoading: true
    })
    let url = 'CanteenProcurementManager/homepage/productCategory/findAllProductInfoMessage?'
    let param = {
      productName: this.props.searchData.searchText,
      lowerPrice: this.state.minPrice,
      highestPrice: this.state.maxPrice,
      mode: this.getMode(this.state.sortIndex),
      label: this.getLabel(),
      pageNum: this.state.pageNum,
      pageSize: NUM_ROWS
    }
    let data = JSON.stringify(param)
    data = encodeURI(data)
    let query = 'condition=' + data
    axios.post<MyResponse<Array<ProductBean>>>(url + query, data, { headers: { 'Content-Type': 'application/json' } })
      .then(data => {
        console.log('--- data =', data)
        this.setState({
          isLoading: false
        })
        if (data.data.code === 0) {
          this.setState({
            searchResultList: data.data.data
          })
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
        this.setState({
          isLoading: false
        })
      })
  }

  /**
   * 筛选上传数据
   */
  getMode = (index: number): string => {
    switch (index) {
      case 0:
        return 'HighToLow'
      case 1:
        return 'LowToHigh'
      case 2:
        return 'StockHighToLow'
      default:
        return null
    }
  }

  /**
   * 标签组装字符串
   */
  getLabel = (): string => {
    let str = ''
    this.state.tagList.map(item => item.checked ? str += item.name + ',' : null)
    return str
  }

  /**
   * 添加商品到购物车
   */
  addToCart (item: ProductBean) {
    let url = 'CanteenProcurementManager/user/shoppingCart/saveShoppingCart?'
    let query = 'productName=' + item.product_name + '&productPrice=' + item.product_price + '&productWeight=' + 1 +
      '&productTotalPrice=' + item.product_price * 1 + '&productIcon=' + item.product_icon + '&productId=' + item.product_id +
      '&supplierId=' + item.supplier_id
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          Toast.info('添加商品成功', 2, null, false)
          this.props.needReload(true)
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })

  }

  public render () {
    return (
      <div>
        <div className='vertical'
             style={{ backgroundColor: '#efeff5', height: '100vh' }}>
          {this.renderHead()}
          <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></span>
          {this.renderChoose()}
          <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></span>
          {this.renderContentList()}
          <Drawer anchor={'right'} open={this.state.drawerOpen} onClose={() => this.toggleDrawer(false)}>
            {this.renderDrawer()}
          </Drawer>
          {this.state.isLoading && <Loading fullscreen={true}/>}
        </div>
      </div>

    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    searchData: state.searchData
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updatePageTab,
  needReload
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

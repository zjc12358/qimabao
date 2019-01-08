import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, ListView, PullToRefresh } from 'antd-mobile'
import { CategoryItemData } from '@store/reducers/categoryItemDataReducer'
import history from 'history/createHashHistory'
import { Loading, Button } from 'element-react'
import axios from 'axios'
import ReactSVG from 'react-svg'
import { ProductBean } from '@datasources/ProductBean'
import { chooseProduct } from '@store/actions/productDetails_data'
import { updatePageTab } from '@store/actions/global_data'
import ChooseMenu from '@components/ChooseMenu'
import { changeCategoryIndex } from '@store/actions/categoryItem_data'
import LoadMore from '@components/LoadMore'
import Drawer from '@material-ui/core/Drawer'
import Input from '@material-ui/core/Input'
import './homeCss.css'
import './productListCss.css'
import { TagBean } from '@datasources/TagBean'
import { SecondCategoryBean } from '@datasources/SecondCategoryBean'
import { MyResponse } from '@datasources/MyResponse'
import { HomeCategoryItemBean } from '@datasources/HomeCategoryItemBean'
import { number } from 'prop-types'
import { needReload } from '@store/actions/shopCart_data'
import { cloneDeep, isNil } from 'lodash'

const NUM_ROWS = 20

let chooseData = ['价格高到低', '价格低到高', '销量高到低', '优惠优先']
let sortTag = ['有机', '冷冻', '纯天然', '野生', '绿色', '深加工']

export interface Props {
  categoryItemData: CategoryItemData
  chooseProduct: (id: number) => void
  updatePageTab: (pageIndex: string) => void
  changeCategoryIndex: (index: number) => void
  needReload: (needReload: boolean) => void
}

interface State {
  homeCategory: Array<HomeCategoryItemBean>
  secondCategoryList: Array<SecondCategoryBean>
  productList: Array<ProductBean>
  chooseData: Array<string>
  showChoose: boolean
  showCategory: boolean
  categoryIndex: number
  isLoading: boolean
  hasMore: boolean // 是否还有更多
  sortIndex: number // 排序选择
  showSort: boolean // 是否显示排序菜单
  drawerOpen: boolean
  tagList: Array<TagBean>
  minPrice: number // 最低价
  maxPrice: number // 最高价
  categoryClassId: number
  pageNum: number
  count: number // 商品总数
  cartNumber: number
}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {
      homeCategory: this.props.categoryItemData.categoryItemData,
      secondCategoryList: [],
      productList: [],
      chooseData: ['1', '2', '3'],
      showCategory: false,
      categoryIndex: this.props.categoryItemData.index,
      showChoose: false,
      isLoading: false,
      hasMore: true,
      sortIndex: null,
      showSort: false,
      drawerOpen: false,
      tagList: [],
      minPrice: null,
      maxPrice: null,
      categoryClassId: 0,
      pageNum: 1,
      count: 0,
      cartNumber: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        categoryIndex: nextProps.categoryItemData.index
      })
    }
  }

  componentWillMount () {
    this.getSecondCategory()
    this.getTagList()
  }

  refresh () {
    this.setState({
      pageNum: 1,
      hasMore: true
    }, () => this.getProductList())
  }

  loadMore = () => {
    if (!this.state.hasMore) {
      return
    }
    this.setState({
      pageNum: this.state.pageNum + 1
    }, () => this.getProductList())
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

  getCategoryData (): Array<string> {
    let categoryData: Array<string> = []
    this.props.categoryItemData.categoryItemData.map((item) => categoryData.push(item.category_name))
    return categoryData
  }

  /**
   * 头部标题栏
   */
  renderHead = () => {
    return (
      <div style={{ width: '100%', zIndex: 100, position: 'relative' }}>
        <div className='horizontal-center'
             style={{ height: 40, width: '100%', backgroundColor: 'white' }}>
          <div className='horizontal title-back' onClick={() => history().goBack()}>
            <ReactSVG path='./assets/images/ic_back-grey.svg' svgStyle={{ width: 22, height: 22, marginTop: 2 }}/>
          </div>
          {/*标题*/}
          <div className='horizontal-center' onClick={this.headOnClick} style={{ fontSize: 18 }}>
            <span>{this.state.homeCategory[this.state.categoryIndex].category_name}</span>
            {/*<span className='horizontal-center' style={{ marginLeft: 8, marginBottom: 5 }}>*/}
            {/*<ReactSVG path='./assets/images/down.svg' svgStyle={{ width: 8, height: 8 }}/>*/}
            {/*</span>*/}
          </div>
          {/*右边2个按钮*/}
          <div className='horizontal-center right-menu' style={{ justifyContent: 'flex-end' }}>
          <span className='center' style={{ height: 40, width: 40 }} onClick={this.searchOnClick}>
            <ReactSVG path='./assets/images/search.svg' svgStyle={{ width: 22, height: 22 }}/>
          </span>
          <span className='center goToCart' style={{ height: 40, width: 50 }} onClick={this.goCartOnClick}>
            <ReactSVG path='./assets/images/shop_cart.svg' svgClassName='cartLogo' svgStyle={{ width: 22, height: 22 }}/>
            <span className='cartNumber'>{this.state.cartNumber}</span>
          </span>
          </div>
        </div>
        {/*<ChooseMenu data={this.getCategoryData()} chooseHandClick={this.categoryHandClick.bind(this)}*/}
        {/*chooseIndex={this.state.categoryIndex} isShow={this.state.showCategory}*/}
        {/*closeHandClick={this.closePop.bind(this)}*/}
        {/*/>*/}
      </div>
    )
  }

  /**
   * 上方筛选栏
   */
  renderChoose = () => {
    return (
      <div style={{ width: '100%', zIndex: 100 }}>
        <div className='horizontal choose-menu'>
          <span style={{ height: 30, width: 1, marginTop: 5, backgroundColor: '#e5e5e5' }}></span>
          <div className='horizontal-center' style={{ flex: 1 }} onClick={this.chooseOnClick}>
            <span style={{ whiteSpace: 'nowrap' }}>全部分类</span>
            <span style={{ marginLeft: 5 }}>
              <ReactSVG path='./assets/images/down.svg' svgStyle={{ width: 8, height: 8 }}/>
            </span>
          </div>
          <span style={{ height: 30, width: 1, marginTop: 5, backgroundColor: '#e5e5e5' }}></span>
          <div className='horizontal-center'
               style={{ flex: 1 }} onClick={this.sortOnClick}>
            <span
              style={{ whiteSpace: 'nowrap' }}>{this.state.sortIndex === null ? '默认排序' : chooseData[this.state.sortIndex]}</span>
            <span style={{ marginLeft: 5 }}>
              <ReactSVG path='./assets/images/down.svg' svgStyle={{ width: 8, height: 8 }}/>
            </span>
          </div>
          <span style={{ height: 30, width: 1, marginTop: 5, backgroundColor: '#e5e5e5' }}></span>
          <div className='horizontal-center'
               style={{ flex: 1 }} onClick={() => this.toggleDrawer(true)}>
            <span>筛选</span>
            <span style={{ marginLeft: 5 }}>
              <ReactSVG path='./assets/images/right.svg' svgStyle={{ width: 5, height: 5 }}/>
            </span>
          </div>
        </div>
        <ChooseMenu data={this.getCategoryData()} chooseHandClick={this.chooseHandClick.bind(this)}
                    chooseIndex={this.state.categoryIndex} isShow={this.state.showChoose}
                    closeHandClick={this.closePop.bind(this)}/>
        <ChooseMenu closeHandClick={this.closePop.bind(this)} chooseIndex={this.state.sortIndex}
                    data={chooseData} chooseHandClick={this.sortChooseHandClick.bind(this)}
                    isShow={this.state.showSort}/>
      </div>
    )
  }

  /**
   * 下方内容
   */
  renderContent = () => {
    return (
      <div className='horizontal' style={{ flex: 1, width: '100%' }}>
        {this.renderLeftChoose()}
        {this.renderRightProductList()}
      </div>
    )
  }

  /**
   * 左边选择
   */
  renderLeftChoose = () => {
    return (
      <div className='vertical' style={{ height: '100%' }}>
        <div className='touch_scroll scroll' style={{ width: 80, backgroundColor: '#efeff5', height: '100%' }}>
          <div className='vertical' style={{ paddingBottom: 100 }}>
            {this.state.secondCategoryList.map((item, index) => this.renderLeftChooseItem(item, index))}
          </div>
        </div>
      </div>
    )
  }

  /**
   * 左边选择项
   * @param item
   * @param index
   */
  renderLeftChooseItem = (item: SecondCategoryBean, index: number) => {
    return (
      <div className='vertical'
           style={{ width: '100%', height: 41, backgroundColor: item.check ? 'white' : '#efeff5' }}>
        <div className='horizontal-center left-choose-item'
             onClick={() => this.secondItemOnClick(index)}>
          {item.category_class_name}
        </div>
        <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}/>
      </div>

    )
  }

  /**
   * 右边商品列表
   */
  renderRightProductList = () => {
    let list = this.state.productList.map((item) => this.renderRightProductListItem(item))
    return (
      <div className='touch_scroll scroll product-list'
           style={{ backgroundColor: 'white' }}>
        <LoadMore itemHeight={91} list={list} listData={this.state.productList} getData={this.loadMore.bind(this)}
                  isLoading={this.state.isLoading} loadHeight={10} bodyName={'scroll scroll product-list'}
                  hasMore={this.state.hasMore}/>
      </div>
    )
  }

  /**
   * 商品单列
   * @param item
   */
  renderRightProductListItem = (item: ProductBean) => {
    return (
      <div className='vertical'
           style={{ height: 91, width: '100%', backgroundColor: 'white' }}
           onClick={() => this.productOnClick(item.product_id)}>
        <div className='horizontal foodListItem'
             style={{ height: 90, width: '100%' }}>
          <span className='redCart'></span>
          <img className='product-img' src={'./assets/images/SupplierTest/vegetable.png'}/>
          <div className='vertical product-list-item-content'
               style={{ justifyContent: 'space-between' }}>
            <span className='text-nowrap' style={{ width: '100%', marginTop: 10 }}>{item.product_name}</span>
            <div className='product-list-item-describe text-nowrap'>{item.product_description}</div>
            <span className='text-nowrap' style={{ width: '100%', marginTop: 5 }}>{item.supplier_name}</span>
            <div className='horizontal'
                 style={{ justifyContent: 'space-between', width: '100%', marginBottom: 5 }}>
              <div className='horizontal'>
                <span style={{ color: '#ff0000', fontSize: 12 }}>¥</span>
                <span style={{ color: '#ff0000', fontSize: 12 }}>{item.product_price}</span>
                <span style={{ color: '#e5e5e5', fontSize: 12 }}>/500g</span>
              </div>
              <div className='cart-circle' onClick={(e) => this.addCartOnClick(e, item)}>
                <div className='center'>
                  <ReactSVG path='./assets/images/shop_cart_white.svg'
                    svgStyle={{ marginTop: 4, width: 12, height: 12 }}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span style={{ height: 1, backgroundColor: '#e5e5e5', width: '100%' }}/>
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
                       placeholder={'最低价'}
                       type={'number'} disableUnderline={true}
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
             style={{ fontSize: 20, width: '100%', height: 40, backgroundColor: '#0084e7', color: 'white' }}>
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
   * 点击头部修改类别
   */
  headOnClick = () => {
    // TODO 2018/10/29 显示选择弹窗
    // TODO 2018/10/29 选择完请求数据
    // this.setState({
    //   showCategory: true
    // })
  }

  /**
   * 点击搜索
   */
  searchOnClick = () => {
    history().push('/search')
  }

  /**
   * 点击跳转购物车
   */
  goCartOnClick = () => {
    // TODO 2018/10/29 点击去购物车
    this.props.updatePageTab('HistoryPageTabBar')
    history().push('/')
  }

  /**
   * 点击下方类别弹窗
   */
  chooseOnClick = () => {
    this.setState({
      showChoose: true
    })
  }

  /**
   * 下方类别弹窗回调
   */
  chooseHandClick = (index: number) => {
    console.log(index)
    this.props.changeCategoryIndex(index)
    this.setState({
      categoryIndex: index
    }, () => this.getSecondCategory())
  }

  /**
   * 点击筛选
   */
  sortOnClick = () => {
    this.setState({
      showSort: true
    })
  }

  /**
   * 类别选择回调
   * @param index
   */
  categoryHandClick = (index: number) => {
    console.log(index)
    this.setState({
      categoryIndex: index
    }, () => this.getSecondCategory())
  }

  /**
   * 排序方式选择回调
   * @param index
   */
  sortChooseHandClick = (index: number) => {
    this.setState({
      sortIndex: index
    }, () => this.refresh())

  }

  /**
   * 关闭弹窗
   */
  closePop = () => {
    this.setState({
      showChoose: false,
      showCategory: false,
      showSort: false
    })
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
    this.getProductList()
  }

  /**
   * 左边子菜单点击
   */
  secondItemOnClick = (index: number) => {
    if (index === 6) {
      Toast.info('该分类暂未开放', 2, null, false)
    }
    let list = this.state.secondCategoryList
    for (let i = 0; i < this.state.secondCategoryList.length; i++) {
      if (index === i) {
        if (list[i].check === true) {
          return
        } else {
          list[i].check = true
          this.setState({
            categoryClassId: this.state.secondCategoryList[index].category_class_id
          }, () => this.refresh())
        }
      } else {
        list[i].check = false
      }
    }
    this.setState({
      secondCategoryList: list
    })
  }

  /**
   * 跳转到商品详情
   * @param id
   */
  productOnClick = (id: number) => {
    this.props.chooseProduct(id)
    history().push('/productDetails')
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
   * 改变最低价
   * @param key
   * @param event
   */
  priceMinChange = (event) => {
    console.log('minP' + event.target.value)
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
   * 获取二级类目
   */
  getSecondCategory () {
    console.log('获取二级类目')
    let url = 'CanteenProcurementManager/homepage/productCategory/productCategoryClass?'
    let query = 'categoryId=' + this.state.homeCategory[this.state.categoryIndex].category_id
    axios.get<MyResponse<Array<SecondCategoryBean>>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          data.data.data.map((item, index) => index === 0 ? item.check = true : item.check = false)
          this.setState({
            secondCategoryList: data.data.data,
            categoryClassId: data.data.data[0].category_class_id
          }, () => this.refresh())
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })

  }

  /**
   * 获取商品列表
   */
  getProductList () {
    console.log(this.getMode(this.state.sortIndex))
    if (this.state.isLoading) {
      return
    }
    this.setState({
      isLoading: true
    })
    let url = 'CanteenProcurementManager/homepage/productCategory/findAllProductInfoMessage?'
    let param = {
      categoryClassId: this.state.categoryClassId,
      lowerPrice: this.state.minPrice,
      highestPrice: this.state.maxPrice,
      mode: this.getMode(this.state.sortIndex),
      label: this.getLabel(),
      pageNum: this.state.pageNum,
      pageSize: NUM_ROWS
    }
    // let data = new FormData()
    // data.append('categoryClassId', JSON.stringify(this.state.categoryClassId))
    // data.append('categoryId', JSON.stringify(this.state.minPrice))
    // data.append('highestPrice', JSON.stringify(this.state.maxPrice))
    // data.append('mode', JSON.stringify(this.getMode(this.state.sortIndex)))
    // data.append('label', JSON.stringify(this.getLabel()))
    // data.append('pageNum', JSON.stringify(this.state.pageNum))
    // data.append('pageSize', JSON.stringify(NUM_ROWS))
    let data = JSON.stringify(param)
    data = encodeURI(data)
    let query = 'condition=' + data
    axios.post<MyResponse<Array<ProductBean>>>(url + query, data, { headers: { 'Content-Type': 'application/json' } })
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          if (this.state.pageNum === 1) {
            if (!isNil(data.data.data) && data.data.data.length > 0) {
              this.setState({
                productList: data.data.data,
                count: data.data.data[0].count
              }, () => this.state.count < this.state.pageNum * NUM_ROWS && this.setState({ hasMore: false }))
            } else if (data.data.data.length === 0) {
              this.setState({
                productList: data.data.data,
                count: 0,
                hasMore: false
              })
            }
          } else {
            let list = this.state.productList
            let newList = list.concat(data.data.data)
            this.setState({
              productList: newList
            })
            if (this.state.count < this.state.pageNum * NUM_ROWS) {
              this.setState({ hasMore: false })
            }
          }
        } else {
          Toast.info(data.data.msg, 2, null, false)
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
          // Toast.info('添加商品成功', 2, null, false)
          this.setState({ cartNumber: this.state.cartNumber + 1 })
          this.props.needReload(true)
          let redCart = document.getElementsByClassName('redCart')[0]
          console.log(redCart)
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
      <div className='vertical'
           style={{ backgroundColor: '#efeff5', height: '100vh', overflow: 'hidden' }}>
        {this.renderHead()}
        <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}/>
        {this.renderChoose()}
        <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}/>
        {this.renderContent()}
        <Drawer anchor={'right'} open={this.state.drawerOpen} onClose={() => this.toggleDrawer(false)}>
          {this.renderDrawer()}
        </Drawer>
        {/*{window.addEventListener('touchmove', function (event) {*/}
        {/*event.preventDefault()*/}
        {/*}, { passive: false })}*/}
        {this.state.isLoading && <Loading fullscreen={true}/>}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    categoryItemData: state.categoryItemData
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  chooseProduct,
  updatePageTab,
  changeCategoryIndex,
  needReload
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

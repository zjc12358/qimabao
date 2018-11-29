import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, ListView, PullToRefresh } from 'antd-mobile'
import { CategoryItemData } from '@store/reducers/categoryItemDataReducer'
import history from 'history/createHashHistory'
import axios from 'axios'
import ReactSVG from 'react-svg'
import { SecondProductCategoryBean } from '@datasources/SecondProductCategoryBean'
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

const NUM_ROWS = 20
let pageIndex = 0

let chooseData = ['价格高到低', '价格低到高', '销量高到低', '优惠优先']
let sortTag = ['有机', '冷冻', '纯天然', '野生', '绿色', '深加工']

export interface Props {
  categoryItemData: CategoryItemData
  chooseProduct: (id: number) => void
  updatePageTab: (pageIndex: string) => void
  changeCategoryIndex: (index: number) => void
}

interface State {
  secondCategoryList: Array<SecondProductCategoryBean>
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
}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {
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
      maxPrice: null
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
    this.refresh()
    this.getTagList()
  }

  refresh () {
    if (this.state.isLoading) {
      return
    }
    this.setState({ isLoading: true })
    setTimeout(() => {
      this.getData(0)
      this.setState({
        isLoading: false
      })
    }, 1000)
  }

  loadMore = () => {
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    this.setState({ isLoading: true })
    setTimeout(() => {
      this.getData(pageIndex++)
      this.setState({
        isLoading: false
      })
    }, 1000)
  }

  /**
   * 模拟请求数据
   */
  getData (page) {
    console.log('加载数据' + page)
    let secondCategoryList: Array<SecondProductCategoryBean> = []
    let categoryId = this.props.categoryItemData.categoryItemData[this.props.categoryItemData.index].category_id
    for (let i = 0; i < 30; i++) {
      let secondCategoryItem: SecondProductCategoryBean = {
        category_id: categoryId,
        second_category_id: i,
        second_category_name: '子类别' + i,
        check: i === 0
      }
      secondCategoryList.push(secondCategoryItem)
      this.setState({
        secondCategoryList: secondCategoryList
      })
    }
    let productList: Array<ProductBean> = []
    for (let i = 0; i < 10; i++) {
      let product: ProductBean = {
        img: '',
        id: i,
        store: '蓝宇科技',
        describe: '和大家看撒谎哈萨克和大家看撒谎哈萨克和大家看撒谎哈萨克和大家看撒谎哈萨克和大家看撒谎哈萨克和大家看撒谎哈萨克和大家看撒谎哈萨克和大家看撒谎哈萨克',
        price: '',
        weight: '200g',
        name: '商品' + i,
        store_id: 0
      }
      productList.push(product)
    }
    if (page > 0) {
      this.setState({
        productList: this.state.productList.concat(productList)
      })
      pageIndex++
    } else {
      this.setState({
        productList: productList
      })
      pageIndex = 1
    }
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
      <div style={{ width: '100%', zIndex: 100 }}>
        <div className='horizontal-center'
             style={{ height: 40, width: '100%', backgroundColor: 'white' }}>
          <div className='horizontal title-back' onClick={() => history().goBack()}>
            <ReactSVG path='./assets/images/ic_back-grey.svg' svgStyle={{ width: 22, height: 22, marginTop: 2 }}/>
          </div>
          {/*标题*/}
          <div className='horizontal-center' onClick={this.headOnClick} style={{ fontSize: 18 }}>
            <span>{this.props.categoryItemData.categoryItemData[this.props.categoryItemData.index].category_name}</span>
            <span className='horizontal-center' style={{ marginLeft: 8, marginBottom: 5 }}>
              <ReactSVG path='./assets/images/down.svg' svgStyle={{ width: 8, height: 8 }}/>
            </span>
          </div>
          {/*右边2个按钮*/}
          <div className='horizontal-center right-menu' style={{ justifyContent: 'flex-end' }}>
          <span className='center' style={{ height: 40, width: 40 }} onClick={this.searchOnClick}>
            <ReactSVG path='./assets/images/search.svg' svgStyle={{ width: 22, height: 22 }}/>
          </span>
            <span className='center' style={{ height: 40, width: 50 }} onClick={this.goCartOnClick}>
            <ReactSVG path='./assets/images/shop_cart.svg' svgStyle={{ width: 22, height: 22 }}/>
          </span>
          </div>
        </div>
        <ChooseMenu data={this.getCategoryData()} chooseHandClick={this.categoryHandClick.bind(this)}
                    chooseIndex={this.state.categoryIndex} isShow={this.state.showCategory}
                    closeHandClick={this.closePop.bind(this)}
        />
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
  renderLeftChooseItem = (item: SecondProductCategoryBean, index: number) => {
    return (
      <div className='vertical'
           style={{ width: '100%', height: 41, backgroundColor: item.check ? 'white' : '#efeff5' }}>
        <div className='horizontal-center left-choose-item'
             onClick={() => this.secondItemOnClick(index)}>
          {item.second_category_name}
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
      <div className='touch_scroll scroll product-list'>
        <LoadMore itemHeight={71} list={list} listData={this.state.productList} getData={this.loadMore.bind(this)}
                  isLoading={this.state.isLoading} loadHeight={10} bodyName={'scroll product-list'}
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
           style={{ height: 71, width: '100%', backgroundColor: 'white' }}
           onClick={() => this.productOnClick(item.id)}>
        <div className='horizontal'
             style={{ height: 70, width: '100%' }}>
          <img style={{ margin: 5, width: 60, height: 60 }} src={item.img}/>
          <div className='vertical product-list-item-content'>
            <span style={{ marginTop: 5 }}>{item.name}</span>
            <div className='product-list-item-describe text-nowrap'>{item.describe}</div>
            <div className='horizontal'
                 style={{ justifyContent: 'space-between', width: '100%' }}>
              <div className='horizontal'>
                <span style={{ color: '#ff0000', fontSize: 12 }}>¥</span>
                <span style={{ color: '#ff0000', fontSize: 12 }}>{item.price}</span>
                <span style={{ color: '#e5e5e5', fontSize: 12 }}>/{item.weight}</span>
              </div>
              <div className='cart-circle' onClick={(e) => this.addCartOnClick(e, item.id)}>
                <div className='center'>
                  <ReactSVG path='./assets/images/shop_cart_white.svg'
                            svgStyle={{ marginTop: 4, width: 12, height: 12 }}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span style={{ height: 1, backgroundColor: '#e5e5e5', width: '100%', position: 'fixed', bottom: 0 }}></span>
      </div>
    )
  }

  /**
   * 抽屉内部布局
   */
  renderDrawer = () => {
    return (
      <div className='vertical' style={{ height: '100%' }}>
        <span style={{ height: 40, fontSize: 20, marginTop: 20 }}>价格筛选</span>
        <div style={{ margin: 10 }}>
          <div className='price-area-border'>
            <div className='horizontal'>
              <Input style={{ width: 80 }} onChange={this.priceMinChange} defaultValue={'最低价'}
                     type={'number'} disableUnderline={true} className='center price-input-border'>
                {this.state.minPrice === null ? '' : this.state.minPrice}
              </Input>
              <span style={{ width: 10, height: 1 }}></span>
              <Input style={{ width: 80 }} onChange={this.priceMaxChange} defaultValue={'最高价'}
                     type={'number'} disableUnderline={true} className='center price-input-border'>
                {this.state.maxPrice === null ? '' : this.state.maxPrice}
              </Input>
            </div>
          </div>
        </div>
        <span style={{ width: '100%', marginTop: 20 }}><span style={{ marginLeft: 20, fontSize: 14 }}>特色</span></span>
        <div className='horizontal'
             style={{ flexWrap: 'wrap', width: 200 }}>
          {this.state.tagList.map((item, index) => this.renderDrawerTagItem(item.name, item.checked, index))}</div>
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
    this.setState({
      showCategory: true
    })
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
    // TODO 2018/11/7 根据选择类别请求
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
    this.props.changeCategoryIndex(index)
    // TODO 2018/11/8 根据类别请求数据
  }

  /**
   * 排序方式选择回调
   * @param index
   */
  sortChooseHandClick = (index: number) => {
    this.setState({
      sortIndex: index
    })
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
   * 左边子菜单点击
   */
  secondItemOnClick = (index: number) => {
    let list = this.state.secondCategoryList
    for (let i = 0; i < this.state.secondCategoryList.length; i++) {
      if (index === i) {
        list[i].check = true
        // TODO 2018/11/19 请求数据
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
   * @param id
   */
  addCartOnClick = (e, id: number) => {
    // TODO 2018/10/29 添加到购物车
    // 阻止事件冒泡
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    console.log(id + '添加到购物车')
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
   * 获取商品列表
   * @param categoryId 一级分类id
   * @param secondCategoryId 二级分类id
   */
  getProductList (categoryId: number, secondCategoryId: number) {
    axios.get('')
      .then(data => {
        console.log('--- data =', data)
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
        {window.addEventListener('touchmove', function (event) {
          event.preventDefault()
        }, { passive: false })}
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
  changeCategoryIndex
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

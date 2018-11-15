import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, ListView, PullToRefresh } from 'antd-mobile'
import { CategoryItemData } from '@store/reducers/categoryItemDataReducer'
import history from 'history/createHashHistory'
import axios from 'axios'
import { SecondProductCategoryBean } from '@datasources/SecondProductCategoryBean'
import { ProductBean } from '@datasources/ProductBean'
import { chooseProduct } from '@store/actions/productDetails_data'
import { updatePageTab } from '@store/actions/global_data'
import ChooseMenu from '@components/ChooseMenu'
import { changeCategoryIndex } from '@store/actions/categoryItem_data'
import LoadMore from '@components/LoadMore'
import Drawer from '@material-ui/core/Drawer'
import './homeCss.css'
import './productListCss.css'

const NUM_ROWS = 20
let pageIndex = 0

let chooseData = ['价格高到低', '价格低到高', '销量高到低', '优惠优先']

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
      isLoading: true,
      hasMore: true,
      sortIndex: null,
      showSort: false,
      drawerOpen: false
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
    setTimeout(() => {
      this.getData(0)
      this.setState({
        isLoading: false
      })
    }, 1500)
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
        second_category_name: '子类别' + i
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
        describe: '和大家看撒谎的空间撒活动撒U盾OS爱都殴打的萨达哈萨克的哈萨克的哈萨克的哈萨克',
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
      <div style={{
        width: '100%'
      }}>
        <div className='horizontal-center'
             style={{ height: 40, width: '100%', backgroundColor: 'white' }}>
          <div onClick={this.headOnClick} style={{ fontSize: 18 }}>
            <span>{this.props.categoryItemData.categoryItemData[this.props.categoryItemData.index].category_name}</span>
            <span>↓</span>
          </div>
          <div className='horizontal'
               style={{
                 position: 'fixed',
                 left: 0,
                 width: 60,
                 height: 40,
                 color: 'black',
                 paddingLeft: 10
               }} onClick={() => history().goBack()}>
            返回
          </div>
          {/*右边2个按钮*/}
          <div className='horizontal-center right-menu'
               style={{
                 position: 'fixed',
                 right: 0,
                 height: 40
               }}>
          <span className='center' style={{ height: 40, width: 60 }} onClick={this.searchOnClick}>
            搜索
          </span>
            <span className='center' style={{ height: 40, width: 60 }} onClick={this.goCartOnClick}>
            购物车
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
      <div style={{ width: '100%' }}>
        <div className='horizontal'
             style={{
               height: 40,
               width: '100%',
               backgroundColor: 'white'
             }}>
          <span style={{ height: 30, width: 1, marginTop: 5, backgroundColor: '#e5e5e5' }}></span>
          <div className='horizontal-center'
               style={{ flex: 1 }} onClick={this.chooseOnClick}>
            <span style={{ whiteSpace: 'nowrap' }}>全部分类</span>
            <span>↓</span>
          </div>
          <span style={{ height: 30, width: 1, marginTop: 5, backgroundColor: '#e5e5e5' }}></span>
          <div className='horizontal-center'
               style={{ flex: 1 }} onClick={this.sortOnClick}>
            <span
              style={{ whiteSpace: 'nowrap' }}>{this.state.sortIndex === null ? '默认排序' : chooseData[this.state.sortIndex]}</span>
            <span>↓</span>
          </div>
          <span style={{ height: 30, width: 1, marginTop: 5, backgroundColor: '#e5e5e5' }}></span>
          <div className='horizontal-center'
               style={{ flex: 1 }} onClick={() => this.toggleDrawer(true)}>
            <span>筛选</span>
            <span>→</span>
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
      <div className='horizontal'
           style={{ height: '100%', width: '100%', flex: 1 }}>
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
      <div className='scroll vertical'>
        <div style={{ width: 60 }}>
          {this.state.secondCategoryList.map((item, index) => this.renderLeftChooseItem(item, index))}
        </div>
        <span style={{ width: 1, height: '100%', backgroundColor: '#e5e5e5', position: 'fixed', right: 0 }}></span>
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
           style={{ width: '100%', height: 41 }}>
        <div className='horizontal-center left-choose-item'
             onClick={() =>
               console.log('点击' + index)
               // TODO 2018/11/15 请求数据
               // this.getProductList(item.category_id, item.second_category_id)
             }>
          {item.second_category_name}
        </div>
        <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></span>
      </div>

    )
  }

  /**
   * 右边商品列表
   */
  renderRightProductList = () => {
    let list = this.state.productList.map((item) => this.renderRightProductListItem(item))
    return (
      <div className='scroll product-list' style={{ flex: 1 }}>
        <LoadMore itemHeight={71} list={list} listData={this.state.productList} getData={this.loadMore.bind(this)}
                  isLoading={this.state.isLoading} loadHeight={10} bodyName={'scroll product-list'}
                  hasMore={this.state.hasMore}/>
        <span style={{ width: 1, height: '100%', backgroundColor: '#e5e5e5', position: 'fixed', right: 0 }}></span>
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
            <div className='product-list-item-describe'>{item.describe}</div>
            <div className='horizontal'
                 style={{ justifyContent: 'space-between', width: '100%' }}>
              <div className='horizontal'>
                <span style={{ color: '#ff0000', fontSize: 12 }}>¥</span>
                <span style={{ color: '#ff0000', fontSize: 12 }}>{item.price}</span>
                <span style={{ color: '#e5e5e5', fontSize: 12 }}>/{item.weight}</span>
              </div>
              <div style={{ padding: 10 }} onClick={(e) => this.addCartOnClick(e, item.id)}>添</div>
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
              <div className='center price-input-border'>最低价</div>
              <div>-</div>
              <div className='center price-input-border'>最高价</div>
            </div>
          </div>
        </div>
        <span style={{ width: '100%', marginTop: 20 }}><span style={{ marginLeft: 20, fontSize: 14 }}>特色</span></span>
        <div className='horizontal'></div>
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
   * 跳转到商品详情
   * @param id
   */
  productOnClick = (id: number) => {
    this.props.chooseProduct(id)
    history().push('/productDetails')
  }

  /**
   * 添加到购物车
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
           style={{
             backgroundColor: '#efeff5',
             height: '100vh'
           }}>
        {this.renderHead()}
        <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></span>
        {this.renderChoose()}
        <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></span>
        {this.renderContent()}
        <Drawer anchor={'right'} open={this.state.drawerOpen} onClose={() => this.toggleDrawer(false)}>
          {this.renderDrawer()}
        </Drawer>
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

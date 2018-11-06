import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { CategoryItemData } from '@store/reducers/categoryItemDataReducer'
import history from 'history/createHashHistory'
import axios from 'axios'
import { SecondProductCategoryBean } from '@datasources/SecondProductCategoryBean'
import './homeCss.css'
import { ProductBean } from '@datasources/ProductBean'
import { updateCategoryItem } from '@store/actions/categoryItem_data'
import { chooseProduct } from '@store/actions/productDetails_data'
import { updatePageTab } from '@store/actions/global_data'

export interface Props {
  categoryItemData: CategoryItemData
  chooseProduct: (id: number) => void
  updatePageTab: (pageIndex: string) => void
}

interface State {
  secondCategoryList: Array<SecondProductCategoryBean>
  productList: Array<ProductBean>
}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      secondCategoryList: [],
      productList: []
    }
  }

  componentWillMount () {
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
      this.setState({
        productList: productList
      })
    }
  }

  /**
   * 头部标题栏
   */
  renderHead = () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: '100%',
        backgroundColor: 'white'
      }} onClick={this.headOnClick}>
        <div style={{ fontSize: 18 }}>
          {this.props.categoryItemData.categoryItemData[this.props.categoryItemData.index].category_name}↓
        </div>
        <div style={{
          position: 'fixed',
          left: 0,
          width: 60,
          height: 40,
          color: 'black',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingLeft: 10
        }} onClick={() => history().goBack()}>
          返回
        </div>
        {/*右边2个按钮*/}
        <div style={{
          position: 'fixed',
          right: 0,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 40
        }}>
          <span style={{
            height: 40,
            width: 40,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5
          }} onClick={this.searchOnClick}>
            搜索
          </span>
          <span style={{
            height: 40,
            width: 40,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5
          }} onClick={this.goCartOnClick}>
            购物车
          </span>
        </div>
      </div>
    )
  }

  /**
   * 上方筛选栏
   */
  renderChoose = () => {
    return (
      <div style={{
        height: 40,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
      }}>
        <span style={{ height: 30, width: 1, marginTop: 5, backgroundColor: '#e5e5e5' }}></span>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <span>全部分类</span>
          <span>↓</span>
        </div>
        <span style={{ height: 30, width: 1, marginTop: 5, backgroundColor: '#e5e5e5' }}></span>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <span>默认排序</span>
          <span>↓</span>
        </div>
        <span style={{ height: 30, width: 1, marginTop: 5, backgroundColor: '#e5e5e5' }}></span>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <span>筛选</span>
          <span>→</span>
        </div>
      </div>
    )
  }

  /**
   * 下方内容
   */
  renderContent = () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        flex: 1
      }}>
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
      <div className='scroll'>
        <div style={{
          width: 60,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
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
      <div style={{
        width: '100%',
        height: 41,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <div style={{
          height: 40,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 10,
          backgroundColor: 'white'
        }} onClick={() =>
          console.log('点击' + index)
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
    return (
      <div className='scroll' style={{ flex: 1 }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
          {this.state.productList.map((item) => this.renderRightProductListItem(item))}
        </div>
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 71,
        width: '100%',
        backgroundColor: 'white'
      }} onClick={() => this.productOnClick(item.id)}>
        <div style={{
          height: 70,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '100%',
          alignItems: 'center'
        }}>
          <img style={{ margin: 5, width: 60, height: 60 }} src={item.img}/>
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            marginLeft: 5,
            marginRight: 5
          }}>
            <span style={{ marginTop: 5 }}>{item.name}</span>
            <div style={{
              fontSize: 12,
              color: '#e5e5e5',
              textOverflow: 'ellipsis'
            }}>{item.describe}</div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}>
                <span style={{ color: '#ff0000', fontSize: 12 }}>¥</span>
                <span style={{ color: '#ff0000', fontSize: 12 }}>{item.price}</span>
                <span style={{ color: '#e5e5e5', fontSize: 12 }}>/{item.weight}</span>
              </div>
              <div style={{
                padding: 10
              }} onClick={(e) => this.addCartOnClick(e, item.id)}>添
              </div>
            </div>
          </div>
        </div>
        <span style={{ height: 1, backgroundColor: '#e5e5e5', width: '100%', position: 'fixed', bottom: 0 }}></span>
      </div>
    )
  }

  /**
   * 点击头部修改类别
   */
  headOnClick = () => {
    // TODO 2018/10/29 显示选择弹窗
    // TODO 2018/10/29 选择完请求数据
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

  public render () {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#efeff5',
        height: '100vh'
      }}>
        {this.renderHead()}
        <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></span>
        {this.renderChoose()}
        <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></span>
        {this.renderContent()}
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
  updatePageTab
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, Carousel, Pagination } from 'antd-mobile'
import axios from 'axios'
import { ProductDetailBean } from '@datasources/ProductDetailBean'
import history from 'history/createHashHistory'
import { PicBean } from '@datasources/PicBean'
import { Loading, Button } from 'element-react'
import { chooseProduct } from '@store/actions/productDetails_data'
import { updatePageTab } from '@store/actions/global_data'
import ReactSVG from 'react-svg'
import './productDetailCss.css'
import { MyResponse } from '@datasources/MyResponse'
import { cloneDeep, get, isNil } from 'lodash'
import { ProductBean } from '@datasources/ProductBean'
import { needReload } from '@store/actions/shopCart_data'

let topPic = ['http://file4.youboy.com/e/2015/3/14/73/541738.jpg',
  'http://files.b2b.cn/product/ProductImages/2015_03/13/110/13110252636_b.jpg',
  'http://pic.58pic.com/58pic/14/88/80/76C58PICvQx_1024.jpg']

export interface Props {
  productDetailsData: {
    productId: number
  }
  chooseProduct: (id: number) => void
  updatePageTab: (pageIndex: string) => void
  needReload: (needReload: boolean) => void
}

interface State {
  productDetails?: ProductDetailBean
  topImgData: Array<string>
  imgHeight: any
  scrollY: number
  current: number
  isLoading: boolean,
  cartNumber: number
}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      productDetails: null,
      topImgData: topPic,
      imgHeight: 176,
      scrollY: 0,
      current: 0,
      isLoading: false,
      cartNumber: null
    }
  }

  componentWillMount () {
    let id = this.props.productDetailsData.productId
    this.getProductDetail(id)
  }

  componentDidMount () {
    // 获取滑动y高度
    // document.getElementsByClassName('vertical detail-content')[0].addEventListener('scrollTop', () =>
    //     console.log(document.getElementsByClassName('vertical detail-content')[0].scrollTop)
    //   // this.setState({
    //   //   scrollY: document.getElementsByClassName('detail-content')[0].scrollTop
    //   // })
    // ,{ passive: false })
  }

  touchStart (e) {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      scrollY: document.getElementsByClassName('bigContent scroll touch_scroll')[0].scrollTop
    })
  }

  touchMove (e) {
    console.log('滑动')
    this.setState({
      scrollY: document.getElementsByClassName('bigContent scroll touch_scroll')[0].scrollTop
    })
  }

  touchEnd (e) {
    console.log('滑动结束')
    this.setState({
      scrollY: document.getElementsByClassName('bigContent scroll touch_scroll')[0].scrollTop
    })
  }

  /**
   * 滑动控制透明度的头部
   */
  renderHead = () => {
    return (
      <div className='horizontal'
           style={{
             position: 'fixed',
             top: 0,
             justifyContent: 'center',
             fontSize: 18,
             width: '100%',
             height: 40,
             backgroundColor: 'transparent',
             zIndex: 100
           }}>
        {/*{this.state.productDetails !== null && this.state.productDetails!!.product_name}*/}
        <div className='horizontal-center'
             style={{
               position: 'fixed',
               top: 5,
               left: 10,
               height: 30
             }} onClick={() => history().goBack()}>
          <ReactSVG className='center' path='./assets/images/ic_back_white.svg' svgStyle={{
            width: 24, height: 24,
            padding: 2,
            backgroundColor: '#b2b2b2',
            borderStyle: 'solid',
            borderWidth: 0,
            borderRadius: '50%'
          }}/>
        </div>
        <div className='horizontal-center'
             style={{
               position: 'fixed',
               top: 5,
               right: 10,
               height: 30
             }} onClick={() => this.goCartOnClick()}>
          {/*<img src='./assets/images/home.png' style={{ width: 32, height: 32 }} />*/}
          <div className='center' style={{
            borderStyle: 'solid',
            borderWidth: 0,
            borderRadius: '50%'
          }}>
            <ReactSVG className='center'
                      path='./assets/images/ic_shop_cart_white.svg'
                      svgStyle={{
                        width: 24, height: 24,
                        padding: 2,
                        backgroundColor: '#b2b2b2',
                        borderStyle: 'solid',
                        borderWidth: 0,
                        borderRadius: '50%'
                      }}
            />
          </div>
        </div>
      </div>
    )
  }

  /**
   * 页面内容区
   */
  renderContent = () => {
    return (
      // FIXME：滑动有问题
      <div className='bigContent scroll touch_scroll'
           style={{ flex: 1 }}
           onScroll={this.touchMove.bind(this)}>
        <div className='vertical detail-content'>
          {this.renderTopPic()}
          {this.renderDetailsInfo()}
          <span style={{ height: 1, width: '100%', backgroundColor: '#e5e5e5' }}/>
          {this.renderEvaluation()}
          <span style={{ height: 1, width: '100%', backgroundColor: '#e5e5e5' }}/>
          {this.renderBottomPic()}
        </div>
      </div>
    )
  }

  /**
   * 顶部图片
   */
  renderTopPic = () => {
    return (
      <div style={{
        width: '100%',
        height: 350,
        position: 'relative'
      }}>
        <Carousel
          autoplay={false}
          infinite={false}
          afterChange={(current) => this.afterChange(current)}
          style={{ height: 350 }}
        >
          {this.state.topImgData.map(val => (
            <a
              key={val} style={{ display: 'inline-block', width: '100%', height: 350 }}>
              <img
                src={val} alt='' style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'))
                  this.setState({ imgHeight: 'auto' })
                }}
              />
            </a>
          ))}
        </Carousel>
        <div style={{ position: 'absolute', bottom: 10, right: 30, color: '#333333', fontSize: 20 }}>
          <span>{this.state.current + 1}</span>
          <span>/</span>
          <span>{this.state.topImgData.length}</span>
        </div>
      </div>
    )
  }

  renderStarts = () => {
    let starts = []
    for (let i = 0; i < 5; i++) {
      starts.push(
        <ReactSVG path={'./assets/images/Supplier/star.svg'} svgStyle={{ width: 15, height: 15 }}/>
      )
    }
    return starts
  }

  /**
   * 商品详细信息
   */
  renderDetailsInfo = () => {
    return (
      this.state.productDetails === null ?
        <div style={{
          fontSize: 20,
          backgroundColor: 'white',
          height: 125,
          width: '100%'
        }}>
          未获取到商品详细 {this.state.scrollY}
        </div>
        :
        <div className='horizontal'
             style={{ height: 125, backgroundColor: 'white', width: '100%' }}>
          <div className='vertical' style={{ marginRight: 20, marginLeft: 20, flex: 1 }}>
            <div style={{ width: '100%' }}>
              <div style={{ fontSize: '18px' }}>{this.state.productDetails.product_name}</div>
              <div style={{
                color: 'rgb(153, 153, 153)',
                marginTop: 5
              }}>{this.state.productDetails.product_description}</div>
              <div style={{ marginTop: 5 }}>
                <span style={{ fontSize: '18px', color: '#ff6161' }}>￥{this.state.productDetails.product_price}</span>
                <span style={{ color: 'rgb(153, 153, 153)' }}>/500g</span>
              </div>
              <div className='horizontal'
                   style={{
                     justifyContent: 'space-between',
                     marginTop: 5
                   }}>
                <div style={{ display: 'flex' }}>
                  {this.renderStarts()}
                </div>
                <div>{this.state.productDetails.product_volume}人购买</div>
              </div>
              <div className='horizontal'
                   style={{
                     color: 'rgb(153, 153, 153)',
                     marginTop: 5
                   }}>
                <span style={{ flex: 1 }}>快递:免运费</span>
                <span style={{ flex: 1 }}>库存:{this.state.productDetails.product_stock}</span>
                <span style={{ flex: 1 }}>产地:衢州</span>
              </div>
            </div>
          </div>
        </div>
    )
  }

  /**
   * 评价栏
   */
  renderEvaluation = () => {
    return (
      (this.state.productDetails === null || isNil(this.state.productDetails.product_evaluation_item)) &&
      <div className='vertical'
           style={{ width: '100%', backgroundColor: 'white', color: 'black' }}>
        <div className='horizontal evaluation-head'>
          <span style={{ fontSize: 18, paddingLeft: 20 }}>商品评价</span>
          <span style={{ color: 'red', paddingRight: 20 }}>
            ({this.state.productDetails === null || this.state.productDetails.product_evaluation_number === null ?
            0 : this.state.productDetails.product_evaluation_number})
          </span>
        </div>
        {this.state.productDetails === null || isNil(this.state.productDetails.product_evaluation_item) ?
          <div style={{ fontSize: 20 }}>暂无评价</div>
          :
          <div className='horizontal' style={{ justifyContent: 'space-between' }}>
            <span></span>
          </div>
        }
        <div className='horizontal-center'
             style={{ width: '100%', height: 60 }}>
          <div className='more-evaluation'>
            查看更多评论+
          </div>
        </div>
      </div>
    )
  }

  /**
   * 底部图片区
   */
  renderBottomPic = () => {
    return (
      <div className='vertical'
           style={{
             width: '100%',
             backgroundColor: 'white'
           }}>
        <span className='horizontal'
              style={{
                height: 40,
                fontSize: 18,
                paddingLeft: 20
              }}>产品详情</span>
        {this.state.productDetails === null || isNil(this.state.productDetails.product_bottom_pic) || this.state.productDetails.product_bottom_pic.length < 1 ? null :
          <div>
            {!isNil(this.state.productDetails.product_bottom_pic) && this.state.productDetails.product_bottom_pic.map((item) => this.renderBottomPicItem(item))}
          </div>
        }
      </div>
    )
  }

  /**
   * 按钮区
   */
  renderButton = () => {
    return (
      <div className='horizontal'
           style={{ height: 40, width: '100%', backgroundColor: 'white' }}>
        {/*<div className='horizontal-center left-btn' onClick={this.collectionOnClick}>*/}
        {/*{this.state.productDetails === null ?*/}
        {/*<ReactSVG path='./assets/images/un_collect.svg' svgStyle={{ width: 24, height: 24 }}/> :*/}
        {/*this.state.productDetails.product_collect ?*/}
        {/*<ReactSVG path='./assets/images/collect.svg' svgStyle={{ width: 24, height: 24 }}/> :*/}
        {/*<ReactSVG path='./assets/images/un_collect.svg' svgStyle={{ width: 24, height: 24 }}/>*/}
        {/*}*/}
        {/*</div>*/}
        {/*<div className='horizontal-center left-btn' onClick={this.goCartOnClick}>*/}
        {/*<ReactSVG path='./assets/images/shop_cart_grey.svg' svgStyle={{ width: 24, height: 24 }}/>*/}
        {/*</div>*/}
        <div className='vertical-center fill-btn'
             onClick={this.addCartOnClick}>
          加入购物车
        </div>
        {/*<div className='horizontal-center fill-btn-buy'*/}
        {/*onClick={this.buyOnClick}>*/}
        {/*立即购买*/}
        {/*</div>*/}
      </div>
    )
  }

  /**
   * 底部单个图片样式
   */
  renderBottomPicItem = (item: PicBean) => {
    return (
      <img style={{
        width: '100%',
        height: 200
      }} src={item.picture_url}/>
    )
  }

  /**
   * 跳转首页
   */
  goHomeOnClick = () => {
    this.props.updatePageTab('HomePageTabBar')
    history().push('/')
  }

  /**
   * 切换面板后的回调函数
   */
  afterChange = (index: number) => {
    this.setState({
      current: index
    })
  }

  /**
   * 查看更多评价
   */
  moreEvaOnClick = () => {
    // TODO 2018/10/31 查看更多评论
    console.log('查看更多评论')
    if (this.state.productDetails !== null && this.state.productDetails.product_id !== null) {
      this.props.chooseProduct(this.state.productDetails.product_id)
      history().push('/moreEvaluation')
    } else {
      Toast.info('加载未完成')
    }
    // history().push('/moreEvaluation')
  }

  /**
   * 收藏
   */
  collectionOnClick = () => {
    // TODO 2018/11/2 收藏
  }

  /**
   * 跳转购物车
   */
  goCartOnClick = () => {
    // TODO 2018/11/2 跳转购物车
    this.props.updatePageTab('HistoryPageTabBar')
    history().push('/')
  }

  /**
   * 加入购物车
   */
  addCartOnClick = () => {
    this.addToCart(this.state.productDetails)
  }

  /**
   * 立即购买
   */
  buyOnClick = () => {
    // TODO 2018/11/2 立即购买
  }

  /**
   * 获取商品详情
   */
  getProductDetail (id: number) {
    if (this.state.isLoading) {
      return
    }
    this.setState({
      isLoading: true
    })
    let url = 'CanteenProcurementManager/homepage/productCategory/productCategoryById?'
    let query = 'productId=' + id
    axios.get<MyResponse<ProductDetailBean>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          this.setState({
            productDetails: data.data.data
          })
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
   * 添加商品到购物车
   */
  addToCart (item: ProductDetailBean) {
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
      <div className='vertical'
           style={{ width: '100%', backgroundColor: '#efeff5', height: '100%' }}>
        {this.renderHead()}
        {this.renderContent()}
        {this.renderButton()}
        {this.state.isLoading && <Loading fullscreen={true}/>}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    productDetailsData: state.productDetailsData
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  chooseProduct,
  updatePageTab,
  needReload
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

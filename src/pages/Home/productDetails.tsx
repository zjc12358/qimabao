import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, Carousel, Pagination } from 'antd-mobile'
import axios from 'axios'
import { ProductDetailBean } from '@datasources/ProductDetailBean'
import history from 'history/createHashHistory'
import { PicBean } from '@datasources/PicBean'
import { chooseProduct } from '@store/actions/productDetails_data'
import { updatePageTab } from '@store/actions/global_data'
import ReactSVG from 'react-svg'
import './productDetailCss.css'

export interface Props {
  productDetailsData: {
    productId: number
  }
  chooseProduct: (id: number) => void
  updatePageTab: (pageIndex: string) => void
}

interface State {
  productDetails?: ProductDetailBean
  topImgData: Array<string>
  imgHeight: any
  scrollY: number
  width: any
  current: number
}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      productDetails: null,
      topImgData: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      imgHeight: 176,
      scrollY: 0,
      width: window.screen.availWidth,
      current: 0
    }
  }

  componentWillMount () {
    let id = this.props.productDetailsData.productId
    // TODO 2018/10/30 根据id获取商品信息
    this.getProductDetail(id)
  }

  componentDidMount () {
    // 获取滑动y高度
    window.addEventListener('scroll', () =>
      this.setState({
        scrollY: window.scrollY
      })
    )
    let width = window.screen.availWidth
    this.setState({
      width: width
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
             backgroundColor: 'white',
             zIndex: 100,
             opacity: (this.state.scrollY / this.state.width)
           }}>
        默认名{this.state.productDetails !== null && this.state.productDetails!!.product_name}
        <div className='horizontal-center'
             style={{
               paddingLeft: 10,
               paddingRight: 10,
               position: 'fixed',
               top: 5,
               left: 0,
               height: 30
             }} onClick={() => history().goBack()}>
          <ReactSVG path='./assets/images/circle_back.svg' svgStyle={{ width: 30, height: 30 }}/>
        </div>
        <div className='horizontal'
             style={{
               justifyContent: 'center',
               paddingLeft: 10,
               paddingRight: 10,
               position: 'fixed',
               top: 5,
               right: 0,
               height: 30
             }} onClick={() => this.goHomeOnClick()}>
          <ReactSVG path='./assets/images/go_home.svg' svgStyle={{ width: 28, height: 28 }}/>
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
        height: 0,
        paddingBottom: '100%',
        position: 'relative'
      }}>
        <Carousel
          autoplay={false}
          infinite={false}
          afterChange={(current) => this.afterChange(current)}
        >
          {this.state.topImgData.map(val => (
            <a
              key={val}
              href='http://www.alipay.com'
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=''
                style={{ width: '100%', verticalAlign: 'top' }}
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
          未获取到商品详细
        </div>
        :
        <div className='vertical'
             style={{
               height: 125,
               padding: 20,
               backgroundColor: 'white',
               width: '100%'
             }}>
          <div>{this.state.productDetails.product_name}</div>
          <div style={{ color: '#e5e5e5' }}>{this.state.productDetails.product_describe}</div>
          <div>
            <span style={{ color: '#ff6161' }}>{this.state.productDetails.product_price}</span>
            <span>/</span>
            <span>{this.state.productDetails.product_weight}</span>
          </div>
          <div className='horizontal'
               style={{
                 justifyContent: 'space-between'
               }}>
            <div>4星</div>
            <div>{this.state.productDetails.product_sales}人购买</div>
          </div>
          <div className='horizontal'
               style={{
                 color: '#e5e5e5'
               }}>
            <span style={{ flex: 1 }}>快递:免运费</span>
            <span style={{ flex: 1 }}>库存:{this.state.productDetails.product_inventory}</span>
            <span style={{ flex: 1 }}>产地:{this.state.productDetails.product_origin}</span>
          </div>
        </div>
    )
  }

  /**
   * 评价栏
   */
  renderEvaluation = () => {
    return (
      <div className='vertical'
           style={{
             width: '100%',
             backgroundColor: 'white'
           }}>
        <div className='horizontal'
             style={{
               justifyContent: 'space-between',
               fontSize: 18,
               height: 40,
               width: '100%',
               backgroundColor: 'white'
             }}>
          <span style={{
            fontSize: 18,
            paddingLeft: 20
          }}>商品评价</span>
          <span style={{
            color: 'red',
            paddingRight: 20
          }}>({this.state.productDetails === null || this.state.productDetails.product_evaluation_number === null ? 0 : this.state.productDetails.product_evaluation_number})</span>
        </div>
        {this.state.productDetails === null || this.state.productDetails.product_evaluation_item === null ?
          <div style={{ fontSize: 20 }}>暂无评价</div>
          :
          <div className='horizontal'
               style={{
                 justifyContent: 'space-between'
               }}>
            <span></span>
          </div>
        }
        <div className='horizontal'
             style={{
               width: '100%',
               height: 60,
               justifyContent: 'center'
             }}>
          <div style={{
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 7,
            paddingBottom: 7,
            fontSize: 18,
            color: '#ffaf7a',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#ffaf7a',
            borderRadius: 20
          }} onClick={this.moreEvaOnClick}>
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
        {this.state.productDetails === null || this.state.productDetails.product_bottom_pic === null || this.state.productDetails.product_bottom_pic.length < 1 ? null :
          <div>
            {this.state.productDetails.product_bottom_pic.map((item) => this.renderBottomPicItem(item))}
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
           style={{
             height: 50,
             width: '100%',
             position: 'fixed',
             bottom: 0,
             backgroundColor: 'white'
           }}>
        <div className='horizontal-center left-btn' onClick={this.collectionOnClick}>
          {this.state.productDetails === null ?
            <ReactSVG path='./assets/images/un_collect.svg' svgStyle={{ width: 24, height: 24 }}/> :
            this.state.productDetails.product_collect ?
              <ReactSVG path='./assets/images/collect.svg' svgStyle={{ width: 24, height: 24 }}/> :
              <ReactSVG path='./assets/images/un_collect.svg' svgStyle={{ width: 24, height: 24 }}/>
          }
        </div>
        <div className='horizontal-center left-btn' onClick={this.goCartOnClick}>
          <ReactSVG path='./assets/images/shop_cart_grey.svg' svgStyle={{ width: 24, height: 24 }}/>
        </div>
        <div className='vertical-center fill-btn'
             onClick={this.addCartOnClick}>
          加入购物车
        </div>
        <div className='horizontal-center fill-btn-buy'
             onClick={this.buyOnClick}>
          立即购买
        </div>
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
        height: 0,
        paddingBottom: '100%'
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
    history().push('/moreEvaluation')
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
    // TODO 2018/11/2 加入购物车
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
             width: '100%',
             backgroundColor: '#efeff5',
             marginBottom: 60
           }}>
        {this.renderHead()}
        {this.renderTopPic()}
        {this.renderDetailsInfo()}
        <span style={{ height: 1, width: '100%', backgroundColor: '#e5e5e5' }}></span>
        {this.renderEvaluation()}
        <span style={{ height: 1, width: '100%', backgroundColor: '#e5e5e5' }}></span>
        {this.renderBottomPic()}
        <ul>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ul>
        {this.renderButton()}
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
  updatePageTab
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

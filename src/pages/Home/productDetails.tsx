import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, Carousel } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { ProductDetailBean } from '@datasources/ProductDetailBean'
import history from 'history/createHashHistory'

export interface Props {
  productDetailsData: {
    productId: number
  }
}

interface State {
  productDetails?: ProductDetailBean
  topImgData: Array<string>
  imgHeight: any
  scrollY: number
  width: any
}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      productDetails: null,
      topImgData: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      imgHeight: 176,
      scrollY: 0,
      width: window.screen.availWidth
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
      <div style={{
        position: 'fixed',
        top: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        zIndex: 100,
        opacity: (this.state.scrollY / this.state.width)
      }}>
        默认名{this.state.width}{this.state.productDetails !== null && this.state.productDetails!!.product_name}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
          position: 'fixed',
          top: 5,
          left: 0,
          height: 30
        }} onClick={() => history().goBack()}>
          返回
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
          position: 'fixed',
          top: 5,
          right: 0,
          height: 30
        }}>
          主页
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
        paddingBottom: '100%'
      }}>
        <Carousel
          autoplay={true}
          infinite={true}
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
      </div>
    )
  }

  renderContent = () => {
    return (
      <ul style={{
        height: 2000
      }}>
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
    )
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#efeff5'
      }}>
        {this.renderHead()}
        {this.renderTopPic()}
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    productDetailsData: state.productDetailsData
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

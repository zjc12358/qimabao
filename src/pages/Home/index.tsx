import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, Carousel, Toast } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { HomeCategoryItemBean } from '@datasources/HomeCategoryItemBean'
import Statusbar from '@components/Statusbar'
import axios from 'axios'
import ReactSVG from 'react-svg'
import history from 'history/createHashHistory'
import { ProductListState } from '@datasources/ProductListState'
import { updateCategoryItem } from '@store/actions/categoryItem_data'
import { updatePageTab } from '@store/actions/global_data'
import { MyResponse } from '@datasources/MyResponse'
import * as dd from 'dingtalk-jsapi'

let categoryData = ['时令蔬菜', '肉禽蛋类', '海鲜水产', '新鲜水果', '粮油副食', '酒水饮料', '乳品烘焙', '敬请期待', '敬请期待']
let carouselData = ['./assets/images/ic_home_top0.png', './assets/images/ic_home_top1.png']

function ddScan () {
  dd.biz.util.scan({
    type: 'qrCode',
    onSuccess: function (data) {
      alert(data.text)
    },
    onFail : function (err) {
      alert(JSON.stringify(err))
    }
  })
    .catch(err => console.log(err.toString() + '好的'))
}

export interface Props {
  pageTab: string
  updateCategoryItem: (categoryItemData: Array<HomeCategoryItemBean>, index: number) => void
  updatePageTab: (pageTab: string) => void
}

interface State {
  imgData: Array<string>
  homeCategoryItemData: Array<HomeCategoryItemBean>
  // commodityListState: ProductListState
  imgHeight: any
}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      imgData: [],
      homeCategoryItemData: [],
      imgHeight: 0
    }
  }

  componentWillMount () {
    // this.getHomeCategory()
  }

  componentDidMount () {
    this.getHomeCategory()
    // simulate img loading
    // setTimeout(() => {
    //   this.setState({
    //     imgData: carouselData
    //   })
    //   let categoryList: Array<HomeCategoryItemBean> = []
    //   for (let i = 0; i < 9; i++) {
    //     let categoryItem: HomeCategoryItemBean = {
    //       category_id: i,
    //       category_name: categoryData[i],
    //       category_picture: './assets/images/ic_home' + i + '.png',
    //       show: false
    //     }
    //     categoryList.push(categoryItem)
    //     this.setState({
    //       homeCategoryItemData: categoryList
    //     })
    //   }
    // }, 100)
  }

  /**
   * 顶部搜索框和按钮
   */
  renderHead = () => {
    return (
      <div className='vertical'
           style={{
             position: this.props.pageTab === 'HomePageTabBar' ? 'fixed' : 'static',
             top: '0',
             width: '100%',
             zIndex: 100
           }}>
        <div className='horizontal'
             style={{
               width: '100%',
               background: '#0084E7',
               height: 40
             }}>
          <div className='horizontal-center' style={{
            flex: 1
          }} onClick={this.locationOnclick}>
            <ReactSVG path='./assets/images/location.svg' svgStyle={{ width: 20, height: 22 }}/>
          </div>
          {/*<Link style={{*/}
          {/*flex: 1*/}
          {/*}} to='/test'>*/}
          {/*测试*/}
          {/*</Link>*/}
          <div style={{
            flex: 5,
            borderStyle: 'solid',
            borderWidth: 0,
            borderRadius: 25,
            backgroundColor: 'white',
            height: 30
          }} onClick={this.searchOnclick}>

          </div>
          <div className='horizontal-center' style={{
            flex: 1, marginLeft: 5
          }} onClick={this.scanOnclick} >
            <ReactSVG path='./assets/images/scan_one_scan.svg' svgStyle={{ width: 20, height: 20 }}/>
          </div>
          <div className='horizontal-center' style={{
            flex: 1, marginRight: 5
          }} onClick={this.messageOnclick}>
            <ReactSVG path='./assets/images/message.svg' svgStyle={{ width: 24, height: 24 }}/>
          </div>
        </div>
        <div style={{ width: '100%' }} className='horizontal'>
          <span style={{
            borderStyle: 'solid',
            borderWidth: 0,
            borderRadius: 20,
            backgroundColor: 'white',
            padding: '5px 20px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }} onClick={this.locationOnclick}>送至朝晖社区111111111</span>
        </div>
      </div>
    )
  }

  /**
   * 轮播图
   */
  renderCarousel = () => {
    return (
      <div className='vertical' style={{
        width: '100%'
      }}>
        <Carousel
          autoplay={true}
          infinite={true}
        >
          {carouselData.map((val, index) => (
            <a
              key={val}
              href='http://www.alipay.com'
              style={{ display: 'inline-block', width: '100%', paddingLeft: 10, paddingRight: 10 }}
            >
              <img
                src={val}
                style={{
                  width: '100%', verticalAlign: 'top',
                  borderStyle: 'solid',
                  borderWidth: 0,
                  borderRadius: 10
                }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'))
                  this.setState({ imgHeight: 'auto' })
                }}
              />
            </a>
          ))}
        </Carousel>
        {this.renderIconList()}
      </div>

    )
  }

  /**
   * 分类选择区
   */
  renderIconList = () => {
    return (
      <div className='horizontal'
           style={{
             alignItems: 'flex-start',
             width: '100%',
             flexWrap: 'wrap'
           }}>
        {this.state.homeCategoryItemData.map((item, index) => this.renderIconListItem(item, index))}
      </div>
    )
  }

  /**
   * 首页单个图标 样式
   * @param item
   * @param index
   */
  renderIconListItem = (item, index) => {
    return (
      <div className='vertical-center'
           style={{
             width: '33%'
           }} onClick={() => this.iconItemOnclick(index)}>
        <div className='vertical'
             style={{
               position: 'relative',
               bottom: '83%',
               justifyContent: 'center',
               paddingTop: 20
             }}>
          <img style={{ width: 70, height: 70 }} src={item.category_picture}/>
          <div style={{ marginTop: 10 }}>
            {item.category_name}
          </div>
        </div>
      </div>
    )
  }

  /**
   * 点击头部定位
   */
  locationOnclick = () => {
    // TODO 2018/10/24 点击头部定位按钮
    console.log('定位')
    history().push('/selectAddress')
  }

  /**
   * 点击头部搜索
   */
  searchOnclick = () => {
    this.props.updatePageTab('HomePageTabBar')
    history().push('/search')
  }

  /**
   * 点击头部扫一扫
   */
  scanOnclick = () => {
    // TODO 2018/10/24 点击头部扫一扫
    ddScan()
    console.log('扫一扫')
  }

  /**
   * 点击头部消息按钮
   */
  messageOnclick = () => {
    // TODO 2018/10/24 点击头部消息
    console.log('打开消息')
  }

  /**
   * 点击类别
   */
  iconItemOnclick = (index) => {
    // TODO 2018/10/25 点击单个类别
    console.log('打开商品列表')
    this.props.updateCategoryItem(this.state.homeCategoryItemData, index)
    // this.state.commodityListState.index = index
    this.props.updatePageTab('HomePageTabBar')
    history().push('/productList')
  }

  /**
   * 获取首页分类
   */
  getHomeCategory = () => {
    const url = 'CanteenProcurementManager/homepage/productCategory/firstPageList'
    console.error(url)
    axios.get<MyResponse<Array<HomeCategoryItemBean>>>(url)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          this.setState({
            homeCategoryItemData: data.data.data
          })
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!', 1)
      })
  }

  public render () {
    return (
      <div className='vertical' style={{
        height: '100%',
        backgroundColor: 'white'
      }}>
        {this.renderHead()}
        <div className='touch_scroll scroll bigContent'
             style={{ paddingTop: 50 }}>
          {this.renderCarousel()}
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    pageTab: state.globalData.pageTab
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updateCategoryItem,
  updatePageTab
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

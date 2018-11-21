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

let categoryData = ['时令蔬菜', '肉禽蛋类', '海鲜水产', '新鲜水果', '粮油副食', '酒水饮料', '乳品烘焙', '敬请期待', '敬请期待']
let categoryPic = ['https://mockplus.oss-cn-hangzhou.aliyuncs.com/html2/bDWlS8I1MNrES9q6/202/0EDCD3EB-42DB-412B-9411-E5DD751EB4BA/B3E828810C7B4D13EB725B8A499D7702.png?Expires=1542781368&OSSAccessKeyId=8Z8chL8RsuW2Ju4s&Signature=xbxut%2FGK9A6NCzKJ06eOYdRbOz4%3D',
  'https://mockplus.oss-cn-hangzhou.aliyuncs.com/html2/bDWlS8I1MNrES9q6/202/0EDCD3EB-42DB-412B-9411-E5DD751EB4BA/7E26898C2E42538671F96FEE398B3354.png?Expires=1542781699&OSSAccessKeyId=8Z8chL8RsuW2Ju4s&Signature=GMhnMx5niVw2aAQ8xdVoXeomNSM%3D',
  'https://mockplus.oss-cn-hangzhou.aliyuncs.com/html2/bDWlS8I1MNrES9q6/202/0EDCD3EB-42DB-412B-9411-E5DD751EB4BA/84B94891EAF778767D8D3D12376F91BB.png?Expires=1542781733&OSSAccessKeyId=8Z8chL8RsuW2Ju4s&Signature=qtaUe6EPRNce9gkAJN2%2FGbdG4V4%3D',
  'https://mockplus.oss-cn-hangzhou.aliyuncs.com/html2/bDWlS8I1MNrES9q6/202/0EDCD3EB-42DB-412B-9411-E5DD751EB4BA/2857326667D902FC5B785A9F1EA83C7C.png?Expires=1542782014&OSSAccessKeyId=8Z8chL8RsuW2Ju4s&Signature=uTCj5gYMwyF4k%2BxnhoYMA29x7%2FY%3D',
  'https://mockplus.oss-cn-hangzhou.aliyuncs.com/html2/bDWlS8I1MNrES9q6/202/0EDCD3EB-42DB-412B-9411-E5DD751EB4BA/C1D2BD7B2E0941F157A418AC35ADF112.png?Expires=1542782032&OSSAccessKeyId=8Z8chL8RsuW2Ju4s&Signature=QqzND8Roh1ss638uM8NM5AJFxrI%3D',
  'https://mockplus.oss-cn-hangzhou.aliyuncs.com/html2/bDWlS8I1MNrES9q6/202/0EDCD3EB-42DB-412B-9411-E5DD751EB4BA/0CEA8AFE3A63CB361B6AD1DB1E58BB37.png?Expires=1542782047&OSSAccessKeyId=8Z8chL8RsuW2Ju4s&Signature=cYcL9TqOFO5BhFnk4kitWuofTtE%3D',
  'https://mockplus.oss-cn-hangzhou.aliyuncs.com/html2/bDWlS8I1MNrES9q6/202/0EDCD3EB-42DB-412B-9411-E5DD751EB4BA/6B6D4D77CF697A5AB1B962593B163DF0.png?Expires=1542782061&OSSAccessKeyId=8Z8chL8RsuW2Ju4s&Signature=%2BPtrJi1Xq5aGn5qqf5H3xomujt8%3D',
  'https://mockplus.oss-cn-hangzhou.aliyuncs.com/html2/bDWlS8I1MNrES9q6/202/0EDCD3EB-42DB-412B-9411-E5DD751EB4BA/6B6D4D77CF697A5AB1B962593B163DF0.png?Expires=1542782061&OSSAccessKeyId=8Z8chL8RsuW2Ju4s&Signature=%2BPtrJi1Xq5aGn5qqf5H3xomujt8%3D',
  'https://mockplus.oss-cn-hangzhou.aliyuncs.com/html2/bDWlS8I1MNrES9q6/202/0EDCD3EB-42DB-412B-9411-E5DD751EB4BA/6B6D4D77CF697A5AB1B962593B163DF0.png?Expires=1542782061&OSSAccessKeyId=8Z8chL8RsuW2Ju4s&Signature=%2BPtrJi1Xq5aGn5qqf5H3xomujt8%3D']
let carouselData = ['https://mockplus.oss-cn-hangzhou.aliyuncs.com/html2/bDWlS8I1MNrES9q6/202/0EDCD3EB-42DB-412B-9411-E5DD751EB4BA/FEA56E3460715231516D03ADE6AD6CA2.png?Expires=1542782923&OSSAccessKeyId=8Z8chL8RsuW2Ju4s&Signature=QgxpnQMKXusIvntklGFpd2V4M08%3D',
  'https://mockplus.oss-cn-hangzhou.aliyuncs.com/html2/bDWlS8I1MNrES9q6/202/0EDCD3EB-42DB-412B-9411-E5DD751EB4BA/B63BA27207F08B98C57D5C5E4772DBD9.png?Expires=1542782965&OSSAccessKeyId=8Z8chL8RsuW2Ju4s&Signature=E4%2BgH06d4Jbe7O8mZ1iiMMfmU%2Fs%3D']

export interface Props {
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
      imgData: carouselData,
      homeCategoryItemData: [],
      imgHeight: 0
    }
  }

  componentWillMount () {
    let categoryList: Array<HomeCategoryItemBean> = []
    for (let i = 0; i < 9; i++) {
      let categoryItem: HomeCategoryItemBean = {
        category_id: i,
        category_name: categoryData[i],
        category_picture: categoryPic[i]
      }
      categoryList.push(categoryItem)
      this.setState({
        homeCategoryItemData: categoryList
      })
    }
    // this.getHomeCategory()
  }

  componentDidMount () {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        imgData: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI']
      })
    }, 100)
  }

  /**
   * 顶部搜索框和按钮
   */
  renderHead = () => {
    return (
      <div className='vertical'
           style={{
             position: 'fixed',
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
          }} onClick={this.scanOnclick}>
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
      <div style={{
        width: '100%',
        marginTop: 50
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
                  width: '100%', verticalAlign: 'top', height: this.state.imgHeight,
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
             flexWrap: 'wrap',
             marginTop: 40
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
      <div className='vertical'
           style={{
             justifyContent: 'center',
             paddingTop: 10,
             height: 0,
             width: '33%',
             paddingBottom: '34%'
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
   * 获取首页分类
   */
  getHomeCategory = () => {
    const url = 'CanteenProcurementManager/homepage/productCategory/firstPageList'
    axios.get(url)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.status === '0') {
          this.setState({
            homeCategoryItemData: data.data.data
          })
        } else {
          if (data.data.status === '-100') {
            let redirectUrl = window.location.hash.includes('redirectUrl')
              ? `/${window.location.hash.split('=')[1]}`
              : '/'
            window.location.hash = redirectUrl === '/userCenter' ? '/?tabBar=userCenter' : redirectUrl
            Toast.info('登录失效,请先登录', 1)
          } else {
            Toast.info(data.data.msg, 1)
          }
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!', 1)
      })
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

  public render () {
    return (
      <div className='vertical scroll' style={{
        height: '100vh',
        backgroundColor: 'white'
      }}>
        {this.renderHead()}
        {this.renderCarousel()}
        {this.renderIconList()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updateCategoryItem,
  updatePageTab
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

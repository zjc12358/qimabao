import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, Carousel, Toast } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { HomeCategoryItemBean } from '@datasources/HomeCategoryItemBean'
import Statusbar from '@components/Statusbar'
import axios from 'axios'
import history from 'history/createHashHistory'
import { ProductListState } from '@datasources/ProductListState'
import { updateCategoryItem } from '@store/actions/categoryItem-data'
import { updatePageTab } from '@store/actions/global-data'

export interface Props {
  updateCategoryItem: (categoryItemData: Array<HomeCategoryItemBean>, index: number) => void
  updatePageTab: (pageTab: string) => void
}

interface State {
  imgData: any
  homeCategoryItemData: Array<HomeCategoryItemBean>
  // commodityListState: ProductListState
}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      imgData: [],
      homeCategoryItemData: []
    }
  }

  componentWillMount () {
    let categoryList: Array<HomeCategoryItemBean> = []
    for (let i = 0; i < 10; i++) {
      let categoryItem: HomeCategoryItemBean = {
        category_id: i,
        category_name: '类别' + i,
        category_picture: '' + i
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
      <div style={{
        position: 'fixed',
        top: '0',
        width: '100%',
        height: '40px',
        background: '#0084E7',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 100,
        paddingLeft: 10,
        paddingRight: 10
      }}>
        {/*<div style={{*/}
        {/*flex: 1*/}
        {/*}} onClick={this.locationOnclick}>*/}
        {/*定位图标*/}
        {/*</div>*/}
        <Link style={{
          flex: 1
        }} to='/test'>
          测试
        </Link>
        <div style={{
          flex: 5,
          borderStyle: 'solid',
          borderWidth: 0,
          borderRadius: 25,
          backgroundColor: 'white',
          height: 30
        }} onClick={this.searchOnclick}>

        </div>
        <div style={{
          flex: 1
        }} onClick={this.scanOnclick}>
          扫一扫
        </div>
        <div style={{
          flex: 1
        }} onClick={this.messageOnclick}>
          消息图标
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
        margin: 10,
        borderStyle: 'solid',
        borderWidth: 0,
        borderRadius: 10,
        marginTop: 70
      }}>
        <Carousel
          autoplay={true}
          infinite={true}
          style={{
            height: 140
          }}
        >
          {this.state.imgData.map(val => (
            <a
              key={val}
              href='http://www.alipay.com'
              style={{
                display: 'inline-block', height: 140
              }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=''
                style={{
                  verticalAlign: 'top'
                }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'))
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
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        flexWrap: 'wrap',
        marginTop: 10
      }}>
        {this.state.homeCategoryItemData.map((item, index) => this.renderIconListItem(item, index))}
      </div>
    )
  }

  renderIconListItem = (item, index) => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        height: 0,
        width: '33%',
        paddingBottom: '34%'
      }} onClick={() => this.iconItemOnclick(index)}>
        <div style={{
          position: 'relative',
          bottom: '83%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 10
        }}>
          <div>
            {item.category_picture}
          </div>
          <div>
            {item.category_name}
          </div>
        </div>
      </div>
    )
  }

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
  }

  /**
   * 点击头部搜索
   */
  searchOnclick = () => {
    // TODO 2018/10/24 点击搜索跳转搜索页
    console.log('搜索')
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
      <div style={{
        height: '100%'
      }}>
        <Statusbar/>
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

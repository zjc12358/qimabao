import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, Icon } from 'antd-mobile'
import { cloneDeep, isNil } from 'lodash'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import Head from '../../components/Head'
import './homeCss.css'
import './selectAddressCss.css'
import Input from '@material-ui/core/Input'
import ReactSVG from 'react-svg'
import { AddressListBean } from '@datasources/MapBean/AddressListBean'
import { AddressDetailBean } from '@datasources/MapBean/AddressDetailBean'
import { MyAddressDetailBean } from '@datasources/MyAddressDetailBean'
import { Map } from 'react-amap'
import Geolocation from 'react-amap-plugin-geolocation'
import { MyResponse } from '@datasources/MyResponse'
import { AddressBean } from '@datasources/AddressBean'
import { Loading } from 'element-react'
import * as dd from 'dingtalk-jsapi'

export interface Props {

}

interface State {
  showTitle: boolean
  searchText: string
  mapAddressList: Array<AddressDetailBean>
  myAddressList: Array<AddressBean>
  nearbyAddressList: Array<AddressDetailBean>
  inLocation: boolean
  mapCenter: object
  isLoading: boolean
  position: any
}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      showTitle: true,
      searchText: '',
      mapAddressList: [],
      myAddressList: [],
      nearbyAddressList: [],
      inLocation: true,
      mapCenter: { longitude: 120, latitude: 30 },
      isLoading: false,
      position: [0, 0]
    }
  }

  componentWillMount () {
    this.getAddressList()
  }

  /**
   * 右边新增地址按钮
   */
  rightAddAddress = () => {
    return (
      <div className='text-nowrap' style={{ color: '#0084e7', fontSize: 14 }}>新增地址</div>
    )
  }

  /**
   * 所有内容
   */
  renderContent = () => {
    return (
      <div className='vertical' style={{ flex: 1, width: '100%' }}>
        {this.renderSearch()}
        {!this.state.showTitle &&
        this.state.searchText.length > 0 ?
          null :
          <div style={{ width: '100%' }}>
            {this.renderMyAddress()}
            {this.renderNearbyAddress()}
            {this.renderMoreAddress()}
          </div>}
      </div>
    )
  }

  /**
   * 搜索栏
   */
  renderSearch = () => {
    return (
      <div className='vertical search' style={{
        height: !this.state.showTitle && this.state.searchText.length > 0 ? '100%' : 'auto'
      }}>
        <div className='horizontal search-title'>
          <div className='search-border horizontal-center'>
            <ReactSVG path='./assets/images/ic_location_6d.svg' svgStyle={{ width: 15, height: 20 }}/>
            <Input
              placeholder={'请输入您的收货地址'}
              onFocus={this.searchOnFocus}
              onChange={(event) => this.searchOnChange(event)}
              disableUnderline={true}
              style={{ width: '100%', zIndex: 100, marginLeft: 5 }}
            />
          </div>
          {!this.state.showTitle &&
          <span className='horizontal-center search-cancel-btn' onClick={this.allCancelOnClick}>取消</span>}
        </div>
        {!this.state.showTitle && (
          this.state.searchText.length > 0 ?
            this.renderAddressList() :
            <div className='search-background' onClick={this.allCancelOnClick}/>)
        }
      </div>
    )
  }

  /**
   * 地址列表
   */
  renderAddressList = () => {
    return (
      <div className='touch_scroll' style={{ maxWidth: '100%', flex: 1 }}>
        <div className='vertical'>
          {this.state.mapAddressList.map((item, index) => this.renderAddressListItem(item, index))}
        </div>
      </div>
    )
  }

  /**
   * 地址单条样式
   */
  renderAddressListItem = (item: AddressDetailBean, index: number) => {
    return (
      <div className='vertical' style={{ height: 61, width: '100%', backgroundColor: 'white' }}
           onClick={() => this.addressOnClick(index)}>
        <div className='vertical address-item'>
          <span className='address-title text-nowrap' style={{
            color: index === 0 ? '#000000' : '#a6a6a6',
            maxWidth: '90%'
          }}>{item.name}</span>
          <span className='address-detail text-nowrap' style={{ maxWidth: '90%' }}>{item.address}</span>
        </div>
        <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}/>
      </div>
    )
  }

  /**
   * 我的收货地址
   */
  renderMyAddress = () => {
    return (
      <div className='vertical' style={{ justifyContent: 'space-between', width: '100%' }}>
        <div className='horizontal' style={{ height: 40, width: '100%' }}>
          <div style={{ paddingLeft: 20 }}>我的收货地址</div>
        </div>
        <div style={{ width: '100%' }}>
          {!isNil(this.state.myAddressList) && this.state.myAddressList.map((item) => this.renderMyAddressItem(item))}
        </div>
      </div>
    )
  }

  /**
   * 我的地址单列
   */
  renderMyAddressItem = (item: AddressBean) => {
    return (
      <div className='horizontal my-address-item'>
        <div className='vertical my-address-item-info'>
          <div className='horizontal my-address-item-top'>
            <span>{item.receiving_name} </span>
            <span>&nbsp; {item.receiving_iphone}</span>
          </div>
          <div className='horizontal my-address-item-bottom'>
            <div className='text-nowrap'
                 style={{ width: '100%' }}>{item.receiving_address + item.receiving_address_detail}</div>
          </div>
        </div>
        {item.defaultId === item.receiving_id.toString() &&
        <ReactSVG path='./assets/images/ic_check_0084.svg' svgStyle={{ width: 20, height: 20, marginRight: 15 }}/>}
      </div>
    )
  }

  /**
   * 附近地址
   */
  renderNearbyAddress = () => {
    // const onComplete = (data: any) => {
    //   alert(data + '定位成功')
    //   this.setState({
    //     position: [data.position.getLng(), data.position.getLat()]
    //   }, () => console.log(this.state.position))
    // }
    // const onError = () => {
    //   alert('定位失败')
    //   // that.setState({
    //   //     position:[112.58032,37.857965]
    //   // })
    // }
    // const events = {
    //   created: (instance: any, window: any) => {
    //     console.log(instance + '=====' + window + '===123')
    //     instance.plugin('AMap.Geolocation', () => {
    //       const geolocation = new window.AMap.Geolocation({
    //         enableHighAccuracy: true,// 是否使用高精度定位，默认:true
    //         timeout: 10000,          // 超过10秒后停止定位，默认：无穷大
    //         maximumAge: 0,           // 定位结果缓存0毫秒，默认：0
    //         convert: true,           // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
    //         showButton: true,        // 显示定位按钮，默认：true
    //         buttonPosition: 'RB',    // 定位按钮停靠位置，默认：'LB'，左下角
    //         buttonOffset: new window.AMap.Pixel(14, 130),// 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    //         showMarker: false,        // 定位成功后在定位到的位置显示点标记，默认：true
    //         showCircle: false,        // 定位成功后用圆圈表示定位精度范围，默认：true
    //         panToLocation: true,     // 定位成功后将定位到的位置作为地图中心点，默认：true
    //         zoomToAccuracy: true      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    //       })
    //       instance.addControl(geolocation)
    //       geolocation.getCurrentPosition()
    //       window.AMap.event.addListener(geolocation, 'complete', onComplete)// 返回定位信息
    //       window.AMap.event.addListener(geolocation, 'error', onError)      // 返回定位出错信息
    //     })
    //   }
    // }
    return (
      <div className='vertical' style={{ justifyContent: 'space-between', width: '100%' }}>
        <div className='horizontal' style={{ height: 40, width: '100%' }}
             onClick={this.getLocation}>
          <div style={{ paddingLeft: 20 }}>附近地址</div>
        </div>
        <div>
          {this.state.nearbyAddressList.map((item, index) => this.renderNearbyAddressItem(item, index))}
        </div>
        <div>
          <Map amapkey={'e062e2a80c3e0e1c31a588faa9822dcb'}
            // events={events}
               plugins={['Scale', 'ToolBar']}
               zoom={16}>
          </Map>
        </div>
      </div>
    )
  }

  /**
   * 附近地址 单列
   */
  renderNearbyAddressItem = (item: AddressDetailBean, index: number) => {
    return (
      <div className='vertical'>
        <div className='horizontal' style={{ height: 40, width: '100%' }}>
          <span>{item.name}</span>
          {index === 0 &&
          <div>
            <div className='horizontal-center' style={{ marginRight: 10 }} onClick={this.relocationOnCLick}>
              {this.state.inLocation ?
                <Icon type={'loading'}/> :
                <ReactSVG path='./assets/images/ic_map_location.svg' svgStyle={{ width: 20, height: 20 }}/>
              }
              <span className='vertical-center' style={{ color: '#0084e7' }}>重新定位</span>
            </div>
          </div>
          }
        </div>
        <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></span>
      </div>
    )
  }

  /**
   * 更多地址
   */
  renderMoreAddress = () => {
    return (
      <div style={{ width: '100%' }}
           onClick={this.moreAddressOnClick}>
        <div className='horizontal more-address'>
          <span>更多地址</span>
          <ReactSVG path=''/>
        </div>
      </div>
    )
  }

  /**
   * 新增地址
   */
  addAddressOnClick = () => {
    history().push('/addNewAddress')
  }

  /**
   * 搜索框聚焦
   */
  searchOnFocus = () => {
    this.setState({
      showTitle: false
    })
  }

  /**
   * 搜索框改变文字
   */
  searchOnChange = (event) => {
    console.log('输入' + event.target.value)
    this.setState({
      searchText: event.target.value
    }, () => this.getMapAddressList())
  }

  /**
   * 搜索框点击提交
   */
  searchOnSubmit = () => {
    console.log('提交')
  }

  /**
   * 点击搜索背景
   */
  allCancelOnClick = () => {
    console.log('取消')
    this.setState({
      showTitle: true
    })
  }

  /**
   * 点击地址
   */
  addressOnClick = (index: number) => {
    console.log('点击地址' + index)
    if (index > 0) {
      Toast.info('该地址不在配送范围内', 2, null, false)
    } else {
      Toast.info('选择该收货地址', 2, null, false)
    }
  }

  /**
   * 重新定位
   */
  relocationOnCLick = () => {
    // TODO 2018/11/22 重新定位
    console.log('重新定位')
  }

  /**
   * 更多地址
   */
  moreAddressOnClick = () => {
    dd.biz.map.locate({
      latitude: this.state.position[0],
      longitude: this.state.position[1]
    })
      .then(result => {
        alert('成功' + result)
      })
      .catch(err => {
        alert('失败' + err.errorMessage)
      })
  }

  /**
   * 获取收货地址列表
   */
  getAddressList () {
    if (this.state.isLoading) {
      return
    }
    this.setState({
      isLoading: true
    })
    let url = 'CanteenProcurementManager/user/receivingAddress/AddressList'
    let query = ''
    axios.get<MyResponse<Array<AddressBean>>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        this.setState({
          isLoading: false
        })
        if (data.data.code === 0) {
          this.setState({
            myAddressList: data.data.data
          })
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
        this.setState({
          isLoading: false
        })
      })
  }

  /**
   * 高德搜索地址api
   */
  getMapAddressList = () => {
    if (this.state.searchText.length < 1) {
      return
    }
    let url = 'https://restapi.amap.com/v3/place/text?'
    let key = 'e062e2a80c3e0e1c31a588faa9822dcb'
    let city = 'quzhou'
    let citylimit = 'true'

    let query = 'key=' + key + '&keywords=' + this.state.searchText + '&city=' + city + '&citylimit=' + citylimit
    axios.get<AddressListBean>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.status === '1') {
          this.setState({
            mapAddressList: data.data.pois
          })
        } else {
          Toast.info(data.data.info)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }

  /**
   * 获取位置信息
   */
  getLocation = () => {
    dd.device.geolocation.get({
      targetAccuracy: 200,
      coordinate: 1,
      withReGeocode: false,
      useCache: true // 默认是true，如果需要频繁获取地理位置，请设置false
    })
      .then((result) => {
        // this.onComplete(result)
        this.setState({
          position: [result.latitude, result.longitude]
        })
      })
      .catch((err) => {
        alert('失败' + err.errorMessage)
      })
  }

  public render () {
    return (
      <div className='vertical' style={{ backgroundColor: '#efeff5', height: '100%', width: '100%' }}>
        {this.state.showTitle &&
        <Head title={'选择收货地址'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#ffffff'}
              rightIconOnClick={this.addAddressOnClick.bind(this)} showRightIcon={true}
              rightIconContent={this.rightAddAddress()}/>
        }
        {this.renderContent()}
        {this.state.isLoading && <Loading fullscreen={true}/>}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

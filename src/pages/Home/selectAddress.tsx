import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, Icon } from 'antd-mobile'
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

export interface Props {

}

interface State {
  showTitle: boolean
  searchText: string
  mapAddressList: Array<AddressDetailBean>
  myAddressList: Array<MyAddressDetailBean>
  nearbyAddressList: Array<AddressDetailBean>
  inLocation: boolean
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
      inLocation: true
    }
  }

  /**
   * 搜索栏
   */
  renderSearch = () => {
    return (
      <div className='vertical search'
           style={{ marginTop: (this.state.showTitle ? 40 : 0) }}>
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
          <span className='horizontal-center search-cancel-btn' onClick={this.allCancelOnClick}>取消</span>
          }
        </div>
        {
          !this.state.showTitle &&
          this.state.searchText.length > 0 ?
            <div className='search-result'>
              {this.renderAddressList()}
            </div>
            :
            <div className='search-background'
                 onClick={this.allCancelOnClick}>
            </div>
        }
      </div>
    )
  }

  /**
   * 地址
   */
  renderMyAddress = () => {
    return (
      <div className='vertical' style={{ justifyContent: 'space-between' }}>
        <div className='horizontal' style={{ height: 40, width: '100%' }}>
          <div style={{ paddingLeft: 20 }}>我的收货地址</div>
        </div>
        <div>
          {this.state.myAddressList.map((item) => this.renderMyAddressItem(item))}
        </div>
      </div>
    )
  }

  /**
   * 我的地址单列
   */
  renderMyAddressItem = (item: MyAddressDetailBean) => {
    return (
      <div className='horizontal my-address-item'>
        <div className='vertical my-address-item-info'>
          <div className='horizontal my-address-item-top'>
            <span>{item.userName} </span>
            <span> {item.mobile}</span>
          </div>
          <div className='horizontal my-address-item-bottom'>
            {item.address + item.houseNumber}
          </div>
        </div>
        {item.default &&
        <ReactSVG path='./assets/images/ic_check_0084.svg' svgStyle={{ width: 20, height: 20 }}/>}
      </div>
    )
  }

  /**
   * 附近地址
   */
  renderNearbyAddress = () => {
    return (
      <div className='vertical' style={{ justifyContent: 'space-between' }}>
        <div className='horizontal' style={{ height: 40, width: '100%' }}>
          <div style={{ paddingLeft: 20 }}>附近地址</div>
        </div>
        <div>
          {this.state.nearbyAddressList.map((item, index) => this.renderNearbyAddressItem(item, index))}
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
          <div className='horizontal-center' style={{ marginRight: 10 }} onClick={this.relocationOnCLick}>
            {/*{this.state.inLocation ? */}
              {/*<Icon type={}/>*/}
            {/*}*/}
            <ReactSVG path='./assets/images/ic_map_location.svg' svgStyle={{ width: 20, height: 20 }}/>
            <span className='vertical-center' style={{ color: '#0084e7' }}>重新定位</span>
          </div>
          }
        </div>
        <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></span>
      </div>
    )
  }

  /**
   * 地址列表
   */
  renderAddressList = () => {
    return (
      <div className='vertical' style={{ marginTop: 40, width: '100%', flex: 1 }}>
        {this.state.mapAddressList.map((item, index) => this.renderAddressListItem(item, index))}
      </div>
    )
  }

  /**
   * 地址单条样式
   */
  renderAddressListItem = (item: AddressDetailBean, index: number) => {
    return (
      <div className='vertical' style={{ height: 61, width: '100%' }}
           onClick={() => this.addressOnClick(index)}>
        <div className='vertical address-item'>
          <span className='address-title text-nowrap'>{item.name}</span>
          <span className='address-detail text-nowrap'>{item.address}</span>
        </div>
        <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></span>
      </div>
    )
  }

  /**
   * 新增地址
   */
  addAddressOnClick = () => {
    history().push('')
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
    }, () => this.getAddressList())
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
  }

  /**
   * 重新定位
   */
  relocationOnCLick = () => {
    // TODO 2018/11/22 重新定位
    console.log('重新定位')
  }

  /**
   * 高德搜索地址api
   */
  getAddressList () {
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

  public render () {
    return (
      <div style={{ backgroundColor: '#efeff5', height: '100vh', width: '100%' }}>
        {this.state.showTitle &&
        <Head title={'选择收货地址'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#ffffff'}
              rightIconOnClick={this.addAddressOnClick} showRightIcon={true}/>
        }
        {this.renderSearch()}
        {this.renderMyAddress()}
        {this.renderNearbyAddress()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

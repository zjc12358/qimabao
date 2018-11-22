import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import Head from '../../components/Head'
import './homeCss.css'
import './selectAddressCss.css'
import Input from '@material-ui/core/Input'
import ReactSVG from 'react-svg'

export interface Props {

}

interface State {
  showTitle: boolean
  searchText: string
}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      showTitle: true,
      searchText: ''
    }
  }

  /**
   * 搜索栏
   */
  renderSearch = () => {
    return (
      <div className='vertical selectAddress search'
           style={{ marginTop: (this.state.showTitle ? 40 : 0) }}>
        <div className='horizontal search-title'>
          <div className='search-border horizontal-center'>
            <ReactSVG path='./assets/images/ic_location_6d.svg' svgStyle={{ width: 15, height: 20 }}/>
            <Input
              placeholder={'请输入您的收货地址'}
              onFocus={this.searchOnFocus}
              onChange={(event) => this.searchOnChange(event)}
              disableUnderline={true}
              style={{
                width: '100%',
                zIndex: 100,
                marginLeft: 5
              }}
            />
          </div>
          {!this.state.showTitle &&
          <span className='horizontal-center search-cancel-btn' onClick={this.allCancelOnClick}>取消</span>
          }
        </div>
        {
          !this.state.showTitle &&
          this.state.searchText.length > 0 ?
            <div className='vertical search-result'>
              {this.renderAddressList}
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
   * 地址列表
   */
  renderAddressList = () => {
    return (
      <div>
      </div>
    )
  }

  /**
   * 地址单条样式
   */
  renderAddressListItem = (item, index: number) => {
    return (
      <div className='vertical' style={{ height: 61, width: '100%' }}
           onClick={() => this.addressOnClick(index)}>
        <div className='vertical-center' style={{ padding: 10 }}>
          <span className='address-title text-nowrap'>地址</span>
          <span className='address-detail text-nowrap'>地址详细</span>
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
    })
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
   * 高德搜索地址api
   */
  getAddressList () {
    let url = 'https://restapi.amap.com/v3/place/text?'
    let key = 'e062e2a80c3e0e1c31a588faa9822dcb'
    let city = 'quzhou'
    let citylimit = 'true'

    let query = 'key=' + key + '&keywords=' + this.state.searchText + '&city=' + city + '&citylimit=' + citylimit
    axios.get(url + query)
      .then(data => {
        console.log('--- data =', data)

        if (data.data.status === '0') {

        } else {

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
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

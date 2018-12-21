import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { List, Icon, Toast } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global_data'
import history from 'history/createHashHistory'
import Nav from '@components/Head/nav'
import '../../master.css'
import Head from '@components/Head'
import axios from 'axios'
import { cloneDeep, get, isNil } from 'lodash'
import { AddressBean } from '@datasources/AddressBean'
import { MyResponse } from '@datasources/MyResponse'
import { Loading } from 'element-react'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
  receivingId: number
}

interface State {
  addressDetail: AddressBean
  isLoading: boolean
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      addressDetail: null,
      isLoading: false
    }
  }

  componentWillMount () {
    this.getAddressDetail()
  }

  public renderContent = () => {
    return (
      !isNil(this.state.addressDetail) &&
      <div style={{
        paddingTop: 0
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          backgroundColor: '#ffffff'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            position: 'relative'
          }}>
            <span className={'addressText'}>收货地址</span>
            <input type='text' className={'addressInput'}
                   placeholder={'小区/写字楼/学校'}
                   onChange={this.receivingAddressChange}
                   defaultValue={this.state.addressDetail.receiving_address}/>
            <Icon type={'loading'} style={{ top: 10, float: 'left', position: 'absolute', right: '10%' }}/>
          </div>
          <div className='Segment_line'/>
          <div>
            <span className={'addressText'}>门牌号</span>
            <input type='text' className={'addressInput'}
                   placeholder={'例: 8号楼808室'}
                   onChange={this.receivingAddressDetailChange}
                   defaultValue={this.state.addressDetail.receiving_address_detail}/>
          </div>
          <div className='Segment_line'/>
          <div>
            <span className={'addressText'}>联系人</span>
            <input type='text' className={'addressInput'}
                   placeholder={'您的姓名'}
                   onChange={this.receivingNameChange}
                   defaultValue={this.state.addressDetail.receiving_name}/>
          </div>
          <div className='Segment_line'/>
          <div>
            <span className={'addressText'}>手机号</span>
            <input type='text' className={'addressInput'}
                   placeholder={'配送员联系您的手机号'}
                   onChange={this.receivingIphoneChange}
                   defaultValue={this.state.addressDetail.receiving_iphone}/>
          </div>
        </div>
        <div className='Segment_line2'/>
        <Button type='primary' style={{ marginTop: 50, width: '80%', marginLeft: '10%' }}
                onClick={this.updateAddress}>保存</Button>
      </div>
    )
  }

  /**
   * 收货地址
   * @param event
   */
  receivingAddressChange = (event) => {
    let detail: AddressBean = this.state.addressDetail
    detail.receiving_address = event.target.value
    this.setState({
      addressDetail: detail
    })
  }

  /**
   * 收货地址详情
   * @param event
   */
  receivingAddressDetailChange = (event) => {
    let detail: AddressBean = this.state.addressDetail
    detail.receiving_address_detail = event.target.value
    this.setState({
      addressDetail: detail
    })
  }

  /**
   * 收货人名称
   * @param event
   */
  receivingNameChange = (event) => {
    let detail: AddressBean = this.state.addressDetail
    detail.receiving_name = event.target.value
    this.setState({
      addressDetail: detail
    })
  }

  /**
   * 收货人名称
   * @param event
   */
  receivingIphoneChange = (event) => {
    let detail: AddressBean = this.state.addressDetail
    detail.receiving_iphone = event.target.value
    this.setState({
      addressDetail: detail
    })
  }

  /**
   * 获取地址详情
   */
  getAddressDetail () {
    if (this.state.isLoading) {
      return
    }
    this.setState({
      isLoading: true
    })
    let url = 'CanteenProcurementManager/user/receivingAddress/AddressDetails?'
    let query = 'receivingId=' + this.props.receivingId
    axios.get<MyResponse<AddressBean>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        this.setState({
          isLoading: false
        })
        if (data.data.code === 0) {
          this.setState({
            addressDetail: data.data.data
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
   * 修改收货地址
   */
  updateAddress = () => {
    if (this.state.isLoading) {
      return
    }
    if (isNil(this.state.addressDetail.receiving_address) || this.state.addressDetail.receiving_address.length < 1) {
      Toast.info('请填写地址', 2, null, false)
      return
    }
    if (isNil(this.state.addressDetail.receiving_address_detail) || this.state.addressDetail.receiving_address_detail.length < 1) {
      Toast.info('请填写详细地址', 2, null, false)
      return
    }
    if (isNil(this.state.addressDetail.receiving_name) || this.state.addressDetail.receiving_name.length < 1) {
      Toast.info('请填收货人姓名', 2, null, false)
      return
    }
    if (isNil(this.state.addressDetail.receiving_iphone) || this.state.addressDetail.receiving_iphone.length < 1) {
      Toast.info('请填填写手机号', 2, null, false)
      return
    }
    if (!(/^1[34578]\d{9}$/.test(this.state.addressDetail.receiving_iphone))) {
      Toast.info('手机号输入有误,请检查!', 2, null, false)
      return
    }
    this.setState({
      isLoading: true
    })
    let url = 'CanteenProcurementManager/user/receivingAddress/updateAddress?'
    let query = 'receivingName=' + this.state.addressDetail.receiving_name +
      '&receivingAddress=' + this.state.addressDetail.receiving_address +
      '&receivingAddressDetail=' + this.state.addressDetail.receiving_address_detail +
      '&receivingIphone=' + this.state.addressDetail.receiving_iphone +
      '&receivingId=' + this.state.addressDetail.receiving_id
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        this.setState({
          isLoading: false
        })
        if (data.data.code === 0) {
          Toast.info('收货地址修改成功', 2, null, false)
          history().goBack()
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

  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Head title={'编辑收货地址'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#fff'}
              leftIconColor={'grey'} showLine={true}/>
        {this.renderContent()}
        {this.state.isLoading && <Loading fullscreen={true}/>}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    pageTab: state.globalData.pageTab,
    userInfo: state.globalData.userInfo,
    receivingId: state.addressDetailData.receivingId
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updatePageTab,
  updateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

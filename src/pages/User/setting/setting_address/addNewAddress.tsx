import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { List, Icon, Toast } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { Loading } from 'element-react'
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

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
  receivingId: number
}

interface State {
  isLoading: boolean
  receivingAddress: string
  receivingAddressDetail: string
  receivingName: string
  receivingIphone: string
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      receivingAddress: null,
      receivingAddressDetail: null,
      receivingName: null,
      receivingIphone: null
    }
  }

  public renderContent = () => {
    return (
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
                   onChange={this.receivingAddressChange}/>
            <Icon type={'loading'} style={{ top: 10, float: 'left', position: 'absolute', right: '10%' }}/>
          </div>
          <div className='Segment_line'/>
          <div>
            <span className={'addressText'}>门牌号</span>
            <input type='text' className={'addressInput'}
                   placeholder={'例: 8号楼808室'}
                   onChange={this.receivingAddressDetailChange}/>
          </div>
          <div className='Segment_line'/>
          <div>
            <span className={'addressText'}>联系人</span>
            <input type='text' className={'addressInput'}
                   placeholder={'您的姓名'}
                   onChange={this.receivingNameChange}/>
          </div>
          <div className='Segment_line'/>
          <div>
            <span className={'addressText'}>手机号</span>
            <input type='text' className={'addressInput'}
                   placeholder={'配送员联系您的手机号'}
                   maxLength={11}
                   onChange={this.receivingIphoneChange}/>
          </div>
        </div>
        <div className='Segment_line2'/>
        <Button type='primary' style={{ marginTop: 50, width: '80%', marginLeft: '10%' }}
                onClick={this.saveAddress}>保存</Button>
      </div>
    )
  }

  /**
   * 收货地址
   * @param event
   */
  receivingAddressChange = (event) => {
    this.setState({
      receivingAddress: event.target.value
    })
  }

  /**
   * 收货地址详情
   * @param event
   */
  receivingAddressDetailChange = (event) => {
    this.setState({
      receivingAddressDetail: event.target.value
    })
  }

  /**
   * 收货人名称
   * @param event
   */
  receivingNameChange = (event) => {
    this.setState({
      receivingName: event.target.value
    })
  }

  /**
   * 收货人名称
   * @param event
   */
  receivingIphoneChange = (event) => {
    this.setState({
      receivingIphone: event.target.value
    })
  }

  /**
   * 保存地址
   */
  saveAddress = () => {
    if (this.state.isLoading) {
      return
    }
    if (isNil(this.state.receivingAddress) || this.state.receivingAddress.length < 1) {
      Toast.info('请填写地址', 2, null, false)
      return
    }
    if (isNil(this.state.receivingAddressDetail) || this.state.receivingAddressDetail.length < 1) {
      Toast.info('请填写详细地址', 2, null, false)
      return
    }
    if (isNil(this.state.receivingName) || this.state.receivingName.length < 1) {
      Toast.info('请填收货人姓名', 2, null, false)
      return
    }
    if (isNil(this.state.receivingIphone) || this.state.receivingIphone.length < 1) {
      Toast.info('请填填写手机号', 2, null, false)
      return
    }
    if (!(/^1[34578]\d{9}$/.test(this.state.receivingIphone))) {
      Toast.info('手机号输入有误,请检查!', 2, null, false)
      return
    }
    this.setState({
      isLoading: true
    })
    let url = 'CanteenProcurementManager/user/receivingAddress/saveAddress?'
    let query = 'receivingName=' + this.state.receivingName + '&receivingAddress=' + this.state.receivingAddress +
      '&receivingAddressDetail=' + this.state.receivingAddressDetail + '&receivingIphone=' + this.state.receivingIphone
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        this.setState({
          isLoading: false
        })
        if (data.data.code === 0) {
          Toast.info('新增地址成功!', 2, null, false)
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
        <Head title={'新增收货地址'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#fff'}
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

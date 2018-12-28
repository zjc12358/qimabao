import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { Toast, Modal, List, Button, WhiteSpace, WingBlank, Icon, InputItem } from 'antd-mobile'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global_data'
import Nav from '@components/Head/nav'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import axios from 'axios'
import Head from '@components/Head'
import { AddressBean } from '@datasources/AddressBean'
import { MyResponse } from '@datasources/MyResponse'
import { setId } from '@store/actions/address_detail_data'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
  setId: (receivingId: number) => void
}

interface State {
  addressList: Array<AddressBean>
  isLoading: boolean
}

class History extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      addressList: [],
      isLoading: false
    }
  }

  componentWillMount () {
    this.getAddressList()
  }

  /**
   * 收货地址详情
   */
  public renderContent = () => {
    return (
      <div style={{
        paddingTop: 5,
        paddingBottom: 50
      }}>
        {this.state.addressList.map((i, index) => (
          <div style={{ backgroundColor: 'white' }}>
            {this.renderAddressItem(i, index)}
          </div>
        ))}
        <Button type='primary' style={{
          width: '100%',
          height: 50,
          bottom: 0,
          zIndex: 100,
          color: '#ffffff',
          position: 'fixed'
        }} onClick={this.addNewAddressOnClick}>添加新的收货地址</Button>
      </div>
    )
  }

  public renderAddressItem = (i: AddressBean, index) => {
    return (
      <div style={{
        marginTop: 2,
        width: '100%',
        height: 60,
        backgroundColor: '#ffffff',
        position: 'relative'
      }} onClick={() => this.ItemOnclick(i.receiving_id)}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingLeft: 10
          }}>
            <span style={{ fontSize: 15 }}>{i.receiving_name}&nbsp;&nbsp;{i.receiving_iphone}</span>
            <span style={{
              fontSize: 12,
              paddingTop: 5,
              color: '#969696'
            }}>{i.receiving_address}&nbsp;{i.receiving_address_detail}</span>
          </div>
          <div style={{
            padding: 20
          }}>
            <ReactSVG path='../assets/images/User/edit.svg' svgStyle={{ width: 18, height: 18 }}/>
          </div>
        </div>
      </div>
    )
  }

  /**
   * 点击地址单项
   * @param receivingId
   * @constructor
   */
  ItemOnclick = (receivingId) => {
    this.props.setId(receivingId)
    history().push('/settingAddressEdit')
  }

  /**
   * 点击添加新地址
   */
  addNewAddressOnClick () {
    history().push('addNewAddress')
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
            addressList: data.data.data
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

  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Head title={'选择收货地址'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#fff'} leftIconColor={'grey'}
              showLine={true}/>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    pageTab: state.globalData.pageTab,
    userInfo: state.globalData.userInfo
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updatePageTab,
  updateUserInfo,
  setId
}

export default connect(mapStateToProps, mapDispatchToProps)(History)

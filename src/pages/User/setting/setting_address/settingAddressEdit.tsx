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

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
  receivingId: number
}

interface State {
  currentIndex: number
  addressDetail: AddressBean
  isLoading: boolean
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      addressDetail: null,
      isLoading: false,
      currentIndex: 0
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
                   defaultValue={this.state.addressDetail.receiving_address}/>
            <Icon type={'loading'} style={{ top: 10, float: 'left', position: 'absolute', right: '10%' }}/>
          </div>
          <div className='Segment_line'/>
          <div>
            <span className={'addressText'}>门牌号</span>
            <input type='text' className={'addressInput'}
                   placeholder={'例: 8号楼808室'}
                   defaultValue={this.state.addressDetail.receiving_address_detail}/>
          </div>
          <div className='Segment_line'/>
          <div>
            <span className={'addressText'}>联系人</span>
            <input type='text' className={'addressInput'}
                   placeholder={'您的姓名'}
                   defaultValue={this.state.addressDetail.receiving_name}/>
          </div>
          <div className='Segment_line'/>
          <div>
            <span className={'addressText'}>手机号</span>
            <input type='text' className={'addressInput'}
                   placeholder={'配送员联系您的手机号'}
                   defaultValue={this.state.addressDetail.receiving_iphone}/>
          </div>
        </div>
        <div className='Segment_line2'/>
        <Button type='primary' style={{ marginTop: 50, width: '80%', marginLeft: '10%' }}>保存</Button>
      </div>
    )
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

  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Head title={'编辑收货地址'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#fff'}
              leftIconColor={'grey'} showLine={true}/>
        {this.renderContent()}
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

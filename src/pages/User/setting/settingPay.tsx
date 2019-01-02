import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { Switch,Icon, Toast } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global_data'
import history from 'history/createHashHistory'
import '../master.css'
import Head from '@components/Head'
import ReactSVG from 'react-svg'
import axios from 'axios'
import { MyResponse } from '@datasources/MyResponse'
import { cloneDeep, get } from 'lodash'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  checked: boolean
  orderChecked: boolean
  data: any
  ssTt: number
  refresh: any
}

let offsetY: number = 0
let layer: number = 0
let top: number = 170
let lock: boolean = false
class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      checked: false,
      orderChecked: false,
      data: [
        { id: '1', name: '账户余额', order: 1 },
        { id: '2', name: '支付宝', order: 2 }
      ],
      ssTt: 0,
      refresh: ''
    }
  }
  componentDidMount () {
    let url = 'CanteenProcurementManager/returnPay/aliReturnPay?'
    let query = 'openId=maoxiaoyan'
    axios.get<MyResponse<UserInfo>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          this.props.updateUserInfo(cloneDeep(data.data.data))
        } else {
          Toast.info('获取用户信息失败,请重试', 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }

  addOnclick = () => {
    history().push('/settingPayBankCard')
  }

  public renderContent = () => {
    return(
      <div>
        <div style={{ backgroundColor: 'transparent',height: 10 }}/>
        <div style={{ backgroundColor: '#ffffff',color: '#585858' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 10,
            backgroundColor: '#ffffff',
            height: 20
          }}>
            <span style={{ fontSize: '16px', marginLeft: 10 }}>优先使用优惠券</span>
            <Switch checked={this.state.checked} onClick={() => { this.setState({ checked: !this.state.checked }) }} />
          </div>
        </div>
        <div className='Segment_line2' />
        <div style={{ backgroundColor: 'transparent',height: 10 }}/>
        <span style={{ color: '#919191',fontSize: 13,paddingLeft: 20 }}>有红包最先使用红包</span>
        <div style={{ backgroundColor: 'transparent',height: 10 }}/>
        <div style={{ backgroundColor: '#ffffff',color: '#585858' }}>
          <div className='Segment_line2' />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 10,
            backgroundColor: '#ffffff',
            height: 20
          }}>
            <span style={{ fontSize: '16px', marginLeft: 10 }}>自定义扣款顺序</span>
            <Switch checked={this.state.orderChecked} onClick={() => { this.setState({ orderChecked: !this.state.orderChecked }) }} />
          </div>
        </div>
        <div className='Segment_line2' />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 10,
          backgroundColor: '#ffffff',
          height: 20
        }}>
          <span style={{ fontSize: '14px', marginLeft: 10,color: '#8f8f8f' }}>系统将根据以下排序按顺序扣款</span>
          <span>拖动</span>
        </div>
        <div className='Segment_line2' />
        <div style={{ left: 32, fontSize: 14,color: '#8f8f8f',position: 'absolute',top: top + this.state.data.length * 40 + 50 }}>
          <span>对于特殊业务有特殊规则的，将遵循业务规则扣款</span>
        </div>
      </div>
    )
  }
  /*
  列表项的渲染
  **/
  public renderItem = (i,index) => {
    return(
      <div id={'main' + index} style={{ position: 'absolute', top: top + i.order * 40,width: '100%',height: 40 }}>
        <div className={'Segment_line4'} />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 10,
          backgroundColor: '#ffffff',
          height: 19
        }}>
          <span style={{ fontSize: '16px', marginLeft: 10 }}>{i.name}</span>
          <img src='../../assets/images/User/drag.svg' width='20' height='20' />
        </div>
      </div>
    )
  }

  public headIcon = () => {
    return(
      <ReactSVG path='./assets/images/User/addnoborder.svg' svgStyle={{ width: 22, height: 22 }}/>
    )
  }
  public render () {
    return (
      <div className={'t'} style={{ position: 'relative',width: '100%',userSelect: 'none' }}>
        <Head title={'支付设置'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#fff'} leftIconColor={'grey'} showLine={true}
              showRightIcon={true}
              rightIconContent={this.headIcon()}
              rightIconOnClick={this.addOnclick}
          />
        {this.renderContent()}
        <div style={{ backgroundColor: '#ffffff' }}>
          {this.state.data.map((i, index) => (
            <div>
              {this.renderItem(i, index)}
            </div>
          ))}
        </div>
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
  updateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

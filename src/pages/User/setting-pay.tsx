import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { Switch,Icon, Toast } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global-data'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  checked: boolean
  orderChecked: boolean
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      checked: false,
      orderChecked: false
    }
  }

  public renderNav = () => {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        position: 'relative',
        height: 40
      }}
      >
        <div style={{ float: 'left', position: 'absolute' }}>
          <Link to='/setting'><Icon type='left' color='#000000' size='lg' /></Link>
        </div>
        <div style={{
          fontSize: 20,
          paddingTop: 5,
          color: '#000000',
          width: '100%',
          textAlign: 'center'
        }}>
          <span>支付设置</span>
        </div>
      </div>
    )
  }

  public renderContent = () => {
    return(
      <div>
        <div className='Segment_line2' />
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
        <div style={{ backgroundColor: '#ffffff' }}>
          <div className='Segment_line' />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 10,
            backgroundColor: '#ffffff',
            height: 20
          }}>
            <span style={{ fontSize: '16px', marginLeft: 10 }}>账户余额</span>
            <Icon type='right' />
          </div>
          <div className='Segment_line' />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 10,
            backgroundColor: '#ffffff',
            height: 20
          }}>
            <span style={{ fontSize: '16px', marginLeft: 10 }}>支付宝</span>
            <Icon type='right' />
          </div>
          <div className='Segment_line' />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 10,
            backgroundColor: '#ffffff',
            height: 20
          }}>
            <span style={{ fontSize: '16px', marginLeft: 10 }}>微信</span>
            <Icon type='right' />
          </div>
        </div>
        <div className='Segment_line2' />
        <div style={{ paddingLeft: 20, marginTop: 10, fontSize: 14,color: '#8f8f8f' }}>
          <span>对于特殊业务有特殊规则的，将遵循业务规则扣款</span>
        </div>
      </div>
    )
  }

  public render () {
    return (
      <div>
        {this.renderNav()}
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
  updateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

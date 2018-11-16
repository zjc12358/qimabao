import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { Icon } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global_data'
import './master.css'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: string) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {

}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {

    }
  }

  public renderNav = () => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#0084E7'
      }}
      >
        <Link to='/NavBar'><Icon type='left' color='#ffffff' size='lg' onClick={this.backOnclick} /></Link>
        <div style={{
          fontSize: 20,
          paddingTop: 5,
          paddingRight: '45%',
          color: '#ffffff'
        }}>消息</div>
      </div>
    )
  }
  backOnclick = () => {
    this.props.updatePageTab('UserPageTabBar')
  }

  public renderContent = () => {
    return(
      <div style={{ backgroundColor: '#ffffff',color: '#858585' }}>
        <div className='Segment_line2' />
        <Link to={'/message_systemInfo'}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }}>
          <div className={'flex-row-center'}>
            <Icon type='loading' style={{ marginTop: 3,marginLeft: 10 }} />
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              paddingLeft: 30
            }}>
              <span style={{ fontSize: '16px',color: '#000000' }}>系统消息</span>
              <span style={{ fontSize: '14px',paddingTop: 5 }}>连续签到3天获得150积分</span>
            </div>
          </div>
          <div className={'flex-row-center'}>
            <Icon type='right' style={{ marginTop: 6 }} />
          </div>
        </div>
        </Link>
        <div className='Segment_line2' />
        <Link to={'/message_tradeInfo'}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }}>
          <div className={'flex-row-center'}>
            <Icon type='loading' style={{ marginTop: 3,marginLeft: 10 }} />
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              paddingLeft: 30
            }}>
              <span style={{ fontSize: '16px',color: '#000000' }}>交易信息</span>
              <span style={{ fontSize: '14px',paddingTop: 5 }}>收到退款金额100元</span>
            </div>
          </div>
          <div className={'flex-row-center'}>
            <Icon type='right' style={{ marginTop: 6 }} />
          </div>
        </div>
        </Link>
        <div className='Segment_line2' />
        <Link to={'/message_logistics'}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }}>
          <div className={'flex-row-center'}>
            <Icon type='loading' style={{ marginTop: 3,marginLeft: 10 }} />
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              paddingLeft: 30
            }}>
              <span style={{ fontSize: '16px',color: '#000000' }}>物流助手</span>
              <span style={{ fontSize: '14px',paddingTop: 5 }}>最新物流订单信息</span>
            </div>
          </div>
          <div className={'flex-row-center'}>
            <Icon type='right' style={{ marginTop: 6 }} />
          </div>
        </div>
        </Link>
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

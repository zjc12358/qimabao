import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { Icon } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global_data'
import '../master.css'
import history from 'history/createHashHistory'
import Nav from '@components/Head/nav'
import ReactSVG from 'react-svg'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: string) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {

}
let messageIconMaxSize: number = 35
class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {

    }
  }

  public renderContent = () => {
    return(
      <div style={{ backgroundColor: '#ffffff',color: '#858585' }}>
        <div className='Segment_line2' />
        <div className={'flex-row-space-between-p1510'} onClick={this.systemOnclick}>
          <div className={'flex-row-center'}>
            <ReactSVG path='./assets/images/User/messageSystemInfo.svg' svgStyle={{ width: messageIconMaxSize, height: messageIconMaxSize }}/>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              paddingLeft: 20
            }}>
              <span style={{ fontSize: '16px',color: '#000000' }}>系统消息</span>
              <span style={{ fontSize: '14px',paddingTop: 5 }}>连续签到3天获得150积分</span>
            </div>
          </div>
          <div className={'flex-row-center'}>
            <Icon type='right' style={{ marginTop: 6 }} />
          </div>
        </div>
        <div className='Segment_line2' />
        <div className={'flex-row-space-between-p1510'} onClick={this.tradeOnclick}>
          <div className={'flex-row-center'}>
            <ReactSVG path='./assets/images/User/messageTradeInfo.svg' svgStyle={{ width: messageIconMaxSize, height: messageIconMaxSize }}/>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              paddingLeft: 20
            }}>
              <span style={{ fontSize: '16px',color: '#000000' }}>交易信息</span>
              <span style={{ fontSize: '14px',paddingTop: 5 }}>收到退款金额100元</span>
            </div>
          </div>
          <div className={'flex-row-center'}>
            <Icon type='right' style={{ marginTop: 6 }} />
          </div>
        </div>
        <div className='Segment_line2' />
        <div className={'flex-row-space-between-p1510'} onClick={this.logisticsOnclick}>
          <div className={'flex-row-center'}>
            <ReactSVG path='./assets/images/User/messageLogistics.svg' svgStyle={{ width: messageIconMaxSize, height: messageIconMaxSize }}/>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              paddingLeft: 20
            }}>
              <span style={{ fontSize: '16px',color: '#000000' }}>物流助手</span>
              <span style={{ fontSize: '14px',paddingTop: 5 }}>最新物流订单信息</span>
            </div>
          </div>
          <div className={'flex-row-center'}>
            <Icon type='right' style={{ marginTop: 6 }} />
          </div>
        </div>
      </div>
    )
  }
  public logisticsOnclick = () => {
    history().push('/messageLogistics')
  }

  public systemOnclick = () => {
    history().push('/messageSystemInfo')
  }

  public tradeOnclick = () => {
    history().push('/messageTradeInfo')
  }

  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Nav title={'系统消息'} color={'#0084E7'} textColor={'#ffffff'} />
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

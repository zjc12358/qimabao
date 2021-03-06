import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '../../../store/reducers/globalDataReducer'
import { Icon, Switch, Toast } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { UserInfo } from '../../../datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '../../../store/actions/global_data'
import '../master.css'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import Head from '@components/Head'

export interface Props {
  pageTab: string
  userInfo: UserInfo
  updatePageTab: (pageTab: string) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  noticeChecked: boolean
}
let RightIconMaxSize: number = 18
class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      noticeChecked: false
    }
  }

  public renderContent = () => {
    return(
      <div style={{ backgroundColor: '#ffffff',color: '#858585' }}>
        <div className={'flex-space-between-row-center'} style={{ padding: '12px 15px' }} onClick={this.safeOnclick}>
          <div className={'flex-flex-end-row-center'}>
            <ReactSVG path='./assets/images/User/safe.svg' svgStyle={{ width: 22, height: 22 }}/>
            <span className={'commonFont'} style={{ fontSize: '16px', paddingLeft: 10 }}>安全设置</span>
          </div>
          <div className={'flex-center-row-center'}>
            <span className={'commonFont'} style={{ marginRight: 10 }}>手机号、密码</span>
            <ReactSVG path='./assets/images/User/right.svg' svgStyle={{ width: RightIconMaxSize, height: RightIconMaxSize }}/>
          </div>
        </div>
        <div className='Segment_line2' />
        <div className={'flex-space-between-row-center'} style={{ padding: '12px 15px' }} onClick={this.payOnclick}>
          <div className={'flex-center-row-center'}>
            <ReactSVG path='./assets/images/User/setting_pay.svg' svgStyle={{ width: 22, height: 22 }}/>
            <span className={'commonFont'} style={{ fontSize: '16px', paddingLeft: 10 }}>支付设置</span>
          </div>
          <div className={'flex-center-row-center'}>
            <ReactSVG path='./assets/images/User/right.svg' svgStyle={{ width: RightIconMaxSize, height: RightIconMaxSize }}/>
          </div>
        </div>
        <div className='Segment_line2' />
        <div className={'flex-space-between-row-center'} style={{ padding: '12px 15px' }} onClick={this.addressOnclick}>
          <div className={'flex-center-row-center'}>
            <ReactSVG path='./assets/images/User/address.svg' svgStyle={{ width: 22, height: 22 }}/>
            <span className={'commonFont'} style={{ fontSize: '16px', paddingLeft: 10 }}>收货地址</span>
          </div>
          <div className={'flex-center-row-center'}>
            <ReactSVG path='./assets/images/User/right.svg' svgStyle={{ width: RightIconMaxSize, height: RightIconMaxSize }}/>
          </div>
        </div>
        <div className='Segment_line2' />
        <div className={'flex-space-between-row-center'} style={{ padding: '12px 15px' }} onClick={this.aboutOnclick}>
          <div className={'flex-center-row-center'}>
            <ReactSVG path='./assets/images/User/about.svg' svgStyle={{ width: 22, height: 22 }}/>
            <span className={'commonFont'} style={{ fontSize: '16px', paddingLeft: 10 }}>关于我们</span>
          </div>
          <div className={'flex-center-row-center'}>
            <ReactSVG path='./assets/images/User/right.svg' svgStyle={{ width: RightIconMaxSize, height: RightIconMaxSize }}/>
          </div>
        </div>
        <div className='Segment_line2' />
        <div className={'flex-space-between-row-center'} style={{ padding: '12px 15px' }}>
          <div className={'flex-center-row-center'}>
            <ReactSVG path='./assets/images/User/notice.svg' svgStyle={{ width: 22, height: 22 }}/>
            <span className={'commonFont'} style={{ fontSize: '16px', paddingLeft: 10 }}>开启通知</span>
          </div>
          <div className={'flex-center-row-center'}>
            <Switch checked={this.state.noticeChecked} onChange={this.noticeOnclick} onClick={() => { this.setState({ noticeChecked: !this.state.noticeChecked }) }} />
          </div>
        </div>
      </div>
    )
  }

  public addressOnclick = () => {
    history().push('/settingAddress')
  }

  public safeOnclick = () => {
    history().push('/settingSafe')
  }

  public aboutOnclick = () => {
    history().push('/settingAbout')
  }

  public payOnclick = () => {
    history().push('/settingPay')
  }

  public noticeOnclick = () => {
    if (this.state.noticeChecked === false) {
      Toast.success('开启通知成功！', 1, undefined, false)
    } else {
      Toast.success('关闭通知成功！', 1, undefined, false)
    }
  }

  EliminateOnclick = () => {
    Toast.loading('清除成功！',3,undefined,false)
  }
  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Head title={'设置'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#fff'} leftIconColor={'grey'} showLine={true}/>
        {this.renderContent()}
        <Button type='warning' style={{
          marginTop: 35,
          width: '90%',
          color: '#ffffff',
          marginLeft: '5%'
        }}>退出当前账号</Button>
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

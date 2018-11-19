import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '../../../store/reducers/globalDataReducer'
import { Icon, Toast } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { UserInfo } from '../../../datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '../../../store/actions/global_data'
import '../master.css'
import Nav from '@components/Head/nav'
import history from 'history/createHashHistory'

export interface Props {
  pageTab: string
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

  public renderNav = (title, color) => {
    return (
      <Nav title={title} color={color} />
    )
  }

  public renderContent = () => {
    return(
      <div style={{ backgroundColor: '#ffffff',color: '#858585' }}>
        <div className='Segment_line2' />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }} onClick={this.safeOnclick}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>安全设置</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ marginTop: 8 }}>手机号、密码</span>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
          </div>
        </div>
        <div className='Segment_line2' />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }} onClick={this.payOnclick}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>支付设置</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='right' style={{ marginTop: 6 }} />
          </div>
        </div>
        <div className='Segment_line2' />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }} onClick={this.addressOnclick}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>收货地址</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
          </div>
        </div>
        <div className='Segment_line2' />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }} onClick={this.EliminateOnclick}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='loading' style={{ marginTop: 3 }} />
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>清除缓存</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
          </div>
        </div>
        <div className='Segment_line2' />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }} onClick={this.aboutOnclick}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>关于我们</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
          </div>
        </div>
        <div className='Segment_line2' />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }} onClick={this.noticeOnclick}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>开启通知</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
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
    Toast.info('开启通知成功！', 1)
  }

  EliminateOnclick = () => {
    Toast.info('清除缓存成功！', 1)
  }
  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Nav title={'设置'} color={'#ffffff'} />
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

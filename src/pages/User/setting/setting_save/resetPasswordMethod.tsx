import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { Toast,Modal, List, Button, WhiteSpace, WingBlank,Icon,InputItem } from 'antd-mobile'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global_data'
import history from 'history/createHashHistory'
import '../../master.css'
import Head from '@components/Head'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
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

  /**
   * 忘记密码找回
   */
  public renderContent = () => {
    return(
      <div>
        <div style={{
          backgroundColor: 'transparent',
          padding: 15,
          color: '#aeaeae'
        }}>
          <span style={{ fontSize: '16px' }}>选一个方式重置密码</span>
        </div>
        <div className='Segment_line2' />
        <div className={'flex-row-space-between-p1510'}>
          <div className={'flex-row-center'}>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>短信验证码+身份证</span>
          </div>
          <div className={'flex-row-center'}>
            <Icon type='right' style={{ marginTop: 6 }} />
          </div>
        </div>
        <div className='Segment_line2' />
      </div>
    )
  }

  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Head title={'设置支付密码'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#fff'} leftIconColor={'grey'} showLine={true}/>
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

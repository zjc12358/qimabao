import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { Toast,Modal, List, Button, WhiteSpace, WingBlank,Icon,InputItem } from 'antd-mobile'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global_data'
import Nav from '@components/Head/nav'
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
  data: any
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: { phone: '13589458987',address: '中国大陆' }   /*数据源 */
    }
  }

  /**
   * 修改支付密码页面
   * 是否记得账号（手机号）当前使用的密码做选择
   */
  public renderContent = () => {
    return(
      <div>
        <div style={{
          textAlign: 'center',
          backgroundColor: '#ffffff',
          color: '#9c9c9c',
          paddingTop: 40,
          paddingBottom: 20
        }}>
          <span style={{ fontSize: 16 }}>您是否记得账号 </span>
          <span style={{ fontSize: 20,color: '#000000' }}>{this.state.data.phone.replace(/(\d{3})(\d{6})(\d{2})/,'$1******$3')}</span>
          <br/>
          <div style={{ paddingTop: 10 }}>
            <span style={{ fontSize: 16 }}> 当前使用的支付密码</span>
          </div>
        </div>
        <div className='Segment_line2' />
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'row',
          paddingTop: 20
        }}>
          <Button style={{
            width: 150,
            fontSize: 16
          }} onClick={this.forgetOnclick}
          >不记得</Button>
          <Button type='primary' style={{
            width: 150,
            fontSize: 16
          }} onClick={this.rememberOnclick}
          >记得</Button>
        </div>
      </div>
    )
  }

  public forgetOnclick = () => {
    history().push('/resetPasswordMethod')
  }

  public rememberOnclick = () => {
    history().push('/paymentPasswordConfirm')
  }

  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Head title={'修改支付密码'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#fff'} leftIconColor={'grey'} showLine={true}/>
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

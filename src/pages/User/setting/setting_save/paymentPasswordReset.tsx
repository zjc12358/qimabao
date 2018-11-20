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

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  data: any
  resetPasswordType: string
  passwordConfirmButtonType: boolean
  resetPassword: string
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: { phone: '13589458987',address: '中国大陆' },   /*数据源 */
      resetPasswordType: 'password',       /*要重置的密码输入框类型  */
      passwordConfirmButtonType: false,  /*false为disabled */
      resetPassword: ''     /*要重置的密码 */
    }
  }

  /**
   * 重置支付密码
   */
  public renderContent = () => {
    return(
      <div>
        <div className='Segment_line2'></div>
        <div style={{
          textAlign: 'center',
          backgroundColor: '#ffffff',
          paddingTop: 35,
          paddingBottom: 35
        }}>
          <div style={{ fontSize: 16,color: '#868686' }}>
            <span>请为账号 </span>
            <span>{this.state.data.phone.replace(/(\d{3})(\d{6})(\d{2})/,'$1******$3')}</span>
            <br/>
          </div>
          <div style={{ paddingTop: 10 }}>
            <span style={{ fontSize: 16 }}> 设置支付密码</span>
          </div>
        </div>
        <div className='Segment_line2' />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: 20,
          border: '1px solid #dddddd',
          backgroundColor: '#ffffff'
        }}>
          <input type={this.state.resetPasswordType} className='editpasswordinput' placeholder={'请输入密码'} onChange={this.onPasswordChange}/>
          <Icon type={'loading'} style={{ marginTop: 8 }} />
        </div>
        <div style={{
          padding: 13
        }}>
          <span style={{ fontSize: 16,color: '#868686' }}>说明文字</span>
        </div>
        <Button type='primary' disabled={!this.state.passwordConfirmButtonType} style={{
          marginTop: 35,
          width: '90%',
          color: '#ffffff',
          marginLeft: '5%'
        }} onClick={this.nextOnclick}
        >下一步</Button>
      </div>
    )
  }
  public nextOnclick = () => {
    let reg2 = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){8,18}/
    let reg3 = /[a-zA-Z]+/
    let reg4 = /[0-9]+/
    if (reg2.test(this.state.resetPassword) && reg3.test(this.state.resetPassword) && reg4.test(this.state.resetPassword)) {
      history().push('/paymentPasswordResetConfirm')
    } else if (!reg2.test(this.state.resetPassword)) {
      Toast.info('长度必须在8-18位！', 1)
      return false
    } else if (!reg3.test(this.state.resetPassword)) {
      Toast.info('必须包含字母！', 1)
      return false
    } else if (!reg4.test(this.state.resetPassword)) {
      Toast.info('必须包含数字！', 1)
      return false
    }
  }
  public onPasswordChange = (e) => {
    if (e.target.value.length > 6) {
      this.setState({
        passwordConfirmButtonType: true,
        resetPassword: e.target.value
      })
    } else {
      this.setState({
        passwordConfirmButtonType: false
      })
    }
  }

  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Nav title={'设置支付密码'} color={'#ffffff'} />
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

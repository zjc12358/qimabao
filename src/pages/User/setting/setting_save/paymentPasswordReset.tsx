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
import axios from 'axios'

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
  payPassword: string
  payPasswordStar: string
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: { phone: '13589458987',address: '中国大陆' },   /*数据源 */
      resetPasswordType: 'password',       /*要重置的密码输入框类型  */
      passwordConfirmButtonType: false,  /*false为disabled */
      resetPassword: '',     /*要重置的密码 */
      payPassword: '',
      payPasswordStar: ''
    }
  }

  /**
   * 重置支付密码
   */
  public renderContent = () => {
    return(
      <div>
        <div style={{
          textAlign: 'center',
          backgroundColor: '#ffffff',
          paddingTop: 40,
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
        <div className={'BigWrap'} style={{ position: 'relative', height: 60,marginTop: 50 }}>
          <div className={'PwdBox'}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <span className={'showPwd'}>{this.state.payPasswordStar}</span>
          </div>
          <InputItem
            className={'pwd'}
            maxLength={6}
            type={'money'}
            moneyKeyboardAlign={'left'}
            onChange={(v) => {
              this.setState({
                payPassword: v
              },() => {
                this.setState({
                  payPasswordStar: v.replace(/.(?=.)/g, '*')
                },() => {
                  if (v.length === 6) {
                    this.setState({
                      passwordConfirmButtonType: true
                    })
                  } else {
                    this.setState({
                      passwordConfirmButtonType: false
                    })
                  }
                })
              })
            }}
          />
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
    let url = 'CanteenProcurementManager/user/nail/setUserPassword?'
    let query = 'password=' + this.state.payPassword
    axios.get<any>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          history().push('/paymentPasswordResetConfirm')
          Toast.info('密码重置成功', 1, null, false)
        } else {
          Toast.info('密码修改失败，请检查网络', 1, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
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

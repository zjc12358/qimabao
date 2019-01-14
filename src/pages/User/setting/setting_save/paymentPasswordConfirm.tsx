import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { Toast, Modal, List, Button, WhiteSpace, WingBlank, Icon, InputItem } from 'antd-mobile'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global_data'
import Nav from '@components/Head/nav'
import history from 'history/createHashHistory'
import '../../master.css'
import './payPwd.less'
import axios from 'axios'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  payPassword: string
  payPasswordStar: string
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      payPassword: '',
      payPasswordStar: ''
    }
  }

  /**
   * 验证支付密码（6位数字界面）
   */
  public renderContent = () => {
    return (
      <div>
        <div className='Segment_line2'></div>
        <div style={{
          textAlign: 'center',
          backgroundColor: '#ffffff',
          color: '#9c9c9c',
          paddingTop: 35,
          paddingBottom: 35
        }}>
          <span style={{ fontSize: 16 }}>输入支付密码，完成验证 </span>
        </div>
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
                    let url = 'CanteenProcurementManager/user/nail/checkSamePassword?'
                    let query = 'password=' + v
                    axios.get<any>(url + query)
                      .then(data => {
                        console.log('--- data =', data)
                        if (data.data.code === 0) {
                          history().push('/paymentPasswordReset')
                          Toast.info('验证通过', 1, null, false)
                        } else {
                          Toast.info('验证失败，密码不正确', 1, null, false)
                        }
                      })
                      .catch(() => {
                        Toast.info('请检查网络设置!')
                      })
                  }
                })
              })
            }}
          />
        </div>
        <div style={{
          textAlign: 'center',
          paddingTop: 50
        }}>
          <span style={{ color: '#6265ee' }}>忘记密码？</span>
        </div>
      </div>
    )
  }

  passwordOnchange (e) {
    console.log(e.target.value + '   ' + e.target.value.length)

  }

  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Nav title={'修改支付密码'} color={'#ffffff'}/>
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

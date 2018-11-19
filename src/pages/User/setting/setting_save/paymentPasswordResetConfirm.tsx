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

// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
let moneyKeyboardWrapProps
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault()
  }
}

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  phone: string
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      phone: ''     /*要换绑的手机号  */
    }
  }

  /**
   * 重置密码验证码界面
   */
  public renderContent = () => {
    return(
      <div>
        <div className='Segment_line2'></div>
        <div style={{ backgroundColor: '#ffffff',color: '#858585',textAlign: 'center',width: '100%',height: 120 }}>
          <div style={{ paddingTop: 25 }}>
            <span style={{ fontSize: 16 }}>我们已发送 </span>
            <span style={{ fontSize: 20,color: '#000000' }}>验证码</span>
            <span style={{ fontSize: 16 }}> 到您的手机</span>
            <br/>
            <br/>
            <span style={{ fontSize: 20,color: '#000000' }}>{this.state.phone.replace(/\s+/g,'').replace(/(\d{3})(\d{6})(\d{2})/,'$1******$3')}</span>
          </div>
        </div>
        <div className='Segment_line2'></div>
        <div style={{ backgroundColor: 'transparent',textAlign: 'center' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            paddingTop: 50
          }}>
            <InputItem
              maxLength={1}
              className='Verification'
              autoFocus={true}
              type={'money'}
              moneyKeyboardAlign='left'
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            />
            <InputItem
              maxLength={1}
              className='Verification'
              type={'money'}
              moneyKeyboardAlign='left'
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            />
            <InputItem
              maxLength={1}
              className='Verification'
              type={'money'}
              moneyKeyboardAlign='left'
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            />
            <InputItem
              maxLength={1}
              className='Verification'
              type={'money'}
              moneyKeyboardAlign='left'
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            />
          </div>
          <div style={{
            paddingTop: 20
          }}>
            <span style={{
              fontSize: 16,
              color: '#6265ee'
            }}>重发短信</span>
          </div>
          <div style={{
            paddingTop: 50
          }}>
            <span style={{
              fontSize: 14,
              color: '#6265ee'
            }}>&nbsp;&nbsp;&nbsp;收不到验证码？</span>
          </div>
        </div>
      </div>
    )
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

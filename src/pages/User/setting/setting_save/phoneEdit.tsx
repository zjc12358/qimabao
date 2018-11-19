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
  data: any
  phoneConfirmButtonType: boolean
  phone: string
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      phoneConfirmButtonType: false,   /*false为disabled */
      phone: '',     /*要换绑的手机号  */
      data: { phone: '13589458987',address: '中国大陆' }   /*数据源 */
    }
  }

  /**
   * 手机号修改
   */
  public renderContent = () => {
    return(
      <div>
        <div style={{ backgroundColor: '#ffffff' }}>
          <div className='Segment_line2' />
          <div className={'flex-row-space-between-p1510'}>
            <div className={'flex-row-center'}>
              <span style={{ fontSize: '18px', paddingTop: 7, paddingLeft: 10 }}>国家和地区</span>
            </div>
            <div className={'flex-row-center'}>
              <span style={{ fontSize: '14px', marginTop: 8 }}>{this.state.data.address}</span>
            </div>
          </div>
          <div className='Segment_line2' />
          <div>
            <InputItem
              type='phone'
              placeholder='请输入您的手机号...'
              clear
              moneyKeyboardAlign='left'
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              onChange={this.onPhoneChange}
            >+86</InputItem>
          </div>
        </div>
        <div>
          <Button type='primary' disabled={!this.state.phoneConfirmButtonType} style={{
            marginTop: 35,
            width: '90%',
            color: '#ffffff',
            marginLeft: '5%'
          }} onClick={this.nextOnclick}
          >下一步</Button>
        </div>
      </div>
    )
  }

  public onPhoneChange = (value) => {
    if (value.length === 13) {
      this.setState({
        phoneConfirmButtonType: true,
        phone: value
      })
    } else {
      this.setState({
        phoneConfirmButtonType: false
      })
    }
  }

  public nextOnclick = () => {
    history().push('/PhoneEditConfirm')
  }

  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Nav title={'更换手机号'} color={'#ffffff'} />
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

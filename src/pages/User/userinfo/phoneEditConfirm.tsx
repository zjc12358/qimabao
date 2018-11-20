import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '../../../store/reducers/globalDataReducer'
import { InputItem,ActionSheet, Icon } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { PageTab } from '../../../datasources/PageTab'
import { UserInfo } from '../../../datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '../../../store/actions/global_data'
import Nav from '@components/Head/nav'
import history from 'history/createHashHistory'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: string) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  data: any
  step: number
  confirmCss: any
  refresh: string
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: { img: 'http://img.gexing.me/uploads/allimg/170830/1-1FR9161152259.jpg', username: 'pubg',name: '阿木木',phone: '17568452298', qr: '',sex: '男' },
      step: 0,
      confirmCss: [],
      refresh: ''
    }
  }
  /**
   * 第三个页面，手机号验证码
   */
  public renderContent = () => {
    return(
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: '12%'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingTop: 60,
          paddingLeft: '12%'
        }}>
          <span style={{ fontSize: 22 }}>请输入验证码</span>
          <span style={{ fontSize: 14,color: '#a8a8a8',paddingTop: 15 }}>验证码已经发送到您的手机</span>
          <span style={{ fontSize: 14,color: '#a8a8a8' }}>+86 15657076868</span>
        </div>
        <div style={{
          paddingTop: 60,
          paddingLeft: '12%'
        }}>
          <div style={{
            paddingBottom: 30,
            position: 'relative'
          }}>
            <span style={{ fontSize: 14,color: '#a8a8a8',float: 'left' }} >6位数字密码</span>
            <span style={{ fontSize: 14,color: '#a84c3c',position: 'absolute', left: 215 }} >60s</span>
          </div>
          <div className='passContainer1'>
            <input maxLength={6} autoFocus={true} type='text' className={'passWordInput1'} onChange={(e) => this.confirmOnChange(e)}/>
            <div className='passItem1' style={{ border: this.state.confirmCss[0] }} />
            <div className='passItem1' style={{ border: this.state.confirmCss[1] }} />
            <div className='passItem1' style={{ border: this.state.confirmCss[2] }} />
            <div className='passItem1' style={{ border: this.state.confirmCss[3] }} />
            <div className='passItem1' style={{ border: this.state.confirmCss[4] }} />
            <div className='passItem1' style={{ border: this.state.confirmCss[5] }} />
          </div>
        </div>
      </div>
    )
  }

  /**
   * 输入框变化事件
   */
  confirmOnChange = (e) => {
    this.changeColor(e.target.value.length)
  }
  private i: number

  public changeColor (index) {
    console.log(index)
    for (this.i = 1; this.i <= 6; this.i++) {
      console.log(this.i)
      if (this.i <= index) {
        console.log(this.i)
        this.state.confirmCss[this.i - 1] = '1px solid red'
      } else {
        this.state.confirmCss[this.i - 1] = '1px solid'
      }
    }
    this.setState({
      refresh: 'refresh'
    })
  }

  public render () {
    return (
    <div>
      <Nav title={'修改手机号码'} color={'#ffffff'} />
      {this.renderContent()}
    </div>)
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

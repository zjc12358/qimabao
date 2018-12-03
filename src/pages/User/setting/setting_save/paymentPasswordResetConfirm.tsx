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
  phone: string
  data: any
}
let val: number = -1
let back: boolean = false
let i: number = 1
let focus: boolean = false
class User extends React.Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      phone: '',     /*要换绑的手机号  */
      data: [-1,-1,-1,-1]
    }
  }
  public componentDidMount () {
    document.getElementById('input1').focus()
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
          <div className={'flex-center-column-center'} style={{
            paddingTop: 50
          }}>
            <div className={'flex-space-between-row-center'} style={{ width: window.innerWidth * 0.8 }}>
              <input id='input1' onFocus={this.confirmOnFocus.bind(this,1)} onChange = { this.confirmOnchange.bind(this,1)} type='number' pattern='\d*' style={{ border: 'none', backgroundColor: 'transparent', fontSize: 30,width: 40,textAlign: 'center' }} />
              <input id='input2' onFocus={this.confirmOnFocus.bind(this,2)} onChange = { this.confirmOnchange.bind(this,2)} type='number' pattern='\d*' style={{ border: 'none', backgroundColor: 'transparent', fontSize: 30,width: 40,textAlign: 'center' }} />
              <input id='input3' onFocus={this.confirmOnFocus.bind(this,3)} onChange = { this.confirmOnchange.bind(this,3)} type='number' pattern='\d*' style={{ border: 'none', backgroundColor: 'transparent', fontSize: 30,width: 40,textAlign: 'center' }} />
              <input id='input4' onFocus={this.confirmOnFocus.bind(this,4)} onChange = { this.confirmOnchange.bind(this,4)} type='number' pattern='\d*' style={{ border: 'none', backgroundColor: 'transparent', fontSize: 30,width: 40,textAlign: 'center' }} />
            </div>
            <div className={'flex-space-between-row-center'} style={{ width: window.innerWidth * 0.8 }}>
              <div id='bot1' style={{ width: 40, borderBottom: '2px solid #333' }}/>
              <div id='bot2' style={{ width: 40, borderBottom: '2px solid #333' }}/>
              <div id='bot3' style={{ width: 40, borderBottom: '2px solid #333' }}/>
              <div id='bot4' style={{ width: 40, borderBottom: '2px solid #333' }}/>
            </div>
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

  public confirmOnFocus = (num,e) => {
    console.log(focus)
    if (num !== i && focus === false) {
      console.log(num + ' ' + i + focus)
      document.getElementById('input' + num).blur()
      document.getElementById('input' + i).focus()
    }
    if (num === 1) {
      return
    }
    if (val === -1) {
      return
    }
    if (back) {
      return
    }
    this.state.data[num - 1] = val
    e.target.value = val
    i++
    val = -1
    focus = false
  }

  public confirmOnchange = (num,e) => {
    let value = e.target.value
    switch (value.length) {
      case 0: {
        back = true
        document.getElementById('bot' + num).style.borderBottomColor = '#333'
        this.state.data[num - 1] = -1
        if (num === 1) {
          return
        }
        focus = true
        document.getElementById('input' + (num - 1)).focus()
        focus = false
        i = num - 1
      }break
      case 1: {
        document.getElementById('bot' + num).style.borderBottomColor = '#0084e7'
        this.state.data[0] = value
      }break
      case 2: {
        back = false
        val = value.slice(1,2)
        e.target.value = value.slice(0,1)
        if (num === 4) {
          val = -1
          return
        }
        document.getElementById('bot' + (num + 1)).style.borderBottomColor = '#0084e7'
        focus = true
        document.getElementById('input' + (num + 1)).focus()

        i = num + 1
      }break
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

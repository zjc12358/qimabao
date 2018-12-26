import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { Toast,Modal, List, Button, WhiteSpace, WingBlank,Icon,InputItem } from 'antd-mobile'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab,setIPhone } from '@store/actions/global_data'
import Nav from '@components/Head/nav'
import history from 'history/createHashHistory'
import '../../master.css'
import ReactSVG from 'react-svg'
import Head from '@components/Head'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
  setIPhone: (phone: string) => void
}

interface State {
  data: any
  phoneConfirmButtonType: boolean
  phone: string
  value: string
  clear: boolean
  refresh: string
}

class User extends React.Component<Props, State> {
  private input: HTMLInputElement
  constructor (props) {
    super(props)
    this.state = {
      phoneConfirmButtonType: false,   /*false为disabled */
      phone: '',     /*要换绑的手机号  */
      data: { phone: '13589458987',address: '中国大陆' },   /*数据源 */
      value: '',
      clear: false,
      refresh: ''
    }
  }

  /**
   * 手机号修改
   */
  public renderContent = () => {
    return(
      <div>
        <div style={{ backgroundColor: '#ffffff' }}>
          <div className={'flex-space-between-row-center'} style={{ padding: '15px 15px' }}>
            <span className={'commonFont'} style={{ fontSize: '18px' }}>国家和地区</span>
            <span className={'commonFont'} style={{ fontSize: '14px' }}>{this.state.data.address}</span>
          </div>
          <div className='Segment_line2' />
          <div className={'flex-space-between-row-center'} style={{ padding: '12px 15px' }}>
            <span className={'commonFont'} style={{ fontSize: 16 }}>+86</span>
            <div className={'flex-flex-end-row-center'}>
              <input ref={(c) => { this.input = c }} className={'commonFont'} placeholder={'请输入您的手机号...'} onChange={this.onPhoneChange} style={{ textAlign: 'right', border: 'none',fontSize: 16 }} />
              {this.state.clear === true ? <ReactSVG onClick={this.clearOnclick} path='./assets/images/User/close.svg' svgStyle={{ height: 16,width: 16,paddingLeft: 2 }}/> : ''}
            </div>
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
  public clearOnclick = () => {
    this.input.focus()
    this.input.value = ''
    this.setState({
      phone: ''
    })
    this.setState({
      clear: false,
      phoneConfirmButtonType: false
    })
  }

  public onPhoneChange = (e) => {
    let value = e.target.value
    if (value.length > 11) {
      this.input.value = value.substr(0,11)
      return
    }
    if (value.length > 0) {
      this.setState({
        clear: true
      })
    }
    if (value.length === 0) {
      this.setState({
        clear: false
      })
    }
    if (value.length === 11) {
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
    this.props.setIPhone(this.state.phone)
    history().push('/PhoneEditConfirm')
  }
  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Head title={'更换手机号'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#fff'} leftIconColor={'grey'} showLine={true}/>
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
  updateUserInfo,
  setIPhone
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

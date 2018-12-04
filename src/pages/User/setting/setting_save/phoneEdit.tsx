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
import ReactSVG from 'react-svg'

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
  value: string
  clear: boolean
}

class User extends React.Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      phoneConfirmButtonType: false,   /*false为disabled */
      phone: '',     /*要换绑的手机号  */
      data: { phone: '13589458987',address: '中国大陆' },   /*数据源 */
      value: '',
      clear: false
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
          <div className={'flex-space-between-row-center'} style={{ padding: '15px 15px' }}>
            <span className={'commonFont'} style={{ fontSize: '18px' }}>国家和地区</span>
            <span className={'commonFont'} style={{ fontSize: '14px' }}>{this.state.data.address}</span>
          </div>
          <div className='Segment_line2' />
          <div className={'flex-space-between-row-center'} style={{ padding: '10px 15px' }}>
            <span className={'commonFont'} style={{ fontSize: 16 }}>+86</span>
            <div className={'flex-flex-end-row-center'}>
              <input id={'input'} value={this.state.value} className={'commonFont'} placeholder={'请输入您的手机号...'} onChange={this.onPhoneChange} style={{ direction: 'rtl', border: 'none',fontSize: 16 }} />
              {this.state.clear === true ? <ReactSVG onClick={this.clearOnclick} path='./assets/images/User/close.svg' svgStyle={{ height: 16,width: '16',paddingLeft: 2 }}/> : ''}
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
    document.getElementById('input').focus()
    this.setState({
      clear: false
    })
    this.setState({
      value: ''
    })
    this.setState({
      phoneConfirmButtonType: false
    })
  }

  public onPhoneChange = (e) => {
    let value = e.target.value
    if (value.length > 13) return
    this.setState({
      value: value
    })
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
    if (value.length === 3) {
      this.setState({
        value: value.replace(/(.{3})/g,'$1 ')
      })
    }
    if (value.length === 8) {
      this.setState({
        value: value.replace(/(.{8})/g,'$1 ')
      })
    }
    if (value.length === 4) {
      console.log(1)
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

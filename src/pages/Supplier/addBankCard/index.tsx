import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '../../../store/reducers/globalDataReducer'
import { InputItem, Modal, Switch, Icon, Toast } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { PageTab } from '../../../datasources/PageTab'
import { UserInfo } from '../../../datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '../../../store/actions/global_data'
import history from 'history/createHashHistory'
import '../master.css'
import Head from '@components/Head'
import ReactSVG from 'react-svg'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  modal1: boolean
  cardCodeConfirmButtonType: boolean
}

function closest (el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el
    }
    el = el.parentElement
  }
  return null
}

class AddBankCard extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      modal1: false,
      cardCodeConfirmButtonType: false
    }
  }

  public renderContent = () => {
    return (
      <div>
        <div className='Segment_line2'/>
        <div style={{ backgroundColor: 'transparent', height: 150, textAlign: 'center' }}>
          <div style={{ paddingTop: 35 }}/>
          <span className={'p1'}>支付宝安全保障中</span>
          <br/>
          <br/>
          保障您的用卡安全
        </div>
        <div className='Segment_line2'/>
        <div style={{ backgroundColor: '#ffffff', color: '#585858' }}>
          <div className={'flex-space-between-row-center'} style={{
            backgroundColor: '#ffffff',
            height: 45,
            paddingLeft: 20,
            paddingRight: 30
          }}>
            {/*<span style={{ fontSize: 14, marginLeft: 10,color: '#b4b4b4' }}>请添加<span style={{ fontSize: 16,color: '#333' }}>&nbsp;用户名&nbsp;</span>的银行卡</span>*/}
            {/*<ReactSVG path='./assets/images/User/exclamationMark.svg' svgStyle={{ width: 16, height: 16,paddingLeft: '10' }} onClick={this.showModal}/>*/}
            <span style={{ fontSize: 16 }}>用户名</span>
            <div className={'flex-center-row-center'}>
              <InputItem placeholder={'请输入银行开户人姓名'} maxLength={23} type='bankCard' className={'BankCode'}
                         onChange={this.cardCodeOnclick}/>
            </div>
          </div>
        </div>
        <div className='Segment_line2'/>
        <div style={{ backgroundColor: 'transparent', height: 3 }}/>
        <div style={{ backgroundColor: '#ffffff', color: '#585858' }}>
          <div className='Segment_line2'/>
          <div className={'flex-space-between-row-center'} style={{
            backgroundColor: '#ffffff',
            height: 45,
            paddingLeft: 20,
            paddingRight: 10
          }}>
            <span style={{ fontSize: 16 }}>卡号</span>
            <div className={'flex-center-row-center'}>
              <InputItem placeholder={'请输入银行卡号'} maxLength={23} type='bankCard' className={'BankCode'}
                         onChange={this.cardCodeOnclick}/>
              <ReactSVG path='./assets/images/User/addPhoto.svg' svgStyle={{ width: 22, height: 22 }}/>
            </div>
          </div>
        </div>
        <div className='Segment_line2'/>
        <div>
          <Button type='primary' disabled={!this.state.cardCodeConfirmButtonType} style={{
            marginTop: 35,
            width: '90%',
            color: '#ffffff',
            marginLeft: '5%'
          }} onClick={this.nextOnclick}
          >下一步</Button>
        </div>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose}
          title='执卡人说明'
          footer={[{
            text: '确认', onPress: () => {
              console.log('ok')
              this.onClose()
            }
          }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: 60, textAlign: 'center' }}>
            <div>
              为保证账户资金安全，只能绑定认证用本人的银行卡
            </div>
          </div>
        </Modal>
      </div>
    )
  }

  nextOnclick = () => {
    console.log('下一步：验证短信')
  }

  cardCodeOnclick = (e) => {
    if (e.length > 0) {
      this.setState({
        cardCodeConfirmButtonType: true
      })
    } else {
      this.setState({
        cardCodeConfirmButtonType: false
      })
    }
  }

  showModal = (e) => {
    e.preventDefault() // 修复 Android 上点击穿透
    this.setState({
      modal1: true
    })
  }
  onClose = () => {
    this.setState({
      modal1: false
    })
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return
    }
    const pNode = closest(e.target, '.am-modal-content')
    if (!pNode) {
      e.preventDefault()
    }
  }
  public headIcon = () => {
    return (
      <ReactSVG path='./assets/images/User/questionMark.svg' svgStyle={{ width: 22, height: 22 }}/>
    )
  }
  public addOnclick = () => {
    return
  }

  public render () {
    return (
      <div>
        <Head title={'添加银行卡'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#fff'} leftIconColor={'grey'}
              showLine={true}
              showRightIcon={true}
              rightIconContent={this.headIcon()}
              rightIconOnClick={this.addOnclick}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddBankCard)

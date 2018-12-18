import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '../../../store/reducers/globalDataReducer'
import { InputItem, ActionSheet, Icon, Toast } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { PageTab } from '../../../datasources/PageTab'
import { UserInfo } from '../../../datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '../../../store/actions/global_data'
import Nav from '@components/Head/nav'
import history from 'history/createHashHistory'
import axios from 'axios'
import { MyResponse } from '@datasources/MyResponse'
import { cloneDeep, get } from 'lodash'
import Head from '@components/Head'
import ReactSVG from 'react-svg'

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
  userInfo: UserInfo
}
let RightIconMaxSize: number = 18
class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: { img: 'http://img.gexing.me/uploads/allimg/170830/1-1FR9161152259.jpg', username: 'pubg',name: '阿木木',phone: '17568452298', qr: '',sex: '男' },
      step: 0,
      confirmCss: [],
      refresh: '',
      userInfo: this.props.userInfo
    }
  }

  /**
   * 个人信息页面
   */
  public renderContent = () => {
    return(
      <div style={{ backgroundColor: '#ffffff',color: '#858585' }}>
        <div className={'flex-space-between-row-center'} style={{ padding: '5px 15px' }}
             onClick={this.uploadPicturesOnClick}>
          <span style={{ fontSize: '16px' }}>用户头像</span>
          <div className={'flex-center-row-center'}>
            <div style={{
              width: 50,
              height: 50
            }}>
              <div style={{ borderRadius: '50%',width: 50, height: 50,overflow: 'hidden' }} >
                <img style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }} src={this.state.userInfo.user_head_portrait} />
              </div>
            </div>
            <ReactSVG path='./assets/images/User/right.svg' svgStyle={{ width: RightIconMaxSize, height: RightIconMaxSize,paddingLeft: 5 }}/>
          </div>
        </div>
        <div className='Segment_line2' />
        <div className={'flex-space-between-row-center'} style={{ padding: '15px 15px' }}>
          <span style={{ fontSize: '16px' }}>账号</span>
          <span style={{ fontSize: '14px' }}>{this.state.userInfo.user_class_name}</span>
        </div>
        <div className='Segment_line2'/>
        <div className={'flex-space-between-row-center'} style={{ padding: '15px 15px' }}
             onClick={this.nameOnclick}>
          <span style={{ fontSize: '16px' }}>昵称</span>
          <div className={'flex-center-row-center'}>
            <span style={{ fontSize: '14px' }}>{this.state.userInfo.user_name}</span>
            <ReactSVG path='./assets/images/User/right.svg' svgStyle={{ width: RightIconMaxSize, height: RightIconMaxSize }}/>
          </div>
        </div>
        <div className='Segment_line2'/>
        <div className={'flex-space-between-row-center'} style={{ padding: '15px 15px' }}
             onClick={this.phoneOnclick}>
          <span style={{ fontSize: '16px' }}>手机号码</span>
          <div className={'flex-center-row-center'}>
            <span style={{ fontSize: '14px' }}>{this.state.userInfo.user_phone}</span>
            <ReactSVG path='./assets/images/User/right.svg' svgStyle={{ width: RightIconMaxSize, height: RightIconMaxSize }}/>
          </div>
        </div>
        <div className='Segment_line2'/>
        <div className={'flex-space-between-row-center'} style={{ padding: '15px 15px' }}>
          <span style={{ fontSize: '16px' }}>我的二维码名片</span>
          <div className={'flex-center-row-center'}>
            <span style={{ fontSize: '14px' }}>{this.state.userInfo.user_qr_code}</span>
            <ReactSVG path='./assets/images/User/right.svg' svgStyle={{ width: RightIconMaxSize, height: RightIconMaxSize }}/>
          </div>
        </div>
        <div className='Segment_line2'/>
        <div className={'flex-space-between-row-center'} style={{ padding: '15px 15px' }}
             onClick={this.uploadSexOnClick}>
          <span style={{ fontSize: '16px' }}>性别</span>
          <div className={'flex-center-row-center'}>
            <span style={{ fontSize: '14px' }}>{this.state.userInfo.user_sex}</span>
            <ReactSVG path='./assets/images/User/right.svg' svgStyle={{ width: RightIconMaxSize, height: RightIconMaxSize }}/>
          </div>
        </div>
      </div>
    )
  }
  /**
   * 点击昵称修改
   */
  nameOnclick = () => {
    history().push('/userInfoNameEdit')
  }
  /**
   * 点击手机号修改
   */
  phoneOnclick = () => {
    history().push('/userInfoPhoneEdit')
  }
  /**
   * 点击上传头像显示弹窗
   */
  uploadPicturesOnClick = () => {
    const BUTTONS = ['拍摄', '从相册上传', '取消']
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      message: '',
      maskClosable: true
    }, (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          this.photographOnClick()
          break
        case 1:
          this.albumOnClick()
          break
        default:
          break
      }
    })
  }
  photographOnClick = () => {
    return
  }
  albumOnClick = () => {
    return
  }
  /**
   * 点击选择性别显示弹窗
   */
  uploadSexOnClick = () => {
    const BUTTONS = ['男', '女', '取消']
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      message: '',
      maskClosable: true
    }, (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          this.manOnClick()
          break
        case 1:
          this.womanOnClick()
          break
        default:
          break
      }
    })
  }
  manOnClick = () => {
    return
  }
  womanOnClick = () => {
    return
  }

  public render () {
    return (
      <div>
        <Head title={'个人资料'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#fff'} leftIconColor={'grey'} showLine={true}/>
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

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
   * 个人信息页面
   */
  public renderContent = () => {
    return(
      <div style={{ backgroundColor: '#ffffff',color: '#858585' }}>
        <div className='Segment_line2'></div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 5,
          paddingLeft: 10,
          paddingBottom: 5,
          paddingRight: 10
        }}
             onClick={this.uploadPicturesOnClick}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ fontSize: '16px', marginTop: 15, marginLeft: 10 }}>用户头像</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
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
              }} src={this.state.data.img} />
            </div>
          </div>
          <Icon type='right' style={{ marginTop: 15, marginRight: 2 }}></Icon>
        </div>
        </div>
        <div className='Segment_line2'></div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>账号</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ fontSize: '14px', paddingTop: 7, paddingLeft: 10 }}>{this.state.data.username}</span>
          </div>
        </div>
        <div className='Segment_line2'></div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }}
             onClick={this.nameOnclick}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>昵称</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ fontSize: '14px', paddingTop: 7, paddingLeft: 10 }}>{this.state.data.name}</span>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
          </div>
        </div>
        <div className='Segment_line2'></div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }}
             onClick={this.phoneOnclick}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>手机号码</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ fontSize: '14px', paddingTop: 7, paddingLeft: 10 }}>{this.state.data.phone}</span>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
          </div>
        </div>
        <div className='Segment_line2'></div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>我的二维码名片</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ fontSize: '14px', paddingTop: 7, paddingLeft: 10 }}>{this.state.data.qr}</span>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
          </div>
        </div>
        <div className='Segment_line2'></div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }}
             onClick={this.uploadSexOnClick}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>性别</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ fontSize: '14px', paddingTop: 7, paddingLeft: 10 }}>{this.state.data.sex}</span>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
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
        <Nav title={'个人资料'} color={'#ffffff'} />
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

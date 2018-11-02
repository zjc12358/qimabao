import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { InputItem,ActionSheet, Icon } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global-data'

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
   * 标题
   */
  public renderNav = (title) => {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: 40,
        top: 0,
        zIndex: 100,
        position: 'fixed'
      }}
      >
        <Link to={'/NavBar'}>
          <div style={{ float: 'left', position: 'absolute' }}>
            <Icon type='left' color='#000000' size='lg' onClick={this.backOnclick}/>
          </div>
        </Link>
        <div style={{
          fontSize: 18,
          paddingTop: 8,
          color: '#000000',
          width: '100%',
          textAlign: 'center'
        }}>
          <span>{title}</span>
        </div>
      </div>
    )
  }
  /**
   * 后退
   */
  backOnclick = () => {
    this.props.updatePageTab('UserPageTabBar')
  }
  /**
   * 标题
   */
  public renderNav1 = (title,func) => {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: 40,
        top: 0,
        zIndex: 100,
        position: 'fixed'
      }}
      >
        <div style={{ float: 'left', position: 'absolute' }}>
          <Icon type='left' color='#000000' size='lg' onClick={func}/>
        </div>
        <div style={{
          fontSize: 18,
          paddingTop: 8,
          color: '#000000',
          width: '100%',
          textAlign: 'center'
        }}>
          <span>{title}</span>
        </div>
      </div>
    )
  }

  /**
   * 个人信息页面
   */
  public renderContent = () => {
    console.log(this.state.data.img)
    return(
      <div style={{ backgroundColor: '#ffffff',color: '#858585', paddingTop: 40 }}>
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
            marginLeft: 200,
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
          <Icon type='right' style={{ marginTop: 15 }}></Icon>
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
    this.setState({
      step: 1
    })
  }
  /**
   * 点击手机号修改
   */
  phoneOnclick = () => {
    this.setState({
      step: 2
    })
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
  /**
   * 第一个页面，修改用户昵称
   */
  public renderContent1 = () => {
    return(
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 40
      }}>
        <div style={{
          padding: 15
        }}>
          <InputItem clear/>
        </div>
        <div style={{
          padding: 20
        }}>
          <span>注意：与企妈宝业务与买家品牌冲突的昵称，企妈宝将有权收回</span>
        </div>
        <div style={{
          padding: 15
        }}>
          <Button type={'primary'}>保存</Button>
        </div>
      </div>
    )
  }
  /**
   * 后退
   */
  backOnclick1 = () => {
    this.setState({
      step: 0
    })
  }
  /**
   * 第二个页面，修改手机号码
   */
  public renderContent2 = () => {
    return(
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 40
      }}>
        <div style={{
          padding: 15
        }}>
          <InputItem clear/>
        </div>
        <div style={{
          padding: 20
        }}>
          <span>注意：与企妈宝业务与买家品牌冲突的昵称，企妈宝将有权收回</span>
        </div>
        <div style={{
          padding: 15
        }}>
          <Button type={'primary'} onClick={this.nextOnclick}>下一步</Button>
        </div>
      </div>
    )
  }
  /**
   * 后退
   */
  backOnclick2 = () => {
    this.setState({
      step: 0
    })
  }
  /**
   * 下一步
   */
  nextOnclick = () => {
    this.setState({
      step: 3
    })
  }
  /**
   * 第三个页面，手机号验证码
   */
  public renderContent3 = () => {
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
  /**
   * 后退
   */
  backOnclick3 = () => {
    this.setState({
      confirmCss: []
    })
    this.setState({
      step: 2
    })
  }
  public render () {
    switch (this.state.step) {
      case 0 : return (
        <div>
          {this.renderNav('个人资料')}
          {this.renderContent()}
        </div>)
      case 1 : return (
        <div>
          {this.renderNav1('修改用户昵称',this.backOnclick1)}
          {this.renderContent1()}
        </div>)
      case 2 : return (
        <div>
          {this.renderNav1('修改手机号码',this.backOnclick2)}
          {this.renderContent2()}
        </div>)
      case 3 : return (
        <div>
          {this.renderNav1('修改手机号码',this.backOnclick3)}
          {this.renderContent3()}
        </div>)
    }
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

import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { Icon } from 'antd-mobile'
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
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: { img: 'http://img.gexing.me/uploads/allimg/170830/1-1FR9161152259.jpg', username: 'pubg',name: '阿木木',phone: '17568452298', qr: '',sex: '男' }
    }
  }

  public renderNav = () => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: '40px',
        width: '53%',
        marginTop: 8,
        marginLeft: 2
      }}
      >
        <Link to='/NavBar'><Icon type='left' color='#000000' size='lg' onClick={this.backOnclick} /></Link>
        <div style={{
          fontSize: 20,
          paddingTop: 5
        }}>个人资料</div>
      </div>
    )
  }
  backOnclick = () => {
    this.props.updatePageTab('UserPageTabBar')
  }

  public renderContent = () => {
    console.log(this.state.data.img)
    return(
      <div style={{ backgroundColor: '#ffffff',color: '#858585' }}>
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
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>用户头像</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <div style={{ borderRadius: '50%',width: 50, height: 50,overflow: 'hidden' }} ><img style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%'
            }} src={this.state.data.img} /></div>
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
        }}>
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
        }}>
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
        }}>
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

  public render () {
    return (
      <div>
        {this.renderNav()}
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

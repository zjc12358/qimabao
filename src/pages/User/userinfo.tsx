import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { Icon } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { upateUserInfo, updatePageTab } from '@store/actions/global-data'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  upateUserInfo: (userInfo: UserInfo) => void
}

interface State {

}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {

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
        }}>设置</div>
      </div>
    )
  }
  backOnclick = () => {
    this.props.updatePageTab({ pageName: 'UserPageTabBar' })
  }

  public renderContent = () => {
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
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>安全设置</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ marginTop: 5 }}>手机号、密码</span>
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
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>支付设置</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
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
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>收货地址</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
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
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>清除缓存</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
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
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>关于我们</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
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
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>开启通知</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
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
        <Button type='warning' style={{
          marginTop: 35,
          width: '90%',
          color: '#ffffff',
          marginLeft: '5%'
        }}>退出当前账号</Button>
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
  upateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

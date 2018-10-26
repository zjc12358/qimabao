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
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
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
        marginTop: 8
      }}
      >
        <Link to='/NavBar'><Icon type='left' color='#000000' size='lg' onClick={this.backOnclick} /></Link>
        <div style={{
          fontSize: 20,
          paddingTop: 6
        }}>设置</div>
      </div>
    )
  }
  backOnclick = () => {
    this.props.updatePageTab({ pageName: 'UserPageTabBar' })
  }

  public renderContent = () => {
    return(
      <div style={{ backgroundColor: '#ffffff' }}>
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
          <span style={{ fontSize: '16px' }}>我的购买</span>
          <Icon type='right'></Icon>
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
          <span style={{ fontSize: '16px' }}>售后退款</span>
          <Icon type='right'></Icon>
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
          <span style={{ fontSize: '16px' }}>我的购买</span>
          <Icon type='right'></Icon>
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
          <span style={{ fontSize: '16px' }}>售后退款</span>
          <Icon type='right'></Icon>
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
          <span style={{ fontSize: '16px' }}>我的购买</span>
          <Icon type='right'></Icon>
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
          <span style={{ fontSize: '16px' }}>售后退款</span>
          <Icon type='right'></Icon>
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
  updateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

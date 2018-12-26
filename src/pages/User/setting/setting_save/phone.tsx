import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { Toast,Modal, List, Button, WhiteSpace, WingBlank,Icon,InputItem } from 'antd-mobile'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global_data'
import history from 'history/createHashHistory'
import '../../master.css'
import Head from '@components/Head'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  phone: string
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  data: any
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: { phone: '13589458987',address: '中国大陆' }   /*数据源 */
    }
  }

  /**
   * 显示当前手机号
   */
  public renderContent = () => {
    return(
      <div>
        <div style={{ backgroundColor: '#ffffff' }}>
          <div className={'flex-space-between-row-center'} style={{ padding: '12px 15px' }}>
            <span style={{ fontSize: '16px', paddingLeft: 10 }}>当前手机号</span>
            <div className={'flex-center-row-center'}>
              <span>{this.props.phone.replace(/(\d{3})(\d{6})(\d{2})/,'$1******$3')}</span>
              <span style={{ color: '#0084e7',paddingLeft: 5 }}>已绑定</span>
            </div>
          </div>
        </div>
        <div className='Segment_line2' />
        <div>
          <Button type='primary' style={{
            marginTop: 35,
            width: '90%',
            color: '#ffffff',
            marginLeft: '5%'
          }} onClick={this.phoneEditOnclick}
          >更换手机号</Button>
          <span style={{ color: '#828282',marginTop: 20,marginLeft: '5%', position: 'absolute' }}>手机号可用来找回密码</span>
        </div>
      </div>
    )
  }

  public phoneEditOnclick = () => {
    history().push('/PhoneEdit')
  }

  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Head title={'手机号'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#fff'} leftIconColor={'grey'} showLine={true}/>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    pageTab: state.globalData.pageTab,
    userInfo: state.globalData.userInfo,
    phone: state.globalData.phone
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updatePageTab,
  updateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

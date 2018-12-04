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
import ReactSVG from 'react-svg'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  data: any
}
let RightIconMaxSize: number = 18
class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: { phone: '13589458987',address: '中国大陆' }   /*数据源 */
    }
  }

  /**
   * 安全设置
   */
  public renderContent = () => {
    return(
      <div style={{ backgroundColor: '#ffffff',color: '#858585' }}>
        <div className={'flex-space-between-row-center'} style={{ padding: '10px 15px' }} onClick={this.phoneOnclick}>
          <span style={{ fontSize: '16px', paddingLeft: 10 }}>手机号</span>
          <div className={'flex-flex-end-row-center'}>
            <span>{this.state.data.phone.replace(/(\d{3})(\d{6})(\d{2})/,'$1******$3')}</span>
            <ReactSVG path='./assets/images/User/right.svg' svgStyle={{ width: RightIconMaxSize, height: RightIconMaxSize }}/>
          </div>
        </div>
        <div className='Segment_line2' />
        <div className={'flex-space-between-row-center'} style={{ padding: '10px 15px' }} onClick={this.payOnclick}>
          <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>支付密码设置</span>
          <ReactSVG path='./assets/images/User/right.svg' svgStyle={{ width: RightIconMaxSize, height: RightIconMaxSize }}/>
        </div>
      </div>
    )
  }

  public phoneOnclick = () => {
    history().push('/Phone')
  }

  public payOnclick = () => {
    history().push('/PaymentPasswordChoose')
  }

  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Head title={'安全设置'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#fff'} leftIconColor={'grey'} showLine={true}/>
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

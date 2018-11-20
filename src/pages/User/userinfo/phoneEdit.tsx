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
   * 第二个页面，修改手机号码
   */
  public renderContent = () => {
    return(
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
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
   * 下一步
   */
  nextOnclick = () => {
    history().push('/userInfoPhoneEditConfirm')
  }
  public render () {
    return (
      <div>
        <Nav title={'修改手机号码'} color={'#ffffff'} />
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

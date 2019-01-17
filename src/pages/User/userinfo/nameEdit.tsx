import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '../../../store/reducers/globalDataReducer'
import { InputItem, ActionSheet, Icon, Toast } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { PageTab } from '../../../datasources/PageTab'
import { UserInfo } from '../../../datasources/UserInfo'
import { updateUserName, updatePageTab } from '../../../store/actions/global_data'
import Nav from '@components/Head/nav'
import history from 'history/createHashHistory'
import Head from '@components/Head'
import axios from 'axios'
import { MyResponse } from '@datasources/MyResponse'
import { cloneDeep, get } from 'lodash'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: string) => void
  updateUserName: (name: string) => void
}

interface State {
  data: any
  step: number
  confirmCss: any
  refresh: string
}

class User extends React.Component<Props, State> {
  private input: HTMLInputElement

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
   * 第一个页面，修改用户昵称
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
          <InputItem clear ref={(c) => { this.input = c }}/>
        </div>
        <div style={{
          padding: 20
        }}>
          <span>注意：与企妈宝业务与买家品牌冲突的昵称，企妈宝将有权收回</span>
        </div>
        <div style={{
          padding: 15
        }}>
          <Button type={'primary'} onClick={this.textOnchange}>保存</Button>
        </div>
      </div>
    )
  }
  public textOnchange = () => {
    let nickname: any = this.input
    if (nickname.state.value === '') {
      Toast.info('昵称不能为空', 2, null, false)
      return
    }
    let url = 'CanteenProcurementManager/user/nail/updateMeans?'
    let query = 'index=user_name&content=' + nickname.state.value
    console.log(url + query)
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          this.props.updateUserName(cloneDeep(nickname.state.value))
          Toast.info('修改成功', 2, null, false)
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }
  public render () {
    return (
      <div>
        <Head title={'修改用户昵称'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#fff'} leftIconColor={'grey'} showLine={true}/>
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
  updateUserName
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

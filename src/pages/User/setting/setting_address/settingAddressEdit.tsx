import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { List,Icon } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global_data'
import history from 'history/createHashHistory'
import Nav from '@components/Head/nav'
import '../../master.css'
import Head from '@components/Head'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  data: any
  currentIndex: number
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: [
        { name: '魏嘉豪', phone: '13548545685', address: '朝晖社区',houseNumber: '808室' },
        { name: '大当家', phone: '13548545685', address: '泰山路往左走120号do花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路路荷',houseNumber: '508室' },
        { name: '二当家', phone: '13548545685', address: '华山路往右走121号花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路路荷花路荷花路荷花',houseNumber: '1557室' }
      ],
      currentIndex: 0
    }
  }

  public renderContent = () => {
    return(
      <div style={{
        paddingTop: 0
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          backgroundColor: '#ffffff'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            position: 'relative'
          }}>
            <span className={'addressText'}>收货地址</span>
            <input type='text' className={'addressInput'} defaultValue={this.state.data[this.state.currentIndex].address} />
            <Icon type={'loading'} style={{ top: 10, float: 'left',position: 'absolute', right: '10%' }}/>
          </div>
          <div className='Segment_line' />
          <div>
            <span className={'addressText'}>门牌号</span>
            <input type='text' className={'addressInput'} defaultValue={this.state.data[this.state.currentIndex].houseNumber} />
          </div>
          <div className='Segment_line' />
          <div>
            <span className={'addressText'}>联系人</span>
            <input type='text' className={'addressInput'} defaultValue={this.state.data[this.state.currentIndex].name} />
          </div>
          <div className='Segment_line' />
          <div>
            <span className={'addressText'}>手机号</span>
            <input type='text' className={'addressInput'} defaultValue={this.state.data[this.state.currentIndex].phone} />
          </div>
        </div>
        <div className='Segment_line2' />
        <Button type='primary' style={{
          marginTop: 50,
          width: '80%',
          marginLeft: '10%'
        }}>保存</Button>
      </div>
    )
  }

  public render () {
    return(
      <div style={{
        height: '100vh'
      }}>
        <Head title={'编辑收货地址'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#fff'} leftIconColor={'grey'} showLine={true}/>
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

import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { Toast,Modal, List, Button, WhiteSpace, WingBlank,Icon,InputItem } from 'antd-mobile'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global_data'
import Nav from '@components/Head/nav'
import history from 'history/createHashHistory'
import '../../master.css'
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

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: [
        { name: '魏嘉豪', phone: '13548545685', address: '朝晖社区',houseNumber: '808室' },
        { name: '大当家', phone: '13548545685', address: '泰山路往左走120号do花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路路荷',houseNumber: '508室' },
        { name: '二当家', phone: '13548545685', address: '华山路往右走121号花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路路荷花路荷花路荷花',houseNumber: '1557室' }
      ]
    }
  }

  componentWillMount () {
    this.state.data.push({ name: '魏嘉豪1', phone: '1354854562285', address: '荷花路荷花路荷花路荷花路22荷路荷花路',houseNumber: '808室' })
    this.state.data.push({ name: '魏嘉豪1', phone: '1354854562285', address: '荷花路荷花路荷花路荷花路22荷路荷花路',houseNumber: '808室' })
    this.state.data.push({ name: '魏嘉豪1', phone: '1354854562285', address: '荷花路荷花路荷花路荷花路22荷路荷花路',houseNumber: '808室' })
    this.state.data.push({ name: '魏嘉豪1', phone: '1354854562285', address: '荷花路荷花路荷花路荷花路22荷路荷花路',houseNumber: '808室' })
    this.state.data.push({ name: '魏嘉豪1', phone: '1354854562285', address: '荷花路荷花路荷花路荷花路22荷路荷花路',houseNumber: '808室' })
    this.state.data.push({ name: '魏嘉豪1', phone: '1354854562285', address: '荷花路荷花路荷花路荷花路22荷路荷花路',houseNumber: '808室' })
    this.state.data.push({ name: '魏嘉豪1', phone: '1354854562285', address: '荷花路荷花路荷花路荷花路22荷路荷花路',houseNumber: '808室' })
    this.state.data.push({ name: '魏嘉豪1', phone: '1354854562285', address: '荷花路荷花路荷花路荷花路22荷路荷花路',houseNumber: '808室' })
    this.state.data.push({ name: '魏嘉豪1', phone: '1354854562285', address: '荷花路荷花路荷花路荷花路22荷路荷花路',houseNumber: '808室' })
    this.state.data.push({ name: '魏嘉豪1', phone: '1354854562285', address: '荷花路荷花路荷花路荷花路22荷路荷花路',houseNumber: '808室' })
    this.state.data.push({ name: '魏嘉豪1', phone: '1354854562285', address: '荷花路荷花路荷花路荷花路22荷路荷花路',houseNumber: '808室' })
    this.state.data.push({ name: '魏嘉豪1', phone: '1354854562285', address: '荷花路荷花路荷花路荷花路22荷路荷花路',houseNumber: '808室' })
    this.state.data.push({ name: '魏嘉豪1', phone: '1354854562285', address: '荷花路荷花路荷花路荷花路22荷路荷花路',houseNumber: '808室' })

  }
  /**
   * 收货地址详情
   */
  public renderContent = () => {
    return(
      <div style={{
        paddingTop: 0
      }}>
        {this.state.data.map((i, index) => (
          <div style={{ backgroundColor: 'white' }}>
            {this.renderAddressItem(i, index)}
          </div>
        ))}
        <Button type='primary' style={{
          width: '100%',
          height: 50,
          bottom: 0,
          zIndex: 100,
          color: '#ffffff',
          position: 'fixed'
        }}>添加新的收货地址</Button>
      </div>
    )
  }

  public renderAddressItem = (i, index) => {
    return(
      <div style={{
        marginTop: 2,
        width: '100%',
        height: 60,
        backgroundColor: '#ffffff',
        position: 'relative'
      }}
           onClick={this.ItemOnclick.bind(this,index)}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingLeft: 10
          }}>
            <span style={{ fontSize: 15 }}>{i.name}&nbsp;&nbsp;{i.phone}</span>
            <span style={{ fontSize: 12, paddingTop: 5,color: '#969696' }}>{i.address}&nbsp;{i.houseNumber}</span>
          </div>
          <div style={{
            padding: 20
          }}>
            <ReactSVG path='../assets/images/User/edit.svg' svgStyle={{ width: 18, height: 18 }}/>
          </div>
        </div>
      </div>
    )
  }

  public ItemOnclick = (index) => {
    history().push('/settingAddressEdit')
  }

  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Nav title={'我的地址'} color={'#ffffff'} />
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

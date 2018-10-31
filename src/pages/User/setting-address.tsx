import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { List,Icon } from 'antd-mobile'
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
  data: any
}
const Item = List.Item
const Brief = Item.Brief
class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: [
        { name: '魏嘉豪', phone: '13548545685', address: '荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路' },
        { name: '大当家', phone: '13548545685', address: '泰山路往左走120号do花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷' },
        { name: '二当家', phone: '13548545685', address: '华山路往右走121号花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花路荷花' }
      ]
    }
  }

  public renderNav = () => {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        position: 'relative',
        height: 40
      }}
      >
        <div style={{ float: 'left', position: 'absolute' }}>
          <Link to='/setting'><Icon type='left' color='#000000' size='lg' /></Link>
        </div>
        <div style={{
          fontSize: 20,
          paddingTop: 5,
          color: '#000000',
          width: '100%',
          textAlign: 'center'
        }}>
          <span>我的地址</span>
        </div>
      </div>
    )
  }

  public renderContent = () => {
    return(
      <div>
        {this.state.data.map((i, index) => (
          <div style={{ backgroundColor: 'white' }}>
            {this.renderAddressItem(i, index)}
          </div>
        ))}
      </div>
    )
  }

  public renderAddressItem = (i, index) => {
    return(
      <div style={{
        marginTop: 2,
        width: '100%',
        height: 70,
        backgroundColor: '#ffffff',
        position: 'relative'
      }}>
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
            <span style={{ fontSize: 16 }}>{i.name}&nbsp;&nbsp;{i.phone}</span>
            <span style={{ fontSize: 13, paddingTop: 5,color: '#969696' }}>{i.address}</span>
          </div>
          <div style={{
            padding: 20
          }}>
            <Icon type={'loading'}></Icon>
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

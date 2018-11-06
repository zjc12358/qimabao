import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { List,Icon } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global-data'
import '../../assets/UserStyle.css'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  data: any
  step: number
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
      step: 0,
      currentIndex: 0
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

  public renderNav = (title) => {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: 40,
        top: 0,
        zIndex: 100,
        position: 'fixed'
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
          <span>{title}</span>
        </div>
      </div>
    )
  }

  public renderNav1 = (title) => {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: 40,
        top: 0,
        zIndex: 100,
        position: 'fixed'
      }}
      >
        <div style={{ float: 'left', position: 'absolute' }}>
          <Icon type='left' color='#000000' size='lg' onClick={this.backOnclick}/>
        </div>
        <div style={{
          fontSize: 18,
          paddingTop: 8,
          color: '#000000',
          width: '100%',
          textAlign: 'center'
        }}>
          <span>{title}</span>
        </div>
        <div style={{ position: 'absolute',right: 10, top: 10,fontSize: 16,color: '#6361ee' }}>
          <span>删除</span>
        </div>
      </div>
    )
  }

  public backOnclick = () => {
    this.setState({
      step: 0
    })
  }

  public renderContent = () => {
    return(
      <div style={{
        paddingTop: 40
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

  public renderContent1 = () => {
    return(
      <div style={{
        paddingTop: 40
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          backgroundColor: '#ffffff'
        }}>
          <div className='Segment_line2' />
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
            <Icon type={'loading'}></Icon>
          </div>
        </div>
      </div>
    )
  }

  public ItemOnclick = (index) => {
    console.log(this.state.data[index])
    this.setState({
      step: 1,
      currentIndex: index
    })
  }

  public render () {
    switch (this.state.step) {
      case 0 : return (
        <div>
          {this.renderNav('我的地址')}
          {this.renderContent()}
        </div>)
      case 1 : return (
        <div>
          {this.renderNav1('编辑收货地址')}
          {this.renderContent1()}
        </div>)
    }
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

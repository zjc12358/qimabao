import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { Switch,Icon, Toast } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global_data'
import '../../assets/UserStyle.css'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  checked: boolean
  orderChecked: boolean
  data: any
  ssTt: number
}

let offsetY: number = 0
class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      checked: false,
      orderChecked: false,
      data: [
        { id: '1', name: '账户余额', order: '1' },
        { id: '2', name: '微信', order: '2' },
        { id: '1', name: '账户余额', order: '3' },
        { id: '2', name: '微信', order: '4' }
      ],
      ssTt: 0
    }
  }

  public renderNav = () => {
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
        <Link to={'/setting'}>
          <div style={{ float: 'left', position: 'absolute' }}>
            <Icon type='left' color='#000000' size='lg'/>
          </div>
        </Link>
        <div style={{
          fontSize: 18,
          paddingTop: 8,
          color: '#000000',
          width: '100%',
          textAlign: 'center'
        }}>
          <span>支付设置</span>
        </div>
        <Link to={'/setting-pay-bankCard'}>
          <div style={{ position: 'absolute',right: 10, top: 10,fontSize: 16,color: '#3e38ee' }}>
            <span>+</span>
          </div>
        </Link>
      </div>
    )
  }

  public renderContent = () => {
    return(
      <div style={{ paddingTop: 40 }}>
        <div className='Segment_line2' />
        <div style={{ backgroundColor: 'transparent',height: 10 }}/>
        <div style={{ backgroundColor: '#ffffff',color: '#585858' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 10,
            backgroundColor: '#ffffff',
            height: 20
          }}>
            <span style={{ fontSize: '16px', marginLeft: 10 }}>优先使用优惠券</span>
            <Switch checked={this.state.checked} onClick={() => { this.setState({ checked: !this.state.checked }) }} />
          </div>
        </div>
        <div className='Segment_line2' />
        <div style={{ backgroundColor: 'transparent',height: 10 }}/>
        <span style={{ color: '#919191',fontSize: 13,paddingLeft: 20 }}>有红包最先使用红包</span>
        <div style={{ backgroundColor: 'transparent',height: 10 }}/>
        <div style={{ backgroundColor: '#ffffff',color: '#585858' }}>
          <div className='Segment_line2' />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 10,
            backgroundColor: '#ffffff',
            height: 20
          }}>
            <span style={{ fontSize: '16px', marginLeft: 10 }}>自定义扣款顺序</span>
            <Switch checked={this.state.orderChecked} onClick={() => { this.setState({ orderChecked: !this.state.orderChecked }) }} />
          </div>
        </div>
        <div className='Segment_line2' />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 10,
          backgroundColor: '#ffffff',
          height: 20
        }}>
          <span style={{ fontSize: '14px', marginLeft: 10,color: '#8f8f8f' }}>系统将根据以下排序按顺序扣款</span>
          <span>拖动</span>
        </div>
        <div className='Segment_line2' />
        <div style={{ paddingLeft: 20, marginTop: 10, fontSize: 14,color: '#8f8f8f' }}>
          <span>对于特殊业务有特殊规则的，将遵循业务规则扣款</span>
        </div>
      </div>
    )
  }
  public renderItem = (i,index) => {
    return(
      <div id={'main'} title={i.order} style={{ position: 'absolute', top: 300 + index * 40,width: '100%' }}
           onTouchMove={this.touch}
           onTouchStart={this.touchStart}
           onTouchEnd={this.touchEnd}
      >
        <div className='Segment_line' />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 10,
          backgroundColor: '#ffffff',
          height: 20
        }}>
          <span style={{ fontSize: '16px', marginLeft: 10 }}>{i.name}</span>
          <img src='../../assets/images/foot_home.svg' width='20' height='20' />
        </div>
      </div>
    )
  }
  public touch = (d) => {
    if (d.target.offsetParent.id === 'main') {
      d.target.offsetParent.style.top = (d.targetTouches['0'].clientY - offsetY + parseInt(d.target.offsetParent.style.top.substr(0,d.target.offsetParent.style.top.length - 2),0)) + 'px'
    }
    offsetY = d.targetTouches['0'].clientY
    if (parseInt(d.target.offsetParent.style.top.substr(0,d.target.offsetParent.style.top.length - 2),0) >= (parseInt(d.target.offsetParent.title,0) * 40 + 280)) {
      console.log(d.target.offsetParent.offsetParent.children[2].children[parseInt(d.target.offsetParent.title,0)].children[0].className = 'a1')
    }
    /*
    console.log(d.targetTouches['0'].clientX)
    console.log(d.targetTouches['0'].clientY)
    console.log(d.target.offsetParent)
    console.log(d.targetTouches)
    d.target.style.height = '10px'
     */
  }
  public touchStart = (d) => {
    if (d.target.offsetParent.id === 'main') {
      d.target.offsetParent.style.zIndex = 100
      offsetY = d.targetTouches['0'].clientY
      d.target.offsetParent.style.height = 40
      d.target.offsetParent.children[0].title = ''
    }
    // d.target.style.height = '10px'
  }
  public touchEnd = (d) => {
    if (d.target.offsetParent.id === 'main') {
      d.target.offsetParent.style.zIndex = parseInt(d.target.offsetParent.title,0)
      d.target.offsetParent.children[0].className = 'Segment_line'
      // d.target.offsetParent.className = 'a1'
    }
  }
  public render () {
    return (
      <div className={'t'} style={{ position: 'relative',width: '100%', left: '100%' }}>
        {this.renderNav()}
        {this.renderContent()}
        <div style={{ backgroundColor: '#ffffff' }}>
          {this.state.data.map((i, index) => (
            <div>
              {this.renderItem(i, index)}
            </div>
          ))}
        </div>
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

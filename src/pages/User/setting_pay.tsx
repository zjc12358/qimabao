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
  refresh: any
}

let offsetY: number = 0
let layer: number = 0
let top: number = 170
class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      checked: false,
      orderChecked: false,
      data: [
        { id: '1', name: '账户余额', order: 1 },
        { id: '2', name: '微信', order: 2 },
        { id: '3', name: '支付宝', order: 3 },
        { id: '4', name: '工商银行', order: 4 },
        { id: '5', name: '建设银行', order: 5 }
      ],
      ssTt: 0,
      refresh: ''
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
        <div style={{ left: 32, fontSize: 14,color: '#8f8f8f',position: 'absolute',top: top + this.state.data.length * 40 + 50 }}>
          <span>对于特殊业务有特殊规则的，将遵循业务规则扣款</span>
        </div>
      </div>
    )
  }
  /*
  列表项的渲染
  **/
  public renderItem = (i,index) => {
    return(
      <div id={'main'} title={i.order} style={{ position: 'absolute', top: top + i.order * 40,width: '100%',height: 40,backgroundColor: '#fff' }}
           onTouchMove={this.touch.bind(this,i.order,index)}
           onTouchStart={this.touchStart.bind(this,i.order,index)}
           onTouchEnd={this.touchEnd.bind(this,i.order,index)}
      >
        <div className={'Segment_line4'}/>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 10,
          backgroundColor: '#ffffff',
          height: 19
        }}>
          <span style={{ fontSize: '16px', marginLeft: 10 }}>{i.name}</span>
          <img src='../../assets/images/foot_home.svg' width='20' height='20' />
        </div>
      </div>
    )
  }
  /*
  主要功能： 列表拖拽（无动画）
  核心思想：
  1.通过order属性进行排序
  2.当前项移动到的层赋值给当前项的order
  3.找到目标层的索引
  4.通过索引将当前项的原本所在层赋值给目标层的order
  **/
  public touch = (order,index,event) => { // 根据当前项的区间判断目标层
    let currentTop: number = parseInt(event.target.offsetParent.style.top.substr(0,event.target.offsetParent.style.top.length - 2),0)
    for (let i = 1;i <= this.state.data.length;i++) {  /* 遍历n次*/
      if (currentTop < ((i + 1) * 40 + top - 20) && currentTop >= ((i) * 40 + top - 20)) {
        layer = i
      }
    }
    if (event.target.offsetParent.id === 'main') {
      event.target.offsetParent.style.top = (event.targetTouches['0'].clientY - offsetY + parseInt(event.target.offsetParent.style.top.substr(0,event.target.offsetParent.style.top.length - 2),0)) + 'px'
    }
    offsetY = event.targetTouches['0'].clientY

  }
  public touchStart = (name,index,event) => {
    if (event.target.offsetParent.id === 'main') {
      event.target.offsetParent.style.zIndex = 20
      offsetY = event.targetTouches['0'].clientY
      event.target.offsetParent.style.height = 40
      event.target.offsetParent.children[0].className = ''
    }
    let currentTop: number = parseInt(event.target.offsetParent.style.top.substr(0,event.target.offsetParent.style.top.length - 2),0)
    for (let i = 1;i <= this.state.data.length;i++) {  /* 遍历n次*/
      if (currentTop < ((i + 1) * 40 + top - 20) && currentTop >= ((i) * 40 + top - 20)) {
        layer = i
      }
    }
    // d.target.style.height = '10px'
  }
  public touchEnd = (order,index,event) => {
    event.target.offsetParent.children[0].className = 'Segment_line4'
    event.target.offsetParent.style.zIndex = 5
    let currentTop: number = parseInt(event.target.offsetParent.style.top.substr(0,event.target.offsetParent.style.top.length - 2),0)
    if (event.target.offsetParent.id === 'main') {
      if (layer !== this.state.data[index].order && layer !== 0) {
        for (let i = 0;i < this.state.data.length;i++) {  /* 遍历n次*/
          if (this.state.data[i].order === layer) {
            this.state.data[i].order = order
          }
        }
        this.state.data[index].order = layer  // 拿着的正确
        this.setState({
          refresh: 'refresh'
        })
      }
      console.log(currentTop)
      if (currentTop <= top + 40) {
        event.target.offsetParent.style.top = (top + 40) + 'px'
        layer = 0
        offsetY = 0
        return
      }
      if (currentTop >= this.state.data.length * 40 + top) {
        event.target.offsetParent.style.top = (this.state.data.length * 40 + top) + 'px'
        layer = 0
        offsetY = 0
        return
      }
      console.log(layer)
      event.target.offsetParent.style.top = (layer) * 40 + top + 'px'
      layer = 0
      offsetY = 0
    }
  }
  public render () {
    return (
      <div className={'t'} style={{ position: 'relative',width: '100%' }}>
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

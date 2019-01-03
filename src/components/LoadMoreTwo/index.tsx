import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'

export interface Props {
  list: any // 传入整个list布局
  listData: Array<any> // 显示的数据
  itemHeight: number  // 每个数据的高度
  getData: any // 请求数据方法
  isLoading: boolean // 是否正在加载
  loadHeight: number // 自定义距离底部多少时concat数据
  bodyName: string // 父级div className  传入以获取高度
  hasMore: boolean // 是否有更多数据
}
function ScollPostion () {
  let t
  let l
  let w
  let h
  if (document.documentElement && document.documentElement.scrollTop) {
    t = document.documentElement.scrollTop
    l = document.documentElement.scrollLeft
    w = document.documentElement.scrollWidth
    h = document.documentElement.scrollHeight
  } else if (document.body) {
    t = document.body.scrollTop
    l = document.body.scrollLeft
    w = document.body.scrollWidth
    h = document.body.scrollHeight
  }
  return {
    top: t,
    left: l,
    width: w,
    height: h
  }
}
/**
 * 加载更多组件
 * 获取数据在原页面设置,这里只需要传入布局和list数据
 */
interface State {
  isFoot: boolean, // 阻止用户频繁上拉调接口
  startX: number, // 触摸起始点x轴坐标
  startY: number // 触摸起始点y轴坐标
}

class LoadMoreTwo extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      isFoot: true, // 阻止用户频繁上拉调接口
      startX: 0, // 触摸起始点x轴坐标
      startY: 0 // 触摸起始点y轴坐标
    }
  }

  // 根据接触和离开判断方向 1向上 2向下 3向左 4向右 0未发生滑动 ([Math.abs][4])
  getDirection (startX, startY, endX, endY) {
    let angX = endX - startX
    let angY = endY - startY
    let result = 0

    // 如果滑动距离太短
    if (Math.abs(angX) < 2 && Math.abs(angY) < 2) {
      return result
    }
    let angle = this.getAngle(angX, angY)
    if (angle >= -135 && angle <= -45) {
      result = 1
    } else if (angle > 45 && angle < 135) {
      result = 2
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3
    } else if (angle >= -45 && angle <= 45) {
      result = 4
    }

    return result
  }

  // 触摸点和离开店连线与[x轴角度][3]
  getAngle (angX, angY) {
    return Math.atan2(angY, angX) * 180 / Math.PI
  }

  // 接触屏幕
  touchStart (e) {
    console.log('接触了屏幕')
    this.setState({
      startX: e.touches[0].pageX,
      startY: e.touches[0].pageY
    })
  }

  touchMove (e) {
    console.log('移动了屏幕')
    let moveX = e.changedTouches[0]
  }

  // 离开屏幕 ([e.changedTouches][2])
  touchEnd (e) {
    let endX
    let endY
    endX = e.changedTouches[0].pageX
    endY = e.changedTouches[0].pageY
    let direction = this.getDirection(this.state.startX, this.state.startY, endX, endY)
    switch (direction) {
      case 0:
        console.log('未滑动！')
        break
      case 1:
        console.log('向上！')
        this.loadData()
        break
      case 2:
        console.log('向下！')
        break
      case 3:
        console.log('向左！')
        break
      case 4:
        console.log('向右！')
        break
      default:
    }

  }

  // 向上滑动时 (这里真正判断是否到最底部)
  loadData () {
    // 数据高度
    let dataHeight = document.getElementById('list').scrollHeight
    // 滚动高度
    let scrollHeight = ScollPostion().top
    // 达到指定位置后 请求数据
    if (dataHeight - scrollHeight < 1583 && !this.props.isLoading) {
      this.props.getData()
    }
  }

  public render () {
    return (
      <div className='vertical'>
        <div style={{ width: '100%' }} onTouchMove={this.touchMove.bind(this)}
             onTouchStart={this.touchStart.bind(this)} onTouchEnd={this.touchEnd.bind(this)}>
          {this.props.list}
        </div>
        <div className='vertical-center'
             style={{ height: 40, width: '100%' }}>
          <span className='horizontal-center' style={{ width: '100%', height: '100%' }}>
          {
            this.props.listData !== null && this.props.listData !== undefined &&
            !this.props.hasMore ? '到底了' :
              this.props.listData.length > 0 ? !this.props.isLoading ? '上拉加载更多' :
                '加载中...' : '暂无数据'
          }
          </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(LoadMoreTwo)

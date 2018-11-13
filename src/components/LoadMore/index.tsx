import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'

export interface Props {
  list: any // 传入整个list布局
  listData: Array<string> // 传入获取的数据
  itemHeight: number  // 每个数据的高度
}

/**
 * 加载更多组件
 * 获取数据在原页面设置,这里只需要传入布局和list数据
 */
interface State {
  finished: boolean, // 是否全部加载完毕
  isFoot: boolean, // 阻止用户频繁上拉调接口
  startX: number, // 触摸起始点x轴坐标
  startY: number // 触摸起始点y轴坐标
}

class LoadMore extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      finished: false, // 是否全部加载完毕
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
    console.log('数据的高-------------------------', this.props.listData.length * 80)
    console.log('滚动的高------------------------', document.documentElement.scrollTop)
    console.log('滚动的高------------------------', document.body.scrollTop)
    console.log('屏幕的高------------------------', document.documentElement.clientHeight)

    let dataHeight = this.props.listData.length * 80
    let scrollHeight = document.body.scrollTop || document.documentElement.scrollTop
    let screenHeight = document.documentElement.clientHeight
    const h = 10 // 自定义距离底部多少时concat数据
    if (dataHeight - scrollHeight - h < screenHeight && this.state.isFoot) {
      this.setState({
        isFoot: false
      })
      console.log('显示一次')
      setTimeout(() => {
        // 数据加载完毕
        this.setState({
          isFoot: true
        })
      }, 1000)
    }
  }

  public render () {
    return (
      <div className='vertical'>
        <div style={{ width: '100%' }} onTouchStart={this.touchStart.bind(this)} onTouchEnd={this.touchEnd.bind(this)}>
          {this.props.list}
        </div>
        <div>
          {
            this.props.listData !== null && this.props.listData !== undefined &&
            this.state.finished ? <span>我是有底线的</span> :
              this.props.listData.length > 0 ? this.state.isFoot ? <span>上拉加载更多</span> :
                <span>加载中...</span> : <span>暂无信息</span>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(LoadMore)

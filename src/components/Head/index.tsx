import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { isWhiteSpace } from 'tslint'
import history from 'history/createHashHistory'

export interface Props {
  title: string, // 标题
  titleColor: string // 标题文字颜色
  showLeftIcon: Boolean, // 是否显示左边
  showRightIcon: Boolean, // 是否显示右边
  backgroundColor: string, // 背景颜色
  rightIconOnClick: any, // 右边点击事件
  rightIconContent: any // 右边组件
}

interface State {
  title: String,
  titleColor: string,
  showLeftIcon: Boolean,
  showRightIcon: Boolean,
  backgroundColor: string,
  rightIconOnClick: any,
  rightIconContent: any
}

class Head extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      title: this.props.title,
      titleColor: this.props.titleColor,
      showLeftIcon: this.props.showLeftIcon,
      showRightIcon: this.props.showRightIcon,
      backgroundColor: this.props.backgroundColor,
      rightIconOnClick: this.props.rightIconOnClick,
      rightIconContent: this.props.rightIconContent
    }
  }

  /**
   * 判断是否传入颜色
   * @param color
   */
  checkColor = (color: string): string => {
    if (color === null || color === undefined || color.indexOf('#') < 0) {
      return 'white'
    } else {
      return color
    }
  }

  /**
   * 左边图标点击事件
   */
  leftIconOnClick = () => {
    if (this.props.showLeftIcon) {
      history().goBack()
    }
  }

  /**
   * 右边菜单点击事件
   */
  rightIconOnClick = () => {
    if (this.props.showRightIcon) {
      this.props.rightIconOnClick !== null && this.props.rightIconOnClick()
    }
  }

  public render () {
    return (
      <div style={{
        position: 'fixed',
        top: '0',
        height: 40,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: this.props.backgroundColor,
        zIndex: 100
      }}>
        <div style={{
          flex: 2, width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }} onClick={() => this.leftIconOnClick()}>
          {this.props.showLeftIcon && <div style={{ paddingLeft: 10 }}>返回</div>}
        </div>
        <div style={{
          flex: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          color: (this.checkColor(this.props.titleColor)),
          fontSize: 18,
          width: '100%'
        }}>
          {this.props.title}
        </div>
        <div style={{
          flex: 2, width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }} onClick={() => this.rightIconOnClick()}>
          {this.props.showRightIcon && <div style={{ paddingRight: 10 }}>{this.props.rightIconContent}</div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Head)

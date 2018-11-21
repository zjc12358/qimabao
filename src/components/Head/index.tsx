import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'

export interface Props {
  title: string, // 标题文字
  titleColor: string // 标题文字颜色
  showLeftIcon: boolean, // 是否显示左边
  leftIconColor?: 'grey' | 'white' // 左边返回按钮颜色
  showRightIcon: boolean, // 是否显示右边
  backgroundColor: string, // 背景颜色
  rightIconOnClick: any, // 右边点击事件
  rightIconContent?: any // 右边组件
}

interface State {
  title: string,
  titleColor: string,
  showLeftIcon: boolean,
  showRightIcon: boolean,
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
   * 左边图标颜色
   * @param color
   */
  leftIcon = (color: string): any => {
    switch (color) {
      case 'white':
        return (
          <ReactSVG path='./components/Head/ic_back_white.svg' svgStyle={{ width: 22, height: 22, marginTop: 2 }}/>
        )
      default:
        return (
          <ReactSVG path='./components/Head/ic_back-grey.svg ' svgStyle={{ width: 22, height: 22, marginTop: 2 }}/>
        )
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
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        backgroundColor: this.props.backgroundColor,
        zIndex: 100
      }}>
        <div style={{
          width: 50,
          paddingLeft: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }} onClick={() => this.leftIconOnClick()}>
          {this.props.showLeftIcon &&
          <div>
            {this.leftIcon(this.props.leftIconColor)}
          </div>}
        </div>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          color: (this.checkColor(this.props.titleColor)),
          fontSize: 18
        }}>
          {this.props.title}
        </div>
        <div style={{
          width: 50,
          display: 'flex',
          paddingRight: 20,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }} onClick={() => this.rightIconOnClick()}>
          {this.props.showRightIcon && <div>{this.props.rightIconContent}</div>}
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

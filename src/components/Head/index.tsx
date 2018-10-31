import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { isWhiteSpace } from 'tslint'
import history from 'history/createHashHistory'

export interface Props {
  title: String, // 标题
  showLeftIcon: Boolean, // 是否显示左边
  showRightIcon: Boolean, // 是否显示右边
  backgroundColor: string, // 背景颜色
  rightIconOnClick: any, // 右边点击事件
  rightIconContent: any // 右边组件
}

interface State {
  title: String,
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
      showLeftIcon: this.props.showLeftIcon,
      showRightIcon: this.props.showRightIcon,
      backgroundColor: this.props.backgroundColor,
      rightIconOnClick: this.props.rightIconOnClick,
      rightIconContent: this.props.rightIconContent
    }
  }

  /**
   * 左边图标点击事件
   */
  leftIconOnClick = () => {
    if (this.state.showLeftIcon) {
      history().goBack()
    }
  }

  /**
   * 右边菜单点击事件
   */
  rightIconOnClick = () => {
    if (this.state.showRightIcon) {
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: this.state.backgroundColor,
        zIndex: 100
      }}>
        <div style={{ flex: 1 }} onClick={() => this.leftIconOnClick()}>
          {this.state.showLeftIcon && <div>返回按钮</div>}
        </div>
        <div style={{
          flex: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: 18
        }}>
          {this.state.title}
        </div>
        <div style={{ flex: 1 }} onClick={() => this.rightIconOnClick()}>
          {this.state.showRightIcon && <div>{this.state.rightIconContent}</div>}
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

import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { isWhiteSpace } from 'tslint'

export interface Props {
  title: String,
  showLeftIcon: Boolean,
  showRightIcon: Boolean,
  backgroundColor: String
}

interface State {
  title: String,
  showLeftIcon: Boolean,
  showRightIcon: Boolean,
  backgroundColor: String
}

class Head extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      title: this.props.title,
      showLeftIcon: this.props.showLeftIcon,
      showRightIcon: this.props.showRightIcon,
      backgroundColor: this.props.backgroundColor
    }
  }

  /**
   * 左边图标点击事件
   */
  leftIconOnClick = () => {
    if (this.state.showLeftIcon) {
      // TODO 2018/10/26 回退
      console.log('返回')
    }
  }

  /**
   * 右边菜单点击事件
   */
  rightIconOnClick = () => {
    if (this.state.showRightIcon) {
      // TODO 2018/10/26 右边菜单点击事件
      console.log('点击菜单')
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
        backgroundColor: '#0084e7',
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
          {this.state.showRightIcon && <div>菜单按钮</div>}
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

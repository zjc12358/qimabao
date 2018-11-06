import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Icon } from 'antd-mobile'

export interface Props {
  color: string, // 背景颜色
  title: string // 标题
  func: any // 点击返回的方法
}

interface State {
  color: string
  title: string
  func: any
}

class Nav1 extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      color: this.props.color,
      title: this.props.title,
      func: this.props.func
    }
  }

  public render () {
    return (
      <div style={{
        backgroundColor: this.props.color,
        position: 'relative',
        height: 40
      }}>
        <div style={{ float: 'left', position: 'absolute' }} onClick={this.props.func}>
          <Icon type='left' color='#000000' size='lg'/>
        </div>
        <div style={{
          fontSize: 20,
          paddingTop: 5,
          color: '#000000',
          width: '100%',
          textAlign: 'center'
        }}>
          <span>{this.props.title}</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Nav1)

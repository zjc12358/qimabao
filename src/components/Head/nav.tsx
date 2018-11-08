import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Icon } from 'antd-mobile'

export interface Props {
  color: string, // 背景颜色
  title: string // 标题
  url: string // 返回的地址
}

interface State {
}

class Nav extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  public render () {
    return (
      <div style={{
        backgroundColor: this.props.color,
        position: 'relative',
        height: 40
      }}
      >
        <div style={{ float: 'left', position: 'absolute' }}>
          <Link to={this.props.url}><Icon type='left' color='#000000' size='lg'/></Link>
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

const mapStateToProps: MapStateToPropsParam<any, any, any> = () => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)

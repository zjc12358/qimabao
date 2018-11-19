import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Icon } from 'antd-mobile'
import history from 'history/createHashHistory'

export interface Props {
  color: string, // 背景颜色
  title: string // 标题
  textColor: string, // 字体颜色
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
        <div style={{ float: 'left', position: 'absolute' }} onClick={() => history().goBack()}>
          <Icon type='left' color='#000000' size='lg'/>
        </div>
        <div style={{
          fontSize: 20,
          paddingTop: 5,
          color: '#000000',
          width: '100%',
          textAlign: 'center'
        }}>
          <span style={{
            color: this.props.textColor
          }}>{this.props.title}</span>
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

import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { isWhiteSpace } from 'tslint'
import history from 'history/createHashHistory'
import { object } from 'prop-types'

export interface Props {
  isShow: boolean,
  distance: number | string,
  closeHandClick: () => void,
  content: () => void,
  direction?: string
}

interface State {
  isShow: boolean,
  distance: number | string
  left: number | string,
  right: number | string,
  top: number | string,
  bottom: number | string,
  width: number,
  height: number
}

class Dialog extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      isShow: this.props.isShow,
      distance: 0,
      left: 'auto',
      right: 'auto',
      top: 'auto',
      bottom: 'auto',
      width: 0,
      height: 0
    }
  }
  colseClick = () => {
    this.props.closeHandClick()
    this.setState({ distance: 0 })
  }
  renderContent = () => {
    return (
      this.props.content
    )
  }
  componentDidMount () {
    switch (this.props.direction) {
      case 'right':
        console.log('right')
        this.setState({ top: 0,right: 0 })
        break
      case 'bottom':
        this.setState({ bottom: 0 })
    }
  }
  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    if (nextProps.isShow) {
      this.setState({ distance: 200 })
    }
  }

  renderDialogContent = () => {
    return (
      this.props.direction === 'right' ? <div
        style={{
          // width: 200,
          height: '100vh',
          backgroundColor: 'white',
          position: 'absolute',
          zIndex: 101,
          top: 0,
          right: 0,
          width: (this.state.distance),
          transition: 'all 0.2s'
          // display: (this.props.isShow) ? 'block' : 'none'
        }}>
        <div style={{ display: (this.props.isShow) ? 'block' : 'none' }}>
          {this.renderContent()}
        </div>
      </div> : <div></div>
    )
  }

  public render () {
    return (
      <div style={{ width: '100vw',overflow: 'hidden' }}>
        {this.props.isShow ? <div
          style={{
            position: 'fixed',
            width: '100vw',
            top: 0,
            left: 0,
            height: '100vh',
            backgroundColor: 'black',
            opacity: 0.6,
            zIndex: 100
          }}
          onClick={ () => { this.colseClick() } }
        >
        </div> : <div></div>}
        {this.renderDialogContent()}
        <div></div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog)

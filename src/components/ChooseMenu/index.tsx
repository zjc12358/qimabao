import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast } from 'antd-mobile'
import axios from 'axios'

export interface Props {
  data: Array<string>
  isShow: boolean
  chooseHandClick: (index: number) => void
  chooseIndex: number
  closeHandClick: () => void
}

interface State {
}

class ChooseMenu extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {}
  }

  renderContent = () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
      }}>
        {this.props.data.map((item, index) =>
          <div style={{
            height: 50,
            fontSize: 19,
            backgroundColor: 'white',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            color: (index === this.props.chooseIndex ? '#0084e7' : 'black')
          }} onClick={() => this.handClick(index)}>
            <span style={{
              paddingLeft: 30
            }}>{item} </span>
            {index === this.props.chooseIndex ? <span> √</span> : <span></span>}
          </div>)}
      </div>
    )
  }

  /**
   * 点击回调
   */
  handClick = (index: number) => {
    this.props.closeHandClick()
    this.props.chooseHandClick(index)
  }

  allOnClick = () => {
    this.props.closeHandClick()
  }

  public render () {
    return (
      <div>
        <div style={{
          width: '100%',
          zIndex: 100,
          position: 'absolute'
        }}>
          {this.props.isShow && this.renderContent()}
        </div>
        <div style={{
          position: 'fixed',
          top: '0',
          width: '100vh',
          height: '100vh',
          zIndex: 50,
          display: (this.props.isShow ? 'block' : 'none'),
          backgroundColor: 'rgba(204,204,204,0.5)'
        }} onClick={this.allOnClick}>
        </div>
      </div>

    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseMenu)

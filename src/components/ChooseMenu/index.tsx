import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast,List,Radio } from 'antd-mobile'
import axios from 'axios'
const RadioItem = Radio.RadioItem

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

  onChange = (value) => {
    console.log('checkbox')
    this.setState({
      value
    })
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
        <List style={{ width: '100vw',backgroundColor: '#f5f5f5' }}>
          {this.props.data.map((i,index) => (
            <RadioItem activeStyle={{ color: 'white' }} key={i} checked={index === this.props.chooseIndex} onChange={() => this.handClick(index)}>
              {i}
            </RadioItem>
          ))}
        </List>
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

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseMenu)

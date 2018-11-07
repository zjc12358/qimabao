import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import { showShade } from '../../store/actions/outSideShade_data'

export interface Props {
  showShade?: (isShow: boolean) => void
  data: Array<string>
  isShow?: boolean
  chooseHandClick: (index: number) => void
  chooseIndex: number
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
    this.props.showShade(false)
    this.props.chooseHandClick(index)
  }

  public render () {
    return (
      <div style={{
        width: '100%',
        zIndex: 100,
        position: 'absolute'
      }}>
        {this.props.isShow && this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    isShow: state.outSideShadeData.showShade
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  showShade
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseMenu)

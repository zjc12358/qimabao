import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import { showShade } from '../../store/actions/outSideShade_data'

export interface Props {
  isShow?: boolean
  showShade?: (isShow: boolean) => void
}

interface State {

}

class OutSideShade extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {}
  }

  /**
   * 点击隐藏
   */
  allOnClick = () => {
    this.props.showShade(false)
  }

  public render () {
    return (
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

export default connect(mapStateToProps, mapDispatchToProps)(OutSideShade)

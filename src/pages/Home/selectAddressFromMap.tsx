import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import ReactSVG from 'react-svg'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import { Map } from 'react-amap'

export interface Props {

}

interface State {

}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {}
  }

  /**
   * 地图
   */
  renderMap = () => {
    return (
      <div style={{
        height: 350,
        width: '100%',
        marginTop: 40
      }}>
        <Map amapkey={'e062e2a80c3e0e1c31a588faa9822dcb'}/>
      </div>
    )
  }

  public render () {
    return (
      <div>
        {this.renderMap()}
        Hello Home
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

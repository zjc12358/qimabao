import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, Carousel } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'

export interface Props {

}

interface State {

}

class Statusbar extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {}
  }

  public render () {
    return (
      <div>
        Hello Home
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Statusbar)

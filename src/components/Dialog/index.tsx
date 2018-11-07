import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { isWhiteSpace } from 'tslint'
import history from 'history/createHashHistory'
import { object } from 'prop-types'

export interface Props {
  isShow: boolean
}

interface State {
  isShow: boolean
}

class Dialog extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      isShow: this.props.isShow
    }
  }
  componentDidMount () {
    console.log(this.props.isShow)
  }
  public render () {
    return (
      <div>
        { this.state.isShow ? <div>弹窗打开了</div> : <div>1</div>}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog)

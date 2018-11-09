import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'

export interface Props {

}

interface State {

}

class Menu extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {}
  }

  public render () {
    return (
      <div>
        下单确认页,少页面
        此页面点击下单后,请求接口,跳转确认订单页
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

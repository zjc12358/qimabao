import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, Icon, DatePicker, List, Modal, Button, Radio, Checkbox, TextareaItem } from 'antd-mobile'
import './default.css'
import './orderMakeSure.less'
import Head from '../../components/Head/index'
import history from 'history/createHashHistory'
import { needReload, updataOrderMakeSure } from '@store/actions/oderMakeSure_data'
import { OrderMakeSureBean } from '@datasources/OrderMakeSureBean'

const nowTimeStamp = Date.now()
const now = new Date(nowTimeStamp)
const RadioItem = Radio.RadioItem

export interface Props {

}

interface State {

}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount () {
    console.log(1)
  }

  componentWillReceiveProps (nextProps) {
    console.log(1)
  }

  public render () {
    return (
      <div>
        <div></div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    orderData: state.orderMakeSure.OrderMakeSureData,
    needReloadData: state.orderMakeSure.reload
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updataOrderMakeSure,
  needReload
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

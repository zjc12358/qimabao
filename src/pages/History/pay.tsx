import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast } from 'antd-mobile'
import { Loading, Button } from 'element-react'
import axios from 'axios'
import ReactSVG from 'react-svg'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import { cloneDeep, get, isNil } from 'lodash'
import { MyResponse } from '@datasources/MyResponse'
import { PayData } from '@store/reducers/payDataReducer'

export interface Props {
  payData: PayData
}

interface State {
  pay: string
  isLoading: boolean
}

class History extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      pay: '',
      isLoading: false
    }
  }

  componentDidMount () {
    this.aliPayOrder()
  }

  /**
   * 支付宝支付
   */
  aliPayOrder = () => {
    if (this.state.isLoading) {
      return
    }
    this.setState({
      isLoading: true
    })
    let url = 'CanteenProcurementManager/user/paySetting/aliPayOrder?'
    let query = 'outTradeNo=' + this.props.payData.outTradeNo +
      '&totalAmount=' + this.props.payData.totalAmount +
      '&subject=' + this.props.payData.subject +
      '&body=' + this.props.payData.body
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        this.setState({
          isLoading: false
        })
        if (data.data.code === 0) {
          this.setState({
            pay: data.data.data
          })
          document.getElementById('pay').innerHTML = this.state.pay
          let target: any = document.getElementById('pay')
          let action = target.children[0].action
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!', 2, null, false)
        this.setState({
          isLoading: false
        })
      })
  }

  // payS = () => {
  //
  // }

  public render () {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div id='pay'>
        </div>
      </div>

    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    payData: state.payData
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(History)

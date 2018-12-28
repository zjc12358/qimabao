import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, Checkbox } from 'antd-mobile'
import { Loading, Button } from 'element-react'
import axios from 'axios'
import ReactSVG from 'react-svg'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import { cloneDeep, get, isNil } from 'lodash'
import Head from '@components/Head'
import { setPayInfo } from '@store/actions/pay_data'

const AgreeItem = Checkbox.AgreeItem

export interface Props {
  setPayInfo: (outTradeNo: string, totalAmount: string, subject: string, body: string) => void
}

interface State {

}

class History extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {}
  }

  renderContent = () => {
    return (
      <div className='vertical' style={{ flex: 1 }}>
        {this.renderDetail()}
        {this.renderPayChoose()}
      </div>
    )
  }

  /**
   * 订单详情
   */
  renderDetail = () => {
    return (
      <div className='vertical'>
        <div style={{ marginTop: 10 }}>支付剩余时间</div>
        <div style={{ fontSize: 24, color: 'black', marginTop: 10 }}>¥1</div>
        <div style={{ marginTop: 10 }}>供应商名 -订单号</div>
      </div>
    )
  }

  /**
   * 支付方式选择
   */
  renderPayChoose = () => {
    return (
      <div className='vertical' style={{ marginTop: 40, flex: 1 }}>
        {this.renderPayChooseItem()}
      </div>
    )
  }

  /**
   * 支付方式选择单列
   */
  renderPayChooseItem = () => {
    return (
      <div className='horizontal-center' style={{ width: '100%' }}>
        <div className='horizontal' style={{ flex: 1, marginLeft: 20 }}>
          <span>图片</span>
          <span>支付宝支付</span>
        </div>
        <div style={{ marginRight: 20 }}>
          <AgreeItem
            checked={true}
            onChange={false}>
          </AgreeItem>
        </div>
      </div>
    )
  }

  /**
   * 点击确认支付
   */
  selectPayWayOnClick = () => {
    history().push('/pay')
  }

  public render () {
    return (
      <div className='vertical' style={{ width: '100%', height: '100%' }}>
        <Head titleColor={'black'} showLeftIcon={true} backgroundColor={'#0084e7'} title={'支付设置'}
              rightIconOnClick={false} showRightIcon={false} leftIconColor={'white'}/>
        {this.renderContent()}
        <div style={{ marginBottom: 20 }}>
          <div style={{ marginLeft: 30, marginRight: 30, height: 40 }}>
            <div style={{ width: '100%', backgroundColor: '#0084e7' }}
                 onClick={this.selectPayWayOnClick}>
              确认支付
            </div>
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  setPayInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(History)

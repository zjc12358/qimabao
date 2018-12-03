import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Switch, Toast } from 'antd-mobile'
import axios from 'axios'
import ReactSVG from 'react-svg'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import './supplierInfoCss.css'

export interface Props {

}

interface State {
  open: boolean
  makeAppointment: boolean
}

class SupplierInfo extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      open: true,
      makeAppointment: false
    }
  }

  /**
   * 上方信息
   */
  renderTop = () => {
    return (
      <div className='vertical bigContent' style={{ width: '100%' }}>
        <div className='horizontal' style={{ width: '100%', marginTop: 20 }}>
          <span style={{ marginLeft: 20, width: 50, height: 50 }}>头像</span>
          <div className='vertical' style={{ marginLeft: 20 }}>
            <span className='text-nowrap info-name'>aeolian_2008111111111111111111111111111111111</span>
            <span className='text-nowrap company'>衢州超彩软件有限公司</span>
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <div className='vertical score' style={{ alignItems: 'flex-start' }}>
            <span>描述符合$,高于同行$</span>
            <span>服务态度$,高于同行$</span>
            <span>物流服务$,高于同行$</span>
          </div>
        </div>
      </div>
    )
  }

  /**
   * 下方按钮
   */
  renderBottom = () => {
    return (
      <div className='vertical-center bigContent' style={{ width: '100%' }}>
        <div className='horizontal' style={{ width: '100%' }}>
          <span style={{ marginLeft: 20 }}>店铺状态</span>
          <ReactSVG path='./assets/images/ic_what.svg' svgStyle={{ width: 15, height: 15, marginLeft: 10 }}/>
        </div>
        <div className='horizontal open-state'>
            <span style={{
              flex: 1,
              marginLeft: 40,
              color: this.state.open ? 'white' : '#ffffff80'
            }}>{this.state.open ? '正常营业' : '暂停营业'}</span>
          <Switch
            style={{ marginRight: 10 }}
            checked={this.state.open}
            onChange={() => {
              this.setState({ open: !this.state.open })
            }}
          />
        </div>
        <div className='horizontal make-appointment-state'>
          <span
            style={{
              flex: 1,
              marginLeft: 40,
              color: this.state.makeAppointment ? 'white' : '#ffffff80'
            }}>{this.state.makeAppointment ? '接受预约' : '不接受预约'}
            </span>
          <Switch
            style={{ marginRight: 10 }}
            checked={this.state.makeAppointment}
            onChange={() => {
              this.setState({ makeAppointment: !this.state.makeAppointment })
            }}
          />
        </div>
      </div>
    )
  }

  public render () {
    return (
      <div className='vertical' style={{ width: '100%', height: '100%', backgroundColor: '#0084e7' }}>
        {this.renderTop()}
        {this.renderBottom()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(SupplierInfo)

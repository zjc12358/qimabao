import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Switch, Toast } from 'antd-mobile'
import axios from 'axios'
import ReactSVG from 'react-svg'
import './supplierInfoCss.css'
import { SupplierStateInfoBean } from '@datasources/SupplierStateInfoBean'
import { cloneDeep, isNil } from 'lodash'
import { MyResponse } from '@datasources/MyResponse'
import { Loading, Button } from 'element-react'
import { updateAppointmentState, updateBusinessState, updateSupplierInfo } from '@store/actions/supplier_info_data'

export interface Props {
  supplierStateInfo: SupplierStateInfoBean
  updateBusinessState: (state: 'Y' | 'N') => void
  updateAppointmentState: (state: 'Y' | 'N') => void
  businessState: 'Y' | 'N'
  appointmentState: 'Y' | 'N'
}

interface State {
  supplierStateInfo: SupplierStateInfoBean
  isLoading: boolean
  businessState: 'Y' | 'N'
  appointmentState: 'Y' | 'N'
}

class SupplierInfo extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      supplierStateInfo: this.props.supplierStateInfo,
      isLoading: false,
      businessState: this.props.businessState,
      appointmentState: this.props.appointmentState
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        businessState: nextProps.businessState,
        appointmentState: nextProps.appointmentState
      })
    }
  }

  /**
   * 上方信息
   */
  renderTop = () => {
    return (
      <div className='vertical bigContent' style={{ width: '100%' }}>
        <div className='horizontal' style={{ width: '100%', marginTop: 20 }}>
          <span style={{ marginLeft: 20, width: 50, height: 50 }}>
            <img className='user_head' src={this.props.supplierStateInfo.supplier_icon}/>
          </span>
          <div className='vertical' style={{ marginLeft: 20,height: 50,justifyContent: 'space-around' }}>
            <span className='text-nowrap info-name'>{this.props.supplierStateInfo.supplier_user_name}</span>
            <span className='text-nowrap company' style={{ fontSize: '12px' }}>{this.props.supplierStateInfo.supplier_name}</span>
          </div>
        </div>
        <div style={{ width: '100%',marginTop: 10,borderTop: '1px solid #70baf2' }}>
          <div className='vertical score' style={{ alignItems: 'flex-start' }}>
            <span>描述符合{this.props.supplierStateInfo.supplier_description_service},高于同行100%</span>
            <span>服务态度{this.props.supplierStateInfo.supplier_service_attitude},高于同行100%</span>
            <span>物流服务{this.props.supplierStateInfo.supplier_logistics_service},高于同行100%</span>
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
          <span style={{ margin: '0 5px 0 20px',color: 'white',fontSize: '16px' }}>店铺状态</span>
          <ReactSVG style={{ width: 18,height: 18 }} path='./assets/images/ic_what.svg' svgStyle={{ width: 18, height: 18 }}/>
        </div>
        <div className='horizontal open-state'>
            <span style={{
              flex: 1,
              paddingRight: 40,
              fontSize: '16px',
              color: this.state.businessState === 'Y' ? 'white' : '#ffffff80'
            }}>{this.state.businessState === 'Y' ? '正常营业' : '暂停营业'}</span>
          <Switch
            style={{ marginRight: 10 }}
            checked={this.state.businessState === 'Y'}
            onChange={() => {
              this.updateSupplierStatus('Business', this.state.businessState === 'Y' ? 'N' : 'Y')
            }}
          />
        </div>
        <div className='horizontal make-appointment-state'>
          <span
            style={{
              flex: 1,
              paddingRight: 40,
              fontSize: '16px',
              color: this.state.appointmentState === 'Y' ? 'white' : '#ffffff80'
            }}>{this.state.appointmentState === 'Y' ? '接受预约' : '不接受预约'}
            </span>
          <Switch
            style={{ marginRight: 10 }}
            checked={this.state.appointmentState === 'Y'}
            onChange={() => {
              this.updateSupplierStatus('Appointment', this.state.appointmentState === 'Y' ? 'N' : 'Y')
            }}
          />
        </div>
      </div>
    )
  }

  /**
   * 修改供货商状态
   * @param mode 类型标识
   * @param status 状态
   */
  updateSupplierStatus = (mode: 'Business' | 'Appointment', status: 'Y' | 'N') => {
    if (this.state.isLoading) {
      return
    }
    this.setState({
      isLoading: true
    })
    let url = 'CanteenProcurementManager/supplier/info/updateSupplierStatus?'
    let query = 'supplierId=' + this.props.supplierStateInfo.supplier_id +
      '&mode=' + mode + '&status=' + status
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          if (mode === 'Business') {
            this.props.updateBusinessState(status)
          } else {
            this.props.updateAppointmentState(status)
          }
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
        this.setState({
          isLoading: false
        })
      })
      .catch(() => {
        Toast.info('请检查网络设置!', 2, null, false)
        this.setState({
          isLoading: false
        })
      })
  }

  public render () {
    return (
      <div className='vertical' style={{ width: '100%', height: '100%', backgroundColor: '#0084e7' }}>
        {this.renderTop()}
        {this.renderBottom()}
        {this.state.isLoading && <Loading fullscreen={true}/>}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    supplierStateInfo: state.SupplierInfoDate.supplierStateInfo,
    businessState: state.SupplierInfoDate.businessState,
    appointmentState: state.SupplierInfoDate.appointmentState
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updateBusinessState,
  updateAppointmentState
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplierInfo)

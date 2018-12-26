import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Switch, Icon, Toast } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import Head from '../../../components/Head/index'
import './shop.less'
import { SupplierStateInfoBean } from '@datasources/SupplierStateInfoBean'
import { updateAppointmentState, updateBusinessState } from '@store/actions/supplier_info_data'
import { MyResponse } from '@datasources/MyResponse'
import { Loading, Button } from 'element-react'

export interface Props {
  supplierStateInfo: SupplierStateInfoBean
  updateBusinessState: (state: 'Y' | 'N') => void
  updateAppointmentState: (state: 'Y' | 'N') => void
  businessState: 'Y' | 'N'
  appointmentState: 'Y' | 'N'
}

interface State {
  data: any,
  shopState: boolean,
  MakeAppointmentState: boolean
  businessState: 'Y' | 'N'
  appointmentState: 'Y' | 'N'
  isLoading: boolean
}

let IconMaxSize: number = 30

class Shop extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: { payment: '1', delivery: '17', collect: '143', evaluate: '5', refund: '0' },
      shopState: true,
      MakeAppointmentState: true,
      businessState: this.props.businessState,
      appointmentState: this.props.appointmentState,
      isLoading: false
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
   * 店铺信息
   */
  renderShopMsg = () => {
    return (
      <div className='topBackground'>
        <div className='shopMsgBox'>
          <div className='shopMsg'>
            <img src={this.props.supplierStateInfo.supplier_icon}/>
            <div className='shopName'>{this.props.supplierStateInfo.supplier_name}</div>
            <div className='starGroup'>
              {[1, 2, 3, 4, 5].map(i => (
                <ReactSVG svgClassName='start' path='./assets/images/Supplier/star.svg'/>
              ))}
            </div>
            <div className='evaluation'>
              <div>
                <div>描述符合</div>
                <div>{this.props.supplierStateInfo.supplier_description_service} <ReactSVG svgClassName='up' path='./assets/images/Supplier/up.svg'/></div>
                <div>高于同行100%</div>
              </div>
              <div>
                <div>服务态度</div>
                <div>{this.props.supplierStateInfo.supplier_service_attitude} <ReactSVG svgClassName='up' path='./assets/images/Supplier/up.svg'/></div>
                <div>高于同行100%</div>
              </div>
              <div>
                <div>物流服务</div>
                <div>{this.props.supplierStateInfo.supplier_logistics_service} <ReactSVG svgClassName='up' path='./assets/images/Supplier/up.svg'/></div>
                <div>高于同行100%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /**
   * 店铺状态
   */
  renderShopState = () => {
    return (
      <div className='shopState'>
        <div>店铺状态</div>
        {this.state.shopState ?
          (<div className='fontBlue' style={{ flex: 1 }}>正常营业</div>) : (
            <div className='fontGray' style={{ flex: 1 }}>暂停营业</div>)
        }
        <Switch
          checked={this.state.businessState === 'Y'}
          onChange={() => {
            this.updateSupplierStatus('Business', this.state.businessState === 'Y' ? 'N' : 'Y')
          }}
        />
      </div>
    )
  }

  /**
   * 预约开关
   */
  renderMakeAppointment = () => {
    return (
      <div className='shopState'>
        <div>预约开关</div>
        {this.state.MakeAppointmentState ?
          (<div className='fontBlue' style={{ flex: 1 }}>接受预约</div>) : (
            <div className='fontGray' style={{ flex: 1 }}>不接受预约</div>)
        }
        <Switch
          checked={this.state.appointmentState === 'Y'}
          onChange={() => {
            this.updateSupplierStatus('Appointment', this.state.appointmentState === 'Y' ? 'N' : 'Y')
          }}
        />
      </div>
    )
  }

  /**
   * 店铺手机号
   */
  renderMoblieNumber = () => {
    return (
      <div className='shopState'>
        <div>店铺手机号</div>
        <div style={{ flex: 1 }}>
          <Icon type='right'/>
        </div>
      </div>
    )
  }

  /**
   * 店铺银行卡
   */
  renderBankCard = () => {
    return (
      <div className='shopState'>
        <div>店铺银行卡</div>
        <div style={{ flex: 1 }}>
          <Icon type='right'/>
        </div>
      </div>
    )
  }

  /**
   * 底部菜单
   */
  renderFooterMenu = () => {
    return (
      <div className='footerMenu'>
        <div className='menuLeft'>
          <div><ReactSVG svgClassName='menuIcon' path='./assets/images/Supplier/RMB.svg'/>资金管理</div>
          <div>
            <div style={{ display: 'flex' }}><ReactSVG svgClassName='menuIcon'
                                                       path='./assets/images/Supplier/employees.svg'/>员工管理
            </div>
            <div style={{ textIndent: 26, color: '#8c8c8c' }}>权限设置</div>
          </div>
        </div>
        <div className='menuRight'>
          <div><ReactSVG svgClassName='menuIcon' path='./assets/images/Supplier/distribution.svg'/>配送设置</div>
          <div><ReactSVG svgClassName='menuIcon' path='./assets/images/Supplier/service.svg'/>客服管理</div>
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
      <div>
        <Head
          showLeftIcon='true'
          title='店铺'
          backgroundColor='#0084e7'
          leftIconColor='white'
        />
        <div className='shopContainer'>
          {this.renderShopMsg()}
          <div style={{ padding: '0 15px', marginTop: '125px' }}>
            {this.renderShopState()}
            {this.renderMakeAppointment()}
            {this.renderMoblieNumber()}
            {this.renderBankCard()}
            {this.renderFooterMenu()}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Shop)

import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Switch,Icon } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import Head from '../../../components/Head/index'
import './shop.less'

export interface Props {

}

interface State {
  data: any,
  shopState: boolean,
  MakeAppointmentState: boolean
}
let IconMaxSize: number = 30
class Shop extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: { payment: '1',delivery: '17',collect: '143',evaluate: '5',refund: '0' },
      shopState: true,
      MakeAppointmentState: true
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
            <img src='./assets/images/SupplierTest/user_logo.jpg' />
            <div className='shopName'>衢州超彩软件有限公司</div>
            <div className='starGroup'>
              {[1,2,3,4,5].map(i => (
                <ReactSVG svgClassName='start' path='./assets/images/Supplier/star.svg'/>
              ))}
            </div>
            <div className='evaluation'>
              <div>
                <div>描述符合</div>
                <div>5.0 <ReactSVG svgClassName='up' path='./assets/images/Supplier/up.svg'/></div>
                <div>高于同行100%</div>
              </div>
              <div>
                <div>描述符合</div>
                <div>5.0 <ReactSVG svgClassName='up' path='./assets/images/Supplier/up.svg'/></div>
                <div>高于同行100%</div>
              </div>
              <div>
                <div>描述符合</div>
                <div>5.0 <ReactSVG svgClassName='up' path='./assets/images/Supplier/up.svg'/></div>
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
          (<div className='fontBlue' style={{ flex: 1 }}>正常营业</div>) : (<div className='fontGray' style={{ flex: 1 }}>暂停营业</div>)
        }
        <Switch
          checked={this.state.shopState}
          onChange={() => {
            this.setState({ shopState: !this.state.shopState })
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
          (<div className='fontBlue' style={{ flex: 1 }}>接受预约</div>) : (<div className='fontGray' style={{ flex: 1 }}>不接受预约</div>)
        }
        <Switch
          checked={this.state.MakeAppointmentState}
          onChange={() => {
            this.setState({ MakeAppointmentState: !this.state.MakeAppointmentState })
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
          <Icon type='right' />
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
          <Icon type='right' />
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
          <div><ReactSVG svgClassName='menuIcon' path='./assets/images/Supplier/RMB.svg' />资金管理</div>
          <div>
            <div style={{ display: 'flex' }}><ReactSVG svgClassName='menuIcon' path='./assets/images/Supplier/employees.svg' />员工管理</div>
            <div style={{ textIndent: 26,color: '#8c8c8c' }}>权限设置</div>
          </div>
        </div>
        <div className='menuRight'>
          <div><ReactSVG svgClassName='menuIcon' path='./assets/images/Supplier/distribution.svg' />配送设置</div>
          <div><ReactSVG svgClassName='menuIcon' path='./assets/images/Supplier/service.svg' />客服管理</div>
        </div>
      </div>
    )
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
          <div style={{ padding: '0 15px',marginTop: '125px' }}>
            {this.renderShopState()}
            {this.renderMakeAppointment()}
            {this.renderMoblieNumber()}
            {this.renderBankCard()}
            {this.renderFooterMenu()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)

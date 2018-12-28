import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, Icon, DatePicker, List, Modal, Button, Radio, Checkbox, TextareaItem, Toast } from 'antd-mobile'
import ReactSVG from 'react-svg'
import Head from '../../../components/Head/index'
import './orderDetail.less'
import history from 'history/createHashHistory'
import axios from 'axios'
import { MyResponse } from '@datasources/MyResponse'

const nowTimeStamp = Date.now()
const now = new Date(nowTimeStamp)
const RadioItem = Radio.RadioItem

export interface Props {
  orderId: string
}

interface State {
  data: any
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount () {
    console.log(1)
    let url = 'CanteenProcurementManager/user/productOrder/findProductOrderDetail?'
    let query = 'orderId=' + this.props.orderId
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- 购物车data =', data)
        if (data.data.code === 0) {
          // console.log(data.data.data)
          this.setState({ data: data.data.data },() => { console.log(this.state.data) })
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }

  componentWillReceiveProps (nextProps) {
    console.log(1)
  }

  /**
   * 收货地址
   */
  renderAddress = () => {
    return (
      <div className='addressBox'>
        <div className='location'>
          <ReactSVG svgClassName='location_icon' path='./assets/images/address_location.svg' />
        </div>
        <div className='addressMsg' style={{ fontSize: 14 }}>
          {/*<div>何静建</div>*/}
          <div onClick={ () => { console.log(this.state.data[0].buyer_address) }}>{this.state.data ? this.state.data[0].buyer_address : console.log(1) }</div>
        </div>
      </div>
    )
  }

  /**
   * 订单表
   */
  renderOrderItem = () => {
    return (
      <div className='orderDetail'>
        <div className='orderNum' style={{ fontSize: 12 }}>订单号: {this.state.data ? this.state.data[0].order_id : console.log(1) }</div>
        <div className='supplier'>
          <ReactSVG svgClassName='ordericon' path='./assets/images/Cart/merchant.svg' />
          <div>衢州超彩软件开发有限公司</div>
          <div style={{ flex: 1 }}></div>
          <Icon style={{ marginRight: 20 }} type='right' />
        </div>
        {this.state.data ? this.state.data[0].orderDetailList.map(i => (
          <List className='foodList'>
            <List.Item onClick={ () => { console.log(1111) } }>
              <div className='foodItem'>
                <img className='foodImg' src={'./assets/images/SupplierTest/vegetable.png'} alt=''/>
                <div className='foodText'>
                  <div className='foodName'>{i.product_name}</div>
                  <div>2018-10-10 15:11:08</div>
                </div>
                <div style={{ flex: 1 }}></div>
                <div>
                  <div>￥{i.product_price}</div>
                  <div style={{ display: 'flex',justifyContent: 'flex-end' }}>×{i.product_quantity}</div>
                </div>
              </div>
            </List.Item>
          </List>
        )) : console.log(1)}
      </div>
    )
  }

  /**
   * 价格清单
   */
  renderPriceList = () => {
    return (
      <div className='priceList'>
        <div className='priceListTop'>
          <div className='foodTotal'>
            <div>商品总价</div>
            <div style={{ flex: 1 }}></div>
            <div>￥{this.state.data ? this.state.data[0].order_amount : console.log(1)}</div>
          </div>
          <div className='express'>
            <div>运费</div>
            <div style={{ flex: 1 }}></div>
            <div>￥0.00</div>
          </div>
          <div className='orderTotal'>
            <div>订单总价</div>
            <div style={{ flex: 1 }}></div>
            <div>￥{this.state.data ? this.state.data[0].order_amount : console.log(1)}</div>
          </div>
        </div>
        <div className='realPayment'>
          <div>实付款</div>
          <div style={{ flex: 1 }}></div>
          <div style={{ color: 'red' }}>￥{this.state.data ? this.state.data[0].order_amount : console.log(1)}</div>
        </div>
      </div>
    )
  }

  /**
   * 订单信息
   */
  renderOrderMsg = () => {
    return (
      <div style={{ backgroundColor: 'white' }}>
        <div className='orderMsg'>
          <div className='orderMsgTitle'>订单信息</div>
          <div className='orderMsgMore'>
            <div>
              <div>订单编号：</div>
              <div>2018-10-10 15：11：08</div>
            </div>
            <div>
              <div>交易号：</div>
              <div>2018-10-10 15：11：08</div>
            </div>
            <div>
              <div>创建时间：</div>
              <div>2018-10-10 15：11：08</div>
            </div>
            <div>
              <div>付款时间：</div>
              <div>2018-10-10 15：11：08</div>
            </div>
            <div>
              <div>成交时间：</div>
              <div>2018-10-10 15：11：08</div>
            </div>
          </div>
        </div>
        <div className='contact'>
          <div><ReactSVG svgClassName='contactSeller' path='./assets/images/contactSeller.svg'/>联系卖家</div>
          <div><ReactSVG svgClassName='phone' path='./assets/images/phone.svg'/>拨打电话</div>
        </div>
      </div>
    )
  }

  public render () {
    return (
      <div>
        <div>
          <Head
            showLeftIcon='true'
            title='订单详情'
            backgroundColor='#0084e7'
            leftIconColor='white'
          />
        </div>
        <div className='stateBox'>
          <div>
            <div style={{ fontSize: 18 }}>{this.state.data ? this.state.data[0].pay_china_status : console.log(1) }</div>
            <div style={{ marginTop: 5 }}>超市关闭</div>
          </div>
          <div style={{ flex: 1 }}></div>
          <div>
            <img style={{ width: 151,display: 'block' }} src='./assets/images/box.png' />
          </div>
        </div>
        {this.renderAddress()}
        {this.renderOrderItem()}
        {this.renderPriceList()}
        {this.renderOrderMsg()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    orderId: state.productOrderData.index
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {

}

export default connect(mapStateToProps, mapDispatchToProps)(User)

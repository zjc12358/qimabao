import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, Icon, DatePicker, List, Modal, Button, Radio, Toast, TextareaItem } from 'antd-mobile'
import ReactSVG from 'react-svg'
import './default.less'
import './orderMakeSure.less'
import { cloneDeep, isNil } from 'lodash'
import Head from '../../components/Head/index'
import history from 'history/createHashHistory'
import { needReload, updataOrderMakeSure } from '@store/actions/oderMakeSure_data'
import { OrderMakeSureBean } from '@datasources/OrderMakeSureBean'
import axios from 'axios'
import { MyResponse } from '@datasources/MyResponse'

const nowTimeStamp = Date.now()
const now = new Date(nowTimeStamp)
const RadioItem = Radio.RadioItem

export interface Props {
  updataOrderMakeSure: (orderMakeSure: OrderMakeSureBean) => void,
  needReload: (reload: boolean) => void,
  BookingSheetFood: any,
  total: number,
  orderId: string,
  orderData: any,
  needReloadData: boolean
}

interface State {
  orderData: any,
  startVisible: any,
  endVisible: any,
  startdpValue: any,
  enddpValue: any,
  dateValue1: any,
  dateValue2: any,
  timeIsSet: any,
  modal1: boolean,
  modal2: boolean,
  dateChooseData: any,
  buyMsg: any,
  fullscreen: boolean
}

function closest (el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el
    }
    el = el.parentElement
  }
  return null
}

class History extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      dateChooseData: [
        { text: '当天', checked: false, value: 0 },
        { text: '隔天', checked: false, value: 1 }
      ],
      modal1: false,
      modal2: false,
      timeIsSet: false,
      startVisible: false,
      endVisible: false,
      startdpValue: 0,
      enddpValue: 0,
      dateValue1: '',
      dateValue2: '',
      orderData: this.props.orderData,
      buyMsg: '',
      fullscreen: false
    }
  }

  componentDidMount () {
    console.log(this.props.BookingSheetFood)
    if (this.props.needReloadData === false) return
    let orderData = {
      user: {},
      total: 1,
      addressData: {},
      supplier: [
        {
          supplier_id: 2,
          allChecked: false,
          company_name: '衢州炒菜软件有限公司',
          shoppingCartDetails: [
            {
              cart_id: 1,
              product_id: 1,
              supplier_id: 2,
              isChecked: false,
              product_name: '红烧肉',
              product_icon: '1231231321',
              product_price: 12.1,
              unit: '份',
              product_weight: 1,
              product_total_price: 15.5
            }
          ]
        }
      ]
    }
    this.props.updataOrderMakeSure(orderData)
    this.props.needReload(false)
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps')
    if (nextProps !== this.props) {
      console.log(nextProps)
    }
  }

  /**
   * 打开modal
   * @param e
   * @param n  1:选择时间,  2:确认付款
   */
  showModal = (e,n) => {
    e.preventDefault() // 修复 Android 上点击穿透
    if (n === 1) {
      this.setState({ modal1: true })
    } else {
      this.setState({ modal2: true })
    }
  }
  onClose = (n) => {
    if (n === 1) {
      let timeIsSet = this.state.startdpValue && this.state.enddpValue ? true : false
      this.setState({ modal1: false,timeIsSet: timeIsSet })
    } else {
      this.setState({ modal2: false })
    }
  }

  /**
   * 获取当前时间  -------- 本机时间
   */
  getNowTime = () => {
    let nd = new Date()
    return nd
  }

  /**
   * 提交订单
   */
  subOnChange = (e) => {
    if (this.state.timeIsSet === true) {
      this.submite()
    } else {
      Toast.info('请选择配送时间!',2,null,false)
      this.showModal(e,1)
    }
  }

  /**
   * 时间对象格式化
   * @param date
   * @constructor
   */
  FormattedDate = (date) => {
    date = date + ''
    date = date.replace(/ GMT.+$/, '')// Or str = str.substring(0, 24)
    let da = new Date(date)
    console.log(da)
    let a = [da.getFullYear(), da.getMonth() + 1, da.getDate(), da.getHours(), da.getMinutes(), da.getSeconds()]
    let dpValue = a[1] + '/' + a[2] + ' ' + a[3] + ':' + a[4]
    return dpValue
  }

  foramatteDateYDH = (dateValue) => {
    let da = new Date(dateValue)
    let year = da.getFullYear()
    let month = da.getMonth() + 1
    let date = da.getDate()
    let hour = da.getHours()
    let minutes = da.getMinutes()
    let second = da.getSeconds()
    let month2
    let date2
    let hour2
    let minutes2
    let second2
    if (month < 10) {
      month2 = '0' + month
      console.log(month2)
    } else {
      month2 = month
    }
    if (date < 10) {
      date2 = '0' + date
    } else {
      date2 = date
    }
    if (hour < 10) {
      hour2 = '0' + hour
    } else {
      hour2 = hour
    }
    if (minutes < 10) {
      minutes2 = '0' + minutes
    } else {
      minutes2 = minutes
    }
    if (second < 10) {
      second2 = '0' + second
    } else {
      second2 = second
    }
    let dateStr = year + '-' + month2 + '-' + date2 + ' ' + hour2 + ':' + minutes2 + ':' + second2
    console.log(dateStr)
    return dateStr
  }

  datePickerOpen = (type) => {
    if (type === 1) {
      this.setState({ startVisible: true })
    } else if (type === 2) {
      if (this.state.startdpValue) this.setState({ endVisible: true })
      else Toast.info('请先选择起始时间！',2,null,false)
    }
  }

  submite = () => {
    let dateValue1 = this.foramatteDateYDH(this.state.dateValue1)
    let dateValue2 = this.foramatteDateYDH(this.state.dateValue2)
    Toast.loading('loading...', 0)
    let url = 'CanteenProcurementManager/user/productOrder/submitProductOrder?'
    let query = 'orderDeliveryTime=' + dateValue1 + '&orderOverTime=' + dateValue2 + '&orderId=' + this.props.orderId + '&orderMessage=' + this.state.buyMsg
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- 购物车data =', data)
        if (data.data.code === 0) {
          this.setState({
            fullscreen: false
          })
          Toast.hide()
          this.setState({ modal2: true })
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }

  /*
  * 修改送达时间组件
  * */
  renderSetTime = () => {
    return (
      <div>
          <List.Item>
            <div style={{ display: 'flex', fontSize: 13 }}>
              <div></div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <span onClick={() => { this.datePickerOpen(1) }}>{this.state.startdpValue ? this.state.startdpValue : '起始时间'}</span>
                &nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;&nbsp;
                <span onClick={() => this.datePickerOpen(2)}>{this.state.enddpValue ? this.state.enddpValue : '送达时间'}</span>
              </div>
            </div>
          </List.Item>
      </div>
    )
  }

  /*
  * 供应商选项
  * */
  renderSupplier = (i) => {
    return (
      <div style={{ marginBottom: 20 }}>
        <div className='supplierItem' style={{
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid #CCCCCC',
          height: 40,
          paddingLeft: 20
        }}>
          <div className='checkBox'>
          </div>
          <ReactSVG svgStyle={{ width: 16,height: 16,display: 'flex',alignItems: 'center',marginRight: 16 }} path='./assets/images/Cart/merchant.svg' />
          <div className='fontGray'>{i.supplier_name}</div>
          <div style={{ flex: 1 }}></div>
          <Icon style={{ paddingRight: 15 }} type='right'/>
        </div>
        {!isNil(i.shoppingCartDetails) && i.shoppingCartDetails.map(i2 => (
          <div
            className='foodWrap'
          >
            <div className='foodDetail'>
              <img className='' style={{ width: 95,height: 95,borderRadius: '50%',display: 'block' }} src='http://img0.imgtn.bdimg.com/it/u=508694851,709788791&fm=200&gp=0.jpg' />
              <div style={{ width: 180,paddingLeft: 15 }}>
                <p>{i2.product_name}</p>
                <p>单价：<span style={{ color: 'red' }}>￥{i2.product_price} </span><span style={{ color: '#8c8c8c' }}>/500g</span></p>
                <p>数量: {i2.product_weight}</p>
                <p style={{ position: 'absolute',bottom: 0,right: 20 }}>小计：<span style={{ color: 'red' }}>￥{i2.product_total_price}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  /*
  * 确认付款
  * */
  renderPayConfirm = () => {
    return (
      <Modal
        popup
        visible={this.state.modal2}
        onClose={() => this.onClose(2)}
        animationType='slide-up'
        className='paySure'
      >
        <List renderHeader={() => '确认付款'} className='popup-list'>
          <List.Item>
            <div className='account'>
              <div className='accountPice'>￥31.0</div>
              <div className='accountDetail'>
                <div>支付宝账号</div>
                <div style={{ flex: 1 }}></div>
                <div>156666666</div>
              </div>
            </div>
          </List.Item>
          <List.Item>
            <div className='balance'>
              <div>付款方式</div>
              <div style={{ flex: 1 }}></div>
              <div>账户余额</div>
              <Icon type='right' />
            </div>
          </List.Item>
          <div style={{ height: 210 }}></div>
          <List.Item>
            <Button type='primary' onClick={ () => this.onClose(2) }>立即付款</Button>
          </List.Item>
        </List>
      </Modal>
    )
  }

  public render () {
    let iconStyle = { width: 20,height: 20,display: 'flex',alignItems: 'center',marginRight: 16,marginLeft: 18 }
    return (
      <div className='orderContainer'>
        <Head
          title='确认订单'
          titleColor='#333333'
          backgroundColor='#ffffff'
          showLeftIcon='true'
        >
        </Head>
        <div className='touch_scroll bigContent' style={{ width: '100%' }}>
          <div>
            <div
              className='address'
              onClick={() => {
                history().push('/setting-address')
              }}
            >
              <div>
                <img style={{ width: 20 }} src='../../assets/images/Cart/cart_location.svg' />
              </div>
              <div style={{ flex: 1, paddingLeft: 12, paddingRight: 10 }}>
                <div style={{ display: 'flex' }}>
                  <div>收货人：何静</div>
                  <div style={{ flex: 1 }}></div>
                  <div>15657076868</div>
                </div>
                <div style={{ marginTop: 3 }}>收货地址：阿里巴巴集团某某事业部123</div>
              </div>
              <div><Icon type='right'/></div>
            </div>
            <div style={{ height: 5, background: 'url(./assets/images/Cart/border_bg.jpg)', marginBottom: 15 }}></div>
          </div>
          <div className='orderDetail'>
            <div className='orderDetailCon'>
              <div className='orderDetailTitle'>
                <ReactSVG path='./assets/images/Cart/time.svg' svgStyle={ iconStyle } />
                <div className='fontGray'>送达时间</div>
                <div style={{ flex: 1 }}></div>
                <div
                  onClick={(e) => {
                    this.showModal(e,1)
                  }}
                  className=''>
                  {this.state.timeIsSet ? <span style={{ color: 'rgb(0, 132, 231)' }}>更改送达时间</span> : <span>选择送达时间</span>}
                </div>
                <div onClick={(e) => {
                  this.showModal(e,1)
                }} style={{ paddingRight: 15 }}><Icon type='right'/></div>
              </div>
              { this.state.timeIsSet ? <div className='timeDescription'>
                  {this.state.startdpValue} - {this.state.enddpValue} &nbsp;&nbsp;免运费
              </div> : <div></div> }
            </div>
            {!isNil(this.props.BookingSheetFood) && this.props.BookingSheetFood.map(i => (
              <div>{this.renderSupplier(i)}</div>
            ))}
            <div style={{ margin: '0 20px',fontSize: 16,marginBottom: 3 }}>买家留言：</div>
            <div style={{ marginLeft: 20,marginRight: 20,border: '1px solid #cccccc' }}>
              <TextareaItem
                style={{ height: 85,fontSize: 15 }}
                placeholder='选填：对本次交易的说明（建议填写...'
                onBlur={ (e) => {
                  this.setState({ buyMsg: e },() => {
                    console.log(this.state.buyMsg)
                  })
                }}
              />
            </div>
            <div style={{ display: 'flex',padding: '10px 0' }}>
              <div style={{ flex: 1 }}></div>
              <div style={{ paddingRight: 20 }}>合计: <span style={{ color: 'red',fontSize: 18 }}>￥{this.props.total}</span></div>
            </div>
          </div>
        </div>
        <div style={{ width: '100vw',display: 'flex',height: 50,alignItems: 'center',backgroundColor: 'white',position: 'fixed',bottom: 0 }}>
          <div style={{ flex: 1 }}></div>
          <div style={{ color: 'red',paddingRight: 20 }}>￥{this.props.total}</div>
          <Button type='primary' style={{ height: 50,width: 120,borderRadius: 0 }}
               onClick={this.subOnChange}
          >提交订单</Button>
        </div>
        <DatePicker
          minDate={this.getNowTime()}
          mode='datetime'
          visible={this.state.startVisible}
          value={this.state.dateValue1}
          onChange={ (date) => this.setState({ startdpValue: this.FormattedDate(date) })}
          onOk={date => this.setState({ startVisible: false, dateValue1: date })}
          onDismiss={() => this.setState({ startVisible: false })}
        ></DatePicker>
        <DatePicker
          disabled={true}
          minDate={this.state.dateValue1}
          mode='datetime'
          visible={this.state.endVisible}
          value={this.state.dateValue2}
          onChange={ (date) => this.setState({ enddpValue: this.FormattedDate(date) })}
          onOk={date => this.setState({ endVisible: false, dateValue2: date })}
          onDismiss={() => this.setState({ endVisible: false })}
        ></DatePicker>
        <Modal
          popup
          visible={this.state.modal1}
          onClose={ () => this.onClose(1)}
          animationType='slide-up'
        >
          <List renderHeader={() => '选择送达时间'} className='popup-list'>
            {this.renderSetTime()}
            <List.Item>
              <Button type='primary' onClick={ () => {
                this.onClose(1)
                let dateValue = this.state.dateValue1
                // date = date + ''
                // date = date.replace(/ GMT.+$/, '')// Or str = str.substring(0, 24)
              }}>确定</Button>
            </List.Item>
          </List>
        </Modal>
        {this.renderPayConfirm()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    shopCartData: state.shopCartData.ShopCartData,
    BookingSheetFood: state.BookingSheetFood.BookingSheetFood,
    orderId: state.BookingSheetFood.orderId,
    needReloadData: state.orderMakeSure.reload,
    total: state.BookingSheetFood.total
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updataOrderMakeSure,
  needReload
}

export default connect(mapStateToProps, mapDispatchToProps)(History)

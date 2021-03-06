import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, Icon, DatePicker, List, Modal, Button, Radio, Toast, TextareaItem, InputItem } from 'antd-mobile'
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
import { updatePageTab } from '@store/actions/global_data'
import Drawer from '@material-ui/core/Drawer'
import { setPayInfo } from '@store/actions/pay_data'
import * as dd from 'dingtalk-jsapi'
import { AddressBean } from '@datasources/AddressBean'
import Input from '@material-ui/core/Input/Input'
import { jumpToOrder } from '@store/actions/jump_data'

const nowTimeStamp = Date.now()
const now = new Date(nowTimeStamp)
const RadioItem = Radio.RadioItem
const antAlert = Modal.alert
const SERVICE: string = 'mobile.securitypay.pay' // 接口名称，固定值
const _INPUT_CHARSET = 'utf-8' // 商户网站使用的编码格式，固定为UTF-8
const SIGN_TYPE = 'RSA' // 签名类型，目前仅支持RSA
const NOTIFY_URL: string = 'http://notify.msp.hk/notify.htm' // 支付宝服务器主动通知商户网站里指定的页面http路径
const PAYMENT_TYPE: string = '1' // 支付类型。默认值为：1（商品购买）

export interface Props {
  updataOrderMakeSure: (orderMakeSure: OrderMakeSureBean) => void,
  needReload: (reload: boolean) => void,
  BookingSheetFood: any,
  total: number,
  orderId: string,
  orderData: any,
  needReloadData: boolean
  updatePageTab: (pageTab: string) => void
  setPayInfo: (outTradeNo: string, totalAmount: string, subject: string, body: string) => void
  updateAddress: boolean
  jumpToOrder: (go: boolean) => void
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
  modal3: boolean,
  dateChooseData: any,
  buyMsg: any,
  fullscreen: boolean,
  addressInfo: AddressBean,
  isLoading: boolean,
  payPassword: any
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
      modal3: false,
      timeIsSet: false,
      startVisible: false,
      endVisible: false,
      startdpValue: 0,
      enddpValue: 0,
      dateValue1: '',
      dateValue2: '',
      orderData: this.props.orderData,
      buyMsg: '',
      fullscreen: false,
      addressInfo: null,
      isLoading: false,
      payPassword: null
    }
  }

  componentWillMount () {
    console.log('componentWillMount')
    if (this.props.updateAddress) {
      this.getDefaultAddress()
    }
  }

  componentDidMount () {
    console.log('componentDidMount')
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
    // if (nextProps !== this.props) {
    //   if (nextProps.updateAddress === true) {
    //     this.getDefaultAddress()
    //   }
    // }
  }

  /**
   * 打开modal
   * @param e
   * @param n  1:选择时间,  2:确认付款
   */
  showModal = (e, n) => {
    e.preventDefault() // 修复 Android 上点击穿透
    if (n === 1) {
      this.setState({ modal1: true })
    } else if (n === 2) {
      this.setState({ modal2: true })
    } else if (n === 3) {
      this.setState({ modal3: true })
    }
  }
  onClose = (n) => {
    if (n === 1) {
      let timeIsSet = this.state.startdpValue && this.state.enddpValue ? true : false
      this.setState({ modal1: false, timeIsSet: timeIsSet })
    } else if (n === 2) {
      this.setState({ modal2: false })
    } else if (n === 3) {
      this.setState({ modal3: false })
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
      Toast.info('请选择配送时间!', 2, null, false)
      this.showModal(e, 1)
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
      else Toast.info('请先选择起始时间！', 2, null, false)
    }
  }

  /**
   * 提交接口
   */
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
          this.props.needReload(true)
          // this.props.setPayInfo(this.props.orderId, this.props.total.toString(), '主题', '描述')
          // history().push('/myOrder')
          // history().push('/payOrder')
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }

  /**
   * 验证用户支付密码
   */
  checkPayPassword = (password: number) => {
    let url = 'CanteenProcurementManager/user/nail/checkSamePassword?'
    let query = 'password=' + password
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          this.balancePay(this.props.total, this.props.orderId)
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
        this.setState({
          payPassword: null
        })
      })
      .catch(() => {
        Toast.info('请检查网络设置!', 2, null, false)
        this.setState({
          payPassword: null
        })
      })
  }

  /**
   * 修改送达时间组件
   */
  renderSetTime = () => {
    return (
      <div>
        <List.Item>
          <div style={{ display: 'flex', fontSize: 13 }}>
            <div></div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <span onClick={() => {
                this.datePickerOpen(1)
              }}>{this.state.startdpValue ? this.state.startdpValue : '起始时间'}</span>
              &nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;&nbsp;
              <span
                onClick={() => this.datePickerOpen(2)}>{this.state.enddpValue ? this.state.enddpValue : '送达时间'}</span>
            </div>
          </div>
        </List.Item>
      </div>
    )
  }

  /**
   * 供应商选项
   */
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
          <ReactSVG svgStyle={{ width: 16, height: 16, display: 'flex', alignItems: 'center', marginRight: 16 }}
                    path='./assets/images/Cart/merchant.svg'/>
          <div className='fontGray'>{i.supplier_name}</div>
          <div style={{ flex: 1 }}></div>
          <Icon style={{ paddingRight: 15 }} type='right'/>
        </div>
        {!isNil(i.shoppingCartDetails) && i.shoppingCartDetails.map(i2 => (
          <div
            className='foodWrap'
          >
            <div className='foodDetail'>
              <img className='' style={{ width: 95, height: 95, borderRadius: '50%', display: 'block' }}
                   src='./assets/images/SupplierTest/vegetable.png'/>
              <div style={{ width: 180, paddingLeft: 15 }}>
                <p>{i2.product_name}</p>
                <p>单价：<span style={{ color: 'red' }}>￥{i2.product_price} </span><span
                  style={{ color: '#8c8c8c' }}>/500g</span></p>
                <p>数量: {i2.product_weight}</p>
                <p style={{ position: 'absolute', bottom: 0, right: 20 }}>小计：<span
                  style={{ color: 'red' }}>￥{i2.product_total_price}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  /**
   * 确认付款
   */
  renderPayConfirm = () => {
    return (
      <Modal
        popup
        visible={this.state.modal2}
        onClose={() => {
          this.onClose(2)
          this.props.updatePageTab('UserPageTabBar')
          history().goBack()
        }}
        closable={true}
        maskClosable={false}
        animationType='slide-up'
        className='paySure'
      >
        <List renderHeader={'选择付款方式'} className='popup-list'>
          {/*<List.Item>*/}
          {/*<div className='account'>*/}
          <div className='accountPice'>￥{this.props.total}</div>
          {/*<div className='accountDetail'>*/}
          {/*<div>支付宝账号</div>*/}
          {/*<div style={{ flex: 1 }}></div>*/}
          {/*<div>156666666</div>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*</List.Item>*/}
          <List.Item>
            <div className='balance'>
              <div>订单号</div>
              <div style={{ flex: 1 }}></div>
              <div>{this.props.orderId}</div>
            </div>
          </List.Item>
          <List.Item>
            <div className='balance'>
              <div>付款方式</div>
              <div style={{ flex: 1 }}></div>
              <div>账户余额</div>
              <Icon type='right'/>
            </div>
          </List.Item>
          <div style={{ height: 210 }}></div>
          <List.Item>
            <Button type='primary' onClick={(e) => {
              this.onClose(2)
              this.showModal(e, 3)
            }}>下一步</Button>
          </List.Item>
        </List>
      </Modal>
    )
  }

  closeAndOpen = () => {
    this.onClose(2)
    this.showModal(null, 2)
  }

  /**
   * 输入支付密码支付
   */
  passwordPay = () => {
    return (
      <Modal
        popup
        visible={this.state.modal3}
        onClose={this.closeAndOpen}
        closable={true}
        maskClosable={false}
        animationType='slide-up'
      >
        <List className={'pwdPayBoxTitle'} renderHeader={'请输入支付密码'} style={{
          width: '100%', height: '60%', backgroundColor: 'white',
          color: 'black'
        }}>
          <div className='balance'>
            {/*<div>付款方式</div>*/}
            {/*<div style={{ flex: 1 }}></div>*/}
            {/*<div>账户余额</div>*/}
            {/*<Icon type='right'/>*/}
            {/*<Input className='center' onChange={this.payChange}*/}
            {/*placeholder={'请输入支付密码'}*/}
            {/*type={'numberPassword'} disableUnderline={true}*/}
            {/*value={this.state.payPassword === null ? null : this.state.payPassword.toString()}>*/}
            {/*{this.state.payPassword === null ? '' : this.state.payPassword}*/}
            {/*</Input>*/}
            <div className={'payBigWrap'} style={{ position: 'relative', height: 60 }}>
              <div className={'payPwdBox'}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <span className={'showPayPwd'}>{this.state.payPassword}</span>
              </div>
              <InputItem
                className={'paypwd'}
                maxLength={6}
                type={'money'}
                moneyKeyboardAlign={'left'}
                onChange={(v) => {
                  this.setState({ payPassword: v })
                }}
              />
            </div>
          </div>
          <div style={{ height: 180, backgroundColor: 'white' }}></div>
          <List.Item>
            <Button style={{ width: '100%' }} type='primary'
                    onClick={() => this.checkPayPassword(this.state.payPassword)}>立即付款</Button>
          </List.Item>
        </List>
      </Modal>
    )
  }

  /**
   * 显示弹窗
   * @param title
   * @param msg
   */
  showAntAlert = (title: string, msg: string) => {
    const alertInstance = antAlert(title, msg, [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      {
        text: '确认', onPress: () => {
          this.onClose(2)
          this.props.updatePageTab('UserPageTabBar')
          history().goBack()
        }
      }
    ])
    setTimeout(() => {
      // 可以调用close方法以在外部close
      console.log('auto close')
      alertInstance.close()
    }, 500000)
  }

  /**
   * 输入支付密码
   * @param event
   */
  payChange = (event) => {
    console.log('p' + event.target.value)
    this.setState({
      payPassword: event.target.value
    })
  }

  /**
   * 选择收货地址
   */
  selectAddressOnClick = () => {
    history().push('/orderSelectAddress')
  }

  /**
   * 获取用户默认地址信息
   */
  getDefaultAddress = () => {
    let url = 'CanteenProcurementManager/user/receivingAddress/defaultAddress'
    let query = ''
    axios.get<MyResponse<AddressBean>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          this.setState({
            addressInfo: data.data.data
          })
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!', 2, null, false)
      })
  }

  // partner="2088101568358171"
  // &seller_id="xxx@alipay.com"
  // &out_trade_no="0819145412-6177"
  // &subject="测试"&body="测试测试"
  // &total_fee="0.01"
  // &notify_url="http://notify.msp.hk/notify.htm"
  // &service="mobile.securitypay.pay"
  // &payment_type="1"
  // &_input_charset="utf-8"&it_b_pay="30m"
  // &sign="lBBK%2F0w5LOajrMrji7DUgEqNjIhQbidR13GovA5r3TgIbNqv231yC1NksLdw%2Ba3JnfHXoXuet6XNNHtn7VE%2BeCoRO1O%2BR1KugLrQEZMtG5jmJIe2pbjm%2F3kb%2FuGkpG%2BwYQYI51%2BhA3YBbvZHVQBYveBqK%2Bh8mUyb7GM1HxWs9k4%3D"
  // &sign_type="RSA"
  /**
   * 组装支付请求信息
   * @param partner 签约的支付宝账号对应的支付宝唯一用户号。以2088开头的16位纯数字组成。
   * @param sign 签名
   * @param outTradeNo 支付宝合作商户网站唯一订单号。
   * @param subject 商品的标题/交易标题/订单标题/订单关键字等。该参数最长为128个汉字。
   * @param sellerId 卖家支付宝账号（邮箱或手机号码格式）或其对应的支付宝唯一用户号（以2088开头的纯16位数字）。
   * @param totalFee 该笔订单的资金总额，单位为RMB-Yuan。取值范围为[0.01，100000000.00]，精确到小数点后两位。
   * @param body 对一笔交易的具体描述信息。如果是多种商品，请将商品描述字符串累加传给body
   * @return payJSON 组装好的支付信息
   */
  getPayInfo = (partner: string, sign: string, outTradeNo: string, subject: string,
                sellerId: string, totalFee: string, body: string): string => {
    let payJSON: string = 'service="' + SERVICE + '"&partner="' + partner +
      '"&_input_charset="' + _INPUT_CHARSET + '"&sign_type="' + SIGN_TYPE + '"&sign="' + sign +
      '"&notify_url' + NOTIFY_URL + '"&out_trade_no="' + outTradeNo + '"&subject="' + subject +
      '"&payment_type' + PAYMENT_TYPE + '"&seller_id="' + sellerId + '"&total_fee="' + totalFee +
      '"&body="' + body
    return payJSON
  }

  /**
   * 调用钉钉sdk支付
   */
  ddPay = (info: string) => {
    dd.biz.alipay.pay({
      info: info
    })
      .then(result => {
        alert(JSON.stringify(result))
      })
      .catch(err => {
        alert(JSON.stringify(err))
      })
  }

  /**
   * 余额支付
   */
  balancePay = (payMoney: number, orderId: string) => {
    if (this.state.isLoading) {
      return
    }
    this.setState({
      isLoading: true
    })
    Toast.loading('支付中', 0)
    let url = 'CanteenProcurementManager/user/nail/updatePayMoney?'
    let query = 'payMoney=' + payMoney + '&orderId=' + orderId
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        this.setState({
          isLoading: false
        })
        if (data.data.code === 0) {
          Toast.hide()
          Toast.info('支付成功!', 2, null, false)
          this.props.updatePageTab('UserPageTabBar')
          this.props.jumpToOrder(true)
          history().goBack()
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

  public render () {
    let iconStyle = { width: 20, height: 20, display: 'flex', alignItems: 'center', marginRight: 16, marginLeft: 18 }
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
              // onClick={() => {
              //   history().push('/setting-address')
              // }}
            >
              <div>
                <img style={{ width: 20 }} src='../../assets/images/Cart/cart_location.svg'/>
              </div>
              {isNil(this.state.addressInfo) ?
                // TODO 2019/1/3 改一下布局
                <div onClick={this.selectAddressOnClick}>
                  请选择收货地址
                </div> : <div style={{ flex: 1, paddingLeft: 12, paddingRight: 10 }}
                              onClick={this.selectAddressOnClick}>
                  <div style={{ display: 'flex' }}>
                    <div>收货人：{this.state.addressInfo.receiving_name}</div>
                    <div style={{ flex: 1 }}></div>
                    <div>{this.state.addressInfo.receiving_iphone}</div>
                  </div>
                  <div style={{ marginTop: 3 }}>
                    收货地址：{this.state.addressInfo.receiving_address + this.state.addressInfo.receiving_address_detail}</div>
                </div>
              }
              <div><Icon type='right'/></div>
            </div>
            <div style={{ height: 5, background: 'url(./assets/images/Cart/border_bg.jpg)', marginBottom: 15 }}></div>
          </div>
          <div className='orderDetail'>
            <div className='orderDetailCon'>
              <div className='orderDetailTitle'>
                <ReactSVG path='./assets/images/Cart/time.svg' svgStyle={iconStyle}/>
                <div className='fontGray'>送达时间</div>
                <div style={{ flex: 1 }}></div>
                <div
                  onClick={(e) => {
                    this.showModal(e, 1)
                  }}
                  className=''>
                  {this.state.timeIsSet ? <span style={{ color: 'rgb(0, 132, 231)' }}>更改送达时间</span> :
                    <span>选择送达时间</span>}
                </div>
                <div onClick={(e) => {
                  this.showModal(e, 1)
                }} style={{ paddingRight: 15 }}><Icon type='right'/></div>
              </div>
              {this.state.timeIsSet ? <div className='timeDescription'>
                {this.state.startdpValue} - {this.state.enddpValue} &nbsp;&nbsp;免运费
              </div> : <div></div>}
            </div>
            {!isNil(this.props.BookingSheetFood) && this.props.BookingSheetFood.map(i => (
              <div>{this.renderSupplier(i)}</div>
            ))}
            <div style={{ margin: '0 20px', fontSize: 16, marginBottom: 3 }}>买家留言：</div>
            <div style={{ marginLeft: 20, marginRight: 20, border: '1px solid #cccccc' }}>
              <TextareaItem
                style={{ height: 85, fontSize: 15 }}
                placeholder='选填：对本次交易的说明（建议填写...'
                onBlur={(e) => {
                  this.setState({ buyMsg: e }, () => {
                    console.log(this.state.buyMsg)
                  })
                }}
              />
            </div>
            <div style={{ display: 'flex', padding: '10px 0' }}>
              <div style={{ flex: 1 }}></div>
              <div style={{ paddingRight: 20 }}>合计: <span
                style={{ color: 'red', fontSize: 18 }}>￥{this.props.total}</span></div>
            </div>
          </div>
        </div>
        <div style={{ height: 50 }}></div>
        <div style={{
          width: '100vw',
          display: 'flex',
          height: 50,
          alignItems: 'center',
          backgroundColor: 'white',
          position: 'fixed',
          bottom: 0
        }}>
          <div style={{ flex: 1 }}></div>
          <div style={{ color: 'red', paddingRight: 20, fontSize: '20px' }}>￥{this.props.total}</div>
          <Button type='primary' style={{ height: 50, width: 120, borderRadius: 0 }}
                  onClick={this.subOnChange}
          >提交订单</Button>
        </div>
        <DatePicker
          minDate={this.getNowTime()}
          mode='datetime'
          visible={this.state.startVisible}
          value={this.state.dateValue1}
          onChange={(date) => this.setState({ startdpValue: this.FormattedDate(date) })}
          onOk={date => this.setState({ startVisible: false, dateValue1: date })}
          onDismiss={() => this.setState({ startVisible: false })}
        ></DatePicker>
        <DatePicker
          disabled={true}
          minDate={this.state.dateValue1}
          mode='datetime'
          visible={this.state.endVisible}
          value={this.state.dateValue2}
          onChange={(date) => this.setState({ enddpValue: this.FormattedDate(date) })}
          onOk={date => this.setState({ endVisible: false, dateValue2: date })}
          onDismiss={() => this.setState({ endVisible: false })}
        ></DatePicker>
        <Modal
          popup
          visible={this.state.modal1}
          onClose={() => this.onClose(1)}
          animationType='slide-up'
        >
          <List renderHeader={'选择送达时间'} className='popup-list'>
            {this.renderSetTime()}
            <List.Item className={'dateSureBtn'}>
              <Button type='primary' onClick={() => {
                this.onClose(1)
              }}>确定</Button>
            </List.Item>
          </List>
        </Modal>
        {this.renderPayConfirm()}
        {this.passwordPay()}
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
    total: state.BookingSheetFood.total,
    updateAddress: state.orderMakeSure.update
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updataOrderMakeSure,
  needReload,
  updatePageTab,
  setPayInfo,
  jumpToOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(History)

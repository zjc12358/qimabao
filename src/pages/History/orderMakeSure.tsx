import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, Icon, DatePicker, List, Modal, Button, Radio, Checkbox, TextareaItem } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import './default.css'
import './orderMakeSure.less'
import Head from '../../components/Head/index'
import Dialog from '../../components/Dialog/index'
import { ShopCartSupplierBean } from '@datasources/ShopCartSupplierBean'
import { ShopCartProductBean } from '@datasources/ShopCartProductBean'
import history from 'history/createHashHistory'
import { needReload, updataOrderMakeSure } from '@store/actions/oderMakeSure_data'
import { OrderMakeSureBean } from '@datasources/OrderMakeSureBean'

const nowTimeStamp = Date.now()
const now = new Date(nowTimeStamp)
const RadioItem = Radio.RadioItem

export interface Props {
  updataOrderMakeSure: (orderMakeSure: OrderMakeSureBean) => void,
  needReload: (reload: boolean) => void,
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
  dilogIsShow: boolean
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
      dilogIsShow: false,
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
      orderData: this.props.orderData
    }
  }

  componentDidMount () {
    console.log('componentDidMount')
    console.log(this.props.needReloadData + '1111111111111111')
    if (this.props.needReloadData === false) return
    let orderData = {
      user: {},
      total: 1,
      addressData: {},
      supplier: [
        {
          allChecked: false,
          name: '衢州炒菜软件有限公司',
          foodList: [
            {
              isChecked: false,
              name: '红烧肉',
              img: '1231231321',
              price: 12.1,
              unit: '份',
              count: 5
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
      this.setState({ modal1: false })
    } else {
      this.setState({ modal2: false })
    }
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return
    }
    const pNode = closest(e.target, '.am-modal-content')
    if (!pNode) {
      e.preventDefault()
    }
  }

  radioOnChange = (obj, index) => {
    console.log(11)
    for (let i = 0; i < this.state.dateChooseData.length; i++) {
      let dateChooseData = this.state.dateChooseData
      dateChooseData[i].checked = false
      if (i === index) dateChooseData[i].checked = true
      console.log(dateChooseData[i].checked)
      this.setState({ dateChooseData: dateChooseData })
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
    let dpValue = a[3] + ':' + a[4]
    // switch (type) {
    //   case 1:
    //     this.setState({ startdpValue: dpValue })
    //     break
    //   case 2:
    //     this.setState({ enddpValue: dpValue })
    //     break
    // }
    return dpValue
  }

  closeDialog = () => {
    this.setState({
      dilogIsShow: false
    })
  }
  renderDialogContent = () => {
    return (
      <div>我是content</div>
    )
  }

  /*
  * 修改送达时间组件
  * */
  renderSetTime = () => {
    return (
      <div>
        {this.state.dateChooseData.map((i, index) => (
          <List.Item key={index}>
            <div style={{ display: 'flex', fontSize: 13 }}>
              <div>{i.text}</div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <span onClick={() => this.setState({ startVisible: true })}>{this.state.startdpValue}</span>
                &nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;&nbsp;
                <span onClick={() => this.setState({ endVisible: true })}>{this.state.enddpValue}</span>
              </div>
              <div><Checkbox checked={i.checked} onChange={() => {
                this.radioOnChange(i, index)
              }}></Checkbox></div>
            </div>
          </List.Item>
        ))}
      </div>
    )
  }

  /*
  * 供应商选项
  * */
  renderSupplier = () => {
    return (
      <div>
        <div className='supplierItem' style={{
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid #CCCCCC',
          height: 40
        }}>
          <div className='checkBox'>
          </div>
          <div style={{ width: 20 }}></div>
          <div className='fontGray'>衢州炒菜软件开发有限公司 </div>
          <div style={{ flex: 1 }}></div>
          <Icon style={{ paddingRight: 15 }} type='right'/>
        </div>
        <div style={{
          paddingLeft: 20,
          paddingRight: 20
        }}>
          <div className='foodDetail'>
            <img className='' style={{ width: 95,height: 95,borderRadius: '50%',display: 'block' }} src='http://img0.imgtn.bdimg.com/it/u=508694851,709788791&fm=200&gp=0.jpg' />
            <div style={{ width: 180,paddingLeft: 15 }}>
              <p>精选有机红皮洋葱</p>
              <p>单价：<span style={{ color: 'red' }}>￥15.5 </span><span style={{ color: '#8c8c8c' }}>/500g</span></p>
              <p>重量: 1000g</p>
              <p style={{ position: 'absolute',bottom: 0,right: 20 }}>小计：<span style={{ color: 'red' }}>￥15</span></p>
            </div>
          </div>
        </div>
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
    return (
      <div className='orderContainer'>
        <Head
          title='确认订单'
          titleColor='#333333'
          backgroundColor='#ffffff'
          showLeftIcon='true'
        >
        </Head>
        <div style={{ width: '100%' }}>
          <div>
            <div
              className='address'
              onClick={() => {
                history().push('/setting-address')
              }}
            >
              <div>1</div>
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
            <div style={{ height: 5, backgroundColor: '#d69495', marginBottom: 15 }}></div>
          </div>
          <div className='orderDetail'>
            <div className='orderDetailCon'>
              <div className='orderDetailTitle'>
                <div style={{ width: 20 }}></div>
                <div className='fontGray'>送达时间</div>
                <div style={{ flex: 1 }}></div>
                <div
                  onClick={(e) => {
                    this.showModal(e,1)
                  }}
                  className=''>
                  选择送达时间
                </div>
                <div onClick={(e) => {
                  this.showModal(e,1)
                }} style={{ paddingRight: 15 }}><Icon type='right'/></div>
              </div>
              <div className='timeDescription'>
                今日17：45 - 19：30 &nbsp;&nbsp;免运费
              </div>
            </div>
            {this.renderSupplier()}
            <div style={{ margin: '0 20px',fontSize: 16,marginBottom: 3 }}>买家留言：</div>
            <div style={{ marginLeft: 20,marginRight: 20,border: '1px solid #cccccc' }}>
              <TextareaItem
                style={{ height: 85,fontSize: 15 }}
                placeholder='选填：对本次交易的说明（建议填写...'
              />
            </div>
            <div style={{ display: 'flex',padding: '10px 0' }}>
              <div style={{ flex: 1 }}></div>
              <div style={{ paddingRight: 20 }}>合计: <span style={{ color: 'red',fontSize: 18 }}>￥31</span></div>
            </div>
          </div>
        </div>
        <div style={{ width: '100vw',display: 'flex',height: 50,alignItems: 'center',backgroundColor: 'white',position: 'fixed',bottom: 0 }}>
          <div style={{ flex: 1 }}></div>
          <div style={{ color: 'red',paddingRight: 20 }}>￥31</div>
          <div style={{ color: 'white',height: 50,width: 120,display: 'flex',alignItems: 'center',justifyContent: 'center',backgroundColor: '#0385e7' }}
               onClick={ () => { this.setState({ modal2: true }) }}
          >提交订单</div>
        </div>
        <DatePicker
          mode='datetime'
          visible={this.state.startVisible}
          value={this.state.dateValue1}
          onChange={ (date) => this.setState({ startdpValue: this.FormattedDate(date) })}
          onOk={date => this.setState({ startVisible: false, dateValue1: date })}
          onDismiss={() => this.setState({ startVisible: false })}
        ></DatePicker>
        <DatePicker
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
              <Button type='primary' onClick={ () => this.onClose(1)}>确定</Button>
            </List.Item>
          </List>
        </Modal>
        {this.renderPayConfirm()}
        {/*<button onClick={() => {*/}
          {/*let data = this.props.orderData*/}
          {/*data.total = 100*/}
          {/*this.props.updataOrderMakeSure(data)*/}
          {/*console.log(this.props.orderData.total)*/}
          {/*this.setState({ orderData: data })*/}
        {/*}}>点我*/}
        {/*</button>*/}
        {/*<div>我是：{this.state.orderData.total}</div>*/}
        <Dialog closeHandClick={this.closeDialog.bind(this)} direction='right' isShow = {this.state.dilogIsShow} content = { this.renderDialogContent() }></Dialog>
        <button onClick={ () => { this.setState({ dilogIsShow: !this.state.dilogIsShow }) } }>点我打开</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(History)

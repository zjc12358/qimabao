import * as React from 'react'
import { Tabs, Button, Icon, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '../../../store/reducers/globalDataReducer'
import { changeTab, changeIndex, updateProductOrder } from '../../../store/actions/productOrder_data'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import '../master.css'
import Head from '@components/Head'
import Loading from '@components/Loading'
import axios from 'axios'
import { MyResponse } from '@datasources/MyResponse'
import { ProductOrder } from '@datasources/ProductOrder'
import { cloneDeep, get } from 'lodash'
import LoadMore from '@components/LoadMore'
import { AliPayBean } from '@datasources/aliPayBean'
import * as dd from 'dingtalk-jsapi'

const SERVICE: string = 'mobile.securitypay.pay' // 接口名称，固定值
const _INPUT_CHARSET = 'utf-8' // 商户网站使用的编码格式，固定为UTF-8
const SIGN_TYPE = 'RSA' // 签名类型，目前仅支持RSA
const NOTIFY_URL: string = 'http://notify.msp.hk/notify.htm' // 支付宝服务器主动通知商户网站里指定的页面http路径
const PAYMENT_TYPE: string = '1' // 支付类型。默认值为：1（商品购买）

export interface Props {
  tab: number
  updateProductOrder: (productOrder: Array<ProductOrder>) => void
  changeTab: (index: number) => void
  changeIndex: (index: number) => void
}

interface State {
  loading: boolean
  getEmpty: boolean
  refresh: string
  pageNum: number
  isLoading: boolean
  count: number
  hasMore: boolean // 是否还有更多
  productOrderAll: Array<ProductOrder>
  productOrderFu: Array<ProductOrder>
  productOrderPei: Array<ProductOrder>
  productOrderShou: Array<ProductOrder>
  productOrderPing: Array<ProductOrder>
  productOrderWan: Array<ProductOrder>
}

const tabs = [
  { title: '全部' },
  { title: '待付款' },
  { title: '待配送' },
  { title: '待收货' },
  { title: '待评价' },
  { title: '已完成' }
]
const NUM_ROWS = 5

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      getEmpty: true,
      refresh: '',
      pageNum: 1,
      hasMore: true,
      isLoading: false,
      count: 0,
      productOrderAll: [],
      productOrderFu: [],
      productOrderPei: [],
      productOrderShou: [],
      productOrderPing: [],
      productOrderWan: []
    }
  }

  componentDidMount () {
    this.getData(null,this.props.tab)
  }
  getData = (tab, index) => {
    this.props.changeTab(index)
    this.setState({
      loading: true
    })
    let url = 'CanteenProcurementManager/user/productOrder/findProductOrder?'
    let query = 'pageNum=' + this.state.pageNum
    query += '&pageSize=' + NUM_ROWS
    if (index === 0) query += ''
    else query += '&payStatus=' + (index - 1)
    console.log(url + query)
    axios.get<MyResponse<ProductOrder>>(url + query)
      .then(data => {
        console.log('--- data =', data.data.data)
        if (data.data.code === 0) {
          if (this.state.pageNum === 1) {
            switch (index) {
              case 0:
                this.setState({
                  productOrderAll: cloneDeep(data.data.data)
                })
                break
              case 1:
                this.setState({
                  productOrderFu: cloneDeep(data.data.data)
                })
                break
              case 2:
                this.setState({
                  productOrderPei: cloneDeep(data.data.data)
                })
                break
              case 3:
                this.setState({
                  productOrderShou: cloneDeep(data.data.data)
                })
                break
              case 4:
                this.setState({
                  productOrderPing: cloneDeep(data.data.data)
                })
                break
              case 5:
                this.setState({
                  productOrderWan: cloneDeep(data.data.data)
                })
                break
            }
          } else {
            switch (index) {
              case 0:
                this.setState({
                  productOrderAll: this.state.productOrderAll.concat(cloneDeep(data.data.data))
                })
                break
              case 1:
                this.setState({
                  productOrderFu: this.state.productOrderFu.concat(cloneDeep(data.data.data))
                })
                break
              case 2:
                this.setState({
                  productOrderPei: this.state.productOrderPei.concat(cloneDeep(data.data.data))
                })
                break
              case 3:
                this.setState({
                  productOrderShou: this.state.productOrderShou.concat(cloneDeep(data.data.data))
                })
                break
              case 4:
                this.setState({
                  productOrderPing: this.state.productOrderPing.concat(cloneDeep(data.data.data))
                })
                break
              case 5:
                this.setState({
                  productOrderWan: this.state.productOrderWan.concat(cloneDeep(data.data.data))
                })
                break
            }
          }
          this.setState({
            loading: false
          })
          this.props.updateProductOrder(cloneDeep(data.data.data))
        } else {
          Toast.info('获取订单信息失败,请重试', 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }
  tabOnClick = (tab, index,pageNum) => {
    this.setState({
      pageNum: pageNum
    })
    this.getData(tab, index)
  }
  loadingRender = () => {
    if (this.state.loading) {
      return (
        <Loading/>
      )
    }
  }
  /**
   * 内容
   */
  public renderContent = () => {
    return(
      <div className={'moBar'} style={{ color: '#858585',position: 'relative' }}>
        <Tabs swipeable={false} tabs={tabs} onChange={(tab: any, index: number) => this.tabOnClick(tab,index,1)} animated={true} initialPage={this.props.tab} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={6} />}
        >
          {this.state.productOrderAll.length !== 0 ? () => this.renderSwitch(this.state.productOrderAll) : this.renderNone}
          {this.state.productOrderFu.length !== 0 ? () => this.renderSwitch(this.state.productOrderFu) : this.renderNone}
          {this.state.productOrderPei.length !== 0 ? () => this.renderSwitch(this.state.productOrderPei) : this.renderNone}
          {this.state.productOrderShou.length !== 0 ? () => this.renderSwitch(this.state.productOrderShou) : this.renderNone}
          {this.state.productOrderPing.length !== 0 ? () => this.renderSwitch(this.state.productOrderPing) : this.renderNone}
          {this.state.productOrderWan.length !== 0 ? () => this.renderSwitch(this.state.productOrderWan) : this.renderNone}
        </Tabs>
        {this.loadingRender()}
      </div>
    )
  }
  /**
   * 全部
   */
  public renderSwitch = (poi) => {
    let list = poi.map((i, index) => this.renderItem(i, index))
    return (
      <div id={'list'} className='touch_scroll scroll product-list'
           style={{ backgroundColor: 'white',paddingTop: 20 }}>
        <LoadMore itemHeight={91} list={list} listData={poi} getData={this.loadMore.bind(this)}
                  isLoading={this.state.isLoading} loadHeight={10} bodyName={'scroll scroll product-list'}
                  hasMore={this.state.hasMore}/>
      </div>
    )
  }
  loadMore = () => {
    if (!this.state.hasMore) {
      return
    }
    this.setState({
      pageNum: this.state.pageNum + 1
    }, () => this.getData(null,this.props.tab))
  }
  public renderItem = (i: ProductOrder, index) => {
    let font: any = null
    switch (i.pay_status) {
      case 0:
        font = {
          borderRadius: 20,
          backgroundColor: '#cccccc',
          color: '#ffffff',
          width: 70,
          height: 25,
          textAlign: 'center'
        }
        break
      case 1:
        font = {
          borderRadius: 20,
          backgroundColor: '#ff9900',
          color: '#ffffff',
          width: 70,
          height: 25,
          textAlign: 'center'
        }
        break
      case 2:
        font = {
          borderRadius: 20,
          backgroundColor: '#cccccc',
          color: '#ffffff',
          width: 70,
          height: 25,
          textAlign: 'center'
        }
        break
      case 3:
        font = {
          borderRadius: 20,
          backgroundColor: '#cccccc',
          color: '#ffffff',
          width: 70,
          height: 25,
          textAlign: 'center'
        }
        break
      case 4:
        font = {
          borderRadius: 20,
          backgroundColor: '#cccccc',
          color: '#ffffff',
          width: 70,
          height: 25,
          textAlign: 'center'
        }
        break
    }
    return (
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        float: 'right'
      }}>
        <div className={'Segment_line2'}/>
        <div className={'flex-space-between-row-center'} style={{ height: 40, padding: 5 }}>
          <div className={'commonFont'} style={{ fontSize: 12, color: '#999' }}>订单号：{i.order_id}</div>
          <div className={'flex-center-row-center'} style={{
            borderRadius: 20,
            backgroundColor: '#ff9900',
            color: '#ffffff',
            width: 70,
            height: 25,
            textAlign: 'center'
          }}>{tabs[i.pay_status + 1].title}</div>
        </div>
        <div className={'Segment_line2'}/>
        {i.orderDetailList.map((lI, lIndex) => (
          <div>
            {this.renderItemDetail(lI, lIndex, i.create_time)}
          </div>
        ))}
        <div className={'flex-flex-end-row-center'}
             style={{
               height: 40,
               padding: '5px 15px 5px 5px',
               borderTop: '1px solid #e5e5e5',
               borderBottom: '1px solid #e5e5e5'
             }}>
          <div>
            <span className={'commonFont'} style={{
              fontSize: 12,
              color: '#666'
            }}>共{i.orderDetailList.length}件商品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合计&nbsp;</span>
            <span className={'commonFont'} style={{ fontSize: 16, color: '#000' }}>￥<span
              style={{ color: 'red' }}>{i.order_amount}</span></span>
          </div>
        </div>
        {this.renderItemStatus(i, index)}
      </div>
    )
  }
  /**
   * 点击展开详细
   */
  public renderItemDetail = (i, index, time) => {
    return (
      <div style={{ padding: 16, height: 100, position: 'relative' }}>
        <div style={{ position: 'absolute', zIndex: 98 }}>
          <div style={{ width: 70, height: 70 }}><img style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%'
          }}/></div>
        </div>
        <div className={'flex-space-between-column-flex-start'}
             style={{ width: window.innerWidth - 116, position: 'absolute', left: 100, height: 70 }}>
          <div className={'flex-space-between-row-flex-start'} style={{ width: '100%' }}>
            <div className={'commonFont'}
                 style={{ fontSize: 14, color: '#000', width: '70%', whiteSpace: 'normal' }}>{i.product_name}</div>
            <div className={'flex-space-between-column-flex-end'} style={{ width: '20%' }}>
              <span className={'commonFont'} style={{ fontSize: 14, color: '#000' }}>￥<span
                style={{ color: 'red' }}>{i.product_price}</span></span>
              <span className={'commonFont'} style={{ fontSize: 12, color: '#999' }}>x{i.product_quantity}</span>
            </div>
          </div>
          <div>
            <span className={'commonFont'} style={{ fontSize: 12, color: '#999' }}>下单时间：{time.substr(0, 19)}</span>
          </div>
          <div className={'flex-center-row-center'}>
            <div className={'flex-center-row-center'}
                 style={{
                   width: 'auto',
                   height: 'auto',
                   padding: '3px 5px',
                   backgroundColor: '#fff4f6',
                   borderRadius: 10,
                   marginRight: 5
                 }}>
              <span className={'commonFont'} style={{ fontSize: 10, color: '#ff9900' }}>满100减15</span>
            </div>
            <div className={'flex-center-row-center'}
                 style={{
                   width: 'auto',
                   height: 'auto',
                   padding: '3px 5px',
                   backgroundColor: '#fff4f6',
                   borderRadius: 10,
                   marginRight: 5
                 }}>
              <span className={'commonFont'} style={{ fontSize: 10, color: '#ff9900' }}>满50减3</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  /**
   * 订单分支：立即处理 ，查看详情
   */
  public renderItemStatus = (i: ProductOrder, index) => {
    let showDeal: any = false
    switch (i.pay_status) {
      case 0:
        showDeal =
          <button className={'buttonDelivery'} style={{ marginLeft: 10 }}
                  onClick={() => this.payOnclick(i.order_id)}>立即付款</button>
        break
      case 1:
        showDeal =
          <button className={'buttonDelivery'} style={{ marginLeft: 10 }}
                  onClick={() => this.sendOnClick(i.order_id)}>立即催货</button>
        break
      case 2:
        showDeal = <button className={'buttonDelivery'} style={{ marginLeft: 10 }}
                           onClick={() => this.confirmOnclick(i.order_id, index)}>确认收货</button>
        break
      case 3:
        showDeal =
          <button className={'buttonDelivery'} style={{ marginLeft: 10 }}
                  onClick={() => this.evaOnClick(i.order_id)}>立即评价</button>
        break
    }
    return (
      <div className={'flex-flex-end-row-center'}
           style={{ height: 40, backgroundColor: '#fafafa', padding: '0 5px' }}>
        <button className={'buttonViewDetail'} onClick={() => this.viewDetailOnclick(i.order_id)}>查看详情</button>
        {showDeal}
      </div>
    )
  }

  /**
   * 空
   */
  public renderNone = () => {
    return (
      <div className={'flex-center-row-center'} style={{ height: '250px', backgroundColor: '#fff' }}>
        空空如也
      </div>
    )
  }

  public viewDetailOnclick = (id) => {
    this.props.changeIndex(id)
    history().push('/orderDetail')
  }

  /**
   * 立即付款
   * @param orderId
   */
  public payOnclick = (orderId: string) => {
    if (this.state.isLoading) {
      return
    }
    this.setState({
      isLoading: true
    })
    let url = 'CanteenProcurementManager/user/paySetting/aliPayNow?'
    let query = 'orderId=' + orderId
    axios.get<MyResponse<AliPayBean>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        this.setState({
          isLoading: false
        })
        if (data.data.code === 0) {
          this.ddPay(this.getPayInfo(data.data.data.partner, data.data.data.sign, data.data.data.out_trade_no,
            data.data.data.subject, data.data.data.seller_id, data.data.data.total_fee, '衢州超彩'))
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

  /**
   * 立即催货
   * @param orderId
   */
  sendOnClick = (orderId: string) => {
    // TODO 2019/1/3 立即催货
  }

  /**
   * 立即评价
   * @param orderId
   */
  evaOnClick = (orderId: string) => {
    // TODO 2019/1/3 立即评价
  }

  /**
   * 立即支付
   */
  justPay = () => {
    console.log(1)
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
  public ddPay = (info: string) => {
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

  public confirmOnclick = (id, index) => {
    let url = 'CanteenProcurementManager/user/productOrder/updatePyStates?'
    let query = 'states=' + 4 + '&orderId=' + id
    console.log(url + query)
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          this.state.productOrderShou.splice(index, 1)
          this.setState({
            refresh: 'refresh'
          })
          Toast.info('确认成功!', 1, null, false)
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }

  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Head title={'订单管理'} titleColor={'#ffffff'} showLeftIcon={true} backgroundColor={'#0084e7'}
              leftIconColor={'white'}/>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    tab: state.productOrderData.tab
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updateProductOrder,
  changeTab,
  changeIndex
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

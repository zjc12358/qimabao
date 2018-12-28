import * as React from 'react'
import { Tabs, Button, Icon, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '../../../store/reducers/globalDataReducer'
import { changeTab,changeIndex, updateProductOrder } from '../../../store/actions/productOrder_data'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import '../master.css'
import Head from '@components/Head'
import Loading from '@components/Loading'
import axios from 'axios'
import { MyResponse } from '@datasources/MyResponse'
import { ProductOrder } from '@datasources/ProductOrder'
import { cloneDeep, get } from 'lodash'

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
class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      getEmpty: true,
      refresh: '',
      productOrderAll: [],
      productOrderFu: [],
      productOrderPei: [],
      productOrderShou: [],
      productOrderPing: [],
      productOrderWan: []
    }
  }

  componentDidMount () {
    this.tabOnClick(null,this.props.tab)
  }
  tabOnClick = (tab, index) => {
    this.props.changeTab(index)
    this.setState({
      loading: true
    })
    let url = 'CanteenProcurementManager/user/productOrder/findProductOrder'
    let query = ''
    if (index === 0) query = ''
    else query = '?payStatus=' + (index - 1)
    axios.get<MyResponse<ProductOrder>>(url + query)
      .then(data => {
        console.log('--- data =', data.data.data)
        if (data.data.code === 0) {
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
        <Tabs tabs={tabs} onChange={(tab: any, index: number) => this.tabOnClick(tab,index)} animated={true} initialPage={this.props.tab} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={6} />}
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
    return(
      <div style={{
        paddingTop: 20
      }}>
        {poi.map((i, index) => (
          <div>
            {this.renderItem(i, index)}
          </div>
        ))}
      </div>
    )
  }
  public renderItem = (i, index) => {
    let font: any = null
    switch (i.order_status) {
      case 0:
        font = { borderRadius: 20,backgroundColor: '#cccccc',color: '#ffffff',width: 70, height: 25,textAlign: 'center' }
        break
      case 1:
        font = { borderRadius: 20,backgroundColor: '#ff9900',color: '#ffffff',width: 70, height: 25,textAlign: 'center' }
        break
      case 2:
        font = { borderRadius: 20,backgroundColor: '#cccccc',color: '#ffffff',width: 70, height: 25,textAlign: 'center' }
        break
      case 3:
        font = { borderRadius: 20,backgroundColor: '#cccccc',color: '#ffffff',width: 70, height: 25,textAlign: 'center' }
        break
      case 4:
        font = { borderRadius: 20,backgroundColor: '#cccccc',color: '#ffffff',width: 70, height: 25,textAlign: 'center' }
        break
    }
    return(
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        float: 'right'
      }}>
        <div className={'Segment_line2'} />
        <div className={'flex-space-between-row-center'} style={{ height: 40,padding: 5 }}>
          <div className={'commonFont'} style={{ fontSize: 12, color: '#999' }}>订单号：{i.order_id}</div>
          <div className={'flex-center-row-center'} style={{  borderRadius: 20,backgroundColor: '#ff9900',color: '#ffffff',width: 70, height: 25,textAlign: 'center' }}>{tabs[i.order_status + 1].title}</div>
        </div>
        <div className={'Segment_line2'} />
        {i.orderDetailList.map((lI, lIndex) => (
          <div>
            {this.renderItemDetail(lI,lIndex,i.create_time)}
          </div>
        ))}
        <div className={'flex-flex-end-row-center'}
             style={{  height: 40,padding: '5px 15px 5px 5px',borderTop: '1px solid #e5e5e5' ,borderBottom: '1px solid #e5e5e5' }}>
          <div>
            <span className={'commonFont'} style={{ fontSize: 12, color: '#666' }}>共{i.orderDetailList.length}件商品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合计&nbsp;</span>
            <span className={'commonFont'} style={{ fontSize: 16, color: '#000' }}>￥<span style={{ color: 'red' }}>{i.order_amount}</span></span>
          </div>
        </div>
        {this.renderItemStatus(i,index)}
      </div>
    )
  }
  /**
   * 点击展开详细
   */
  public renderItemDetail = (i,index,time) => {
    return(
      <div style={{ padding: 16, height: 100, position: 'relative' }}>
        <div style={{ position: 'absolute', zIndex: 98 }}>
          <div style={{ width: 70, height: 70 }}><img style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%'
          }} src='../../../../assets/images/SupplierTest/vegetable.png' /></div>
        </div>
        <div className={'flex-space-between-column-flex-start'} style={{ width: window.innerWidth - 116,position: 'absolute', left: 100, height: 70 }}>
          <div className={'flex-space-between-row-flex-start'} style={{ width: '100%' }}>
            <div className={'commonFont'} style={{ fontSize: 14, color: '#000',width: '70%',whiteSpace: 'normal' }}>{i.product_name}</div>
            <div className={'flex-space-between-column-flex-end'} style={{ width: '20%' }}>
              <span className={'commonFont'} style={{ fontSize: 14, color: '#000' }}>￥<span style={{ color: 'red' }}>{i.product_price}</span></span>
              <span className={'commonFont'} style={{ fontSize: 12, color: '#999' }}>x{i.product_quantity}</span>
            </div>
          </div>
          <div>
            <span className={'commonFont'} style={{ fontSize: 12, color: '#999' }}>下单时间：{time.substr(0,19)}</span>
          </div>
          <div className={'flex-center-row-center'}>
            <div className={'flex-center-row-center'}
                 style={{ width: 'auto', height: 'auto', padding: '3px 5px',backgroundColor: '#fff4f6',borderRadius: 10,marginRight: 5 }}>
              <span className={'commonFont'} style={{ fontSize: 10, color: '#ff9900' }}>满100减15</span>
            </div>
            <div className={'flex-center-row-center'}
                 style={{ width: 'auto', height: 'auto', padding: '3px 5px',backgroundColor: '#fff4f6',borderRadius: 10,marginRight: 5 }}>
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
  public renderItemStatus = (i,index) => {
    let showDeal: any = false
    switch (i.order_status) {
      case 0:
        showDeal = <button className={'buttonDelivery'} style={{ marginLeft: 10 }} onClick={this.payOnclick}>立即付款</button>
        break
      case 1:
        showDeal = <button className={'buttonDelivery'} style={{ marginLeft: 10 }} onClick={this.payOnclick}>立即催货</button>
        break
      case 2:
        showDeal = <button className={'buttonDelivery'} style={{ marginLeft: 10 }} onClick={() => this.confirmOnclick(i.order_id,index)}>确认收货</button>
        break
      case 3:
        showDeal = <button className={'buttonDelivery'} style={{ marginLeft: 10 }} onClick={this.payOnclick}>立即评价</button>
        break
    }
    return(
      <div className={'flex-flex-end-row-center'}
           style={{ height: 40,backgroundColor: '#fafafa',padding: '0 5px' }}>
        <button className={'buttonViewDetail'} onClick={() => this.viewDetailOnclick(i.order_id)}>查看详情</button>
        {showDeal}
      </div>
    )
  }

  /**
   * 空
   */
  public renderNone = () => {
    return(
      <div className={'flex-center-row-center'} style={{ height: '250px', backgroundColor: '#fff' }}>
        空空如也
      </div>
    )
  }

  public viewDetailOnclick = (id) => {
    this.props.changeIndex(id)
    history().push('/orderDetail')
  }

  public payOnclick = () => {
    history().push('/paySuccess')
  }
  public confirmOnclick = (id,index) => {
    let url = 'CanteenProcurementManager/user/productOrder/updatePyStates?'
    let query = 'states=' + 4 + '&orderId=' + id
    console.log(url + query)
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          this.state.productOrderShou.splice(index,1)
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
        <Head title={'订单管理'} titleColor={'#ffffff'} showLeftIcon={true} backgroundColor={'#0084e7'} leftIconColor={'white'}/>
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

import * as React from 'react'
import { Tabs, Button, Icon, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { addPageIndex, deletePageIndex } from '@store/actions/global_data'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import './master.css'
import Head from '@components/Head'
import Loading from '@components/Loading'
import axios from 'axios'
import { MyResponse } from '@datasources/MyResponse'
import { SupplierProductOrder } from '@datasources/SupplierProductOrder'
import { cloneDeep, get } from 'lodash'
import { updateSupplierProductOrder } from '@store/actions/supplierProductOrder_data'

export interface Props {
  updateSupplierProductOrder: (SupplierProductOrder: Array<SupplierProductOrder>) => void
}

interface State {
  getEmpty: boolean
  loading: boolean
  refresh: string
  supplierProductOrderAll: Array<SupplierProductOrder>
  supplierProductOrderFu: Array<SupplierProductOrder>
  supplierProductOrderPei: Array<SupplierProductOrder>
  supplierProductOrderShou: Array<SupplierProductOrder>
  supplierProductOrderPing: Array<SupplierProductOrder>
  supplierProductOrderWan: Array<SupplierProductOrder>
}
const tabs = [
  { title: '全部' },
  { title: '待付款' },
  { title: '待发货' },
  { title: '待收货' },
  { title: '待评价' },
  { title: '已完成' }
]
class Supplier extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      getEmpty: true,
      refresh: 'refresh',
      supplierProductOrderAll: [],
      supplierProductOrderFu: [],
      supplierProductOrderPei: [],
      supplierProductOrderShou: [],
      supplierProductOrderPing: [],
      supplierProductOrderWan: []
    }
  }
  componentDidMount () {
    this.tabOnClick(null,0)
  }
  tabOnClick = (tab, index) => {
    this.setState({
      loading: true
    })
    let url = 'CanteenProcurementManager/user/productOrder/findSupplierProductOrder'
    let query = '?payStatus=' + (index - 1)
    if (index === 0) query = ''
    axios.get<MyResponse<SupplierProductOrder>>(url + query)
      .then(data => {
        console.log('--- data =', data.data.data)
        if (data.data.code === 0) {
          switch (index) {
            case 0:
              this.setState({
                supplierProductOrderAll: cloneDeep(data.data.data)
              })
              break
            case 1:
              this.setState({
                supplierProductOrderFu: cloneDeep(data.data.data)
              })
              break
            case 2:
              this.setState({
                supplierProductOrderPei: cloneDeep(data.data.data)
              })
              break
            case 3:
              this.setState({
                supplierProductOrderShou: cloneDeep(data.data.data)
              })
              break
            case 4:
              this.setState({
                supplierProductOrderPing: cloneDeep(data.data.data)
              })
              break
            case 5:
              this.setState({
                supplierProductOrderWan: cloneDeep(data.data.data)
              })
              break
          }
          this.setState({
            loading: false
          })
          this.props.updateSupplierProductOrder(cloneDeep(data.data.data))
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
      <div className={'oBar'} style={{ color: '#858585' }}>
        <Tabs tabs={tabs} onChange={(tab: any, index: number) => this.tabOnClick(tab,index)} animated={true} initialPage={0} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={6} />}
        >
          {this.state.supplierProductOrderAll.length !== 0 ? () => this.renderSwitch(this.state.supplierProductOrderAll) : this.renderNone}
          {this.state.supplierProductOrderFu.length !== 0 ? () => this.renderSwitch(this.state.supplierProductOrderFu) : this.renderNone}
          {this.state.supplierProductOrderPei.length !== 0 ? () => this.renderSwitch(this.state.supplierProductOrderPei) : this.renderNone}
          {this.state.supplierProductOrderShou.length !== 0 ? () => this.renderSwitch(this.state.supplierProductOrderShou) : this.renderNone}
          {this.state.supplierProductOrderPing.length !== 0 ? () => this.renderSwitch(this.state.supplierProductOrderPing) : this.renderNone}
          {this.state.supplierProductOrderWan.length !== 0 ? () => this.renderSwitch(this.state.supplierProductOrderWan) : this.renderNone}
        </Tabs>
        {this.loadingRender()}
      </div>
    )
  }
  /**
   * 全部
   */
  public renderSwitch = (data) => {
    return(
      <div style={{
        paddingTop: 20
      }}>
        {data.map((i, index) => (
          <div>
            {this.renderItem(i, index)}
          </div>
        ))}
      </div>
    )
  }
  public renderItem = (i, index) => {
    let font: any = null
    switch (i.pay_status) {
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
          <div className={'flex-center-row-center'} style={{  borderRadius: 20,backgroundColor: '#ff9900',color: '#ffffff',width: 70, height: 25,textAlign: 'center' }}>{tabs[i.pay_status + 1].title}</div>
        </div>
        <div className={'Segment_line2'} />
        {i.orderDetailList.map((lI, lIndex) => (
          <div>
            {this.renderItemDetail(lI,lIndex)}
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
  public renderItemDetail = (i,index) => {
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
            <span className={'commonFont'} style={{ fontSize: 12, color: '#999' }}>下单时间：{i.create_time.substr(0,19)}</span>
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
    let showDeal: boolean = false
    switch (i.pay_status) {
      case 0:
        showDeal = false
        break
      case 1:
        showDeal = true
        break
      case 2:
        showDeal = false
        break
      case 3:
        showDeal = false
        break
    }
    return(
      <div className={'flex-flex-end-row-center'}
           style={{ height: 40,backgroundColor: '#fafafa',padding: '0 5px' }}>
        <button className={'buttonViewDetail'} onClick={this.viewResultOnclick}>查看详情</button>
        {showDeal === true ? <button className={'buttonDelivery'} style={{ marginLeft: 10 }}
            onClick={() => this.deliveryOnclick(i.order_id,index)}>
          立即发货
        </button> : ''}
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
  public deliveryOnclick = (id,index) => {
    let url = 'CanteenProcurementManager/user/productOrder/updatePyStates?'
    let query = 'states=' + 2 + '&orderId=' + id
    console.log(url + query)
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          this.state.supplierProductOrderPei.splice(index,1)
          this.setState({
            refresh: 'refresh'
          })
          Toast.info('发货成功', 1, null, false)
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }
  public viewDetailOnclick = () => {
    history().push('/afterSaleDetail')
  }

  public viewResultOnclick = () => {
    history().push('/afterSaleResult')
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
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updateSupplierProductOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(Supplier)

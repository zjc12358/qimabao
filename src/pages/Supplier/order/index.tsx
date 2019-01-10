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
import { cloneDeep, isNil } from 'lodash'
import { updateSupplierProductOrder,changeTab } from '@store/actions/supplierProductOrder_data'
import LoadMore from '@components/LoadMoreTwo'

export interface Props {
  updateSupplierProductOrder: (SupplierProductOrder: Array<SupplierProductOrder>) => void
  changeTab: (index: number) => void
  tab: number
}

interface State {
  getEmpty: boolean
  refresh: string
  supplierProductOrderAll: Array<SupplierProductOrder>
  supplierProductOrderFu: Array<SupplierProductOrder>
  supplierProductOrderPei: Array<SupplierProductOrder>
  supplierProductOrderShou: Array<SupplierProductOrder>
  supplierProductOrderPing: Array<SupplierProductOrder>
  supplierProductOrderWan: Array<SupplierProductOrder>
  pageNum: number
  isLoading: boolean
  count: number
  hasMore: Array<boolean> // 是否还有更多
}
const tabs = [
  { title: '全部' },
  { title: '待付款' },
  { title: '待发货' },
  { title: '待收货' },
  { title: '待评价' },
  { title: '已完成' }
]
const NUM_ROWS = 10
class Supplier extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      getEmpty: true,
      refresh: 'refresh',
      supplierProductOrderAll: [],
      supplierProductOrderFu: [],
      supplierProductOrderPei: [],
      supplierProductOrderShou: [],
      supplierProductOrderPing: [],
      supplierProductOrderWan: [],
      pageNum: 1,
      hasMore: [true,true,true,true,true,true],
      isLoading: false,
      count: 0
    }
  }
  componentDidMount () {
    this.getData(this.props.tab,this.props.tab)
  }
  getData = (tab, index) => {
    let url = 'CanteenProcurementManager/user/productOrder/findSupplierProductOrder?'
    let query = 'pageNum=' + this.state.pageNum
    query += '&pageSize=' + NUM_ROWS
    if (index === 0) query += ''
    if (index > 0 && index < 3) query += '&payStatus=' + (index - 1)
    if (index >= 3) query += '&payStatus=' + index
    console.log(url + query)
    axios.get<any>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          if (this.state.pageNum === 1) {
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
            if (isNil(data.data.data) || data.data.data.length === 0) {
              let hasMore = this.state.hasMore
              hasMore[index] = false
              this.setState({
                count: 0,
                hasMore: hasMore
              })
            } else {
              this.setState({
                count: data.data.count
              })
            }
          } else {
            switch (index) {
              case 0:
                this.setState({
                  supplierProductOrderAll: this.state.supplierProductOrderAll.concat(cloneDeep(data.data.data))
                })
                break
              case 1:
                this.setState({
                  supplierProductOrderFu: this.state.supplierProductOrderFu.concat(cloneDeep(data.data.data))
                })
                break
              case 2:
                this.setState({
                  supplierProductOrderPei: this.state.supplierProductOrderPei.concat(cloneDeep(data.data.data))
                })
                break
              case 3:
                this.setState({
                  supplierProductOrderShou: this.state.supplierProductOrderShou.concat(cloneDeep(data.data.data))
                })
                break
              case 4:
                this.setState({
                  supplierProductOrderPing: this.state.supplierProductOrderPing.concat(cloneDeep(data.data.data))
                })
                break
              case 5:
                this.setState({
                  supplierProductOrderWan: this.state.supplierProductOrderWan.concat(cloneDeep(data.data.data))
                })
                break
            }
            if (this.state.count < this.state.pageNum * NUM_ROWS) {
              let hasMore = this.state.hasMore
              hasMore[index] = false
              this.setState({
                hasMore: hasMore
              })
            }
          }
          this.props.updateSupplierProductOrder(cloneDeep(data.data.data))

        } else {
          Toast.info('获取订单信息失败,请重试', 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }
  tabOnClick = (tab, index,pageNum) => {
    if (!isNil(document.getElementById(index))) {
      document.getElementById(index).scrollTop = 0
    }
    let hasMore = this.state.hasMore
    hasMore[index] = true
    this.setState({
      pageNum: pageNum,
      hasMore: hasMore
    }, () => {
      this.props.changeTab(index)
      this.getData(tab, index)
    })
  }
  /**
   * 内容
   */
  public renderContent = () => {

    return(
      <div className={'oBar'} style={{ color: '#858585',height: '100vh' }}>
        <Tabs swipeable={false} tabs={tabs} onChange={(tab: any, index: number) => this.tabOnClick(tab,index,1)} animated={true} initialPage={this.props.tab} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={6} />}
        >
          {this.state.supplierProductOrderAll.length !== 0 ? () => this.renderSwitch(this.state.supplierProductOrderAll,'0') : this.renderNone}
          {this.state.supplierProductOrderFu.length !== 0 ? () => this.renderSwitch(this.state.supplierProductOrderFu,'1') : this.renderNone}
          {this.state.supplierProductOrderPei.length !== 0 ? () => this.renderSwitch(this.state.supplierProductOrderPei,'2') : this.renderNone}
          {this.state.supplierProductOrderShou.length !== 0 ? () => this.renderSwitch(this.state.supplierProductOrderShou,'3') : this.renderNone}
          {this.state.supplierProductOrderPing.length !== 0 ? () => this.renderSwitch(this.state.supplierProductOrderPing,'4') : this.renderNone}
          {this.state.supplierProductOrderWan.length !== 0 ? () => this.renderSwitch(this.state.supplierProductOrderWan,'5') : this.renderNone}
        </Tabs>
      </div>
    )
  }
  /**
   * 全部
   */
  public renderSwitch = (poi,id) => {
    let list = poi.map((i, index) => this.renderItem(i, index))
    return (
      <div id={id} className='touch_scroll scroll product-list'
           style={{ paddingTop: 20 }}>
        <LoadMore id={id} itemHeight={91} list={list} listData={poi} getData={this.loadMore.bind(this,id)}
                  isLoading={this.state.isLoading} loadHeight={10} bodyName={'scroll scroll product-list'}
                  hasMore={this.state.hasMore} index={id}/>
      </div>
    )
  }
  loadMore = (index) => {
    if (!this.state.hasMore[index]) {
      return
    }
    this.setState({
      pageNum: this.state.pageNum + 1
    }, () => this.getData(null,this.props.tab))
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
      <div className={'flex-center-column-center'} style={{ height: '90vh',backgroundColor: '#fff' }}>
        <ReactSVG path='./assets/images/noOrder.svg'
                  svgStyle={{ width: '100%' }}/>
        <span>当前没有订单</span>
      </div>
    )
  }
  public deliveryOnclick = (id,index) => {
    let url = 'CanteenProcurementManager/user/productOrder/updatePyStates?'
    let query = 'states=' + 3 + '&orderId=' + id
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
        overflow: 'hidden',
        height: '100%'
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
  updateSupplierProductOrder,
  changeTab
}

export default connect(mapStateToProps, mapDispatchToProps)(Supplier)

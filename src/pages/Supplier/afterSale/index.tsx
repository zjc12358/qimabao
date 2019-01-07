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
import axios from 'axios'
import { MyResponse } from '@datasources/MyResponse'
import { ProductAfterSale } from '@datasources/ProductAfterSale'
import Loading from '@components/Loading'
import { cloneDeep, get } from 'lodash'
import { updateProductAfterSale } from '../../../store/actions/productAfterSale_data'
import LoadMore from '@components/LoadMoreTwo'

export interface Props {
  updateProductAfterSale: (ProductAfterSale: Array<ProductAfterSale>) => void
}

interface State {
  loading: boolean
  afterSaleAll: any
  afterSaleDCL: any
  afterSaleYCL: any
  afterSaleYGB: any
  pageNum: number
  isLoading: boolean
  count: number
  hasMore: boolean // 是否还有更多
}
const tabs = [
  { title: '全部退款' },
  { title: '待处理' },
  { title: '已处理' },
  { title: '已关闭' }
]
const status = [
  { title: 'ALL' },
  { title: 'TQ' },
  { title: 'PD' },
  { title: 'BC' }
]
const NUM_ROWS = 5
class Supplier extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      afterSaleAll: [],
      afterSaleDCL: [],
      afterSaleYCL: [],
      afterSaleYGB: [],
      pageNum: 1,
      hasMore: true,
      isLoading: false,
      count: 0
    }
  }
  componentDidMount () {
    this.getData(null,0)
  }
  getData = (tab, index) => {
/*    this.props.changeTab(index)*/
    this.setState({
      loading: true
    })
    let url = 'CanteenProcurementManager/user/orderDetailController/selectAfterSale?'
    let query = 'pageNum=' + this.state.pageNum
    query += '&pageSize=' + NUM_ROWS
    query += '&start=' + status[index].title
    console.log(url + query)
    axios.get<MyResponse<ProductAfterSale>>(url + query)
      .then(data => {
        console.log('--- data =', data.data.data)
        if (data.data.code === 0) {
          if (this.state.pageNum === 1) {
            switch (index) {
              case 0:
                this.setState({
                  afterSaleAll: cloneDeep(data.data.data)
                })
                break
              case 1:
                this.setState({
                  afterSaleDCL: cloneDeep(data.data.data)
                })
                break
              case 2:
                this.setState({
                  afterSaleYCL: cloneDeep(data.data.data)
                })
                break
              case 3:
                this.setState({
                  afterSaleYGB: cloneDeep(data.data.data)
                })
                break
            }
          } else {
            switch (index) {
              case 0:
                this.setState({
                  afterSaleAll: this.state.afterSaleAll.concat(cloneDeep(data.data.data))
                })
                break
              case 1:
                this.setState({
                  afterSaleDCL: this.state.afterSaleDCL.concat(cloneDeep(data.data.data))
                })
                break
              case 2:
                this.setState({
                  afterSaleYCL: this.state.afterSaleYCL.concat(cloneDeep(data.data.data))
                })
                break
              case 3:
                this.setState({
                  afterSaleYGB: this.state.afterSaleYGB.concat(cloneDeep(data.data.data))
                })
                break
            }
          }
          this.setState({
            loading: false
          })
          this.props.updateProductAfterSale(cloneDeep(data.data.data))
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
      <div className={'bar'} style={{ color: '#858585' }}>
        <Tabs swipeable={false} tabs={tabs} onChange={(tab: any, index: number) => this.tabOnClick(tab,index,1)} animated={true} initialPage={0} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
        >
          {this.state.afterSaleAll.length !== 0 ? () => this.renderSwitch(this.state.afterSaleAll) : this.renderNone}
          {this.state.afterSaleDCL.length !== 0 ? () => this.renderSwitch(this.state.afterSaleDCL) : this.renderNone}
          {this.state.afterSaleYCL.length !== 0 ? () => this.renderSwitch(this.state.afterSaleYCL) : this.renderNone}
          {this.state.afterSaleYGB.length !== 0 ? () => this.renderSwitch(this.state.afterSaleYGB) : this.renderNone}
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
    }, () => this.getData(null,0))
  }
  public renderItem = (i, index) => {
    let font: any = null
    switch (i.status) {
      case '已处理':
        font = { borderRadius: 20,backgroundColor: '#cccccc',color: '#ffffff',width: 70, height: 25,textAlign: 'center' }
        break
      case '待处理':
        font = { borderRadius: 20,backgroundColor: '#ff9900',color: '#ffffff',width: 70, height: 25,textAlign: 'center' }
        break
      case '已关闭':
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
        <div className={'flex-space-between-row-center'} style={{ height: 40,padding: '5px' }}>
          <div className={'commonFont'} style={{ fontSize: 14, color: '#333' }}>退单号：{i.code}</div>
          <div className={'flex-center-row-center'} style={font}>{i.status}</div>
        </div>
        <div className={'Segment_line2'} />
        {this.renderItemDetail()}
        <div className={'flex-space-between-row-center'}
             style={{ padding: '10px 16px',borderTop: '1px solid #e5e5e5',borderBottom: '1px solid #e5e5e5' }}>
          <span className={'commonFont'} style={{ fontSize: 12, color: '#999' }}>订单号：SP057899444220</span>
          <div>
            <span className={'commonFont'} style={{ fontSize: 12, color: '#666' }}>退款金额</span>
            <span className={'commonFont'} style={{ fontSize: 14, color: '#000' }}>￥<span style={{ color: 'red' }}>45.00</span></span>
          </div>
        </div>
        {this.renderItemStatus(i,index)}
      </div>
    )
  }
  /**
   * 点击展开详细
   */
  public renderItemDetail = () => {
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
        <div className={'flex-space-between-column-flex-start'} style={{ position: 'absolute', left: 112, height: 70 }}>
          <div className={'commonFont'} style={{ fontSize: 14, color: '#000' }}>现摘新鲜野生荠菜 蔬菜 1.5kg</div>
          <div>
            <span className={'commonFont'} style={{ fontSize: 12, color: '#666' }}>实收金额：</span>
            <span className={'commonFont'} style={{ fontSize: 14, color: '#000' }}>￥<span style={{ color: 'red' }}>22.50</span></span>
          </div>
          <div>
            <span className={'commonFont'} style={{ fontSize: 12, color: '#999' }}>申请时间：2018-10-10 15:11:08</span>
          </div>
          <div className={'flex-flex-start-row-center'}>
            <span className={'commonFont'} style={{ fontSize: 12, color: '#333' }}>查看此退款单所有物品</span>
            <ReactSVG path='../../../../assets/images/Supplier/down.svg' svgStyle={{ width: 15, height: 15,paddingLeft: 3,paddingTop: 3 }}/>
          </div>
        </div>
      </div>
    )
  }
  /**
   * 退货退款分支：立即处理或者查看详情
   */
  public renderItemStatus = (i,index) => {
    let button: any = null
    let buttonTitle: any = null
    let title: any = null
    let onClick: any = null
    switch (i.status) {
      case '已处理':
        button = 'buttonViewDetail'
        buttonTitle = '查看详情'
        title = '仅退款，退款成功'
        onClick = this.viewResultOnclick
        break
      case '待处理':
        button = 'buttonProcessing'
        buttonTitle = '立即处理'
        title = '退货退款，待处理'
        onClick = this.viewDetailOnclick
        break
      case '已关闭':
        button = 'buttonViewDetail'
        buttonTitle = '查看详情'
        title = '退货失败'
        onClick = this.viewResultOnclick
        break
    }
    return(
      <div className={'flex-space-between-row-center'}
           style={{ height: 40,backgroundColor: '#fafafa', paddingLeft: 5, paddingRight: 5 }}>
        <div className={'flex-flex-start-row-center'}>
          <ReactSVG path='../../../../assets/images/Supplier/refund.svg' svgStyle={{ width: 30, height: 30 }}/>
          <span className={'commonFont'} style={{ fontSize: 14, color: '#666' }}>{title}</span>
        </div>
        <button className={button} onClick={onClick}>{buttonTitle}</button>
      </div>
    )
  }

  /**
   * 空
   */
  public renderNone = () => {
    if (!this.state.loading) return
    return(
      <div className={'flex-center-row-center'} style={{ height: '250px', backgroundColor: '#fff' }}>
        空空如也
      </div>
    )
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
        <Head title={'退款售后'} titleColor={'#ffffff'} showLeftIcon={true} backgroundColor={'#0084e7'} leftIconColor={'white'}/>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updateProductAfterSale
}

export default connect(mapStateToProps, mapDispatchToProps)(Supplier)

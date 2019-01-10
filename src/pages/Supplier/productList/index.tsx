import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Modal, Button, WhiteSpace,Toast, Tabs, Badge } from 'antd-mobile'
import axios from 'axios'
import ReactSVG from 'react-svg'
import { GlobalData } from '../../../store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import Head from '../../../components/Head/index'
import './master.css'
import { MyResponse } from '@datasources/MyResponse'
import { ProductList } from '@datasources/ProductList'
import Loading from '@components/Loading'
import Result from '@components/Result'
import { cloneDeep, isNil } from 'lodash'
import { updateProductList,updateProductListDetail,changeTab } from '@store/actions/supplierProductList_data'
import LoadMore from '@components/LoadMoreTwo'

export interface Props {
  updateProductList: (ProductList: Array<ProductList>) => void
  updateProductListDetail: (ProductListDetail: ProductList) => void
  changeTab: (index: number) => void
  tab: number
}

interface State {
  refresh: string
  supplierProductListCSZ: Array<ProductList>
  supplierProductListYSW: Array<ProductList>
  supplierProductListCKZ: Array<ProductList>
  supplierProductListYXJ: Array<ProductList>
  modal: boolean
  result: string
  pageNum: number
  isLoading: boolean
  count: number
  hasMore: Array<boolean> // 是否还有更多
}
const tabs = [
  { title: '出售中' },
  { title: '已售完' },
  { title: '仓库中' },
  { title: '已下架' }
]
const operation = ['上架','下架','']
const alert = Modal.alert
const NUM_ROWS = 5
class Supplier extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      supplierProductListCSZ: [],
      supplierProductListYSW: [],
      supplierProductListCKZ: [],
      supplierProductListYXJ: [],
      refresh: 'refresh',
      modal: false,
      result: '',
      pageNum: 1,
      hasMore: [true,true,true,true],
      isLoading: false,
      count: 0
    }
  }
  componentDidMount () {
    this.getData(null,this.props.tab)
  }
  getData = (tab, index) => {
    this.props.changeTab(index)
    let url = 'CanteenProcurementManager/user/ProductInfo/selectProductInfo?'
    let query = 'pageNum=' + this.state.pageNum
    query += '&pageSize=' + NUM_ROWS
    switch (index) {
      case 0:
        query += '&status=' + 0
        break
      case 1:
        url = 'CanteenProcurementManager/user/ProductInfo/selectProductInfoStock?'
        break
      case 2:
        query += '&status=' + 2
        break
      case 3:
        query += '&status=' + 1
        break
    }
    console.log(url + query)
    axios.get<any>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          if (this.state.pageNum === 1) {
            switch (index) {
              case 0:
                this.setState({
                  supplierProductListCSZ: cloneDeep(data.data.data)
                })
                break
              case 1:
                this.setState({
                  supplierProductListYSW: cloneDeep(data.data.data)
                })
                break
              case 2:
                this.setState({
                  supplierProductListCKZ: cloneDeep(data.data.data)
                })
                break
              case 3:
                this.setState({
                  supplierProductListYXJ: cloneDeep(data.data.data)
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
                  supplierProductListCSZ: this.state.supplierProductListCSZ.concat(cloneDeep(data.data.data))
                })
                break
              case 1:
                this.setState({
                  supplierProductListYSW: this.state.supplierProductListYSW.concat(cloneDeep(data.data.data))
                })
                break
              case 2:
                this.setState({
                  supplierProductListCKZ: this.state.supplierProductListCKZ.concat(cloneDeep(data.data.data))
                })
                break
              case 3:
                this.setState({
                  supplierProductListYXJ: this.state.supplierProductListYXJ.concat(cloneDeep(data.data.data))
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
          this.props.updateProductList(cloneDeep(data.data.data))
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
      this.getData(tab, index)
    })
  }

  /**
   * 内容
   */
  public renderContent = () => {
    return(
      <div className={'gBar'} style={{ color: '#858585',height: '100vh' }}>
        <Tabs swipeable={false} tabs={tabs} onChange={(tab: any, index: number) => this.tabOnClick(tab,index,1)} animated={true} initialPage={this.props.tab} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
        >
          {this.state.supplierProductListCSZ.length !== 0 ? this.renderSwitch(this.state.supplierProductListCSZ,'inSale',0) : this.renderNone}
          {this.state.supplierProductListYSW.length !== 0 ? this.renderSwitch(this.state.supplierProductListYSW,'soldOut',1) : this.renderNone}
          {this.state.supplierProductListCKZ.length !== 0 ? this.renderSwitch(this.state.supplierProductListCKZ,'inStore',2) : this.renderNone}
          {this.state.supplierProductListYXJ.length !== 0 ? this.renderSwitch(this.state.supplierProductListYXJ,'lowerShelf',3) : this.renderNone}
        </Tabs>
      </div>
    )
  }
  /**
   * 全部
   */
  public renderSwitch = (poi,type,id) => {
    let list = poi.map((i, index) => this.renderItem(i, index, type))
    let list2 = poi.map((i, index) => this.renderSoldItem(i, index, ''))
    return (
      <div id={id} className='touch_scroll scroll product-list'
           style={{ paddingTop: 20 }}>
        <LoadMore id={id} itemHeight={91} list={type === 'soldOut' ? list2 : list} listData={poi} getData={this.loadMore.bind(this,id)}
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
  /**
   * 已售完
   */
  public renderSoldOut = () => {
    return (
      <div style={{
        paddingTop: 20
      }}>
        {this.state.supplierProductListYSW.map((i, index) => (
          <div>
            {this.renderSoldItem(i, index, '')}
          </div>
        ))}
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
        <span>当前没有商品</span>
      </div>
    )
  }
  /**
   * 出售中，仓库中item
   */
  public renderItem = (i, index,type) => {
    return(
      <div style={{ backgroundColor: '#ffffff', width: '100%', float: 'right' }}>
        <div className={'Segment_line2'} />
        {this.renderItemDetail(i,index,type)}
        <div className={'flex-space-between-row-center'}
             style={{ padding: '5px 16px', borderTop: '1px solid #e5e5e5',borderBottom: '1px solid #e5e5e5' }}>
          <div className={'flex-center-row-center'} onClick={() => this.editOnclick(i)}>
            <ReactSVG path='../../../../assets/images/Supplier/edit.svg' svgStyle={{ width: 20, height: 20 }}/>
            <span style={{ paddingLeft: 5 }}>编辑</span>
          </div>
          <div className={'flex-center-row-center'}>
            <ReactSVG path='../../../../assets/images/Supplier/lowerShelf.svg' svgStyle={{ width: 20, height: 20 }}/>
            <span style={{ paddingLeft: 5 }} onClick={
              type === 'inSale' ? () => this.showAlert('商品管理','是否下架？',i,index,this.LowerOrUpOnclick,this.state.supplierProductListCSZ,1) :
                type === 'lowerShelf' ? () => this.showAlert('商品管理','是否上架？',i,index,this.LowerOrUpOnclick,this.state.supplierProductListYXJ,0) : () => this.showAlert('商品管理','是否上架？',i,index,this.LowerOrUpOnclick,this.state.supplierProductListCKZ,0)}>
                {type === 'inSale' ? '下架' : '上架'}
                </span>
          </div>
          <div className={'flex-center-row-center'}
               onClick={
                 type === 'inSale' ? () => this.showAlert('商品管理','是否删除？',i,index,this.delete,this.state.supplierProductListCSZ,0) :
                 type === 'lowerShelf' ? () => this.showAlert('商品管理','是否删除？',i,index,this.delete,this.state.supplierProductListYXJ,0) : () => this.showAlert('商品管理','是否删除？',i,index,this.delete,this.state.supplierProductListCKZ,0)}>
            <ReactSVG path='../../../../assets/images/Supplier/delete.svg' svgStyle={{ width: 20, height: 20 }}/>
            <span style={{ paddingLeft: 5 }}>删除</span>
          </div>
          <div className={'flex-center-row-center'}>
            <ReactSVG path='../../../../assets/images/Supplier/classify.svg' svgStyle={{ width: 20, height: 20 }}/>
            <span style={{ paddingLeft: 5 }}>分类</span>
          </div>
        </div>
        <div style={{ backgroundColor: '#f5f5f9' ,height: 20 }} />
      </div>
    )
  }
  /**
   * 出售中，仓库中详情
   */
  public renderItemDetail = (i,index,type) => {
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
          <div className={'commonFont'} style={{ fontSize: 14, color: '#000',height: 32,paddingRight: 10,whiteSpace: 'normal' }} >
            {i.product_name}
          </div>
          <div>
            <span className={'commonFont'} style={{ fontSize: 12, color: '#666' }} >售价：</span>
            <span className={'commonFont'} style={{ fontSize: 14, color: '#000' }} >￥<span style={{ color: 'red' }}>{i.product_price}</span></span>
          </div>
          <div>
            <span className={'commonFont'} style={{ fontSize: 12, color: '#999' }} >库存：{i.product_stock}kg
              {type === 'inSale' ? <span>&nbsp;&nbsp;&nbsp;&nbsp;销量：{i.product_volume}kg</span> : ''}</span>
          </div>
        </div>
      </div>
    )
  }
  /**
   * 已售完
   */
  public renderSoldItem = (i, index,type) => {
    return(
      <div style={{ backgroundColor: '#ffffff', width: '100%', float: 'right' }}>
        <div className={'Segment_line2'} />
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
            <div className={'commonFont'} style={{ fontSize: 14, color: '#000',height: 32,paddingRight: 10,whiteSpace: 'normal' }} >
              {i.product_name}
            </div>
            <span className={'commonFont'} style={{ fontSize: 14, color: '#000' }} >￥<span style={{ color: 'red' }}>{i.product_price * i.product_volume}</span></span>
            <div className={'flex-space-between-row-center'} style={{ width: '100%' }}>
              <span className={'commonFont'} style={{ fontSize: 12, color: '#999' }} >
                总量：{i.product_volume}kg&nbsp;&nbsp;&nbsp;&nbsp;单价：{i.product_price}元/kg
              </span>
              <ReactSVG path='../../../../assets/images/Supplier/right.svg' svgStyle={{ width: 15, height: 15 }}/>
            </div>
          </div>
        </div>
        <div className={'Segment_line2'} />
        <div style={{ backgroundColor: '#f5f5f9' ,height: 20 }} />
      </div>
    )
  }
  public func = (i,index,type) => {
    switch (type) {
      case 'inSale': this.LowerOrUpOnclick(i.product_id,index,this.state.supplierProductListCSZ,2)
        break
      case 'lowerShelf': this.LowerOrUpOnclick(i.product_id,index,this.state.supplierProductListYXJ,1)
        break
      case 'inStore': this.LowerOrUpOnclick(i.product_id,index,this.state.supplierProductListCKZ,1)
        break
    }
  }
  public showAlert = (title,msg,i,index,func,data,type) => {
    const alertInstance = alert(title, msg, [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确认', onPress: () => func(i.product_id,index,data,type) }
    ])
    setTimeout(() => {
      // 可以调用close方法以在外部close
      console.log('auto close')
      alertInstance.close()
    }, 500000)
  }
  public delete = (id,index,poi,obj) => {
    let url = 'CanteenProcurementManager/user/ProductInfo/deleteProductCommodity?'
    let query = 'productId=' + id
    console.log(url + query)
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          poi.splice(index,1)
          this.setState({
            result: '删除成功',
            modal: true
          })
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }
  public searchOnClick = () => {
    console.log(1)
  }
  public editOnclick = (i) => {
    this.props.updateProductListDetail(i)
    history().push('/sProductListEdit')
  }
  public LowerOrUpOnclick = (id,index,poi,status) => {
    console.log(id,index,poi)
    let url = 'CanteenProcurementManager/user/ProductInfo/updateProductState?'
    let query = 'productId=' + id + '&productStatus=' + status
    console.log(url + query)
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          poi.splice(index,1)
          this.setState({
            refresh: 'refresh'
          })
          this.setState({
            result: operation[status] + '成功',
            modal: true
          })
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
        overflow: 'hidden',
        height: '100%'
      }}>
        <Head titleColor={'#ffffff'} showLeftIcon={true} backgroundColor={'#0084e7'}
              title={'商品管理'} rightIconOnClick={this.searchOnClick.bind(this)}
              showRightIcon={true} leftIconColor={'white'}/>
        {this.renderContent()}
        <Result modal={this.state.modal} result={this.state.result} onClose={() => this.setState({ modal: false })}/>
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
  updateProductList,
  changeTab,
  updateProductListDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(Supplier)

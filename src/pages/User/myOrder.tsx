import * as React from 'react'
import { Tabs, Button, Icon, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { updateProductOrder } from '@store/actions/productOrder_data'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import './master.css'
import Head from '@components/Head'
import Loading from '@components/Loading'
import axios from 'axios'
import { MyResponse } from '@datasources/MyResponse'
import { ProductOrder } from '@datasources/ProductOrder'
import { cloneDeep, get } from 'lodash'

export interface Props {
  updateProductOrder: (productOrder: Array<ProductOrder>) => void
}

interface State {
  data: any
  getEmpty: boolean
  loading: boolean
  productOrder: Array<ProductOrder>
}

class User extends React.Component<Props, State> {
  private timer: NodeJS.Timeout
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      getEmpty: true,
      data: [
        { code: 'SP5685698754382', status: '待付款', business: '衢州炒菜软件有限公司',Commodity: '有机红洋葱',price: '15.5',weight: '1000',total: '55.2' },
        { code: 'SP4556856987543', status: '待发货', business: '衢州炒菜软件有限公司',Commodity: '有机红洋葱',price: '15.5',weight: '1000',total: '55.2' },
        { code: 'SP2899898754356', status: '待收货', business: '衢州炒菜软件有限公司',Commodity: '有机红洋葱',price: '15.5',weight: '1000',total: '55.2' }
      ],
      productOrder: []
    }
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }
  /**
   * 内容
   */
  public renderContent = () => {
    const tabs = [
      { index: null,title: '全部' },
      { index: 0,title: '待付款' },
      { index: 1,title: '待配送' },
      { index: 2,title: '待收货' },
      { index: 3,title: '待评价' },
      { index: 4,title: '已完成' }
    ]
    return(
      <div className={'moBar'} style={{ color: '#858585' }}>
        <Tabs tabs={tabs} animated={true} initialPage={0} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={tabs.length} />}
        >
          {tabs.map((i,index) => (
            <div>
              {this.state.getEmpty ? () => this.renderSwitch(i.index) : this.renderNone}
            </div>
          ))}
        </Tabs>
      </div>
    )
  }
  /**
   * 全部
   */
  public renderSwitch = (index) => {
    let url = '/user/productOrder/findProductOrder?'
    let query = 'payStatus=' + index
    axios.get<MyResponse<ProductOrder>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          this.props.updateProductOrder(cloneDeep(data.data.data))
          this.setState({
            loading: false
          })
        } else {
          Toast.info('获取订单信息失败,请重试', 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
    if (this.state.loading) {
      return (
        <Loading/>
      )
    }
    return(
      <div style={{
        paddingTop: 20
      }}>
        {this.state.productOrder.map((i, index) => (
          <div>
            {this.renderItem(i, index)}
          </div>
        ))}
      </div>
    )
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
        <div className={'flex-space-between-row-center'} style={{ height: 40,padding: 5 }}>
          <div className={'commonFont'} style={{ fontSize: 12, color: '#999' }}>订单号：{i.code}</div>
          <div className={'flex-center-row-center'} style={{  borderRadius: 20,backgroundColor: '#ff9900',color: '#ffffff',width: 70, height: 25,textAlign: 'center' }}>{i.status}</div>
        </div>
        <div className={'Segment_line2'} />
        {this.renderItemDetail()}
        {this.renderItemDetail()}
        <div className={'flex-flex-end-row-center'}
             style={{  height: 40,padding: 5,borderTop: '1px solid #e5e5e5' ,borderBottom: '1px solid #e5e5e5' }}>
          <div>
            <span className={'commonFont'} style={{ fontSize: 12, color: '#666' }}>共4件商品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合计</span>
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
        <div className={'flex-space-between-column-flex-start'} style={{ width: window.innerWidth - 116,position: 'absolute', left: 100, height: 70 }}>
          <div className={'flex-space-between-row-flex-start'} style={{ width: '100%' }}>
            <div className={'commonFont'} style={{ fontSize: 14, color: '#000',width: '70%',whiteSpace: 'normal' }}>现摘新鲜野生荠菜 蔬菜 1.5kg现</div>
            <div className={'flex-space-between-column-flex-end'} style={{ width: '20%' }}>
              <span className={'commonFont'} style={{ fontSize: 14, color: '#000' }}>￥<span style={{ color: 'red' }}>22.50</span></span>
              <span className={'commonFont'} style={{ fontSize: 12, color: '#999' }}>x2</span>
            </div>
          </div>
          <div>
            <span className={'commonFont'} style={{ fontSize: 12, color: '#999' }}>下单时间：2018-10-10 15:11:08</span>
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
    switch (i.status) {
      case '待付款':
        showDeal = true
        break
      case '待发货':
        showDeal = false
        break
      case '待收货':
        showDeal = false
        break
      case '待评价':
        showDeal = false
        break
    }
    return(
      <div className={'flex-flex-end-row-center'}
           style={{ height: 40,backgroundColor: '#fafafa',padding: '0 5px' }}>
        <button className={'buttonViewDetail'} onClick={this.viewResultOnclick}>查看详情</button>
        {showDeal === true ? <button className={'buttonDelivery'} style={{ marginLeft: 10 }} onClick={this.viewDetailOnclick}>立即付款</button> : ''}
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
  updateProductOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

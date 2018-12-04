import * as React from 'react'
import { Tabs,Button, Icon } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '../../../store/reducers/globalDataReducer'
import { addPageIndex, deletePageIndex } from '../../../store/actions/global_data'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import '../master.css'
import Head from '@components/Head'

export interface Props {
}

interface State {
  data: any
  getEmpty: boolean
  loading: boolean
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      getEmpty: true,
      loading: true,
      data: [
        { code: 'TQ12856987543', status: '已处理', business: '衢州炒菜软件有限公司',Commodity: '有机红洋葱',price: '15.5',weight: '1000',total: '55.2' },
        { code: 'TQ12856987543', status: '待处理', business: '衢州炒菜软件有限公司',Commodity: '有机红洋葱',price: '15.5',weight: '1000',total: '55.2' },
        { code: 'TQ12856987543', status: '已关闭', business: '衢州炒菜软件有限公司',Commodity: '有机红洋葱',price: '15.5',weight: '1000',total: '55.2' }
      ]
    }
  }
  /**
   * 内容
   */
  public renderContent = () => {
    const tabs = [
      { title: '全部退款' },
      { title: '待处理' },
      { title: '已处理' },
      { title: '已关闭' }
    ]
    return(
      <div className={'bar'} style={{ color: '#858585' }}>
        <Tabs tabs={tabs} animated={true} initialPage={2} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
        >
          {this.state.getEmpty ? this.renderAll : this.renderNone}
          {this.state.getEmpty ? this.renderObligation : this.renderNone}
          {this.state.getEmpty ? this.renderDispatching : this.renderNone}
          {this.state.getEmpty ? this.renderReceived : this.renderNone}
        </Tabs>
      </div>
    )
  }
  /**
   * 全部
   */
  public renderAll = () => {
    if (this.state.loading) return
    return(
      <div style={{
        paddingTop: 20
      }}>
        {this.state.data.map((i, index) => (
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
   * 待付款
   */
  public renderObligation = () => {
    if (this.state.loading) return
    return(
      <div style={{
        paddingTop: 20
      }}>
        {this.state.data.map((i, index) => (
          <div>
            {this.renderItem(i, index)}
          </div>
        ))}
      </div>
    )
  }
  /**
   * 待配送
   */
  public renderDispatching = () => {
    if (this.state.loading) return
    return(
      <div style={{
        paddingTop: 20
      }}>
        {this.state.data.map((i, index) => (
          <div>
            {this.renderItem(i, index)}
          </div>
        ))}
      </div>
    )
  }
  /**
   * 待收货
   */
  public renderReceived = () => {
    if (this.state.loading) return
    return(
      <div style={{
        paddingTop: 20
      }}>
        {this.state.data.map((i, index) => (
          <div>
            {this.renderItem(i, index)}
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
  public componentDidMount () {
    setInterval(
      () => this.setState({
        loading: false
      }),
      300
    )
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
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

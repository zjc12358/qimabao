import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, Tabs, Badge } from 'antd-mobile'
import axios from 'axios'
import ReactSVG from 'react-svg'
import { GlobalData } from '../../../store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import Head from '../../../components/Head/index'
import './master.css'

export interface Props {

}

interface State {
  data: any
  getEmpty: boolean
}

class Supplier extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      getEmpty: true,
      data: [
        { code: 'SP057899444220', Commodity: '茴香根 根茎 蔬菜 新鲜 500克',stock: '585.6',value: '900' },
        { code: 'SP057899444221', Commodity: '新鲜百合 食用鲜百合蔬菜 1000g',stock: '45.5',value: '220' },
        { code: 'SP057899444220', Commodity: '茴香根 根茎 蔬菜 新鲜 500克',stock: '585.6',value: '900' },
        { code: 'SP057899444221', Commodity: '新鲜百合 食用鲜百合蔬菜 1000g',stock: '45.5',value: '220' },
        { code: 'SP057899444220', Commodity: '茴香根 根茎 蔬菜 新鲜 500克',stock: '585.6',value: '900' },
        { code: 'SP057899444221', Commodity: '新鲜百合 食用鲜百合蔬菜 1000g',stock: '45.5',value: '220' }
      ]
    }
  }
  /**
   * 内容
   */
  public renderContent = () => {
    const tabs = [
      { title: '出售中' },
      { title: '已售完' },
      { title: '仓库中' }
    ]
    return(
      <div className={'gBar'} style={{ color: '#858585',paddingTop: 40 }}>
        <Tabs tabs={tabs} animated={true} initialPage={2} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
        >
          {this.state.getEmpty ? this.renderInSale : this.renderNone}
          {this.state.getEmpty ? this.renderSoldOut : this.renderNone}
          {this.state.getEmpty ? this.renderInStore : this.renderNone}
        </Tabs>
      </div>
    )
  }
  /**
   * 全部
   */
  public renderInSale = () => {
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
    return(
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        float: 'right'
      }}>
        <div className={'Segment_line2'} />
        {this.renderItemDetail(i,index)}
        <div className={'footProductWrap'}>
          <div className={'flex-center-row-center'}>
            <ReactSVG path='../../../../assets/images/Supplier/edit.svg' svgStyle={{ width: 20, height: 20 }}/>
            <span style={{ paddingLeft: 5 }}>编辑</span>
          </div>
          <div className={'flex-center-row-center'}>
            <ReactSVG path='../../../../assets/images/Supplier/lowerShelf.svg' svgStyle={{ width: 20, height: 20 }}/>
            <span style={{ paddingLeft: 5 }}>下架</span>
          </div>
          <div className={'flex-center-row-center'}>
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
   * 点击展开详细
   */
  public renderItemDetail = (i,index) => {
    return(
      <div style={{
        padding: 16,
        height: 100,
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          zIndex: 98
        }}>
          <div style={{ width: 70, height: 70 }}><img style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%'
          }} src='../../../../assets/images/SupplierTest/vegetable.png' /></div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          position: 'absolute',
          left: 112,
          alignItems: 'flex-start',
          height: 70
        }}>
          <div className={'refundNumber'} style={{ height: 32,paddingRight: 10 }}>现摘新鲜野生荠菜 蔬菜 1.5kg 现摘新鲜野生荠菜 蔬菜 1.5kg现摘新鲜野生</div>
          <div>
            <span className={'refund'}>售价：</span>
            <span className={'refundNumber'}>￥<span style={{ color: 'red' }}>22.50</span></span>
          </div>
          <div>
            <span className={'orderNumber'}>库存：{i.stock}kg&nbsp;&nbsp;&nbsp;&nbsp;销量：{i.value}kg</span>
          </div>
        </div>
      </div>
    )
  }
  /**
   * 已售完
   */
  public renderSoldOut = () => {
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
   * 仓库中
   */
  public renderInStore = () => {
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
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

  public searchOnClick = () => {
    console.log(1)
  }

  public render () {
    return (
      <div style={{
        width: '100%',
        height: '100vh'
      }}>
        <Head titleColor={'#ffffff'} showLeftIcon={true} backgroundColor={'#0084e7'}
              title={'商品管理'} rightIconOnClick={this.searchOnClick.bind(this)}
              showRightIcon={true} leftIconColor={'white'}/>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Supplier)

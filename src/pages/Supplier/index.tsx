import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Icon, Toast } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import './font.css'
import './flex.css'
import './master.css'
import { changeMode } from '@store/actions/global_data'

export interface Props {
  changeMode: (model: 'supplier' | 'purchaser') => void
}

interface State {
  data: any
}

let IconMaxSize: number = 30
let MenuMaxSize: number = 24
let MenuBgMaxSize: number = 40

class Supplier extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: { payment: '1', delivery: '17', collect: '143', evaluate: '5', refund: '0' }
    }
  }

  /**
   * 标题
   */
  public renderNav = () => {
    return (
      <div className={'navWrap'}>
        <div style={{ width: '20%' }}>图标</div>
        <div style={{ width: '50%', textAlign: 'center' }}>
          <span className={'navFontStyle'}>食堂采购商家平台</span>
        </div>
        <div className={'navRightFontStyle'} style={{ width: '20%' }}
             onClick={() => this.props.changeMode('purchaser')}>切换到买家版
        </div>
      </div>
    )
  }
  /**
   * 内容
   */
  public renderContent = () => {
    return (
      <div style={{
        height: '100vh'
      }}>
        {this.renderHead()}
        {this.renderBody()}
      </div>
    )
  }
  /**
   * 内容头部
   */
  public renderHead = () => {
    return (
      <div className={'headWrap'}>
        <div style={{
          height: 180,
          backgroundColor: '#0084E7',
          position: 'relative'
        }}>
          <div className={'headDataWrap'}>
            <div className={'flex-space-around-column-center-height50'}>
              <span className={'headNumberStyle'}>{this.state.data.payment}</span>
              <label className={'headFontStyle'}>待付款</label>
            </div>
            <div className={'flex-space-around-column-center-height50'}>
              <span className={'headNumberStyle'}>{this.state.data.delivery}</span>
              <label className={'headFontStyle'}>待收货</label>
            </div>
            <div className={'flex-space-around-column-center-height50'}>
              <span className={'headNumberStyle'}>{this.state.data.collect}</span>
              <label className={'headFontStyle'}>待发货</label>
            </div>
            <div className={'flex-space-around-column-center-height50'}>
              <span className={'headNumberStyle'}>{this.state.data.evaluate}</span>
              <label className={'headFontStyle'}>待评价</label>
            </div>
            <div className={'flex-space-around-column-center-height50'}>
              <span className={'headNumberStyle'}>{this.state.data.refund}</span>
              <label className={'headFontStyle'}>退款/售后</label>
            </div>
          </div>
        </div>
        <div className={'headMenuWrap'}>
          <div className={'headMenuInnerWrap'}>
            <div className={'flex-space-between-column-center'}>
              <ReactSVG path='./assets/images/Supplier/shop.svg' svgStyle={{ width: IconMaxSize, height: IconMaxSize }}/>
              <span style={{ fontSize: '16px',color: '#616670' }}>店铺</span>
            </div>
            <div className={'flex-space-between-column-center'}>
              <ReactSVG path='./assets/images/Supplier/commodity.svg' svgStyle={{ width: IconMaxSize, height: IconMaxSize }}/>
              <span style={{ fontSize: '16px',color: '#616670' }}>商品</span>
            </div>
            <div className={'flex-space-between-column-center'}>
              <ReactSVG path='./assets/images/Supplier/release.svg' svgStyle={{ width: IconMaxSize, height: IconMaxSize }}/>
              <span style={{ fontSize: '16px',color: '#616670' }}>发布</span>
            </div>
            <div className={'flex-space-between-column-center'}>
              <ReactSVG path='./assets/images/Supplier/order.svg' svgStyle={{ width: IconMaxSize, height: IconMaxSize }}/>
              <span style={{ fontSize: '16px',color: '#616670' }}>订单</span>
            </div>
            <div className={'flex-space-between-column-center'}>
              <ReactSVG path='./assets/images/Supplier/draw_cash.svg' svgStyle={{ width: IconMaxSize, height: IconMaxSize }}/>
              <span style={{ fontSize: '16px',color: '#616670' }}>提现</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  /**
   * 内容
   */
  public renderBody = () => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 60,
        width: '100%'
      }}>
        <div style={{
          borderRadius: 10,
          width: '90%',
          height: 250,
          backgroundColor: '#ffffff'
        }}>
          {this.renderHighChart()}
        </div>
        <div style={{
          marginTop: 10,
          borderRadius: 10,
          width: '90%',
          height: 120,
          backgroundColor: '#ffffff'
        }}>
          {this.renderData()}
        </div>
        <div style={{
          marginTop: 10,
          borderRadius: 10,
          width: '90%',
          height: 170,
          backgroundColor: '#ffffff',
          marginBottom: 20
        }}>
          {this.renderUtils()}
        </div>
      </div>
    )
  }
  /**
   * 图表
   */
  public renderHighChart = () => {
    return(
      <div className={'bodyTitleStyle'}>数据分析</div>
    )
  }
  /**
   * 店铺数据
   */
  public renderData = () => {
    return(
      <div className={'dataWrap'}>
        <div className={'bodyTitleStyle'}>店铺数据</div>
        <div className={'Segment_line'}/>
        <div className={'flex-space-between-row-center-height40'}>
          <div className={'flex-space-between-column-center-height35'}>
            <span className={'dataNumberStyle'}>3</span>
            <span className={'dataFontStyle'}>出售中</span>
          </div>
          <div className={'flex-space-between-column-center-height35'}>
            <span className={'dataNumberStyle'}>10</span>
            <span className={'dataFontStyle'}>已售完</span>
          </div>
          <div className={'flex-space-between-column-center-height35'}>
            <span className={'dataNumberStyle'}>5</span>
            <span className={'dataFontStyle'}>仓库中</span>
          </div>
          <div className={'flex-space-between-column-center-height35'}>
            <span className={'dataNumberStyle'}>0</span>
            <span className={'dataFontStyle'}>已下架</span>
          </div>
        </div>
      </div>
    )
  }
  /**
   * 工具
   */
  public renderUtils = () => {
    return(
      <div className={'UtilsWrap'}>
        <div className={'UtilsContentTop'}>
          <div className={'flex-space-between-column-center-height60'}>
            <div className={'flex-Menu'} style={{ backgroundColor: '#3333cc' }}>
              <img src='./assets/images/SupplierTest/commodityManagement.png' width={MenuMaxSize} height={MenuMaxSize}/>
            </div>
            <div className={'footMenuStyle'}>商品管理</div>
          </div>
          <div className={'flex-space-between-column-center-height60'}>
            <div className={'flex-Menu'} style={{ backgroundColor: '#6633ff' }}>
              <img src='./assets/images/SupplierTest/classification.png' width={MenuMaxSize} height={MenuMaxSize}/>
            </div>
            <div className={'footMenuStyle'}>分类设置</div>
          </div>
          <div className={'flex-space-between-column-center-height60'}>
            <div className={'flex-Menu'} style={{ backgroundColor: '#009966' }}>
              <img src='./assets/images/SupplierTest/distribution.png' width={MenuMaxSize} height={MenuMaxSize}/>
            </div>
            <div className={'footMenuStyle'}>配送设置</div>
          </div>
          <div className={'flex-space-between-column-center-height60'}>
            <div className={'flex-Menu'} style={{ backgroundColor: '#0066ff' }}>
              <img src='./assets/images/SupplierTest/testing.png' width={MenuMaxSize} height={MenuMaxSize}/>
            </div>
            <div className={'footMenuStyle'}>检测申请</div>
          </div>
        </div>
        <div className={'UtilsContentBottom'}>
          <div className={'flex-space-between-column-center-height60'}>
            <div className={'flex-Menu'} style={{ backgroundColor: '#3399cc' }}>
              <img src='./assets/images/SupplierTest/release.png' width={MenuMaxSize} height={MenuMaxSize}/>
            </div>
            <div className={'footMenuStyle'}>商品发布</div>
          </div>
          <div className={'flex-space-between-column-center-height60'}>
            <div className={'flex-Menu'} style={{ backgroundColor: '#ff6600' }}>
              <img src='./assets/images/SupplierTest/evaluate.png' width={MenuMaxSize} height={MenuMaxSize}/>
            </div>
            <div className={'footMenuStyle'}>评价管理</div>
          </div>
          <div className={'flex-space-between-column-center-height60'}>
            <div className={'flex-Menu'} style={{ backgroundColor: '#0099ff' }}>
              <img src='./assets/images/SupplierTest/afterSale.png' width={MenuMaxSize} height={MenuMaxSize}/>
            </div>
            <div className={'footMenuStyle'}>退款售后</div>
          </div>
          <div className={'flex-space-between-column-center-height60'}>
            <div className={'flex-Menu'} style={{ backgroundColor: '#ff9900' }}>
              <img src='./assets/images/SupplierTest/putfoward.png' width={MenuMaxSize} height={MenuMaxSize}/>
            </div>
            <div className={'footMenuStyle'}>提现申请</div>
          </div>
        </div>
      </div>
    )
  }

  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        {this.renderNav()}
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  changeMode
}

export default connect(mapStateToProps, mapDispatchToProps)(Supplier)

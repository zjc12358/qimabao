import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Icon, Toast } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import './font.css'

export interface Props {

}

interface State {
  data: any
}
let IconMaxSize: number = 30
class Supplier extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: { payment: '1',delivery: '17',collect: '143',evaluate: '5',refund: '0' }
    }
  }
  /**
   * 标题
   */
  public renderNav = () => {
    return (
      <div style={{
        position: 'fixed',
        top: '0',
        width: '100%',
        height: '40px',
        background: '#0084E7',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 100
      }}
      >
        <div style={{ width: '20%' }}>图标</div>
        <div style={{ width: '50%',textAlign: 'center' }}>
          <span className={'navFontStyle'}>食堂采购商家平台</span>
        </div>
        <div className={'navRightFontStyle'} style={{  width: '20%' }}>切换到买家版</div>
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
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        position: 'relative'
      }}>
        <div style={{
          height: 180,
          backgroundColor: '#0084E7',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 60,
            paddingLeft: '9%',
            paddingRight: '9%',
            width: '82%'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'column',
              alignItems: 'center',
              height: 50
            }}>
              <span className={'headNumberStyle'}>{this.state.data.payment}</span>
              <label className={'headFontStyle'}>待付款</label>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'column',
              alignItems: 'center',
              height: 50
            }}>
              <span className={'headNumberStyle'}>{this.state.data.delivery}</span>
              <label className={'headFontStyle'}>待收货</label>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'column',
              alignItems: 'center',
              height: 50
            }}>
              <span className={'headNumberStyle'}>{this.state.data.collect}</span>
              <label className={'headFontStyle'}>待发货</label>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'column',
              alignItems: 'center',
              height: 50
            }}>
              <span className={'headNumberStyle'}>{this.state.data.evaluate}</span>
              <label className={'headFontStyle'}>待评价</label>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'column',
              alignItems: 'center',
              height: 50
            }}>
              <span className={'headNumberStyle'}>{this.state.data.refund}</span>
              <label className={'headFontStyle'}>退款/售后</label>
            </div>
          </div>
        </div>
        <div style={{
          height: 100,
          width: '90%',
          backgroundColor: '#ffffff',
          borderRadius: 10,
          left: '5%',
          top: 130,
          position: 'absolute',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            alignItems: 'center',
            height: 90,
            padding: 15
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <ReactSVG path='./assets/images/Supplier/shop.svg' svgStyle={{ width: IconMaxSize, height: IconMaxSize }}/>
              <span style={{ fontSize: '16px',color: '#616670' }}>店铺</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <ReactSVG path='./assets/images/Supplier/commodity.svg' svgStyle={{ width: IconMaxSize, height: IconMaxSize }}/>
              <span style={{ fontSize: '16px',color: '#616670' }}>商品</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <ReactSVG path='./assets/images/Supplier/release.svg' svgStyle={{ width: IconMaxSize, height: IconMaxSize }}/>
              <span style={{ fontSize: '16px',color: '#616670' }}>发布</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <ReactSVG path='./assets/images/Supplier/order.svg' svgStyle={{ width: IconMaxSize, height: IconMaxSize }}/>
              <span style={{ fontSize: '16px',color: '#616670' }}>订单</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
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
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 60,
        height: 550,
        width: '100%'
      }}>
        <div style={{
          padding: 10,
          borderRadius: 10,
          width: '85%',
          height: 250,
          backgroundColor: '#ffffff'
        }}>
          {this.renderHighChart()}
        </div>
        <div style={{
          padding: 10,
          borderRadius: 10,
          width: '85%',
          height: 100,
          backgroundColor: '#ffffff'
        }}>
          {this.renderData()}
        </div>
        <div style={{
          padding: 10,
          borderRadius: 10,
          width: '85%',
          height: 100,
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
      <div>图表</div>
    )
  }
  /**
   * 店铺数据
   */
  public renderData = () => {
    return(
      <div>店铺数据</div>
    )
  }
  /**
   * 工具
   */
  public renderUtils = () => {
    return(
      <div>工具</div>
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

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Supplier)

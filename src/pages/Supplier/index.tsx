import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Icon, Toast } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import './master.css'
import { changeMode } from '@store/actions/global_data'
import eCharts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/tooltip'

export interface Props {
  changeMode: (model: 'supplier' | 'purchaser') => void
}

interface State {
  data: any
  dataShop: any
}

let IconMaxSize: number = 30
let MenuMaxSize: number = 24
const dataViewTitle: any = ['待付款','待收货','待发货','待评价','退款/售后']
const dataShopTitle: any = ['出售中','已售完','仓库中','已下架']
class Supplier extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: [1,17,143,5,0],
      dataShop: [3,10,5,0]
    }
  }
  componentDidMount () {
    // 基于准备好的dom，初始化echarts实例
    let myChart = eCharts.init(document.getElementById('main'))
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        x: 30,
        y: 10,
        x2: 15,
        y2: 25
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日'],
        axisLabel: {
          show: true,
          textStyle: {
            color: '#999'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        }
      },
      yAxis: {
        type: 'value',
        splitNumber: 4,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#999'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      },
      series: [
        {
          name: '总营业额',
          type: 'line',
          itemStyle : {
            normal : {
              color: '#c36045',
              lineStyle: {
                color: '#c36045'
              }
            }
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '订单收入',
          type: 'line',
          itemStyle : {
            normal : {
              color: '#0084e7',
              lineStyle: {
                color: '#0084e7'
              }
            }
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        }
      ]
    })
  }
  /**
   * 标题
   */
  public renderNav = () => {
    return (
      <div className={'navWrap'}>
        <div style={{ width: '20%' }}>图标</div>
        <div style={{ width: '50%', textAlign: 'center' }}>
          <span className={'commonFont'} style={{ fontSize: 18, color: '#fff' }}>食堂采购商家平台</span>
        </div>
        <div className={'commonFont'} style={{ fontSize: 11, color: '#E4EAEA',width: '23%' }}
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
      <div className={'flex-space-between-column-stretch'} >
        <div style={{ height: 180, backgroundColor: '#0084E7', position: 'relative' }}>
          <div className={'flex-space-around-row-center'} style={{ padding: '60px 9% 0',width: '82%' }}>
            {this.state.data.map((i, index) => (
              <div className={'flex-space-around-column-center'} style={{ height: 50 }} onClick={() => this.orderOnclick(dataViewTitle[index])}>
                <span className={'commonFont'} style={{ fontSize: 20, color: '#fff' }}>{this.state.data[index]}</span>
                <label className={'commonFont'} style={{ fontSize: 12, color: '#fff' }}>{dataViewTitle[index]}</label>
              </div>
            ))}
          </div>
        </div>
        <div className={'headMenuWrap'}>
          <div className={'flex-space-around-row-center'} style={{ height: 90,padding: 15 }}>
            <div className={'flex-space-between-column-center'}
                 onClick={() => history().push('shop')}>
              <ReactSVG path='./assets/images/Supplier/shop.svg'
                        svgStyle={{ width: IconMaxSize, height: IconMaxSize }}/>
              <span style={{ fontSize: '16px', color: '#616670' }}>店铺</span>
            </div>
            <div className={'flex-space-between-column-center' }
                 onClick={() => history().push('sProductList')}>
              <ReactSVG path='./assets/images/Supplier/commodity.svg'
                        svgStyle={{ width: IconMaxSize, height: IconMaxSize }}/>
              <span style={{ fontSize: '16px', color: '#616670' }}>商品</span>
            </div>
            <div className={'flex-space-between-column-center'}
                 onClick={() => history().push('release')}>
              <ReactSVG path='./assets/images/Supplier/release.svg'
                        svgStyle={{ width: IconMaxSize, height: IconMaxSize }}/>
              <span style={{ fontSize: '16px', color: '#616670' }}>发布</span>
            </div>
            <div className={'flex-space-between-column-center'}
                 onClick={() => history().push('supplierOrder')}>
              <ReactSVG path='./assets/images/Supplier/order.svg'
                        svgStyle={{ width: IconMaxSize, height: IconMaxSize }}/>
              <span style={{ fontSize: '16px', color: '#616670' }}>订单</span>
            </div>
            <div className={'flex-space-between-column-center'}
                 onClick={() => history().push('withdrawal')}>
              <ReactSVG path='./assets/images/Supplier/draw_cash.svg'
                        svgStyle={{ width: IconMaxSize, height: IconMaxSize }}/>
              <span style={{ fontSize: '16px', color: '#616670' }}>提现</span>
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
      <div className={'flex-flex-start-column-center'} style={{ paddingTop: 60, width: '100%' }}>
        <div style={{
          borderRadius: 10,
          width: '90%',
          height: 'auto',
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
    return (
      <div className={'flex-center-column-center'} style={{ paddingBottom: 10 }}>
        <div className={'flex-space-between-row-center'} style={{ width: '90%',paddingTop: 10,paddingBottom: 10 }}>
          <span className={'commonBoldFont'} style={{ fontSize: 16,color: '#000' }}>数据分析</span>
          <div style={{ width: 7, height: 7, backgroundColor: '#0084e7',borderRadius: '50%' }} />
          <span className={'commonSFont'} style={{ fontSize: 10,color: '#999' }}>订单收入</span>
          <div style={{ width: 7, height: 7, backgroundColor: '#c36045',borderRadius: '50%' }} />
          <span className={'commonSFont'} style={{ fontSize: 10,color: '#999' }}>总营业额</span>
          <span className={'commonSFont'} style={{ fontSize: 10,color: '#999' }}>单位：元</span>
          <select style={{ width: 50,backgroundColor: '#fff',textAlign: 'center' }}>
            <option value='1天'>1天</option>
            <option value='近7天'>近7天</option>
            <option value='近30天'>近30天</option>
            <option value='周'>周</option>
            <option value='月'>月</option>
          </select>
        </div>
        <div className={'chartWrap'}>
          <div className={'flex-space-around-row-center'} >
            <div className={'flex-center-column-center'}>
              <span className={'commonNumber'} style={{ fontSize: 24,color: '#0084e7' }}>6992.5</span>
              <span className={'commonFont'} style={{ fontSize: 12,color: '#0084e7' }}>今日订单收入</span>
            </div>
            <div className={'flex-center-column-center'}>
              <span className={'commonNumber'} style={{ fontSize: 24,color: '#c36045' }}>9592.5</span>
              <span className={'commonFont'} style={{ fontSize: 12,color: '#c36045' }}>总营业额</span>
            </div>
          </div>
          <div id='main' style={{ width: '100%', height: 200 }} />
        </div>
      </div>
    )
  }
  /**
   * 店铺数据
   */
  public renderData = () => {
    return (
      <div className={'flex-space-around-column-stretch'} style={{ height: 100,padding: '10px 15px' }}>
        <div className={'commonBoldFont'} style={{ fontSize: 16,color: '#000' }}>店铺数据</div>
        <div className={'Segment_line'}/>
        <div className={'flex-space-between-row-center'} style={{ height: 40 }}>
          {this.state.dataShop.map((i, index) => (
            <div className={'flex-space-between-column-center'} style={{ height: 35 }}>
              <span className={'commonFont'} style={{ fontSize: 14,color: '#0084E7' }}>{this.state.dataShop[index]}</span>
              <span className={'commonFont'} style={{ fontSize: 14,color: '#60656F' }}>{dataShopTitle[index]}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  /**
   * 工具
   */
  public renderUtils = () => {
    return (
      <div className={'flex-space-between-column-stretch'} style={{ width: '100%', height: '100%' }}>
        <div className={'flex-space-between-row-center'} style={{ padding: '10px 10px 0',height: '44%' }}>
          <div className={'flex-space-between-column-center'} style={{ height: 60 }}
               onClick={() => history().push('sProductList')}>
            <div className={'flex-center-row-center'} style={{ width: 40,height: 40,borderRadius: 10,backgroundColor: '#3333cc' }}>
              <img src='./assets/images/SupplierTest/commodityManagement.png' width={MenuMaxSize} height={MenuMaxSize}/>
            </div>
            <div className={'commonFont'} style={{ fontSize: 14,color: '#333' }}>商品管理</div>
          </div>
          <div className={'flex-space-between-column-center'} style={{ height: 60 }}
               onClick={() => history().push('sProductList')}>
            <div className={'flex-center-row-center'} style={{ width: 40,height: 40,borderRadius: 10,backgroundColor: '#6633ff' }}>
              <img src='./assets/images/SupplierTest/classification.png' width={MenuMaxSize} height={MenuMaxSize}/>
            </div>
            <div className={'commonFont'} style={{ fontSize: 14,color: '#333' }}>分类设置</div>
          </div>
          <div className={'flex-space-between-column-center'} style={{ height: 60 }}
               onClick={() => history().push('sProductList')}>
            <div className={'flex-center-row-center'} style={{ width: 40,height: 40,borderRadius: 10,backgroundColor: '#009966' }}>
              <img src='./assets/images/SupplierTest/distribution.png' width={MenuMaxSize} height={MenuMaxSize}/>
            </div>
            <div className={'commonFont'} style={{ fontSize: 14,color: '#333' }}>配送设置</div>
          </div>
          <div className={'flex-space-between-column-center'} style={{ height: 60 }}
               onClick={() => history().push('sProductList')}>
            <div className={'flex-center-row-center'} style={{ width: 40,height: 40,borderRadius: 10,backgroundColor: '#0066ff' }}>
              <img src='./assets/images/SupplierTest/testing.png' width={MenuMaxSize} height={MenuMaxSize}/>
            </div>
            <div className={'commonFont'} style={{ fontSize: 14,color: '#333' }}>检测申请</div>
          </div>
        </div>
        <div className={'flex-space-between-row-center'} style={{ padding: '0 10px 10px 10px',height: '44%' }}>
          <div className={'flex-space-between-column-center'} style={{ height: 60 }}
               onClick={() => history().push('sProductList')}>
            <div className={'flex-center-row-center'} style={{ width: 40,height: 40,borderRadius: 10,backgroundColor: '#3399cc' }}>
              <img src='./assets/images/SupplierTest/release.png' width={MenuMaxSize} height={MenuMaxSize}/>
            </div>
            <div className={'commonFont'} style={{ fontSize: 14,color: '#333' }}>商品发布</div>
          </div>
          <div className={'flex-space-between-column-center'} style={{ height: 60 }}
               onClick={() => history().push('sProductList')}>
            <div className={'flex-center-row-center'} style={{ width: 40,height: 40,borderRadius: 10,backgroundColor: '#ff6600' }}>
              <img src='./assets/images/SupplierTest/evaluate.png' width={MenuMaxSize} height={MenuMaxSize}/>
            </div>
            <div className={'commonFont'} style={{ fontSize: 14,color: '#333' }}>评价管理</div>
          </div>
          <div className={'flex-space-between-column-center'} style={{ height: 60 }}
               onClick={() => history().push('/supplierAfterSale')}>
            <div className={'flex-center-row-center'} style={{ width: 40,height: 40,borderRadius: 10,backgroundColor: '#0099ff' }}>
              <img src='./assets/images/SupplierTest/afterSale.png' width={MenuMaxSize} height={MenuMaxSize}/>
            </div>
            <div className={'commonFont'} style={{ fontSize: 14,color: '#333' }}>退款售后</div>
          </div>
          <div className={'flex-space-between-column-center'} style={{ height: 60 }}
               onClick={() => history().push('/supplierAfterSale')}>
            <div className={'flex-center-row-center'} style={{ width: 40,height: 40,borderRadius: 10,backgroundColor: '#ff9900' }}>
              <img src='./assets/images/SupplierTest/putfoward.png' width={MenuMaxSize} height={MenuMaxSize}/>
            </div>
            <div className={'commonFont'} style={{ fontSize: 14,color: '#333' }}>提现申请</div>
          </div>
        </div>
      </div>
    )
  }
  public orderOnclick = (name) => {
    console.log(name)
    history().push('supplierOrder')
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

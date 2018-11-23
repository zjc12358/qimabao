import * as React from 'react'
import { Tabs,Button, Icon } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { addPageIndex, deletePageIndex } from '@store/actions/global_data'
import history from 'history/createHashHistory'
import Nav from '@components/Head/nav'
import ReactSVG from 'react-svg'
import './master.css'
import Head from '@components/Head'

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
      <div className={'bar'} style={{ color: '#858585',paddingTop: 40 }}>
        <Tabs tabs={tabs} animated={false} initialPage={2} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
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
      case '已处理': font = { borderRadius: 20,backgroundColor: '#cccccc',color: '#ffffff',width: 70, height: 25,textAlign: 'center' } ; break
      case '待处理': font = { borderRadius: 20,backgroundColor: '#ff9900',color: '#ffffff',width: 70, height: 25,textAlign: 'center' } ; break
      case '已关闭': font = { borderRadius: 20,backgroundColor: '#ff9900',color: '#ffffff',width: 70, height: 25,textAlign: 'center' } ; break
    }
    return(
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        float: 'right'
      }}>
        <div className={'Segment_line2'} />
        <div className={'flex-center-row-space-between-p1010'} style={{ height: 40 }}>
          <div className={'number'}>退单号：{i.code}</div>
          <div className={'flex-center-row-center'} style={font}>{i.status}</div>
        </div>
        <div className={'Segment_line2'} />
        <div style={{
          padding: 10,
          height: 100,
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            zIndex: 98
          }}>
            <div style={{ width: 85, height: 85 }}><img style={{
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
            left: 130,
            top: 24,
            alignItems: 'flex-start',
            height: 70
          }}>
            <div style={{ fontSize: 16, color: '#191919' }}>{i.Commodity}</div>
            <div style={{ fontSize: 16, color: '#191919' }}>单价：<span style={{ fontSize: 18,color: '#ff0000' }}>￥{i.price}</span>/500g</div>
            <div style={{ fontSize: 16, color: '#191919' }}>重量：{i.weight}</div>
          </div>
        </div>
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          position: 'relative',
          paddingTop: 3
        }}>
          <div style={{ right: 20, position: 'absolute' }}>
            合计：<span style={{ fontSize: 18,color: '#ff0000' }}>￥{i.price}</span>
          </div>
        </div>
        <br/>
        <div style={{
          height: 40,
          backgroundColor: '#fafafa',
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <button style={{ height: 28, width: 70, borderRadius: 5,border: '1px solid #0084E7',backgroundColor: '#0084E7',color: '#ffffff',fontSize: 14,marginRight: 10 }}>去评价</button>
          <button style={{ height: 28, width: 70, borderRadius: 5,border: '1px solid #404040',backgroundColor: 'transparent',color: '#404040',fontSize: 14,marginRight: 10 }}>删除订单</button>
        </div>
      </div>
    )
  }
  /**
   * 待付款
   */
  public renderObligation = () => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Supplier)

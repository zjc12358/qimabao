import * as React from 'react'
import { Tabs,Button, Icon } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { addPageIndex, deletePageIndex } from '@store/actions/global_data'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import './master.css'
import Head from '@components/Head'

export interface Props {
}

interface State {
  data: any
  getEmpty: boolean
  item: any
}

class Supplier extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      getEmpty: true,
      item: { code: 'TQ057899444220', status: '已签收',price: '45.5',reason: '未收到货' },
      data: [
        { code: 'SP057899444220', Commodity: '茴香根 根茎 蔬菜 新鲜 500克',price: '15.5',dateTime: '2018-10-10 15:11:08' },
        { code: 'SP057899444221', Commodity: '新鲜百合 食用鲜百合蔬菜 1000g',price: '22.5',dateTime: '2018-10-10 15:11:08' }
      ]
    }
  }
  /**
   * 内容
   */
  public renderContent = () => {
    return(
      <div style={{
        width: '100%',
        paddingTop: 40
      }}>
        <div className={'Segment_line2'} />
        <div style={{ height: 10, backgroundColor: '#f5f5f9' }} />
        <div className={'Segment_line2'} />
        <div className={'flex-flex-start-row-center-p516'} style={{ height: 25 }}>
          <div className={'number'}>订单号：{this.state.item.code}</div>
        </div>
        <div className={'Segment_line2'} />
        {this.state.data.map((i,index) => (
          <div>
            {this.renderItem(i,index)}
            {(index < (this.state.data.length - 1)) ? <div className={'Segment_line2'} /> : ''}
          </div>
        ))}
        <div className={'footFundWrap'}>
          <span className={'orderNumber'} style={{ color: '#999999' }}>订单号：SP057899444220</span>
          <div>
            <span className={'refund'}>退款金额</span>
            <span className={'refundNumber'}>￥<span style={{ color: 'red' }}>45.00</span></span>
          </div>
        </div>
      </div>
    )
  }
  public renderItem = (i,index) => {
    return(
      <div style={{
        padding: 16,
        height: 75,
        position: 'relative',
        backgroundColor: '#fff'
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
          <div className={'refundNumber'} style={{ height: 43 }}>{i.Commodity}</div>
          <div>
            <span className={'refund'}>实收金额：</span>
            <span className={'refundNumber'}>￥<span style={{ color: 'red' }}>{i.price}</span></span>
          </div>
          <div>
            <span className={'orderNumber'}>申请时间：{i.dateTime}</span>
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
        <Head title={'退款详情'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#fff'} leftIconColor={'grey'}/>
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

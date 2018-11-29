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
}

class Supplier extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      getEmpty: true,
      data: { code: 'TQ057899444220', status: '已签收',price: '45.5',reason: '未收到货',dateTime: '2018-10-10 15:11:08' }
    }
  }
  /**
   * 内容
   */
  public renderContent = () => {
    return(
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%'
      }}>
        <div className={'flex-space-between-column-flex-start'} style={{ height: 100,padding: 20 }}>
          <div className={'flex-flex-start-row-center'}>
            <ReactSVG path='../../../../assets/images/Supplier/success-wh.svg' svgStyle={{ width: 22, height: 22 }}/>
            <span className={'refundResult'}>退款成功</span>
          </div>
          <div>
            <span className={'refundState'}>退款金额：</span>
            <span className={'refundNumber'}>￥{this.state.data.price}</span>
          </div>
          <div>
            <span className={'refundState'}>退款时间：</span>
            <span className={'refundNumber'}>{this.state.data.dateTime}</span>
          </div>
        </div>
        <div className={'negotiationState'}>
          <div className={'negotiationStateTitle'}>
            <span className={'consultationDetails'}>协商详情</span>
          </div>
          <div className={'negotiationStateContentWrap'}>
            <div className={'negotiationStateContent'}>
              <ReactSVG path='../../../../assets/images/Supplier/saler.svg' svgStyle={{ width: 30, height: 30 }}/>
              <span className={'negotiationStateFont'}>商家同意退款</span>
            </div>
            <div className={'messageWrap'}>
              <span className={'number'} style={{ paddingBottom: 5 }}>留言：</span>
              <span className={'negotiationContent'} style={{ width: '100%' }}>曾经的年少痴狂，曾经的波澜壮阔，曾经的肆无忌惮，曾经的飞扬跋扈，结果，在某年某月的某个黄昏，突然发现，那只不过是梦一场。
蓦然回首，那场梦里，隐藏着多少辛酸和无奈，我们不愿再度思索。因为，梦醒了，留给我们的只是淡然一笑。</span>
            </div>
            <div className={'negotiationStateContent'}>
              <ReactSVG path='../../../../assets/images/Supplier/buyer.svg' svgStyle={{ width: 30, height: 30 }}/>
              <span className={'negotiationStateFont'}>买家申请退款</span>
            </div>
            <div className={'messageWrap'}>
              <span className={'number'} style={{ paddingBottom: 5 }}>留言：</span>
              <span className={'negotiationContent'} style={{ width: '100%' }}>人世三苦:1.你得不到;
2.你付出了许多代价,得到了,却不过如此;
3.你轻易地放弃了.后来却发现.原来它在你生命中是那么重要.</span>
            </div>
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
        <Head title={'退款状态'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#ffffff'} leftIconColor={'grey'}/>
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

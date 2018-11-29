import * as React from 'react'
import { Tabs, Button, Icon, Modal } from 'antd-mobile'
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
  modal: any
}

class Supplier extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      getEmpty: true,
      modal: false,
      item: { code: 'TQ057899444220', status: '已签收',price: '45.5',reason: '未收到货',dateTime: '2018-10-10 15:11:08' },
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
        width: '100%'
      }}>
        <div className={'Segment_line2'} />
        <div style={{ height: 10, backgroundColor: '#f5f5f9' }} />
        <div className={'Segment_line2'} />
        <div className={'flex-flex-start-row-center'} style={{ padding: '5px 16px',height: 25,backgroundColor: '#fff' }}>
          <div className={'commonFont'} style={{ fontSize: 14, color: '#333' }}>订单号：{this.state.item.code}</div>
        </div>
        <div className={'Segment_line2'} />
        {this.state.data.map((i,index) => (
          <div>
            {this.renderItem(i,index)}
            {(index < (this.state.data.length - 1)) ? <div className={'Segment_line2'} /> : ''}
          </div>
        ))}
        <div className={'flex-flex-end-row-center'}
             style={{ padding: '10px 16px',borderTop: '1px solid #e5e5e5',borderBottom: '1px solid #e5e5e5',backgroundColor: '#fff' }}>
          <div>
            <span className={'commonFont'} style={{ fontSize: 12, color: '#666' }}>退款金额</span>
            <span className={'commonFont'} style={{ fontSize: 14, color: '#000' }}>￥<span style={{ color: 'red' }}>45.00</span></span>
          </div>
        </div>
        <div className={'flex-flex-start-column-stretch'}
             style={{ paddingLeft: 16,paddingRight: 16,borderBottom: '1px solid #e5e5e5',backgroundColor: '#fff' }}>
          <div className={'flex-flex-start-row-center'} style={{ paddingTop: 10,paddingBottom: 10 }}>
            <span className={'commonFont'} style={{ fontSize: 16, color: '#000' }}>退款申请单</span>
          </div>
          <div className={'flex-space-between-row-center'} style={{ padding: '10px 16px', borderTop: '1px solid #e5e5e5' }}>
            <span>退单号：</span>
            <span style={{ fontFamily: '微软雅黑' }}>{this.state.item.code}</span>
          </div>
          <div className={'flex-space-between-row-center'} style={{ padding: '10px 16px', borderTop: '1px solid #e5e5e5' }}>
            <span>发货状态：</span>
            <span style={{ fontFamily: '微软雅黑' }}>{this.state.item.status}</span>
          </div>
          <div className={'flex-space-between-row-center'} style={{ padding: '10px 16px', borderTop: '1px solid #e5e5e5' }}>
            <span>退款金额：</span>
            <span style={{ fontFamily: '微软雅黑' }}>{this.state.item.price}元</span>
          </div>
          <div className={'flex-space-between-row-center'} style={{ padding: '10px 16px', borderTop: '1px solid #e5e5e5' }}>
            <span>退款原因：</span>
            <span style={{ fontFamily: '微软雅黑' }}>{this.state.item.reason}</span>
          </div>
        </div>
        <div className={'flex-flex-start-column-stretch'} style={{ backgroundColor: '#fff',padding: '10px 16px 60px' }}>
          <div className={'flex-flex-start-row-center'} style={{ paddingTop: 10 }}>
            <span className={'commonFont'} style={{ fontSize: 16, color: '#000' }}>售后状态</span>
          </div>
          <div className={'flex-flex-start-row-center'} style={{ paddingTop: 10 }}>
            <span className={'commonFont'} style={{ fontSize: 14, color: '#333' }}>同意退款：</span>
            <span className={'commonFont'} style={{ fontSize: 12, color: '#666',whiteSpace: 'normal' }}>申请达成并退款至买家的余额或支付宝账号</span>
          </div>
          <div className={'flex-flex-start-row-center'} style={{ paddingTop: 10 }}>
            <span className={'commonFont'} style={{ fontSize: 14, color: '#333' }}>驳回退款：</span>
            <span className={'commonFont'} style={{ fontSize: 12, color: '#666',whiteSpace: 'normal' }}>驳回后买家有7天的时间选择修改或申请平台介入</span>
          </div>
          <div className={'flex-flex-start-row-center'} style={{ paddingTop: 10 }}>
            <span className={'commonFont'} style={{ fontSize: 14, color: '#333' }}>如果商家未处理：</span>
            <span className={'commonFont'} style={{ fontSize: 12, color: '#666',whiteSpace: 'normal' }}>超过1天则申请达成并自动为买家退款</span>
          </div>
        </div>
        <div className={'applyBtnWrap'}>
          <button className={'rejectBtn'} onClick={(e) => this.showModal(e)}>驳回退款</button>
          <button className={'agreeBtn'} onClick={this.applyOnclick}>同意退款</button>
        </div>
        {this.rejectRender()}
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
          <div className={'commonFont'} style={{ height: 43,fontSize: 14, color: '#000' }}>{i.Commodity}</div>
          <div>
            <span className={'commonFont'} style={{ fontSize: 12, color: '#666' }}>实收金额：</span>
            <span className={'commonFont'} style={{ fontSize: 14, color: '#000' }}>￥<span style={{ color: 'red' }}>{i.price}</span></span>
          </div>
          <div>
            <span className={'commonFont'} style={{ fontSize: 12, color: '#999' }}>申请时间：{i.dateTime}</span>
          </div>
        </div>
      </div>
    )
  }

  public rejectRender = () => {
    return(
      <Modal
        popup
        visible={this.state.modal}
        onClose={() => this.onClose()}
        animationType='slide-up'
        className={'rejectModal'}
      >
        <div className={'flex-center-column-flex-start'} style={{ paddingLeft: '5%' }}>
          <span style={{ fontSize: 16,paddingTop: 8,paddingBottom: 8,color: '#000' }}>驳回原因：</span>
          <textarea rows={6} style={{ width: '93%',border: '1px solid #ccc' }} placeholder={'在这里填写驳回原因...'}/>
        </div>
        <div className={'applyBtnWrap'}>
          <button className={'agreeBtn'} style={{ width: '90%' }}>提交</button>
        </div>
      </Modal>
    )
  }

  /**
   * 打开modal
   */
  showModal = (e) => {
    e.preventDefault() // 修复 Android 上点击穿透
    this.setState({ modal: true })
  }
  onClose = () => {
    this.setState({ modal: false })
  }

  public applyOnclick = () => {
    history().push('/afterSaleSuccess')
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

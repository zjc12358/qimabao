import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, Icon, DatePicker, List, Modal, Button, Radio, Checkbox, TextareaItem } from 'antd-mobile'
import ReactSVG from 'react-svg'
import Head from '../../components/Head/index'
import './orderDetail.less'
import history from 'history/createHashHistory'

const nowTimeStamp = Date.now()
const now = new Date(nowTimeStamp)
const RadioItem = Radio.RadioItem

export interface Props {

}

interface State {

}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount () {
    console.log(1)
  }

  componentWillReceiveProps (nextProps) {
    console.log(1)
  }

  /**
   * 收货地址
   */
  renderAddress = () => {
    return (
      <div className='addressBox'>
        <div className='location'>
          <ReactSVG svgClassName='location_icon' path='./assets/images/address_location.svg' />
        </div>
        <div className='addressMsg' style={{ fontSize: 14 }}>
          <div>何静建</div>
          <div>浙江省 衢州市 柯城区 荷花街道 兴化苑 35幢2单元</div>
        </div>
      </div>
    )
  }

  /**
   * 订单表
   */
  renderOrderItem = () => {
    return (
      <div className='orderDetail'>
        <div className='orderNum' style={{ fontSize: 12 }}>订单号: SP057899444221</div>
        <div className='supplier'>
          <ReactSVG svgClassName='ordericon' path='./assets/images/Cart/merchant.svg' />
          <div>衢州超彩软件开发有限公司</div>
          <div style={{ flex: 1 }}></div>
          <Icon style={{ marginRight: 20 }} type='right' />
        </div>
        <List className='foodList'>
          <List.Item onClick={ () => { console.log(1111) } }>
            <div className='foodItem'>
              <img className='foodImg' src='https://mockplus.oss-cn-hangzhou.aliyuncs.com/html2/bDWlS8I1MNrES9q6/202/0EDCD3EB-42DB-412B-9411-E5DD751EB4BA/5C72C7F0B6CEC0C39104B6421FA5EF71.jpg?Expires=1542784455&OSSAccessKeyId=8Z8chL8RsuW2Ju4s&Signature=qwqGDuTn%2B6cJ3xIQB0vThz%2FW51I%3D' alt=''/>
              <div className='foodText'>
                <div className='foodName'>我问IE为沃尔沃问偶尔哦为IE问问</div>
                <div>2018-10-10 15:11:08</div>
              </div>
              <div style={{ flex: 1 }}></div>
              <div>
                <div>￥22.50</div>
                <div style={{ display: 'flex',justifyContent: 'flex-end' }}>×2</div>
              </div>
            </div>
          </List.Item>
        </List>
      </div>
    )
  }

  /**
   * 价格清单
   */
  renderPriceList = () => {
    return (
      <div className='priceList'>
        <div className='priceListTop'>
          <div className='foodTotal'>
            <div>商品总价</div>
            <div style={{ flex: 1 }}></div>
            <div>￥90.00</div>
          </div>
          <div className='express'>
            <div>运费</div>
            <div style={{ flex: 1 }}></div>
            <div>￥0.00</div>
          </div>
          <div className='orderTotal'>
            <div>订单总价</div>
            <div style={{ flex: 1 }}></div>
            <div>￥90.00</div>
          </div>
        </div>
        <div className='realPayment'>
          <div>实付款</div>
          <div style={{ flex: 1 }}></div>
          <div style={{ color: 'red' }}>￥90.00</div>
        </div>
      </div>
    )
  }

  /**
   * 订单信息
   */
  renderOrderMsg = () => {
    return (
      <div style={{ backgroundColor: 'white' }}>
        <div className='orderMsg'>
          <div className='orderMsgTitle'>订单信息</div>
          <div className='orderMsgMore'>
            <div>
              <div>订单编号：</div>
              <div>2018-10-10 15：11：08</div>
            </div>
            <div>
              <div>交易号：</div>
              <div>2018-10-10 15：11：08</div>
            </div>
            <div>
              <div>创建时间：</div>
              <div>2018-10-10 15：11：08</div>
            </div>
            <div>
              <div>付款时间：</div>
              <div>2018-10-10 15：11：08</div>
            </div>
            <div>
              <div>成交时间：</div>
              <div>2018-10-10 15：11：08</div>
            </div>
          </div>
        </div>
        <div className='contact'>
          <div><ReactSVG svgClassName='ordericon' path='./assets/images/contactSeller.svg'/>联系卖家</div>
          <div><ReactSVG svgClassName='ordericon' path='./assets/images/phone.svg'/>拨打电话</div>
        </div>
      </div>
    )
  }

  public render () {
    let styles = {

    }
    return (
      <div>
        <div>
          <Head
            showLeftIcon='true'
            title='订单详情'
            backgroundColor='#0084e7'
            leftIconColor='white'
          />
        </div>
        <div className='stateBox'>
          <div>
            <div style={{ fontSize: 18 }}>交易关闭</div>
            <div style={{ marginTop: 5 }}>超市关闭</div>
          </div>
          <div style={{ flex: 1 }}></div>
          <div>
            <img style={{ width: 151,display: 'block' }} src='./assets/images/box.png' />
          </div>
        </div>
        {this.renderAddress()}
        {this.renderOrderItem()}
        {this.renderPriceList()}
        {this.renderOrderMsg()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {

  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {

}

export default connect(mapStateToProps, mapDispatchToProps)(User)

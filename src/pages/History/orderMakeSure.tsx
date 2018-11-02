import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar,Icon,DatePicker,List,Modal,Button,Radio,Checkbox } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import './default.css'
import Head from '../../components/Head/index'
import { ShopCartSupplierBean } from '@datasources/ShopCartSupplierBean'
import { ShopCartProductBean } from '@datasources/ShopCartProductBean'
import history from 'history/createHashHistory'
export interface Props {}

const nowTimeStamp = Date.now()
const now = new Date(nowTimeStamp)
const RadioItem = Radio.RadioItem

interface State {
  orderData: any,
  visible1: any,
  visible2: any,
  dpValue1: any,
  dpValue2: any,
  dateValue1: any,
  dateValue2: any,
  timeIsSet: any,
  modal1: boolean,
  dateChooseData: any
}

function closest (el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el
    }
    el = el.parentElement
  }
  return null
}

class History extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      dateChooseData: [
        { text: '当天', checked: false,value: 0 },
        { text: '隔天', checked: false, value: 1 }
      ],
      modal1: false,
      timeIsSet: false,
      visible1: false,
      visible2: false,
      dpValue1: 0,
      dpValue2: 0,
      dateValue1: '',
      dateValue2: '',
      orderData: {
        user: {},
        total: 0,
        addressData: {},
        supplier: [
          {
            id: 0,
            name: '衢州炒菜软件有限公司',
            foodList: [1,2,3]
          }
        ]
      }
    }
  }

  showModal = (e) => {
    e.preventDefault() // 修复 Android 上点击穿透
    this.setState({
      modal1: true
    })
  }
  onClose = key => () => {
    this.setState({ modal1: false })
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return
    }
    const pNode = closest(e.target, '.am-modal-content')
    if (!pNode) {
      e.preventDefault()
    }
  }

  radioOnChange = (obj,index) => {
    console.log(11)
    for (let i = 0; i < this.state.dateChooseData.length; i++) {
      let dateChooseData = this.state.dateChooseData
      dateChooseData[i].checked = false
      if (i === index) dateChooseData[i].checked = true
      console.log(dateChooseData[i].checked)
      this.setState({ dateChooseData: dateChooseData })
    }
  }

  FormattedDate = (date) => {
    date = date + ''
    date = date.replace(/ GMT.+$/, '')// Or str = str.substring(0, 24)
    let da = new Date(date)
    console.log(da)
    let a = [da.getFullYear(), da.getMonth() + 1, da.getDate(), da.getHours(), da.getMinutes(), da.getSeconds()]
    let dpValue = a[3] + ':' + a[4]
    this.setState({ dpValue1: dpValue })
    return dpValue
  }

  renderSetTime = () => {
    return (
      <div>
        {this.state.dateChooseData.map((i, index) => (
          <List.Item key={index}>
            <div style={{ display: 'flex',fontSize: 13 }}>
              <div>{i.text}</div>
              <div style={{ flex: 1,textAlign: 'center' }}>
                <span onClick={() => this.setState({ visible1: true })}>{this.state.dpValue1}</span>
                &nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;&nbsp;
                <span onClick={() => this.setState({ visible2: true })}>{this.state.dpValue2}</span>
              </div>
              <div><Checkbox checked={ i.checked } onChange={() => {
                this.radioOnChange(i,index)
              }}></Checkbox></div>
            </div>
           </List.Item>
        ))}
      </div>
    )
  }

  public render () {
    return (
      <div style={{ display: 'flex',flexDirection: 'column',justifyContent: 'flex-start',alignItems: 'center' }}>
        <Head
          title='确认订单'
          titleColor='#333333'
          backgroundColor='#ffffff'
          showLeftIcon='true'
        >
        </Head>
        <div style={{ width: '100%' }}>
          <div>
            <div
              style={{ marginTop: 40,borderTop: '1px solid #cccccc',display: 'flex',alignItems: 'center',padding: 20,color: '#8c8c8c' }}
              onClick={ () => {
                history().push('/setting-address')
              }}
            >
              <div>1</div>
              <div style={{ flex: 1,paddingLeft: 12,paddingRight: 10 }}>
                <div style={{ display: 'flex' }}>
                  <div>收货人：何静</div>
                  <div style={{ flex: 1 }}></div>
                  <div>15657076868</div>
                </div>
                <div style={{ marginTop: 3 }}>收货地址：阿里巴巴集团某某事业部123</div>
              </div>
              <div><Icon type='right' /></div>
            </div>
            <div style={{ height: 5,backgroundColor: '#d69495',marginBottom: 15 }}></div>
          </div>
          <div
            style={{ backgroundColor: 'white' }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              borderTop: '1px solid #CCCCCC',
              borderBottom: '1px solid #CCCCCC',
              height: 40
            }}>
              <div style={{ width: 20 }}></div>
              <div style={{ color: '#8C8C8C' }}>送达时间</div>
              <div style={{ flex: 1 }}></div>
              <div onClick={ (e) => { this.showModal(e) } } style={{ color: 'rgb(140, 140, 140)' }}>选择送达时间</div>
              <div onClick={ (e) => { this.showModal(e) } } style={{ paddingRight: 15 }}><Icon type='right'/></div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            </div>
          </div>
        </div>
        <DatePicker
          mode='time'
          visible={this.state.visible1}
          value={this.state.dateValue1}
          onChange={date => this.FormattedDate(date)}
          onOk = { date => this.setState({ visible1: false,dateValue1: date }) }
          onDismiss={() => this.setState({ visible1: false })}
        ></DatePicker>
        <DatePicker
          mode='time'
          visible={this.state.visible2}
          value={this.state.dateValue2}
          onChange={date => this.FormattedDate(date)}
          onOk = { date => this.setState({ visible2: false,dateValue2: date }) }
          onDismiss={() => this.setState({ visible2: false })}
        ></DatePicker>
        <Modal
          popup
          visible={this.state.modal1}
          onClose={this.onClose('modal1')}
          animationType='slide-up'
        >
          <List renderHeader={() => '选择送达时间'} className='popup-list'>
            {this.renderSetTime()}
            <List.Item>
            <Button type='primary' onClick={this.onClose('modal1')}>确定</Button>
            </List.Item>
          </List>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(History)

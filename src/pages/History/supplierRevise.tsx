import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, List, Checkbox, Stepper, SwipeAction, Button, Toast } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import './default.less'
import { cloneDeep, get } from 'lodash'
import Head from '../../components/Head/index'
import { ShopCartSupplierReviseBean } from '@datasources/ShopCartSupplierReviseBean'
import history from 'history/createHashHistory'
import supplierReviseDataReducer from '@store/reducers/supplierReviseDataReducer'
import axios from 'axios'
import { MyResponse } from '@datasources/MyResponse'
import { needReload } from '@store/actions/shopCart_data'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
let moneyKeyboardWrapProps
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault()
  }
}

export interface Props {
  productMsg: any,
  needReload: (reload: boolean) => void
}

interface State {
  foodList: Array<ShopCartSupplierReviseBean>,
  fullscreen: boolean
}

class History extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      foodList: [],
      fullscreen: false
    }
  }
  componentDidMount () {
    console.log(this.props.productMsg)
    this.getData()
  }

  getData = () => {
    this.setState({
      fullscreen: true
    })
    let url = 'CanteenProcurementManager/user/shoppingCart/findProductSupplier?'
    let query = 'supplierId=' + this.props.productMsg.supplierId + '&cartId=' + this.props.productMsg.cartId
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- 购物车data =', data)
        if (data.data.code === 0) {
          console.log(data.data.data)
          this.setState({ foodList: data.data.data })
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }

  /**
   * 其他供应商点击替换修改内容
   * @param foodListIndex
   * @param otherSupplierListIndex
   */
  otherSupplierOnClick = (i,foodListIndex,otherSupplierListIndex) => {
    let data = cloneDeep(this.state.foodList)
    let data2 = {
      cartId: data[foodListIndex].cart_id,
      supplierId: data[foodListIndex].shoppingCartList[otherSupplierListIndex].supplier_id,
      productPrice: data[foodListIndex].shoppingCartList[otherSupplierListIndex].product_price,
      productTotalPrice: Number((data[foodListIndex].shoppingCartList[otherSupplierListIndex].product_price * data[foodListIndex].product_weight).toFixed(2)),
      productIcon: data[foodListIndex].shoppingCartList[otherSupplierListIndex].product_icon,
      companyName: data[foodListIndex].shoppingCartList[otherSupplierListIndex].company_name
    }
    console.log(data2)
    let ret = ''
    for (let it in data2) {
      console.log(data2[it])
      ret += encodeURIComponent(it) + '=' + data2[it] + '&'
    }
    console.log(ret)
    let url = 'CanteenProcurementManager/user/shoppingCart/updateProductSupplier?'
    let query = ret
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- 购物车data =', data)
        if (data.data.code === 0) {
          let reviseData = cloneDeep(this.state.foodList)
          reviseData[foodListIndex].product_price = data2.productPrice
          reviseData[foodListIndex].company_name = data2.companyName
          reviseData[foodListIndex].product_icon = data2.productIcon
          reviseData[foodListIndex].product_total_price = data2.productTotalPrice
          this.setState({ foodList: reviseData })
          this.props.needReload(true)
          Toast.success(data.data.msg,2)
          console.log(data.data.msg)
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }
  /**
   * 食物
   * @param foodListIndex
   */
  renderFoodItem = (j,foodListIndex) => {
    return (
      <div>
        <div className='food' style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 20
          }}>
            <img style={{ display: 'block', width: 90, height: 90 }} src={j.product_icon}/>
            <div style={{
              height: 105,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              paddingLeft: 20
            }}>
              <div style={{ fontSize: '16px' }}>{j.product_name}</div>
              <div style={{ fontSize: '16px' }}>
                <span style={{ color: 'red' }}>￥{j.product_price}</span>
                <span style={{ color: '#8c8c8c' }}>/份</span>
              </div>
              <div style={{ display: 'flex', color: '#8c8c8c', fontSize: 14 }}>
                X{j.product_weight}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ width: 131 }}></div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: 40,
            flex: 1,
            borderTop: '1px solid #e5e5e5'
          }}>
            <div>小计: <span
              style={{ color: 'red' }}>￥{ j.product_total_price }</span>
            </div>
          </div>
          <div style={{ width: 30 }}></div>
        </div>
      </div>
    )
  }

  /**
   * 其他供应商列表
   * @param otherSupplierListIndex
   * @param foodListIndex
   */
  renderOtherSupplier = (i,otherSupplierListIndex,foodListIndex) => {
    return (
      <Button onClick={ () => { this.otherSupplierOnClick(i,foodListIndex,otherSupplierListIndex) }} style={{ height: 45,fontSize: 15,marginTop: 5,paddingLeft: 15,paddingRight: 15,display: 'flex',justifyContent: 'space-between',alignItems: 'center' }}>
        <div>{i.company_name}</div>
        <div>
        <span style={{ color: 'red' }}>{i.product_price}</span>
        <span style={{ color: '#8c8c8c' }}>/份</span>
        </div>
      </Button>
    )
  }
  public render () {
    return (
      <div className='bigContainer'>
        <Head
          title='修改供应商'
          backgroundColor='#0084e7'
          leftIconColor='white'
          showLeftIcon='true'
        >
        </Head>
        <div className='touch_scroll bigContent'>
          {this.state.foodList.map((i, foodListIndex) => (
            <div>
              <div style={{ height: 15, background: '#f5f5f5' }}></div>
              <div style={{ borderBottom: '1px solid rgb(204, 204, 204)',backgroundColor: 'white' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  borderTop: '1px solid #CCCCCC',
                  borderBottom: '1px solid #CCCCCC',
                  height: 40
                }}>
                  <div className='checkBox'>
                  </div>
                  <img className='iconStyle' src='./assets/images/Cart/merchant.svg' />
                  <div style={{ color: '#8C8C8C' }}>{i.company_name}</div>
                </div>
                {this.renderFoodItem(i,foodListIndex)}
                <div style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                </div>
              </div>
              {i.shoppingCartList && i.shoppingCartList.length ? i.shoppingCartList.map((i,otherSupplierListIndex) => (
                this.state.foodList[foodListIndex].company_name === this.state.foodList[foodListIndex].shoppingCartList[otherSupplierListIndex].company_name ? <div></div> :
                this.renderOtherSupplier(i,otherSupplierListIndex,foodListIndex)
              )) : <div>该菜品暂无其他供应商</div>}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    productMsg: state.supplierReviseData.productMsg
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  needReload
}

export default connect(mapStateToProps, mapDispatchToProps)(History)

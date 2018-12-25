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

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
let moneyKeyboardWrapProps
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault()
  }
}

export interface Props {
  productMsg: any
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
    let foodList = [
      {
        id: 1,
        name: '红烧猪蹄',
        price: 15.5,
        count: 2,
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541043777320&di=9667081cc759ba5e2698c43ac19aac7c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201501%2F18%2F20150118123414_Hk8yj.jpeg',
        unit: '份',
        nowSupplierMsg: {
          id: 0,
          name: '衢州炒菜软件有限公司'
        },
        otherSupplierList: [
          {
            id: 0,
            name: '衢州炒菜软件有限公司',
            foodMsg: {
              id: 1,
              name: '红烧猪蹄',
              price: 15.5,
              img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541043777320&di=9667081cc759ba5e2698c43ac19aac7c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201501%2F18%2F20150118123414_Hk8yj.jpeg',
              unit: '份'
            }
          },
          {
            id: 1,
            name: '杭州炒菜软件',
            foodMsg: {
              id: 2,
              name: '红烧猪蹄',
              price: 16.5,
              img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541043777320&di=5b277d426a6682329fcffbcd31b83265&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Ff603918fa0ec08fa89086b9d52ee3d6d55fbda84.jpg',
              unit: '份'
            }
          },
          {
            id: 2,
            name: '江山炒菜阿萨德发的撒',
            foodMsg: {
              id: 3,
              name: '红烧猪蹄',
              img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541043777319&di=a6fa70d24b23fc1af9333649c39dd698&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F8694a4c27d1ed21b504071dfa66eddc451da3f7a.jpg',
              price: 17.5,
              unit: '份'
            }
          }
        ]
      }
    ]
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
    console.log(this.state.foodList[foodListIndex].shoppingCartList[otherSupplierListIndex].company_name)
    let foodList = cloneDeep(this.state.foodList)
    let other = cloneDeep(this.state.foodList[foodListIndex].shoppingCartList[otherSupplierListIndex])
    foodList[foodListIndex].id = other.foodMsg.id
    foodList[foodListIndex].name = other.foodMsg.name
    foodList[foodListIndex].price = other.foodMsg.price
    foodList[foodListIndex].img = other.foodMsg.img
    foodList[foodListIndex].unit = other.foodMsg.unit
    foodList[foodListIndex].nowSupplierMsg.id = other.id
    foodList[foodListIndex].nowSupplierMsg.name = other.name
    this.setState({ foodList: foodList })
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
          rightIconContent={(<span style={{ color: 'white' }}>确认</span>)}
          showRightIcon='true'
          showLeftIcon='true'
          rightIconOnClick={ () => { console.log('确认修改') } }
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

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(History)

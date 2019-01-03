import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, List, Checkbox, Stepper, SwipeAction, Icon, Toast, InputItem, Modal } from 'antd-mobile'
import { Loading, Button } from 'element-react'
import ReactSVG from 'react-svg'
import { cloneDeep, get } from 'lodash'
import { GlobalData } from '@store/reducers/globalDataReducer'
import './default.less'
import Head from '../../components/Head/index'
import { ShopCartSupplierBean } from '@datasources/ShopCartSupplierBean'
import { ShopCartProductBean } from '@datasources/ShopCartProductBean'
import history from 'history/createHashHistory'
import { updatePageTab } from '@store/actions/global_data'
import { needReload, updataAllSupplierItemCheck, updataShopCart } from '@store/actions/shopCart_data'
import axios from 'axios'
import { MyResponse } from '@datasources/MyResponse'
import { LoginBean } from '@datasources/LoginBean'
import { updataBookingSheetFood, updataOrderId, updataToTal } from '@store/actions/bookingSheet_data'
import { updateSupplierRevise } from '@store/actions/supplierRevise_data'
import * as dd from 'dingtalk-jsapi'

const CheckboxItem = Checkbox.CheckboxItem
const AgreeItem = Checkbox.AgreeItem
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
let moneyKeyboardWrapProps
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault()
  }
}
const alert = Modal.alert

export interface Props {
  updatePageTab: (pageTab: string) => void,
  updataShopCart: (shopCart: Array<ShopCartSupplierBean>) => void,
  updataAllSupplierItemCheck: (allSupplierItemCheck: boolean) => void,
  updataBookingSheetFood: (shopCart: Array<ShopCartSupplierBean>) => void,
  updataOrderId: (orderId: string) => void,
  updataToTal: (total: number) => void,
  updateSupplierRevise: (productMsg: any) => void,
  needReload: (reload: boolean) => void,
  shopCartData: any,
  needReloadData: boolean,
  allSupplierItemCheck: boolean,
  BookingSheetFood: any
}

interface State {
  num: any,
  data: Array<ShopCartSupplierBean>,
  total: any,
  allSupplierItemCheck: Boolean,
  isEmpty: boolean,
  yourLink: any,
  shopCartData: any,
  bodyWidth: any,
  fullscreen: boolean
}

class History extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      num: '',
      allSupplierItemCheck: cloneDeep(this.props.allSupplierItemCheck),
      total: 0,
      isEmpty: false,
      yourLink: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      data: cloneDeep(this.props.shopCartData),
      shopCartData: cloneDeep(this.props.shopCartData),
      bodyWidth: document.querySelector('body').offsetWidth,
      fullscreen: false
    }
  }

  /**
   * 更新redux
   * @param data
   * @param allSupplierItemCheck
   */
  updata = (data, allSupplierItemCheck) => {
    this.props.updataShopCart(data)
    this.props.updataAllSupplierItemCheck(allSupplierItemCheck)
  }

  getCheckedProduct = () => {
    let productDetails = []
    this.state.data.map(i => {
      i.shoppingCartDetails.map(i2 => {
        if (i2.isChecked === true) {
          let productItem = {
            cartId: i2.cart_id,
            productId: i2.product_id,
            supplierId: i2.supplier_id,
            productName: i2.product_name,
            productPrice: i2.product_price,
            productQuantity: i2.product_weight,
            productTotalPrice: i2.product_total_price,
            productIcon: i2.product_icon,
            companyName: i.company_name
          }
          productDetails.push(productItem)
        }
      })
    })
    return productDetails
  }

  getCheckedProductTwo = () => {
    let data = []
    this.state.data.map(i => {
      let suplier = {
        supplier_id: i.supplier_id,
        supplier_name: i.company_name,
        shoppingCartDetails: []
      }
      i.shoppingCartDetails.map(i2 => {
        if (i2.isChecked === true) {
          let productItem = cloneDeep(i2)
          suplier.shoppingCartDetails.push(productItem)
        }
      })
      if (suplier.shoppingCartDetails.length) data.push(suplier)
    })
    return data
  }

  /**
   * 去结算
   */
  goPay = () => {
    if (this.getCheckedProduct().length < 1) {
      Toast.info('请选择商品!')
      return
    }
    let url = 'CanteenProcurementManager/user/productOrder/saveProductOrder'
    let data2 = {
      productTotalPrice: this.state.total,
      productDetails: this.getCheckedProduct()
    }
    let data = JSON.stringify(data2)
    data = encodeURI(data)
    url = url + '?json=' + data
    // this.setState({ fullscreen: true })
    Toast.loading('loading', 2)
    axios.post(url, data, { headers: { 'Content-Type': 'application/json' } })
      .then(data => {
        Toast.hide()
        if (data.data.code === 0) {
          console.log(data.data)
          console.log(this.getCheckedProductTwo())
          this.props.updataOrderId(data.data.data)
          this.props.updataBookingSheetFood(this.getCheckedProductTwo())
          this.props.updataToTal(this.state.total)
          history().push('/orderMakeSure')
          this.props.updatePageTab('HistoryPageTabBar')
        } else {
          Toast.info(data.data.msg)
          console.log(data.data.msg)
        }
        this.setState({ fullscreen: false })
      })
      .catch(() => {
        this.setState({ fullscreen: false })
        Toast.hide()
        Toast.info('错误!')
      })
  }

  /**
   * 购物车尾部全选事件
   */
  allSupplierItemCheckOnChange = () => {
    this.setState({ allSupplierItemCheck: !this.state.allSupplierItemCheck }, function () {
      for (let i = 0; i < this.state.data.length; i++) {
        let data = this.state.data
        data[i].allChecked = this.state.allSupplierItemCheck
        let data2 = data[i].shoppingCartDetails
        for (let j = 0; j < data2.length; j++) {
          data2[j].isChecked = this.state.allSupplierItemCheck
        }
        data[i].shoppingCartDetails = data2
        this.updata(data, this.state.allSupplierItemCheck)
      }
      // 计算一遍总计
      this.count()
    })
  }

  /**
   * 单个菜品的选择事件
   * @param index1 供应商数组下标
   * @param index  菜品数组下标
   */
  isCheckedOnChange = (index1, index) => {
    let data = this.state.data
    let len = 0
    let len2 = 0
    data[index1].shoppingCartDetails[index].isChecked = !data[index1].shoppingCartDetails[index].isChecked
    for (let i = 0; i < this.state.data[index1].shoppingCartDetails.length; i++) {
      if (this.state.data[index1].shoppingCartDetails[i].isChecked === true) len += 1
      if (len === this.state.data[index1].shoppingCartDetails.length) data[index1].allChecked = true
    }
    if (data[index1].shoppingCartDetails[index].isChecked === false) {
      this.props.updataAllSupplierItemCheck(false)
      data[index1].allChecked = false
    }
    for (let i = 0; i < this.state.data.length; i++) {
      let data = this.state.data
      if (data[i].allChecked === true) len2 += 1
      if (len2 === this.state.data.length) {
        this.props.updataAllSupplierItemCheck(true)
      }
    }
    this.props.updataShopCart(data)
    // 计算一遍总计
    this.count()
  }

  /**
   * 供应商的勾选事件
   * @para  m index1
   */
  allCheckedOnChange = (index1) => {
    let data = this.state.data
    let len = 0
    data[index1].allChecked = !data[index1].allChecked
    for (let i = 0; i < this.state.data[index1].shoppingCartDetails.length; i++) {
      data[index1].shoppingCartDetails[i].isChecked = data[index1].allChecked
    }
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].allChecked === true) len += 1
      if (len === this.state.data.length) {
        // 供应商全部选中时,修改redux,勾选底部checkbox
        this.props.updataAllSupplierItemCheck(true)
      }
    }
    if (data[index1].allChecked === false) {
      this.props.updataAllSupplierItemCheck(false)
    }
    this.props.updataShopCart(data)
    // 计算一遍总计
    this.count()
  }

  /**
   * 合计计算
   */
  count = () => {
    // console.log(111)
    let total = 0
    for (let i = 0; i < this.state.data.length; i++) {
      let data = this.state.data
      let data2 = data[i].shoppingCartDetails
      for (let j = 0; j < data2.length; j++) {
        if (data2[j].isChecked === true) {
          console.log(total)
          let subtotal = data2[j].product_weight * data2[j].product_price
          total += subtotal
          total = Number(total.toFixed(2))
        }
      }
      this.setState({ total: total })
    }
  }

  smallAdd = (item, index, index1) => {
    let data = cloneDeep(this.state.data)
    let subtotal = Number(item.product_weight * item.product_price).toFixed(2)
    data[index1].shoppingCartDetails[index].product_total_price = subtotal
    console.log(subtotal)
    this.props.updataShopCart(data)
  }

  /**
   * 右滑删除( index1:供应商下标,  index:该食物下标  )
   */
  SlipRightDeleteOnClick = (index1, index) => {
    alert('删除商品', '是否删除选中的商品', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => {
        let data = cloneDeep(this.state.data)
        this.deleteFoodAxios(data[index1].shoppingCartDetails[index].cart_id)
      }}
    ])
  }

  deleteFoodAxios = (cartId) => {
    console.log(cartId)
    Toast.loading('请稍等...',1)
    let url = 'CanteenProcurementManager/user/shoppingCart/deleteSwitchCart?'
    let query = 'cartId=' + cartId
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log(data)
        Toast.hide()
        if (data.data.code === 0) {
          this.setState({
            fullscreen: false
          })
          Toast.success('删除成功',1)
          this.getShopCartData()
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }

  foodAddSub = (v, item, index1, index) => {
    // let shopdata = cloneDeep(this.props.shopCartData)
    let productWeight = v
    console.log(v)
    let subtotal = Number(v * item.product_price).toFixed(2)
    console.log(subtotal)
    let cartId = item.cart_id
    Toast.loading('请稍等...')
    let url = 'CanteenProcurementManager/user/shoppingCart/increaseAndDecreaseCart?'
    let query = 'cartId=' + cartId + '&productWeight=' + productWeight + '&productTotalPrice=' + subtotal
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log(data)
        if (data.data.code === 0) {
          Toast.hide()
          let shopdata = cloneDeep(this.state.data)
          shopdata[index1].shoppingCartDetails[index].product_weight = v
          shopdata[index1].shoppingCartDetails[index].product_total_price = subtotal
          this.props.updataShopCart(shopdata)
          // 计算一遍总计
          this.count()
          // this.getShopCartData()
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }

  /**
   * 头部删除
   */
  HeadDeleteOnclick = () => {
    alert('删除商品', '是否删除选中的商品', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => {
        let cartId = []
        this.state.data.map(i => {
          i.shoppingCartDetails.map(j => {
            if (j.isChecked === true) cartId.push(j.cart_id)
          })
        })
        if (cartId.length < 1) {
          Toast.fail('无选中商品',1)
          return
        }
        cartId.join(',')
        this.deleteFoodAxios(cartId)
      } }
    ])
  }

  makeSureModal = () => {
    alert('删除商品', '是否删除选中的商品', [
      { text: '确定', onPress: () => console.log('cancel') },
      { text: '取消', onPress: () => console.log('ok') }
    ])
  }

  /**
   * 获取购物车数据
   */
  getShopCartData = () => {
    this.props.updataAllSupplierItemCheck(false)
    this.setState({ total: 0 })
    // this.setState({
    //   fullscreen: true
    // })
    Toast.loading('请稍等...')
    let url = 'CanteenProcurementManager/user/shoppingCart/findShoppingCart?'
    let query = ''
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- 购物车data =', data)
        if (data.data.code === 0) {
          // this.setState({
          //   fullscreen: false
          // })
          Toast.hide()
          let cartData = cloneDeep(data.data.data)
          cartData.map((item) => {
            item.allChecked = false
            item.shoppingCartDetails.map((citem) => {
              citem.isChecked = false
            })
          })
          this.props.updataShopCart(cartData)
          this.props.needReload(false)
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    // if (nextProps === this.props) {
    //   Toast.hide()
    //   return
    // }
    this.setState({ data: nextProps.shopCartData, allSupplierItemCheck: nextProps.allSupplierItemCheck }, () => {
      Toast.hide()
    })
  }

  /**
   * 页面加载时判断选中项计算合计
   */
  componentDidMount () {
    dd.biz.navigation.setTitle({
      title : '菜篮子'
    })
      .catch(err => console.log(err))
    this.count()
    if (this.props.needReloadData === false) return
    this.getShopCartData()
  }

  /**
   * 空购物车
   */
  renderEmptyCart = () => {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
          <div style={{
            width: 135,
            height: 135,
            borderRadius: '50%',
            backgroundColor: '#cccccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img style={{ width: 80 }} src='./assets/images/Cart/cartEmpty.svg'/>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', fontSize: 18, marginTop: 12 }}>菜篮为空</div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: 13,
          color: 'rgb(140, 140, 140)',
          marginTop: 12
        }}>“赶紧去采购吧”
        </div>
      </div>
    )
  }

  /**
   * 猜您喜欢
   */
  renderYourLike = () => {
    return (
      <div className='yourLike'>
        <div className='yourLikeTitle'>
          <div></div>
          <div><ReactSVG svgClassName='likeIcon' path='./assets/images/Cart/yourLike.svg'/>猜您喜欢</div>
          <div></div>
        </div>
        <div className='yourLikeContent'>
          <div>
            {this.state.yourLink.map((i, key) => (
              <div key={key} className='yourLikeFood'>
                <img
                  src='http://m.qpic.cn/psb?/V11NnB0x3puSTE/0qT7u8b2fvvv6T9h*KmCax84SEhccXRrMy5fORJt0VM!/b/dLYAAAAAAAAA&bo=WAJUAQAAAAARBz8!&rf=viewer_4'/>
                <div className='yourLikeFoodName'>北海道原味吐司</div>
                <div className='yourLikeFoodPrice'>
                  <div>
                    <span style={{ color: 'red' }}>￥4.5</span>
                    /500g
                  </div>
                  <ReactSVG svgClassName='addCart' path='./assets/images/Cart/addCart.svg'/>
                </div>
              </div>
            ))}
            {this.state.yourLink.length % 2 !== 0 ? <div style={{ width: 200 }}></div> : console.log(1)}
          </div>
        </div>
      </div>
    )
  }

  /**
   * 非空菜篮尾部
   */
  renderCartFooter = () => {
    return (
      <div className='settlement' style={{
        // position: 'absolute',
        // bottom: 50,
        height: 50,
        display: 'flex',
        backgroundColor: 'white',
        width: '100%'
      }}>
        <AgreeItem
          checked={this.state.allSupplierItemCheck}
          onChange={() => {
            this.allSupplierItemCheckOnChange()
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>全选</span>
          </div>
        </AgreeItem>
        <div style={{ flex: 1, display: 'flex' }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgb(140, 140, 140)'
          }}>
            合计：
            <span style={{ color: 'red', fontSize: 18 }}>
                ￥{this.state.total}
              </span>
            （免运费）
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0084e7',
              height: 50,
              width: 90,
              color: 'white'
            }}
            onClick={this.goPay}
          >去结算
          </div>
        </div>
      </div>
    )
  }

  /**
   * 供应商下的食物
   * index-----食物下标,index1供应商下标
   */
  renderFoodItem = (item, index, index1) => {
    return (
      <div key={item.value}>
        <div className='food' style={{ display: 'flex', alignItems: 'center' }}>
          <CheckboxItem
            checked={item.isChecked}
            onChange={() => {
              this.isCheckedOnChange(index1, index)
            }}
            style={{ width: '100%', background: 'transparent', height: 125 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <img style={{ display: 'block', width: 90, height: 90 }}
                   src={'./assets/images/SupplierTest/vegetable.png'}/>
              <div style={{
                height: 105,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingLeft: 20
              }}>
                <div style={{ fontSize: '16px' }}>{item.product_name}</div>
                <div style={{ fontSize: '16px' }}>
                  <span style={{ color: 'red' }}>￥{item.product_price}</span>
                  <span style={{ color: '#8c8c8c' }}>/500g</span>
                </div>
                <div style={{ display: 'flex', color: '#8c8c8c', fontSize: 14 }}>
                  <Stepper
                    ref='stepper'
                    className='Stepper'
                    showNumber
                    min={1}
                    value={this.state.data[index1].shoppingCartDetails[index].product_weight}
                    onChange={(v) => {
                      this.foodAddSub(v, item, index1, index)
                    }}
                  />
                </div>
                <div className={'stepperNumber'}>
                  <InputItem
                    type={'money'}
                    defaultValue={this.state.data[index1].shoppingCartDetails[index].product_weight.toString()}
                    value={this.state.data[index1].shoppingCartDetails[index].product_weight.toString()}
                    prefixListCls={'inputList'}
                    onBlur={(v) => {
                      this.foodAddSub(v, item, index1, index)
                    }}
                    moneyKeyboardAlign='left'
                    moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    editable={false}
                  ></InputItem>
                </div>
              </div>
            </div>
          </CheckboxItem>
        </div>
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ width: 161 }}></div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: 40,
            flex: 1,
            borderTop: '1px solid #e5e5e5'
          }}>
            <div>小计: <span
              style={{ color: 'red' }}>￥{item.product_total_price}</span>{console.log('dshafkdsa', item)}
            </div>
          </div>
          <div style={{ width: 30 }}></div>
        </div>
      </div>
    )
  }

  /**
   * 供应商
   */
  renderSupplierItem = (i, index1) => {
    return (
      <div>
        <div>
          <div style={{ height: 15, background: '#f5f5f5' }}></div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid #CCCCCC',
            borderBottom: '1px solid #CCCCCC',
            height: 40
          }}>
            <div className='checkBox'>
              <AgreeItem defaultChecked={this.state.data[index1].allChecked}
                         checked={this.state.data[index1].allChecked}
                         onChange={() => {
                           this.allCheckedOnChange(index1)
                         }}/>
            </div>
            <img style={{ width: 15 }} src='../../assets/images/Cart/merchant.svg' alt=''/>
            <div style={{ color: '#8C8C8C', marginLeft: 15 }}>{i.company_name}</div>
            <div style={{ flex: 1 }}></div>
            <div style={{ paddingRight: 15 }}><Icon type='right' onClick={() => {
              let cartIdArr = []
              i.shoppingCartDetails.map(j => {
                cartIdArr.push(j.cart_id)
              })
              let supplierReviseData = {
                supplierId: i.supplier_id,
                cartId: cartIdArr.join(',')
              }
              this.props.updateSupplierRevise(supplierReviseData)
              this.props.updatePageTab('HistoryPageTabBar')
              history().push('/supplierRevise')
            }}/></div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
          </div>
          {i.shoppingCartDetails.map((item, index) =>
            <SwipeAction
              style={{ backgroundColor: 'gray' }}
              autoClose
              right={[
                {
                  text: '删除',
                  onPress: () => {
                    this.SlipRightDeleteOnClick(index1, index)
                  },
                  style: { backgroundColor: '#F4333C', color: 'white' }
                }
              ]}
              onOpen={() => console.log('global open')}
              onClose={() => console.log('global close')}
            >
              {this.renderFoodItem(item, index, index1)}
            </SwipeAction>
          )}
        </div>
      </div>
    )
  }

  public render () {
    return (
      <div className='bigContainer'>
        <Head title='菜篮子' backgroundColor='#0084e7'
              rightIconContent={(<span style={{ color: 'white' }}>删除</span>)}
              showRightIcon='true'
              rightIconOnClick={this.HeadDeleteOnclick}>
        </Head>
        <div className='touch_scroll bigContent'>
          {this.state.data && this.state.data.length ? this.state.data.map((i, index1) => (
            <div style={{ backgroundColor: 'white' }}>
              {this.renderSupplierItem(i, index1)}
            </div>
          )) : this.renderEmptyCart()}
          <div>
            {
              this.state.fullscreen && <Loading fullscreen={true}/>
            }
          </div>
          {/*{this.renderYourLike()}*/}
        </div>
        {this.state.data && this.state.data.length ? this.renderCartFooter() : <div></div>}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    shopCartData: state.shopCartData.ShopCartData,
    needReloadData: state.shopCartData.reload,
    allSupplierItemCheck: state.shopCartData.AllSupplierCheckBoolean,
    BookingSheetFood: state.BookingSheetFood.BookingSheetFood
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updatePageTab,
  updataShopCart,
  updataAllSupplierItemCheck,
  updataBookingSheetFood,
  updataOrderId,
  updataToTal,
  updateSupplierRevise,
  needReload
}

export default connect(mapStateToProps, mapDispatchToProps)(History)

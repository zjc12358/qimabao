import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, List, Checkbox, Stepper, SwipeAction, Icon ,Toast } from 'antd-mobile'
import { Loading,Button } from 'element-react'
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

const CheckboxItem = Checkbox.CheckboxItem
const AgreeItem = Checkbox.AgreeItem
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
let moneyKeyboardWrapProps
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault()
  }
}

export interface Props {
  updatePageTab: (pageTab: string) => void,
  updataShopCart: (shopCart: Array<ShopCartSupplierBean>) => void,
  updataAllSupplierItemCheck: (allSupplierItemCheck: boolean) => void,
  needReload: (reload: boolean) => void,
  shopCartData: any,
  needReloadData: boolean,
  allSupplierItemCheck: boolean
}

interface State {
  num: any,
  data: Array<ShopCartSupplierBean>,
  total: number,
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
      yourLink: [1,2,3,4,5,6,7,8,9 ],
      data:  cloneDeep(this.props.shopCartData),
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
  updata = (data,allSupplierItemCheck) => {
    this.props.updataShopCart(data)
    this.props.updataAllSupplierItemCheck(allSupplierItemCheck)
  }

  goPay = () => {
    let url = 'CanteenProcurementManager/user/nail/findNailOpenId?openId=maoxiaoyan'
    let data = JSON.stringify(this.state.data)
    axios.post(url,data,{ headers: { 'Content-Type': 'application/json' } })
      .then(data => {
        if (data.data.status === '0') {
          console.log(data.data)
        } else {
          console.log(data.data)
        }
      })
      .catch(() => {
        Toast.info('错误!')
      })
    history().push('/orderMakeSure',{ name: 'zhangsan' })
    this.props.updatePageTab('HistoryPageTabBar')
  }

  /**
   * 购物车尾部全选事件
   */
  allSupplierItemCheckOnChange = () => {
    this.setState({ allSupplierItemCheck: !this.state.allSupplierItemCheck },function () {
      for (let i = 0; i < this.state.data.length; i++) {
        let data = this.state.data
        data[i].allChecked = this.state.allSupplierItemCheck
        let data2 = data[i].shoppingCartDetails
        // console.log(data2.length)
        for (let j = 0; j < data2.length; j++) {
          // console.log(data2[j].isChecked)
          data2[j].isChecked = this.state.allSupplierItemCheck
        }
        data[i].shoppingCartDetails = data2
        // this.setState({ data: data })
        this.updata(data,this.state.allSupplierItemCheck)
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
  isCheckedOnChange = (index1,index) => {
    let data = this.state.data
    let len = 0
    let len2 = 0
    data[index1].shoppingCartDetails[index].isChecked = !data[index1].shoppingCartDetails[index].isChecked
    for (let i = 0; i < this.state.data[index1].shoppingCartDetails.length; i++) {
      if (this.state.data[index1].shoppingCartDetails[i].isChecked === true) len += 1
      if (len === this.state.data[index1].shoppingCartDetails.length) data[index1].allChecked = true
    }
    if (data[index1].shoppingCartDetails[index].isChecked === false) {
      // this.setState({ allSupplierItemCheck: false },() => {
      this.props.updataAllSupplierItemCheck(false)
      // })
      data[index1].allChecked = false
    }
    for (let i = 0; i < this.state.data.length; i++) {
      let data = this.state.data
      if (data[i].allChecked === true) len2 += 1
      if (len2 === this.state.data.length) {
        // this.setState({ allSupplierItemCheck: true },() => {
        this.props.updataAllSupplierItemCheck(true)
        // })
      }
    }
    // this.setState({ data: data })
    this.props.updataShopCart(data)
    // 计算一遍总计
    this.count()
  }

  /**
   * 供应商的勾选事件
   * @param index1
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
      // this.setState({ allSupplierItemCheck: false },() => {
      this.props.updataAllSupplierItemCheck(false)
      // })
    }
    // this.setState({ data: data })
    this.props.updataShopCart(data)
    // 计算一遍总计
    this.count()
  }

  /**
   * 合计计算
   */
  count = () => {
    console.log(111)
    let total = 0
    for (let i = 0; i < this.state.data.length; i++) {
      let data = this.state.data
      let data2 = data[i].shoppingCartDetails
      for (let j = 0; j < data2.length; j++) {
        if (data2[j].isChecked === true) {
          console.log(total)
          let subtotal = data2[j].product_weight * data2[j].product_price
          total += subtotal
        }
      }
      this.setState({ total: total })
    }
  }

  /**
   * 右滑删除( index1:供应商下标,  index:该食物下标  )
   */
  SlipRightDeleteOnClick = (index1,index) => {
    let data = this.state.data
    data[index1].shoppingCartDetails.splice(index, 1)
    if (data[index1].shoppingCartDetails.length === 0) data.splice(index,1)
    this.setState({ data: data })
    this.props.updataShopCart(data)
  }

  /**
   * 头部删除
   */
  HeadDeleteOnclick = () => {
    console.log(1111)
    if (this.state.allSupplierItemCheck) {
      // 全选状态下清空购物车,总计归0
      this.setState({ data: [],total: 0 })
      this.props.updataShopCart([])
    } else {
      // console.log('我被组织了')
      let data = this.state.data
      for (let i = 0; i < this.state.data.length; i++) {
        if (data[i].allChecked) {
          data.splice(i,1)
          this.setState({ data: data })
          this.props.updataShopCart(data)
        } else {
          let foodList = data[i].shoppingCartDetails
          for (let j = 0; j < foodList.length; j++) {
            if (foodList[j].isChecked) {
              foodList.splice(j,1)
              if (foodList.length === 0) {
                data.splice(i,1)
              }
              data[i].shoppingCartDetails = foodList
              this.setState({ data: data })
              this.props.updataShopCart(data)
            }
          }
        }
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    // if (nextProps === this.props) {
    //   Toast.hide()
    //   return
    // }
    this.setState({ data: nextProps.shopCartData,allSupplierItemCheck: nextProps.allSupplierItemCheck },() => {
      Toast.hide()
    })
  }

  /**
   * 页面加载时判断选中项计算合计
   */
  componentDidMount () {
    this.count()
    // console.log('willDidMount')
    // console.log(this.state.data)
    // console.log(this.props.shopCartData)
    // console.log(this.props.needReloadData)
    if (this.props.needReloadData === false) return
    this.setState({
      fullscreen: true
    })
    let url = 'CanteenProcurementManager/user/shoppingCart/findShoppingCart?'
    let query = ''
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- 购物车data =', data)
        if (data.data.code === 0) {
          this.setState({
            fullscreen: false
          })
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

  /**
   * 空购物车
   */
  renderEmptyCart = () => {
    return (
      <div>
        <div style={{ display: 'flex',justifyContent: 'center', paddingTop: 20 }}>
          <div style={{ width: 135,height: 135,borderRadius: '50%',backgroundColor: '#cccccc',display: 'flex',alignItems: 'center',justifyContent: 'center' }}>
            <img style={{ width: 80 }} src='./assets/images/icon/cartEmpty.svg' />
          </div>
        </div>
        <div style={{ display: 'flex',justifyContent: 'center', fontSize: 18, marginTop: 12 }}>菜篮为空</div>
        <div style={{ display: 'flex',justifyContent: 'center', fontSize: 13, color: 'rgb(140, 140, 140)', marginTop: 12 }}>“赶紧去采购吧”</div>
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
              <div key={ key } className='yourLikeFood'>
                <img src='http://m.qpic.cn/psb?/V11NnB0x3puSTE/0qT7u8b2fvvv6T9h*KmCax84SEhccXRrMy5fORJt0VM!/b/dLYAAAAAAAAA&bo=WAJUAQAAAAARBz8!&rf=viewer_4' />
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
            { this.state.yourLink.length % 2 !== 0 ? <div style={{ width: 200 }}></div> : console.log(1)}
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
      <div className= 'settlement' style={{
        // position: 'absolute',
        // bottom: 50,
        height: 50,
        display: 'flex',
        backgroundColor: 'white',
        width: '100%'
      }}>
        <AgreeItem
          checked={ this.state.allSupplierItemCheck }
          onChange={ () => {
            this.allSupplierItemCheckOnChange()
          }}
        >
          <div style={{ display: 'flex',alignItems: 'center' }}>
            <span>全选</span>
          </div>
        </AgreeItem>
        <div style={{ flex: 1,display: 'flex' }}>
          <div style={{ flex: 1,display: 'flex',alignItems: 'center',justifyContent: 'center',color: 'rgb(140, 140, 140)' }}>
            合计：
            <span style={{ color: 'red',fontSize: 18 }}>
                ￥{this.state.total}
              </span>
            （免运费）
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center',justifyContent: 'center',backgroundColor: '#0084e7',height: 50,width: 90,color: 'white' }}
            onClick={this.goPay}
          >去结算</div>
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
            checked={ this.state.data[index1].shoppingCartDetails[index].isChecked }
            onChange={() => {
              this.isCheckedOnChange(index1,index)
            }}
            style={{ width: '100%', background: 'transparent', height: 125 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <img style={{ display: 'block', width: 90, height: 90 }} src={item.product_icon}/>
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
                    max={10}
                    min={1}
                    defaultValue={this.state.data[index1].shoppingCartDetails[index].product_weight}
                    onChange={(v) => {
                      let data = this.props.shopCartData
                      data[index1].shoppingCartDetails[index].product_weight = v
                      this.props.updataShopCart(data)
                      // this.setState({ data: data })
                      // 计算一遍总计
                      this.count()
                    }}
                  />
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
              style={{ color: 'red' }}>￥{(this.state.data[index1].shoppingCartDetails[index].product_weight * this.state.data[index1].shoppingCartDetails[index].product_price).toFixed(2)}</span>
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
              <AgreeItem defaultChecked={this.state.data[index1].allChecked} checked={this.state.data[index1].allChecked} onChange={() => {
                this.allCheckedOnChange(index1)
              }} />
            </div>
            <img style={{ width: 15 }} src='../../assets/images/Cart/merchant.svg' alt=''/>
            <div style={{ color: '#8C8C8C',marginLeft: 15 }}>{i.company_name}</div>
            <div style={{ flex: 1 }}></div>
            <div style={{ paddingRight: 15 }}><Icon type='right' onClick={ () => {
              this.props.updatePageTab('HistoryPageTabBar')
              history().push('/supplierRevise')
            }} /></div>
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
                    this.SlipRightDeleteOnClick(index1,index)
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
              rightIconOnClick={ this.HeadDeleteOnclick }>
        </Head>
        <div className='touch_scroll bigContent'>
          {this.state.data && this.state.data.length ? this.state.data.map((i, index1) => (
            <div style={{ backgroundColor: 'white' }}>
              {this.renderSupplierItem(i, index1)}
            </div>
          )) : this.renderEmptyCart()}
          <div>
            {
              this.state.fullscreen && <Loading fullscreen={true} />
            }
          </div>
          {this.renderYourLike()}
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
    allSupplierItemCheck: state.shopCartData.AllSupplierCheckBoolean
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updatePageTab,
  updataShopCart,
  updataAllSupplierItemCheck,
  needReload
}

export default connect(mapStateToProps, mapDispatchToProps)(History)

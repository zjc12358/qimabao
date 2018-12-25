import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Stepper, Toast } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import Head from '../../components/Head'
import { MenuDetailBean } from '@datasources/MenuDetailBean'
import { ShopCartSupplierBean } from '@datasources/ShopCartSupplierBean'
import { ShopCartProductBean } from '@datasources/ShopCartProductBean'
import { setReload } from '@store/actions/menu_data'
import ReactSVG from 'react-svg'
import './menuCss.css'
import { MyResponse } from '@datasources/MyResponse'
import { cloneDeep, get, isNil } from 'lodash'
import { MenuSupplierBean } from '@datasources/MenuSupplierBean'
import { MenuProductBean } from '@datasources/MenuProductBean'
import { Loading } from 'element-react'

export interface Props {
  menuId: number
  setReload: (reload: boolean) => void
}

interface State {
  menuDetailBean: MenuDetailBean
  isChange: boolean
  isLoading: boolean
}

class Menu extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      menuDetailBean: null,
      isChange: false,
      isLoading: false
    }
  }

  componentWillMount () {
    this.getMenuDetail()
  }

  /**
   * 菜谱详细
   */
  renderContent = () => {
    return (
      !isNil(this.state.menuDetailBean) &&
      <div className='scroll'
           style={{
             flex: 1,
             marginBottom: 40,
             width: '100%'
           }}>
        {this.state.menuDetailBean.resultVO.map((item, index) => this.renderStoreItem(item, index))}
      </div>
    )
  }

  /**
   * 供应商列
   * @param item
   * @param groupIndex
   */
  renderStoreItem = (item: MenuSupplierBean, groupIndex: number) => {
    return (
      <div className='vertical'>
        <span style={{ height: 1, width: '100%', backgroundColor: '#e5e5e5' }}></span>
        <div className='horizontal'
             style={{
               width: '100%',
               justifyContent: 'space-between',
               height: 30,
               backgroundColor: 'white'
             }}>
          <div style={{ paddingLeft: 10, color: '#e5e5e5' }}>
            <span>图标 </span>
            <span> {item.company_name}</span>
          </div>
          <span style={{ paddingRight: 10 }}>→</span>
        </div>
        <span style={{ height: 1, width: '100%', backgroundColor: '#e5e5e5' }}></span>
        {item.menuBasketList.map((item, index) => this.renderProductItem(item, groupIndex, index))}
      </div>
    )
  }

  /**
   * 商品单列
   * @param item
   * @param groupIndex
   * @param childIndex
   */
  renderProductItem = (item: MenuProductBean, groupIndex: number, childIndex: number) => {
    return (
      <div className='vertical'
           style={{
             backgroundColor: 'white',
             width: '100%',
             marginBottom: 10,
             alignItems: 'flex-start'
           }}>
        <div className='horizontal' style={{ padding: 20 }}>
          <img style={{ display: 'block', width: 90, height: 90 }} src={item.product_icon}/>
          <div style={{
            height: 90,
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
                // className='Stepper'
                showNumber
                max={10}
                min={1}
                defaultValue={this.state.menuDetailBean.resultVO[groupIndex].menuBasketList[childIndex].product_weight}
                onChange={(v) => {
                  let data = this.state.menuDetailBean
                  data.resultVO[groupIndex].menuBasketList[childIndex].product_weight = v
                  this.setState({
                    menuDetailBean: data,
                    isChange: true
                  })
                }}
              />
            </div>
          </div>
        </div>
        <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></span>
        {/*小计和删除*/}
        <div className='horizontal'
             style={{
               width: '100%',
               justifyContent: 'space-between'
             }}>
          <div style={{ paddingLeft: 20 }}>
            <span>小计: </span>
            <span style={{ color: '#ff1717' }}>¥ {item.product_total_price.toFixed(2)}</span>
          </div>
          <span className='horizontal' style={{
            height: 30,
            backgroundColor: '#ff1717',
            paddingLeft: 20,
            paddingRight: 20,
            color: 'white'
          }} onClick={() => this.deleteProductOnClick(groupIndex, childIndex)}>删除</span>
        </div>
      </div>
    )
  }

  /**
   * 底部
   */
  renderFoot = () => {
    return (
      <div className='vertical'
           style={{
             position: 'fixed',
             bottom: 0,
             width: '100%'
           }}>
        <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></span>
        <div className='horizontal'
             style={{
               height: 40,
               width: '100%',
               justifyContent: 'space-between',
               backgroundColor: 'white'
             }}>
          <div style={{ paddingLeft: 20 }}>
            <span>合计: </span>
            <span style={{ color: '#ff0000', fontSize: 16 }}> 总计</span>
            <span> (免运费)</span>
          </div>
          <div className='horizontal'
               style={{
                 height: '100%',
                 backgroundColor: '#0084e7',
                 justifyContent: 'center',
                 fontSize: 16,
                 width: 80,
                 color: 'white'
               }} onClick={this.updateMenuOnClick}>
            确认修改
          </div>
        </div>
      </div>
    )
  }

  /**
   * 删除菜谱
   */
  deleteMenuOnClick = () => {
    this.deleteMenu()
  }

  /**
   * 删除商品
   */
  deleteProductOnClick = (groupIndex: number, childIndex: number) => {
    if (this.state.isLoading) {
      return
    }
    this.setState({
      isLoading: true
    })
    let data = this.state.menuDetailBean
    let productId = data.resultVO[groupIndex].menuBasketList[childIndex].menu_id
    let url = 'CanteenProcurementManager/user/menuBasket/deleteFromMenuId?'
    let query = 'menuId=' + productId
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          Toast.info('删除商品成功', 2, null, false)
          this.setState({
            isLoading: false
          }, () => this.getMenuDetail())
        } else {
          Toast.info(data.data.msg, 2, null, false)
          this.setState({
            isLoading: false
          })
        }
        this.setState({
          isLoading: false
        }, () => this.getMenuDetail())
      })
      .catch(() => {
        Toast.info('请检查网络设置!', 2, null, false)
        this.setState({
          isLoading: false
        })
      })

  }

  /**
   * 确认更新菜谱信息
   */
  updateMenuOnClick = () => {
    this.updateMenu()
  }

  /**
   * 获取菜谱详情
   */
  getMenuDetail () {
    if (this.state.isLoading) {
      return
    }
    this.setState({
      isLoading: true
    })
    let url = 'CanteenProcurementManager/user/menuInfo/findMenuInfoDetail?'
    let query = 'menuId=' + this.props.menuId
    axios.get<MyResponse<MenuDetailBean>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        this.setState({
          isLoading: false
        })
        if (data.data.code === 0) {
          this.setState({
            menuDetailBean: data.data.data
          })
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false
        })
        Toast.info('请检查网络设置!')
      })
  }

  /**
   * 删除菜谱请求
   */
  deleteMenu () {
    if (this.state.isLoading) {
      return
    }
    this.setState({
      isLoading: true
    })
    let url = 'CanteenProcurementManager/user/menuBasket/deleteRecipes?'
    let query = 'menuId=' + this.props.menuId
    axios.get<MyResponse<any>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        this.setState({
          isLoading: false
        })
        if (data.data.code === 0) {
          Toast.info('菜谱已删除', 2, null, false)
          history().goBack()
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!', 2, null, false)
        this.setState({
          isLoading: false
        })
      })

  }

  /**
   * 更新菜谱信息请求
   */
  updateMenu () {
    console.log('更新菜谱')
    let id = this.props.menuId
    // 修改数据才去上传 并重新请求
    if (this.state.isChange) {
      // TODO 2018/11/9 网络请求
      this.props.setReload(true)
      history().goBack()
    } else {
      history().goBack()
    }
  }

  public render () {
    return (
      <div className='vertical' style={{
        backgroundColor: '#efeff5',
        height: '100vh'
      }}>
        <Head title={!isNil(this.state.menuDetailBean) && this.state.menuDetailBean.menu_detail}
              titleColor={'white'} showLeftIcon={true}
              backgroundColor={'#0084e7'} rightIconOnClick={this.deleteMenuOnClick} showRightIcon={true}
              rightIconContent={(<ReactSVG path='./assets/images/ic_delete.svg' svgStyle={{ height: 24, width: 24 }}/>)}
              leftIconColor={'white'}/>
        {this.renderContent()}
        {this.renderFoot()}
        {this.state.isLoading && <Loading fullscreen={true}/>}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    menuId: state.menuDetailData.id
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  setReload
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

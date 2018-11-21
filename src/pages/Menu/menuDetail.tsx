import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Stepper, Toast } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import Head from '../../components/Head'
import { MenuDetailBean } from '../../datasources/MenuDetailBean'
import { ShopCartSupplierBean } from '../../datasources/ShopCartSupplierBean'
import { ShopCartProductBean } from '../../datasources/ShopCartProductBean'
import { setReload } from '@store/actions/menu_data'
import ReactSVG from 'react-svg'

export interface Props {
  menuId: number
  setReload: (reload: boolean) => void
}

interface State {
  menuDetailBean: MenuDetailBean
  isChange: boolean
}

class Menu extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      menuDetailBean: null,
      isChange: false
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
      this.state.menuDetailBean !== null &&
      <div className='scroll'
           style={{
             flex: 1,
             marginTop: 40,
             marginBottom: 40,
             width: '100%'
           }}>
        {this.state.menuDetailBean.storeList.map((item, index) => this.renderStoreItem(item, index))}
      </div>
    )
  }

  /**
   * 供应商列
   * @param item
   * @param groupIndex
   */
  renderStoreItem = (item: ShopCartSupplierBean, groupIndex: number) => {
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
            <span> {item.name}</span>
          </div>
          <span style={{ paddingRight: 10 }}>→</span>
        </div>
        <span style={{ height: 1, width: '100%', backgroundColor: '#e5e5e5' }}></span>
        {item.foodList.map((item, index) => this.renderProductItem(item, groupIndex, index))}
      </div>
    )
  }

  /**
   * 商品单列
   * @param item
   * @param groupIndex
   * @param childIndex
   */
  renderProductItem = (item: ShopCartProductBean, groupIndex: number, childIndex: number) => {
    return (
      <div className='vertical'
           style={{
             backgroundColor: 'white',
             width: '100%',
             marginBottom: 10,
             alignItems: 'flex-start'
           }}>
        <div className='horizontal' style={{ padding: 20 }}>
          <img style={{ display: 'block', width: 90, height: 90 }} src={item.img}/>
          <div style={{
            height: 90,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingLeft: 20
          }}>
            <div style={{ fontSize: '16px' }}>{item.name}</div>
            <div style={{ fontSize: '16px' }}>
              <span style={{ color: 'red' }}>￥{item.price}</span>
              <span style={{ color: '#8c8c8c' }}>/{item.unit}</span>
            </div>
            <div style={{ display: 'flex', color: '#8c8c8c', fontSize: 14 }}>
              <Stepper
                ref='stepper'
                // className='Stepper'
                showNumber
                max={10}
                min={1}
                defaultValue={this.state.menuDetailBean.storeList[groupIndex].foodList[childIndex].count}
                onChange={(v) => {
                  let data = this.state.menuDetailBean
                  data.storeList[groupIndex].foodList[childIndex].count = v
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
            <span style={{ color: '#ff1717' }}>¥ {(item.price * item.count).toFixed(2)}</span>
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
    let data = this.state.menuDetailBean
    data.storeList[groupIndex].foodList.splice(childIndex, 1)
    if (data.storeList[groupIndex].foodList === null || data.storeList[groupIndex].foodList.length < 1) {
      data.storeList.splice(groupIndex, 1)
    }
    this.setState({
      menuDetailBean: data,
      isChange: true
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
    console.log(this.props.menuId)
    // TODO 2018/11/9 网络请求
    let storeList: Array<ShopCartSupplierBean> = []
    for (let i = 0; i < 3; i++) {
      let productList: Array<ShopCartProductBean> = []
      for (let j = 0; j < 5; j++) {
        let productItem: ShopCartProductBean = {
          isChecked: false,
          name: '商品' + j,
          img: '',
          price: j + 1,
          unit: j + 'g',
          count: j + 1
        }
        productList.push(productItem)
      }
      let storeItem: ShopCartSupplierBean = {
        name: '商店' + i,
        allChecked: false,
        foodList: productList
      }
      storeList.push(storeItem)
    }
    this.setState({
      menuDetailBean: {
        storeList: storeList,
        total: 0,
        name: '菜谱' + this.props.menuId
      }
    })
  }

  /**
   * 删除菜谱请求
   */
  deleteMenu () {
    console.log('删除菜谱')
    let id = this.props.menuId
    // TODO 2018/11/9 网络请求
    this.props.setReload(true)
    history().goBack()
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#efeff5',
        height: '100vh'
      }}>
        <Head title={this.state.menuDetailBean.name} titleColor={'white'} showLeftIcon={true}
              backgroundColor={'#0084e7'} rightIconOnClick={this.deleteMenuOnClick} showRightIcon={true}
              rightIconContent={(<ReactSVG path='./assets/images/ic_delete.svg' svgStyle={{ height: 24, width: 24 }}/>)}
              leftIconColor={'white'}/>
        {this.renderContent()}
        {this.renderFoot()}
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

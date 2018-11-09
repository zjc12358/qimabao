import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import Head from '../../components/Head'
import { MenuDetailBean } from '../../datasources/MenuDetailBean'
import { ShopCartSupplierBean } from '../../datasources/ShopCartSupplierBean'
import { ShopCartProductBean } from '../../datasources/ShopCartProductBean'
import { setReload } from '@store/actions/menu_data'

export interface Props {
  menuId: number
  setReload: (reload: boolean) => void
}

interface State {
  menuDetailBean: MenuDetailBean
}

class Menu extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      menuDetailBean: null
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
      <div className='scroll'
           style={{
             flex: 1,
             marginTop: 40,
             marginBottom: 40
           }}>
        1
      </div>
    )
  }

  /**
   * 供应商列
   * @param item
   */
  renderStoreItem = (item: ShopCartSupplierBean) => {
    return (
      <div className='vertical'>
        <span style={{ height: 1, width: '100%', backgroundColor: '#e5e5e5' }}></span>
        <div className='horizontal'
             style={{
               width: '100%',
               justifyContent: 'space-between'
             }}>
          <div style={{ paddingLeft: 10, color: '#e5e5e5' }}>
            <span>图标</span>
            <span>{item.name}</span>
          </div>
          <span style={{ paddingRight: 10 }}>→</span>
        </div>
        <span style={{ height: 1, width: '100%', backgroundColor: '#e5e5e5' }}></span>
        {}
      </div>
    )
  }

  /**
   * 商品单列
   * @param item
   */
  renderProductItem = (item: ShopCartProductBean) => {
    return(
      <div>

      </div>
    )
  }

  /**
   * 底部
   */
  renderFoot = () => {
    return (
      <div className='horizontal'
           style={{
             position: 'fixed',
             bottom: 0,
             height: 40,
             width: '100%',
             justifyContent: 'space-between'
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
             }}>
          确认
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
   * 获取菜谱详情
   */
  getMenuDetail () {
    console.log(this.props.menuId)
    // TODO 2018/11/9 网络请求
    let storeList: Array<ShopCartSupplierBean> = []
    for (let i = 0; i < 2; i++) {
      let productList: Array<ShopCartProductBean> = []
      for (let j = 0; j < 3; j++) {
        let productItem: ShopCartProductBean = {
          isChecked: false,
          name: '商品' + j,
          img: '',
          price: j * Math.random() * 10,
          unit: 'i' + 'g',
          count: Math.random()
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

  public render () {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#efeff5',
        height: '100%'
      }}>
        <Head title={this.state.menuDetailBean.name} titleColor={'white'} showLeftIcon={true}
              backgroundColor={'#0084e7'} rightIconOnClick={this.deleteMenuOnClick} showRightIcon={true}
              rightIconContent={'删除菜谱'}/>
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

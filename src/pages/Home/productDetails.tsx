import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { ProductDetailBean } from '@datasources/ProductDetailBean'

export interface Props {
  productDetailsData: {
    productId: number
  }
}

interface State {
  productDetails?: ProductDetailBean
}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      productDetails: null
    }
  }

  componentWillMount () {
    let id = this.props.productDetailsData.productId
    // TODO 2018/10/30 根据id获取商品信息
    this.getProductDetail(id)
  }

  /**
   * 滑动控制透明度的头部
   */
  renderHead = () => {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        height: 40
      }}>
        {this.state.productDetails!!.product_name}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
          position: 'fixed',
          top: 5,
          left: 0,
          height: 30
        }}>
          返回
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
          position: 'fixed',
          top: 5,
          right: 0,
          height: 30
        }}>
          主页
        </div>
      </div>
    )
  }

  /**
   * 获取商品详情
   */
  getProductDetail (id: number) {
    axios.get('')
      .then(data => {
        console.log('--- data =', data)
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }

  public render () {
    return (
      <div>
        {this.renderHead()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    productDetailsData: state.productDetailsData
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

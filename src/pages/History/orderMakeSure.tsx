import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar,Icon,DatePicker } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import './default.css'
import Head from '../../components/Head/index'
import { ShopCartSupplierBean } from '@datasources/ShopCartSupplierBean'
import { ShopCartProductBean } from '@datasources/ShopCartProductBean'
import history from 'history/createHashHistory'

export interface Props {}

interface State {
  orderData: any,
  visible: any
}

class History extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      visible: false,
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
            onClick={() => this.setState({ visible: true })}
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
              <div>选择送达时间</div>
              <div style={{ paddingRight: 15 }}><Icon type='right'/></div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            </div>
          </div>
          <DatePicker
            visible={this.state.visible}
            onOk={() => this.setState({  visible: false })}
            onDismiss={() => this.setState({ visible: false })}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(History)

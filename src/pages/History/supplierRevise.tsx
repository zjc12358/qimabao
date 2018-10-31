import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, List, Checkbox, Stepper, SwipeAction } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import './default.css'
import Head from '../../components/Head/index'
import { ShopCartSupplierBean } from '@datasources/ShopCartSupplierBean'
import { ShopCartProductBean } from '@datasources/ShopCartProductBean'
import history from 'history/createHashHistory'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
let moneyKeyboardWrapProps
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault()
  }
}

export interface Props {

}

interface State {
  nowSupplierMsg: any,
  supplierList: Array<any>
}

class History extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      nowSupplierMsg: {
        id: 0,
        name: '衢州炒菜软件有限公司',
        foodList: [
          {
            id: 1,
            name: '红烧猪蹄',
            price: 15.5,
            unit: '份'
          }
        ]
      },
      supplierList: [
        {
          id: 0,
          name: '衢州炒菜软件有限公司',
          foodMsg: {
            id: 1,
            name: '红烧猪蹄',
            price: 15.5,
            unit: '份'
          }
        },
        {
          id: 1,
          name: '衢州炒菜软件',
          foodMsg: {
            id: 2,
            name: '红烧猪蹄',
            price: 16.5,
            unit: '份'
          }
        },
        {
          id: 2,
          name: '衢州炒菜软件有',
          foodMsg: {
            id: 3,
            name: '红烧猪蹄',
            price: 17.5,
            unit: '份'
          }
        }
      ]
    }
  }
  renderFoodItem = () => {
    return (
      <div>
        <div className='food' style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 20
          }}>
            <img style={{ display: 'block', width: 90, height: 90 }} src='http://pic16.photophoto.cn/20100722/0042040338742223_b.jpg'/>
            <div style={{
              height: 105,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              paddingLeft: 20
            }}>
              <div style={{ fontSize: '16px' }}>红烧猪蹄</div>
              <div style={{ fontSize: '16px' }}>
                <span style={{ color: 'red' }}>￥12</span>
                <span style={{ color: '#8c8c8c' }}>/份</span>
              </div>
              <div style={{ display: 'flex', color: '#8c8c8c', fontSize: 14 }}>
                <Stepper
                  ref='stepper'
                  className='Stepper'
                  showNumber
                  max={10}
                  min={1}
                  defaultValue={1}
                  onChange={() => { console.log(111) }}
                />
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
              style={{ color: 'red' }}>￥12</span>
            </div>
          </div>
          <div style={{ width: 30 }}></div>
        </div>
      </div>
    )
  }
  public render () {
    return (
      <div>
        <Head
          title='修改供应商'
          backgroundColor='#0084e7'
          rightIconContent='确认'
          showRightIcon='true'
          showLeftIcon='true'
          rightIconOnClick={ () => { console.log('确认修改') } }
        >
        </Head>
        <div style={{ paddingTop: 40 }}>
          {this.state.nowSupplierMsg.foodList.map((i, foodListIndex) => (
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
                  <div style={{ width: 20 }}></div>
                  <div style={{ color: '#8C8C8C' }}>衢州炒菜软件</div>
                </div>
                {this.renderFoodItem()}
                <div style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                </div>
              </div>
              {this.state.supplierList.map((i,supplierListIndex) => (
                <div style={{ height: 45, backgroundColor: 'white',marginTop: 5,paddingLeft: 15,paddingRight: 15,display: 'flex',justifyContent: 'space-between',alignItems: 'center' }}>
                  <div>{this.state.supplierList[supplierListIndex].name}</div>
                  <div>{this.state.supplierList[supplierListIndex].foodMsg.price}/{this.state.supplierList[supplierListIndex].foodMsg.unit}</div>
                </div>
              ))}
            </div>
          ))}
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

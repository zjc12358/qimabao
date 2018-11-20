import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, List, Checkbox, Stepper, SwipeAction, Button } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import './default.css'
import Head from '../../components/Head/index'
import { ShopCartSupplierReviseBean } from '@datasources/ShopCartSupplierReviseBean'
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
  foodList: Array<ShopCartSupplierReviseBean>,
}

class History extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      foodList: []
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
      },
      {
        id: 2,
        name: '青椒肉丝',
        price: 25.5,
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541043891384&di=52fa13745adfe0a22da2e2cd48e0f0d9&imgtype=0&src=http%3A%2F%2Ffood.365jia.cn%2Fuploads%2Fnews%2Ffolder_1744197%2Fimages%2F1ee0c0040368bd20a9a980d639e2623b.jpg',
        count: 3,
        unit: '份',
        nowSupplierMsg: {
          id: 0,
          name: '衢州炒菜软件有限公司'
        },
        otherSupplierList: null
      }
    ]
    this.setState({ foodList: foodList })
  }
  /**
   * 食物增减事件
   * @param v
   * @param foodListIndex
   */
  stepperOnChange = (v,foodListIndex) => {
    let foodList = this.state.foodList
    foodList[foodListIndex].count = v
    this.setState({ foodList: foodList })
  }

  /**
   * 其他供应商点击替换修改内容
   * @param foodListIndex
   * @param otherSupplierListIndex
   */
  otherSupplierOnClick = (foodListIndex,otherSupplierListIndex) => {
    console.log(this.state.foodList[foodListIndex].otherSupplierList[otherSupplierListIndex].name)
    let foodList = this.state.foodList
    let other = this.state.foodList[foodListIndex].otherSupplierList[otherSupplierListIndex]
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
  renderFoodItem = (foodListIndex) => {
    return (
      <div>
        <div className='food' style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 20
          }}>
            <img style={{ display: 'block', width: 90, height: 90 }} src={this.state.foodList[foodListIndex].img}/>
            <div style={{
              height: 105,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              paddingLeft: 20
            }}>
              <div style={{ fontSize: '16px' }}>{this.state.foodList[foodListIndex].name}</div>
              <div style={{ fontSize: '16px' }}>
                <span style={{ color: 'red' }}>￥{this.state.foodList[foodListIndex].price}</span>
                <span style={{ color: '#8c8c8c' }}>/{this.state.foodList[foodListIndex].unit}</span>
              </div>
              <div style={{ display: 'flex', color: '#8c8c8c', fontSize: 14 }}>
                <Stepper
                  ref='stepper'
                  className='Stepper'
                  showNumber
                  max={10}
                  min={1}
                  defaultValue={ this.state.foodList[foodListIndex].count }
                  onChange={ (v) => { this.stepperOnChange(v,foodListIndex) } }
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
              style={{ color: 'red' }}>￥{ this.state.foodList[foodListIndex].count * this.state.foodList[foodListIndex].price }</span>
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
  renderOtherSupplier = (otherSupplierListIndex,foodListIndex) => {
    return (
      <Button onClick={ () => { this.otherSupplierOnClick(foodListIndex,otherSupplierListIndex) }} style={{ height: 45,fontSize: 15,marginTop: 5,paddingLeft: 15,paddingRight: 15,display: 'flex',justifyContent: 'space-between',alignItems: 'center' }}>
        <div>{this.state.foodList[foodListIndex].otherSupplierList[otherSupplierListIndex].name}</div>
        <div>
        <span style={{ color: 'red' }}>{this.state.foodList[foodListIndex].otherSupplierList[otherSupplierListIndex].foodMsg.price}</span>
        <span style={{ color: '#8c8c8c' }}>/{this.state.foodList[foodListIndex].otherSupplierList[otherSupplierListIndex].foodMsg.unit}</span>
        </div>
      </Button>
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
                  <div style={{ color: '#8C8C8C' }}>{this.state.foodList[foodListIndex].nowSupplierMsg.name}</div>
                </div>
                {this.renderFoodItem(foodListIndex)}
                <div style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                </div>
              </div>
              {this.state.foodList[foodListIndex].otherSupplierList && this.state.foodList[foodListIndex].otherSupplierList.length ? this.state.foodList[foodListIndex].otherSupplierList.map((i,otherSupplierListIndex) => (
                this.renderOtherSupplier(otherSupplierListIndex,foodListIndex)
              )) : <div>该菜品暂无其他供应商</div>}
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

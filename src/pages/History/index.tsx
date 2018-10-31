import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, List, Checkbox, Stepper, SwipeAction } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import './default.css'
import Head from '../../components/Head/index'
import { ShopCartSupplierBean } from '@datasources/ShopCartSupplierBean'
import { ShopCartProductBean } from '@datasources/ShopCartProductBean'

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

}

interface State {
  num: any,
  data: Array<ShopCartSupplierBean>,
  total: number,
  allSupplierItemCheck: Boolean,
  isEmpty: boolean,
  yourLink: any
}

class History extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      num: '',
      allSupplierItemCheck: false,
      total: 0,
      isEmpty: false,
      yourLink: [1,2,3,4,5],
      data: []
    }
  }

  /**
   * 空购物车
   */
  reanderEmptyCart = () => {
    return (
      <div>
        <div style={{ display: 'flex',justifyContent: 'center', paddingTop: 20 }}>
          <div style={{ width: 135,height: 135,borderRadius: '50%',backgroundColor: '#cccccc' }}></div>
        </div>
        <div style={{ display: 'flex',justifyContent: 'center', fontSize: 18, marginTop: 12 }}>菜篮为空</div>
        <div style={{ display: 'flex',justifyContent: 'center', fontSize: 13, color: 'rgb(140, 140, 140)', marginTop: 12 }}>“赶紧去采购吧”</div>
        <div style={{ display: 'flex',justifyContent: 'center', alignItems: 'center',marginTop: 40 }}>
          <div style={{ width: '20%',height: 4, backgroundColor: '#cccccc' }}></div>
          <div style={{ fontSize: 18, padding: '0 6px' }}>猜您喜欢</div>
          <div style={{ width: '20%',height: 4, backgroundColor: '#cccccc' }}></div>
        </div>
        <div>
          <div style={{ overflow: 'hidden' }}>
            {this.state.yourLink.map((i, key) => (
              <div style={{ width: '49%', float: 'left' }}>
                <img style={{ display: 'block', width: '100%' }} src='http://pic16.photophoto.cn/20100722/0042040338742223_b.jpg' />
                <div>北海道原味吐司</div>
                <div>
                  <span style={{ color: 'red' }}>￥4.5</span>
                  /500g
                  <div></div>
                </div>
              </div>
            ))}
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
        position: 'fixed',
        bottom: 50,
        height: 50,
        display: 'flex',
        backgroundColor: 'white',
        width: '100%'
      }}>
        <AgreeItem
          checked={ this.state.allSupplierItemCheck }
          onChange={ () => {
            this.setState({ allSupplierItemCheck: !this.state.allSupplierItemCheck })
            for (let i = 0; i < this.state.data.length; i++) {
              let data = this.state.data
              data[i].allChecked = !this.state.allSupplierItemCheck
              let data2 = data[i].foodList
              console.log(data2.length)
              for (let j = 0; j < data2.length; j++) {
                console.log(data2[j].isChecked)
                data2[j].isChecked = !this.state.allSupplierItemCheck
              }
              data[i].foodList = data2
              this.setState({ data: data })
            }
            // 计算一遍总计
            this.count()
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
            checked={ this.state.data[index1].foodList[index].isChecked }
            onChange={() => {
              let data = this.state.data
              let len = 0
              let len2 = 0
              data[index1].foodList[index].isChecked = !data[index1].foodList[index].isChecked
              for (let i = 0; i < this.state.data[index1].foodList.length; i++) {
                if (this.state.data[index1].foodList[i].isChecked === true) len += 1
                if (len === this.state.data[index1].foodList.length) data[index1].allChecked = true
              }
              if (data[index1].foodList[index].isChecked === false) {
                this.setState({ allSupplierItemCheck: false })
                data[index1].allChecked = false
              }
              for (let i = 0; i < this.state.data.length; i++) {
                let data = this.state.data
                if (data[i].allChecked === true) len2 += 1
                if (len2 === this.state.data.length) {
                  this.setState({ allSupplierItemCheck: true })
                }
              }
              this.setState({ data: data })
              // 计算一遍总计
              this.count()
            }}
            style={{ width: '100%', background: 'transparent', height: 125 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <img style={{ display: 'block', width: 90, height: 90 }} src={item.img}/>
              <div style={{
                height: 105,
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
                    className='Stepper'
                    showNumber
                    max={10}
                    min={1}
                    defaultValue={1}
                    onChange={(v) => {
                      let data = this.state.data
                      data[index1].foodList[index].count = v
                      this.setState({ data: data })
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
              style={{ color: 'red' }}>￥{this.state.data[index1].foodList[index].count * this.state.data[index1].foodList[index].price}</span>
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
                let data = this.state.data
                let len = 0
                data[index1].allChecked = !data[index1].allChecked
                for (let i = 0; i < this.state.data[index1].foodList.length; i++) {
                  data[index1].foodList[i].isChecked = data[index1].allChecked
                }
                for (let i = 0; i < this.state.data.length; i++) {
                  if (this.state.data[i].allChecked === true) len += 1
                  if (len === this.state.data.length) this.setState({ allSupplierItemCheck: true })
                }
                if (data[index1].allChecked === false) {
                  this.setState({ allSupplierItemCheck: false })
                }
                this.setState({ data: data })
                // 计算一遍总计
                this.count()
              }} />
            </div>
            <div style={{ width: 20 }}></div>
            <div style={{ color: '#8C8C8C' }}>{i.name}</div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
          </div>
          {i.foodList.map((item, index) =>
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
  /**
   * 食物数量加减按钮 '+'
   */
  addOnClick = (hh) => {
    console.log(hh)
  }
  /**
   * 实物数量加减按钮 '-'
   */
  subtractOnClick = () => {
    console.log('食物-1')
  }

  /**
   * 循环复制
   */
  assign = (arr,obj) => {
    for (let i = 0; i < arr.length; i++) {
      console.log(obj)
      obj[i].allChecked = !this.state.allSupplierItemCheck
      this.setState({ data: obj })
    }
  }

  /**
   * 合计计算
   */
  count = () => {
    console.log(111)
    let total = 0
    for (let i = 0; i < this.state.data.length; i++) {
      let data = this.state.data
      let data2 = data[i].foodList
      for (let j = 0; j < data2.length; j++) {
        if (data2[j].isChecked === true) {
          console.log(total)
          let subtotal = data2[j].count * data2[j].price
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
    data[index1].foodList.splice(index, 1)
    if (data[index1].foodList.length === 0) data.splice(index,1)
    this.setState({ data: data })
  }

  /**
   * 头部删除
   */
  HeadDeleteOnclick = () => {
    console.log(1111)
    if (this.state.allSupplierItemCheck) {
      // 全选状态下清空购物车,总计归0
      this.setState({ data: [],total: 0 })
    } else {
      console.log('我被组织了')
      let data = this.state.data
      for (let i = 0; i < this.state.data.length; i++) {
        if (data[i].allChecked) {
          data.splice(i,1)
          this.setState({ data: data })
        } else {
          let foodList = data[i].foodList
          for (let j = 0; j < foodList.length; j++) {
            if (foodList[j].isChecked) {
              foodList.splice(j,1)
              if (foodList.length === 0) {
                data.splice(i,1)
              }
              data[i].foodList = foodList
              this.setState({ data: data })
            }
          }
        }
      }
    }
  }

  /**
   * 页面加载时判断选中项计算合计
   */
  componentDidMount () {
    this.count()
    let data = [
      {
        value: 1,
        name: '衢州炒菜软件有限公司',
        allChecked: false,
        foodList: [
          {
            isChecked: false,
            name: '红烧秃头',
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540889948447&di=ca343fa9d6d7f4bbb02cf277e48028fb&imgtype=0&src=http%3A%2F%2Fs06.lmbang.com%2FM00%2F37%2FDD%2FecloA1kw5S6ALagJAAKooS2esTQ657.jpg',
            price: 15.5,
            unit: '500g',
            count: 1
          },
          {
            isChecked: false,
            name: '蛋炒饭',
            img: 'http://pic16.photophoto.cn/20100722/0042040338742223_b.jpg',
            price: 35.5,
            unit: '份',
            count: 1
          }
        ]
      },
      {
        value: 1,
        name: '衢州都是煎熬分开了软件有限公司',
        allChecked: false,
        foodList: [
          {
            isChecked: false,
            name: '烤串',
            img: 'http://imgsrc.baidu.com/imgad/pic/item/f11f3a292df5e0fe52737e28576034a85edf72b4.jpg',
            price: 25.5,
            unit: '份',
            count: 1
          }
        ]
      }
    ]
    this.setState({ data: data })
  }
  public render () {
    return (
      <div>
        <Head title='菜篮子' backgroundColor='#0084e7' rightIconContent='删除' showRightIcon='true' rightIconOnClick={ this.HeadDeleteOnclick }></Head>
        <div style={{ height: 40 }}></div>
        {this.state.data.length ? this.state.data.map((i, index1) => (
          <div style={{ backgroundColor: 'white' }}>
            {this.renderSupplierItem(i, index1)}
          </div>
        )) : this.reanderEmptyCart()}
        {this.state.data.length ? this.renderCartFooter() : <div></div>}
        <div style={{ height: 100 }}></div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(History)

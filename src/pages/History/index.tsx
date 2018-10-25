import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, List, Checkbox,InputItem , Flex } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import './default.css'

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

}

class History extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      type: 'money'
    }
  }

  /**
   * 供应商下的食物
   */
  renderFoodItem = () => {
    const data = [
      { value: 0, name: '精选有机红皮洋葱',img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540454190461&di=4ec63d020893da20eb87e4913bf558fd&imgtype=0&src=http%3A%2F%2Fimg007.hc360.cn%2Fk2%2FM0E%2F5B%2FDB%2FwKhQxVidG2-Ea2fJAAAAAOyzV4A037.jpg',price: '15.5',unit: '500g',count: '' },
      { value: 1, name: '精选有机红皮土豆',img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540454256654&di=998aa4f7beaf2baff77e44379940ca2c&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fblog_extra%2F201408%2F27%2F20140827163148_8WrGv.jpeg',price: '25.5',unit: '500g',count: '' },
      { value: 2, name: '精选有机红皮黄瓜',img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540454284106&di=c0eadb783134644f2e577eb1fd7983f5&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Feaf81a4c510fd9f9ba7fb76e2f2dd42a2834a449.jpg',price: '35.5',unit: '500g',count: '' }
    ]
    return (
      <div>
        {data.map(i => (
          <div className='food' style={{ display: 'flex',alignItems: 'center' }} key={i.value}>
            <CheckboxItem style={{ width: '100%',background: 'transparent',height: 125 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <img style={{ display: 'block',width: 90,height: 90 }} src={i.img} />
                <div style={{ height: 105,display: 'flex',flexDirection: 'column' , justifyContent: 'space-between',paddingLeft: 20 }}>
                  <div style={{ fontSize: '16px' }}>{i.name}</div>
                  <div style={{ fontSize: '16px' }}>
                    <span style={{ color: 'red' }}>￥{i.price}</span>
                    <span style={{ color: '#8c8c8c' }}>/{i.unit}</span>
                  </div>
                  <div style={{ display: 'flex',color: '#8c8c8c',fontSize: 14 }}>
                    <div style={{ display: 'flex',alignItems: 'center',justifyContent: 'center' ,width: 30,height: 30,border: '1px solid #8C8C8C' }} onClick={this.subtractOnClick}>-</div>
                    <div style={{ display: 'flex',alignItems: 'center',justifyContent: 'center',border: '1px solid #8C8C8C',borderLeft: 0,borderRight: 0,width: 50,height: 30 }}>1</div>
                    <div style={{ display: 'flex',alignItems: 'center',justifyContent: 'center' ,width: 30,height: 30,border: '1px solid #8C8C8C' }} onClick={this.addOnClick}>+</div>
                  </div>
                </div>
              </div>
            </CheckboxItem>
          </div>
        ))}
      </div>
    )
  }

  /**
   * 供应商
   */
  renderSupplierItem = () => {
    const data = [
      { value: 0, name: '衢州炒菜软件有限公司' },
      { value: 1, name: '大范德萨都是撒反对' },
      { value: 2, name: '电话司法局看到回复撒' }
    ]
    return (
      <div>
        {data.map(i => (
          <div key={i.value}>
            <div style={{ height: 15,background: '#f5f5f5' }}></div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              borderTop: '1px solid #CCCCCC',
              borderBottom: '1px solid #CCCCCC',
              height: 40
            }}>
              <div className='checkBox'><AgreeItem /></div>
              <div style={{ width: 20 }}></div>
              <div style={{ color: '#8C8C8C' }}>{i.name}</div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            </div>
            {this.renderFoodItem()}
          </div>
        ))}
      </div>
    )
  }
  /**
   * 食物数量加减按钮 '+'
   */
  addOnClick = () => {
    console.log('食物+1')
  }
  /**
   * 实物数量加减按钮 '-'
   */
  subtractOnClick = () => {
    console.log('食物-1')
  }
  public render () {
    return (
      <div>
        {this.renderSupplierItem()}
        <InputItem
          type='money'
          placeholder= 'start from right'
          defaultValue = '1'
          clear
          onChange={(v) => { console.log('onChange', v) }}
          onBlur={(v) => { console.log('onBlur', v) }}
          moneyKeyboardWrapProps={moneyKeyboardWrapProps}
        >光标在右</InputItem>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {

  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {

}

export default connect(mapStateToProps, mapDispatchToProps)(History)

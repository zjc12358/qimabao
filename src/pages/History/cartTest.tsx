import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar,Icon,DatePicker,List,Modal,Button,Radio,Checkbox } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import './default.css'
import Head from '../../components/Head/index'
import { ShopCartSupplierBean } from '@datasources/ShopCartSupplierBean'
import { ShopCartProductBean } from '@datasources/ShopCartProductBean'
import history from 'history/createHashHistory'
import { ShopCartTestBean } from '@datasources/ShopCartTestBean'
import { updateShopCartTest } from '@store/actions/shopCartTest-data'

export interface Props {
  updateShopCartTest: (shopCartTest: ShopCartTestBean) => void,
  data: null
}

interface State {

}

class History extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: {}
    }
  }
  componentDidMount () {
    console.log('componentDidMount')
    this.props.updateShopCartTest({
      name: '张三',
      img: '',
      price: 0,
      unit: '',
      count: 0
    })
    this.setState({ data: this.props.data })
  }
  componentWillReceiveProps (nextProps) {
    console.log(111)
    if (nextProps !== this.props) {
      console.log(111111111111)
    }
  }
  public render () {
    return (
      <div>
        <div onClick = { () => {
          this.props.updateShopCartTest({
            name: '张三',
            img: '',
            price: 0,
            unit: '',
            count: 0
          })
        } }>dsjalfdjsakl</div>
        <div style={{ height: 100,width: 100,backgroundColor: 'red' }}></div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    data: state.shopCartTestData
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updateShopCartTest
}

export default connect(mapStateToProps, mapDispatchToProps)(History)

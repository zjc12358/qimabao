import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import './default.css'
import Head from '../../components/Head/index'
import { ShopCartSupplierBean } from '@datasources/ShopCartSupplierBean'
import { ShopCartProductBean } from '@datasources/ShopCartProductBean'
import history from 'history/createHashHistory'

export interface Props {

}

interface State {

}

class History extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {

    }
  }

  public render () {
    return (
      <div>
        <Head
          title='确认订单'
          showLeftIcon='true'
        >
        </Head>
        <div style={{ marginTop: 40 }}>
          我是确认订单
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

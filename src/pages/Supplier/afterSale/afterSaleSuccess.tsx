import * as React from 'react'
import { Tabs,Button, Icon } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { addPageIndex, deletePageIndex } from '@store/actions/global_data'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import './master.css'
import Head from '@components/Head'

export interface Props {
}

interface State {
  data: any
  getEmpty: boolean
}

class Supplier extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      getEmpty: true,
      data: [
        { code: 'SP057899444220', Commodity: '茴香根 根茎 蔬菜 新鲜 500克',price: '15.5',dateTime: '2018-10-10 15:11:08' },
        { code: 'SP057899444221', Commodity: '新鲜百合 食用鲜百合蔬菜 1000g',price: '22.5',dateTime: '2018-10-10 15:11:08' }
      ]
    }
  }
  /**
   * 内容
   */
  public renderContent = () => {
    return(
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        paddingTop: 40
      }}>
        <div className={'refundSuccessPage'}>
          <ReactSVG path='../../../../assets/images/Supplier/success.svg' svgStyle={{ width: 100, height: 100 }}/>
          <span className={'refundSuccess'}>退款成功</span>
          <span className={'refundSuccessNumber'}>买家已收到退款：<span className={'refundSuccess'}>45.0元</span></span>
        </div>
        <div style={{ padding: 20 }}>
          <button className={'completeBtn'} >完成</button>
        </div>
      </div>
    )
  }

  public render () {
    return (
      <div style={{
        height: '100vh',
        backgroundColor: '#ffffff'
      }}>
        <Head title={'退款结果'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#ffffff'} leftIconColor={'grey'}/>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Supplier)

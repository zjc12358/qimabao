import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TextareaItem,List,InputItem,Button,ImagePicker } from 'antd-mobile'
import Drawer from '@material-ui/core/Drawer'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import Head from '../../components/Head/index'
import './withdrawal.less'

export interface Props {

}

interface State {
  data: any
}
let IconMaxSize: number = 30
class Withdrawal extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  renderChooseBank = () => {
    return (
      <List.Item
        arrow='horizontal'
        className='brank'
        style={{ marginTop: 55 }}
        onClick={() => { console.log(1) }}
      >
        <div className={'brankWrap'}>
          <img style={{ width: 60,height: 60 }} src='./assets/images/SupplierTest/bank.png' alt=''/>
          <div className='brankMsg'>
            <div>中国工商银行</div>
            <div className='fontGray' style={{ fontSize: 14 }}>624745456454564546456</div>
          </div>
        </div>
      </List.Item>
    )
  }

  public render () {
    return (
      <div className='withdrawal'>
        <Head
          showLeftIcon='true'
          title='提现申请'
          backgroundColor='#0084e7'
          leftIconColor='white'
        />
        {this.renderChooseBank()}
        <div className='prompt' style={{ height: 45 }} >
          <div></div>
          请检查账号类别及账号,确保是提现您本人的账号
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Withdrawal)

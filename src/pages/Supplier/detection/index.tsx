import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { List,InputItem,Button } from 'antd-mobile'
import Drawer from '@material-ui/core/Drawer'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import Head from '../../../components/Head/index'

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

  public render () {
    return (
      <div className='withdrawal'>
        <Head
          showLeftIcon='true'
          title='提现申请'
          backgroundColor='#0084e7'
          leftIconColor='white'
        />
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Withdrawal)

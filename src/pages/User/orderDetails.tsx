import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, Icon, DatePicker, List, Modal, Button, Radio, Checkbox, TextareaItem } from 'antd-mobile'
import ReactSVG from 'react-svg'
import Head from '../../components/Head/index'
import './orderDetail.less'
import history from 'history/createHashHistory'

const nowTimeStamp = Date.now()
const now = new Date(nowTimeStamp)
const RadioItem = Radio.RadioItem

export interface Props {

}

interface State {

}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount () {
    console.log(1)
  }

  componentWillReceiveProps (nextProps) {
    console.log(1)
  }

  public render () {
    let styles = {

    }
    return (
      <div>
        <Head title='订单详情' backgroundColor='#0084e7' />
        <div className='stateBox'>
          <div>
            <div style={{ fontSize: 20 }}>交易关闭</div>
            <div>超市关闭</div>
          </div>
          <div>
            <ReactSVG path='' />
          </div>
        </div>
        <div className='addressBox'>
          <ReactSVG path='' />
          <div>
            <div>何静建</div>
            <div>浙江省 衢州市 柯城区 荷花街道 兴化苑 35幢2单元</div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(User)

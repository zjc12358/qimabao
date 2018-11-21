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
        <div style={{ display: 'flex',flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center' }}>
          <Head
            style={{ display: 'flex',flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center' }}
            showLeftIcon='true'
            title='订单详情'
            backgroundColor='#0084e7'
            leftIconColor='white'
          />
        </div>
        <div className='stateBox'>
          <div>
            <div style={{ fontSize: 18 }}>交易关闭</div>
            <div style={{ marginTop: 5 }}>超市关闭</div>
          </div>
          <div style={{ flex: 1 }}></div>
          <div>
            <img style={{ width: 151,display: 'block' }} src='./assets/images/box.png' />
          </div>
        </div>
        <div className='addressBox'>
          <ReactSVG svgClassName='location' path='./assets/images/location.svg' />
          <div className='addressMsg' style={{ fontSize: 14 }}>
            <div>何静建</div>
            <div>浙江省 衢州市 柯城区 荷花街道 兴化苑 35幢2单元</div>
          </div>
        </div>
        <div className='orderDetail'>
          <div className='orderNum' style={{ fontSize: 12 }}>订单号: SP057899444221</div>
          <div>
            <ReactSVG svgClassName='icon' path='./assets/images/Cart/merchant.svg' />
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

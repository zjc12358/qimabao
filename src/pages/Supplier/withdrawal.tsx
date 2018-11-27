import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { List,InputItem,Button } from 'antd-mobile'
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
  data: any,
  openDrawer: boolean
}
let IconMaxSize: number = 30
class Withdrawal extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: {},
      openDrawer: false
    }
  }

  toggleDrawer = (open) => () => {
    console.log(1111)
    this.setState({ openDrawer: open })
  }

  /**
   * 银行选择
   */
  renderChooseBank = () => {
    return (
      <List.Item
        arrow='horizontal'
        className='brank'
        style={{ marginTop: 55 }}
        onClick={this.toggleDrawer(true)}
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

  /**
   * 提示语句
   * @param height
   * @param text
   */
  renderPrompt = (height,text) => {
    return (
      <div className='prompt' style={{ height: height }} >
        <div className='point'></div>
        <div style={{ flex: 1 }}>
          {text}
        </div>
      </div>
    )
  }

  /**
   * 提现
   */
  renderWidthdwral = () => {
    return (
      <List>
        <List.Item>
          <div className='parameter'>
            <div style={{ width: 90 }}>可提现金额</div>
            <div style={{ paddingLeft: 15 }}>12312313.1元</div>
          </div>
        </List.Item>
        <List.Item>
          <div className='parameter'>
            <div style={{ width: 90 }}>提现金额</div>
            <InputItem
              placeholder='最低100最高5万'
              moneyKeyboardAlign='left'
              style={{ flex: 1,fontSize: 14 }}
              type={'money'}
            />
          </div>
        </List.Item>
      </List>
    )
  }

  /**
   * 确认提交
   */
  renderMakeSure = () => {
    return (
      <div style={{ padding: '0 15px' }}>
        <Button type='primary'>确认转出</Button>
      </div>
    )
  }

  /**
   * 底部弹窗
   */
  renderBottomDrawer = () => {
    return (
      <div>
        <Drawer
          style={{ backgroundColor: 'black' }}
          anchor='bottom'
          open={this.state.openDrawer}
          onClose={this.toggleDrawer(false)}
        >
          122212112
        </Drawer>
      </div>
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
        {this.renderPrompt(45,'请检查账号类别及账号，确保是提现您本人的账号')}
        {this.renderWidthdwral()}
        {this.renderPrompt(90,'提现须向第三方交纳一定金额的手续费，提现到账时间3-7个工作日，请耐心等待。如超过7个工作日仍未到账请联系客服。')}
        {this.renderMakeSure()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Withdrawal)

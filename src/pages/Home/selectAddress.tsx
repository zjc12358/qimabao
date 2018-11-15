import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, SearchBar } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import Head from '../../components/Head'
import { Map } from 'react-amap'

export interface Props {

}

interface State {
  showTitle: boolean
  showMap: boolean
}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      showTitle: true,
      showMap: false
    }
  }

  /**
   * 搜索栏
   */
  renderSearch = () => {
    return (
      <div className='vertical selectAddress'
           style={{ marginTop: (this.state.showTitle ? 40 : 0), width: '100%' }}>
        <SearchBar
          placeholder={'请输入您的收货地址'}
          onFocus={this.searchOnFocus}
          onChange={(text) => this.searchOnChange(text)}
          onSubmit={this.searchOnSubmit}
          onCancel={this.allCancelOnClick}
          style={{
            width: '100%',
            zIndex: 100
          }}/>
        {!this.state.showTitle &&
        <div className='vertical'
             style={{
               position: 'fixed',
               top: '0',
               width: '100vh',
               height: '100vh',
               zIndex: 50,
               backgroundColor: 'rgba(204,204,204,0.5)'
             }} onClick={this.allCancelOnClick}>
          {this.state.showMap &&
          this.renderMap()
          }
          {this.renderAddressList}
        </div>}
      </div>
    )
  }

  /**
   * 地图
   */
  renderMap = () => {
    return (
      <div>
      </div>
    )
  }

  /**
   * 地址列表
   */
  renderAddressList = () => {
    return (
      <div>
      </div>
    )
  }

  /**
   * 地址单条样式
   */
  renderAddressListItem = () => {
    return (
      <div>
      </div>
    )
  }

  /**
   * 新增地址
   */
  addAddressOnClick = () => {
    history().push('')
  }

  /**
   * 搜索框聚焦
   */
  searchOnFocus = () => {
    this.setState({
      showTitle: false
    })
  }

  /**
   * 搜索框改变文字
   */
  searchOnChange = (text: string) => {
    console.log('输入' + text)
  }

  /**
   * 搜索框点击提交
   */
  searchOnSubmit = () => {
    console.log('提交')
  }

  /**
   * 点击搜索背景
   */
  allCancelOnClick = () => {
    this.setState({
      showTitle: true
    })
  }

  public render () {
    return (
      <div style={{ backgroundColor: '#efeff5' }}>
        {this.state.showTitle &&
        <Head title={'选择收货地址'} titleColor={'#000000'} showLeftIcon={true} backgroundColor={'#ffffff'}
              rightIconOnClick={this.addAddressOnClick} showRightIcon={true}/>
        }
        {this.renderSearch()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

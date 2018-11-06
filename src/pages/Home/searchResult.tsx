import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import { SearchData } from '@store/reducers/searchDataReducer'
import { updatePageTab } from '@store/actions/global_data'
import OutSideShade from '@components/OutSideShade'
import { showShade } from '@store/actions/outSideShade_data'
import ChooseMenu from '@components/ChooseMenu'
import { SearchResultBean } from '@datasources/SearchResultBean'
import './homeCss.css'

export interface Props {
  searchData: SearchData
  updatePageTab: (pageIndex: string) => void,
  showShade: (isShow: boolean) => void
}

interface State {
  sortData: Array<string>
  sortIndex: number
  searchResult: Array<SearchResultBean>
}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      sortData: ['价格高到低', '价格低到高', '销量高到低', '优惠优先'],
      sortIndex: null,
      searchResult: []
    }
  }

  componentWillMount () {
    let list: Array<SearchResultBean> = []
    for (let i = 0; i < 10; i++) {
      let item: SearchResultBean = {
        id: i,
        name: '商品' + i,
        price: i * 100,
        weight: '10' + i + 'g',
        buy: true,
        store: '商店' + i,
        storeId: i
      }
      list.push(item)
    }
    this.setState({
      searchResult: list
    })
  }

  /**
   * 头部
   */
  renderHead = () => {
    return (
      <div style={{
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%'
      }}>
        <div style={{
          flex: 1,
          height: '100%',
          margin: 15,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }} onClick={this.goBackOnClick}>
          返回
        </div>
        <div style={{
          flex: 4,
          height: 30,
          borderStyle: 'solid',
          borderWidth: 0,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: '#f5f5f5'
        }} onClick={this.goBackOnClick}>
          <span style={{ paddingLeft: 10 }}>搜索</span>
          <span style={{
            backgroundColor: '#f5f5f5', borderStyle: 'solid', paddingLeft: 10,
            borderWidth: 0
          }} className={'input'}>{this.props.searchData.searchText}</span>
        </div>
        <div style={{
          flex: 1,
          height: '100%',
          marginRight: 15,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }} onClick={this.goShopCart}>
          购物车
        </div>
      </div>
    )
  }

  /**
   * 筛选按钮
   */
  renderChoose = () => {
    return (
      <div style={{
        width: '100%'
      }}>
        <div style={{
          height: 40,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'white'
        }}>
          <span style={{ height: 30, width: 1, marginTop: 5, backgroundColor: '#e5e5e5' }}></span>
          {/*<div style={{*/}
          {/*flex: 1,*/}
          {/*display: 'flex',*/}
          {/*flexDirection: 'row',*/}
          {/*justifyContent: 'center',*/}
          {/*alignItems: 'center'*/}
          {/*}} onClick={this.chooseOnClick}>*/}
          {/*<span>全部分类</span>*/}
          {/*<span>↓</span>*/}
          {/*</div>*/}
          <span style={{ height: 30, width: 1, marginTop: 5, backgroundColor: '#e5e5e5' }}></span>
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }} onClick={this.chooseOnClick}>
            <span>默认排序</span>
            <span>↓</span>
          </div>
          <span style={{ height: 30, width: 1, marginTop: 5, backgroundColor: '#e5e5e5' }}></span>
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <span>筛选</span>
            <span>→</span>
          </div>
        </div>
        <ChooseMenu chooseHandClick={this.chooseHandClick.bind(this)} data={this.state.sortData}/>
      </div>
    )
  }

  /**
   * 搜索结果
   */
  renderContent = () => {
    return (
      <div className='scroll'
           style={{
             display: 'flex',
             flexDirection: 'row',
             justifyContent: 'space-between',
             alignItems: 'center',
             flex: 1,
             flexWrap: 'wrap',
             width: '100%'
           }}>
        {this.state.searchResult.map((item) => this.renderContentItem(item))}
      </div>
    )
  }

  /**
   * 搜索结果单项
   */
  renderContentItem = (item: SearchResultBean) => {
    return (
      <div style={{
        width: '49%',
        height: 0,
        paddingBottom: '130%',
        backgroundColor: 'white'
      }}>
        {item.name}
      </div>
    )
  }

  /**
   * 返回
   */
  goBackOnClick = () => {
    history().goBack()
  }

  /**
   * 跳转到购物车
   */
  goShopCart = () => {
    this.props.updatePageTab('HistoryPageTabBar')
  }

  /**
   * 点击筛选栏
   */
  chooseOnClick = () => {
    this.props.showShade(true)
  }

  /**
   * 筛选栏回调
   */
  chooseHandClick = (index: number) => {
    console.log(index)
    this.setState({
      sortIndex: index
    })
    // TODO 2018/11/6 根据index 判断选择类型 请求数据
  }

  public render () {
    return (
      <div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: '#efeff5',
          height: '100vh'
        }}>
          {this.renderHead()}
          <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></span>
          {this.renderChoose()}
          {this.renderContent()}
        </div>
        <OutSideShade/>
      </div>

    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    searchData: state.searchData
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updatePageTab,
  showShade
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

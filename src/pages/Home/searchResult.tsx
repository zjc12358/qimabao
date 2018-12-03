import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, ListView } from 'antd-mobile'
import axios from 'axios'
import history from 'history/createHashHistory'
import { SearchData } from '@store/reducers/searchDataReducer'
import { updatePageTab } from '@store/actions/global_data'
import ChooseMenu from '@components/ChooseMenu'
import { SearchResultBean } from '@datasources/SearchResultBean'
import './homeCss.css'
import './searchResultCss.css'
import LoadMore from '@components/LoadMore'
import Drawer from '@material-ui/core/Drawer/Drawer'
import Input from '@material-ui/core/Input/Input'
import { TagBean } from '@datasources/TagBean'

// 页码
let pageIndex = 0

let sortTag = ['有机', '冷冻', '纯天然', '野生', '绿色', '深加工']

export interface Props {
  searchData: SearchData
  updatePageTab: (pageIndex: string) => void,
}

interface State {
  sortData: Array<string>
  sortIndex: number
  searchResultList: Array<SearchResultBean>
  isLoading: boolean
  hasMore: boolean
  showChoose: boolean
  drawerOpen: boolean
  tagList: Array<TagBean>
  minPrice: number // 最低价
  maxPrice: number // 最高价
}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      sortData: ['价格高到低', '价格低到高', '销量高到低', '优惠优先'],
      sortIndex: null,
      searchResultList: [],
      isLoading: false,
      hasMore: true,
      showChoose: false,
      drawerOpen: false,
      tagList: [],
      minPrice: null,
      maxPrice: null
    }
  }

  componentDidMount () {
    this.refresh()
    this.getTagList()
  }

  refresh () {
    if (this.state.isLoading) {
      return
    }
    this.setState({ isLoading: true })
    setTimeout(() => {
      this.getSearchList(0)
      this.setState({
        isLoading: false
      })
    }, 1000)
  }

  loadMore () {
    if (pageIndex > 5) {
      this.setState({
        hasMore: false
      })
      return
    }
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    this.setState({ isLoading: true })
    setTimeout(() => {
      this.getSearchList(pageIndex++)
      this.setState({
        isLoading: false
      })
    }, 1000)
  }

  getTagList () {
    let list: Array<TagBean> = []
    for (let i = 0; i < 6; i++) {
      let item: TagBean = {
        name: sortTag[i],
        id: i,
        checked: false
      }
      list.push(item)
    }
    this.setState({
      tagList: list
    })
  }

  /**
   * 头部
   */
  renderHead = () => {
    return (
      <div className='horizontal head'>
        <div className='horizontal head-back'
             onClick={this.goBackOnClick}>
          返回
        </div>
        <div className='horizontal head-search'
             onClick={this.goBackOnClick}>
          <span style={{ paddingLeft: 10 }}>搜索</span>
          <span className='head-search-text'>{this.props.searchData.searchText}</span>
        </div>
        <div className='horizontal head-shopCart'
             onClick={this.goShopCart}>
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
      <div style={{ width: '100%' }}>
        <div className='horizontal'
             style={{
               height: 40,
               width: '100%',
               backgroundColor: 'white'
             }}>
          <span style={{ height: 30, width: 1, marginTop: 5, backgroundColor: '#e5e5e5' }}></span>
          <div className='horizontal-center'
               style={{ flex: 1, position: 'relative' }}
               onClick={this.chooseOnClick}>
            <span>{this.state.sortIndex === null ? '默认排序' : this.state.sortData[this.state.sortIndex]}</span>
            <span>↓</span>
          </div>
          <span style={{ height: 30, width: 1, marginTop: 5, backgroundColor: '#e5e5e5' }}></span>
          <div className='horizontal-center'
               style={{ flex: 1 }}
               onClick={() => this.toggleDrawer(true)}>
            <span>筛选</span>
            <span>→</span>
          </div>
        </div>
        <ChooseMenu chooseHandClick={this.chooseHandClick.bind(this)} data={this.state.sortData}
                    chooseIndex={this.state.sortIndex} isShow={this.state.showChoose}
                    closeHandClick={this.closeHandClick.bind(this)}/>
      </div>
    )
  }

  /**
   * 搜索结果ListView
   */
  renderContentList = () => {
    let list =
      <div className='horizontal search-list-content'>
        {this.state.searchResultList.map((item) => this.renderContentItem(item))}
      </div>
    return (
      <div className='scroll search-list'>
        <LoadMore loadHeight={10} getData={this.loadMore.bind(this)} list={list}
                  bodyName={'search-list'} itemHeight={110} listData={this.state.searchResultList}
                  hasMore={this.state.hasMore} isLoading={this.state.isLoading}/>
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
        height: 220,
        backgroundColor: 'white',
        marginTop: 5
      }}>
        {item.name}
      </div>
    )
  }

  /**
   * 抽屉内部布局
   */
  renderDrawer = () => {
    return (
      <div className='vertical' style={{ height: '100%' }}>
        <span style={{ height: 40, fontSize: 20, marginTop: 20 }}>价格筛选</span>
        <div style={{ margin: 10 }}>
          <div className='price-area-border'>
            <div className='horizontal'>
              <Input style={{ width: 100, paddingLeft: 10 }} onChange={this.priceMinChange} placeholder={'最低价'}
                     type={'number'} disableUnderline={true} className='center price-input-border'>
                {this.state.minPrice === null ? '' : this.state.minPrice}
              </Input>
              <span style={{ width: 15, height: 1, backgroundColor: 'black', marginRight: 2, marginLeft: 2 }}/>
              <Input style={{ width: 100, paddingLeft: 10 }} onChange={this.priceMaxChange} placeholder={'最高价'}
                     type={'number'} disableUnderline={true} className='center price-input-border'>
                {this.state.maxPrice === null ? '' : this.state.maxPrice}
              </Input>
            </div>
          </div>
        </div>
        <span style={{ width: '100%', marginTop: 20 }}><span style={{ marginLeft: 20, fontSize: 14 }}>特色</span></span>
        <div className='horizontal'
             style={{ flexWrap: 'wrap', width: 200 }}>
          {this.state.tagList.map((item, index) => this.renderDrawerTagItem(item.name, item.checked, index))}</div>
      </div>
    )
  }

  /**
   * 标签样式
   */
  renderDrawerTagItem = (item: string, checked: boolean, index: number) => {
    return (
      checked ?
        <div className='center drawer-tag-item-onClick' onClick={() => this.tagOnClick(index, checked)}>
          <span>{item}</span>
        </div>
        :
        <div className='center drawer-tag-item' onClick={() => this.tagOnClick(index, checked)}>
          <span>{item}</span>
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
    history().push('/')
  }

  /**
   * 点击筛选栏
   */
  chooseOnClick = () => {
    this.setState({
      showChoose: true
    })
  }

  /**
   * 关闭弹窗
   */
  closeHandClick = () => {
    this.setState({
      showChoose: false
    })
  }

  /**
   * 筛选栏回调
   */
  chooseHandClick = (index: number) => {
    this.setState({
      sortIndex: index
    })
    // TODO 2018/11/6 根据index 判断选择类型 请求数据
  }

  /**
   * 抽屉显示控制
   * @param open
   */
  toggleDrawer = (open) => {
    this.setState({
      drawerOpen: open
    })
  }

  /**
   * 改变最低价
   * @param key
   * @param event
   */
  priceMinChange = (event) => {
    this.setState({
      minPrice: event.target.value
    })
  }

  /**
   * 改变最高价
   * @param event
   */
  priceMaxChange = (event) => {
    this.setState({
      maxPrice: event.target.value
    })
  }

  /**
   * 点击标签
   */
  tagOnClick = (index: number, checked: boolean) => {
    let tagList = this.state.tagList
    tagList[index].checked = !checked
    this.setState({
      tagList
    })
  }

  /**
   * 模拟请求数据
   */
  getSearchList (page) {
    if (this.state.isLoading || !this.state.hasMore) {
      return
    }
    this.setState({
      isLoading: true
    })
    console.log('加载数据')
    let list: Array<SearchResultBean> = []
    for (let i = 0; i < 5; i++) {
      let item: SearchResultBean = {
        id: i,
        name: '商品' + i,
        price: i * 100,
        weight: '10' + i + 'g',
        buy: true,
        store: '商店' + i,
        storeId: i,
        pic: ''
      }
      list.push(item)
    }
    if (page > 0) {
      this.setState({
        searchResultList: this.state.searchResultList.concat(list)
      })
      pageIndex++
    } else {
      this.setState({
        searchResultList: list
      })
      pageIndex = 1
    }
    this.setState({
      isLoading: false
    })
  }

  public render () {
    return (
      <div>
        <div className='vertical'
             style={{ backgroundColor: '#efeff5', height: '100vh' }}>
          {this.renderHead()}
          <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></span>
          {this.renderChoose()}
          <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></span>
          {this.renderContentList()}
          <Drawer anchor={'right'} open={this.state.drawerOpen} onClose={() => this.toggleDrawer(false)}>
            {this.renderDrawer()}
          </Drawer>
        </div>
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
  updatePageTab
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

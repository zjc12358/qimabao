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

// 一次加载多少数据
const NUM_SECTIONS = 1
// 每页数据 内对象数
const NUM_ROWS_PER_SECTION = 5
// 页码
let pageIndex = 0

// Object {
//     S0, R0: "S0, R0",
//     S0, R1: "S0, R1",
//     S0, R2: "S0, R2",
//     S0, R3: "S0, R3",
//     S0, R4: "S0, R4",
//     Section 0: "Section 0"
// }
// S 页数 R 单条
// ListView 组件 等于把每页数据对应 section id  每页数据内每个对象 对应rowid
const dataBlobs = {}
// 标记页码
let sectionIDs = []
let rowIDs = []
// 添加数据
// dataBlobs 都是在改这个对象的数据
function genData (pIndex = 0) {
  // 页数循环
  for (let i = 0; i < NUM_SECTIONS; i++) {
    // 实际下标 页数*一页数据 + 循环下标
    const ii = (pIndex * NUM_SECTIONS) + i
    //
    const sectionName = `Section ${ii}`
    // sectionIDs 下标数组
    sectionIDs.push(sectionName)
    // 标记第几页
    dataBlobs[sectionName] = sectionName
    console.log(dataBlobs)
    rowIDs[ii] = []
    // 一页内 行数循环
    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`
      rowIDs[ii].push(rowName)
      dataBlobs[rowName] = rowName
    }

  }
  // ["Section 0", "Section 1", "Section 2", "Section 3", "Section 4"]
  sectionIDs = [...sectionIDs]
  // [["S0,R0","S0,R1",...],["S1,R0","S1,R1",...]]
  rowIDs = [...rowIDs]
}

// const data = [{
//   id: -1,
//   name: '商品' + -1,
//   price: -1 * 100,
//   weight: '10' + -1 + 'g',
//   buy: true,
//   store: '商店' + -1,
//   storeId: -1,
//   pic: ''
// }, {
//   id: -1,
//   name: '商品' + -1,
//   price: -1 * 100,
//   weight: '10' + -1 + 'g',
//   buy: true,
//   store: '商店' + -1,
//   storeId: -1,
//   pic: ''
// },
//   {
//     id: -1,
//     name: '商品' + -1,
//     price: -1 * 100,
//     weight: '10' + -1 + 'g',
//     buy: true,
//     store: '商店' + -1,
//     storeId: -1,
//     pic: ''
//   }
// ]

export interface Props {
  searchData: SearchData
  updatePageTab: (pageIndex: string) => void,
}

interface State {
  sortData: Array<string>
  sortIndex: number
  searchResult: Array<SearchResultBean>
  dataSource: any
  isLoading: boolean
  showChoose: boolean
}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID]
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID]

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })
    this.state = {
      sortData: ['价格高到低', '价格低到高', '销量高到低', '优惠优先'],
      sortIndex: null,
      searchResult: [],
      dataSource: dataSource,
      isLoading: true,
      showChoose: false
    }
  }

  loadData () {
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
    this.setState({
      searchResult: this.state.searchResult.concat(list)
    })
  }

  componentDidMount () {
    setTimeout(() => {
      genData()
      this.loadData()
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false
      })
    }, 600)
  }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading) {
      return
    }
    console.log('reach end', event)
    this.setState({ isLoading: true })
    setTimeout(() => {
      genData(++pageIndex)
      this.loadData()
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false
      })
    }, 1000)
  }

  /**
   * 头部
   */
  renderHead = () => {
    return (
      <div className='horizontal'
           style={{
             height: 40,
             backgroundColor: 'white',
             width: '100%'
           }}>
        <div className='horizontal'
             style={{
               height: '100%',
               paddingRight: 10,
               paddingLeft: 15
             }} onClick={this.goBackOnClick}>
          返回
        </div>
        <div className='horizontal'
             style={{
               flex: 1,
               height: 30,
               borderStyle: 'solid',
               borderWidth: 0,
               borderRadius: 10,
               backgroundColor: '#f5f5f5'
             }} onClick={this.goBackOnClick}>
          <span style={{ paddingLeft: 10 }}>搜索</span>
          <span style={{
            backgroundColor: '#f5f5f5', borderStyle: 'solid', paddingLeft: 10,
            borderWidth: 0
          }} className={'input'}>{this.props.searchData.searchText}</span>
        </div>
        <div className='horizontal'
             style={{
               height: '100%',
               paddingLeft: 10,
               paddingRight: 15,
               justifyContent: 'flex-end'
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
        <div className='horizontal'
             style={{
               height: 40,
               width: '100%',
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
          <div className='horizontal'
               style={{
                 flex: 1,
                 justifyContent: 'center',
                 position: 'relative'
               }} onClick={this.chooseOnClick}>
            <span>默认排序</span>
            <span>↓</span>
          </div>
          <span style={{ height: 30, width: 1, marginTop: 5, backgroundColor: '#e5e5e5' }}></span>
          <div className='horizontal'
               style={{
                 flex: 1,
                 justifyContent: 'center'
               }}>
            <span>筛选</span>
            <span>→</span>
          </div>
        </div>
        <ChooseMenu chooseHandClick={this.chooseHandClick.bind(this)} data={this.state.sortData}
                    chooseIndex={this.state.sortIndex} isShow={this.state.showChoose} closeHandClick={this.closeHandClick.bind(this)}/>
      </div>
    )
  }

  /**
   * 搜索结果
   */
  renderContent = () => {
    return (
      <div className='scroll horizontal'
           style={{
             justifyContent: 'space-between',
             flex: 1,
             flexWrap: 'wrap',
             width: '100%'
           }}>
      </div>
    )
  }

  /**
   * 搜索结果ListView
   */
  renderContentList = () => {
    // 行数
    let index = Math.ceil(this.state.searchResult.length / 2)
    // 大于0时 只有一个数据(单数)
    let indexMore = this.state.searchResult.length % 2
    const row = (rowData, sectionID, rowID) => {
      // if (index < 0) {
      //   index = data.length - 1
      // }
      const obj = this.state.searchResult[Math.ceil(this.state.searchResult.length / 2) - index--]
      let objNext = null
      if (indexMore > 0) {
        objNext = null
      } else {
        objNext = this.state.searchResult[Math.ceil(this.state.searchResult.length / 2) + 1 - index--]
      }
      return (
        this.renderContentItem(obj, objNext)
      )
    }
    return (
      <ListView className='scroll'
                style={{
                  flex: 1,
                  width: '100%'
                }}
                dataSource={this.state.dataSource} renderRow={row}
                onEndReached={this.onEndReached}/>
    )
  }

  /**
   * 搜索结果单项
   */
  renderContentItem = (item: SearchResultBean, itemNext: SearchResultBean) => {
    return (
      <div className='scroll horizontal'
           style={{
             justifyContent: 'space-between',
             flex: 1,
             flexWrap: 'wrap',
             width: '100%'
           }}>
        <div style={{
          width: '49%',
          height: 0,
          paddingBottom: '120%',
          backgroundColor: 'white',
          marginTop: 5
        }}>
          {item.name}
        </div>
        {itemNext === null ? null :
          <div style={{
            width: '49%',
            height: 0,
            paddingBottom: '120%',
            backgroundColor: 'white',
            marginTop: 5
          }}>
            {itemNext.name}
          </div>}
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

  public render () {
    return (
      <div>
        <div className='vertical'
             style={{
               backgroundColor: '#efeff5',
               height: '100vh'
             }}>
          {this.renderHead()}
          <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></span>
          {this.renderChoose()}
          <span style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5' }}></span>
          {/*{this.renderContent()}*/}
          {this.renderContentList()}
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

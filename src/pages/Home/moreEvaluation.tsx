import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, ListView } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import Head from '../../components/Head'
import { EvaluationDetailsBean } from '@datasources/EvaluationDetailsBean'
import { EvaluationBean } from '@datasources/EvaluationBean'
import { PicBean } from '@datasources/PicBean'

function MyBody (props) {
  return (
    <div className='am-list-body my-body'>
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  )
}

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

export interface Props {

}

interface State {
  evaluationDetails: EvaluationDetailsBean
  listData: Array<EvaluationBean>
  dataSource: any
  isLoading: boolean
  hasMore: boolean
}

class Home extends React.Component<Props, State> {
  constructor (props) {
    super(props)

    // 创建 ListViewDataSource 对象 放入数据
    // 以下四种数据都是可选
    const dataSource = new ListView.DataSource({
      // 根据rowId 获取 dataBlob 中 row
      getRowData: (dataBlob, sectionID, rowID) => dataBlob[rowID],
      //
      getSectionHeaderData: (dataBlob, sectionID) => dataBlob[sectionID],
      // 数据变更时判断 (还没用到)
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })

    this.state = {
      evaluationDetails: null,
      dataSource: dataSource,
      listData: [],
      isLoading: true,
      hasMore: true
    }
  }

  componentDidMount () {
    genData(0)
    let list: Array<EvaluationBean> = []
    for (let i = 0; i < 5; i++) {
      let item: EvaluationBean = {
        head: '',
        name: '用户' + i,
        evaluation: '' + i,
        start: 5 * Math.random(),
        date: '2018-1-1',
        pic_list: []
      }
      list.push(item)
    }
    this.setState({
      evaluationDetails: {
        star: 4,
        rate: 98,
        all: 999,
        title0: 666,
        title1: 333,
        title3: 0
      },
      dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
      listData: this.state.listData.concat(list),
      isLoading: false
    })
  }

  // 当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用
  onEndReached = (event) => {
    // load new data  重点
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    // 你在实例中看到打印不下的,就是这行
    console.log('reach end', event)
    // 开始加载 防止这里重复执行
    this.setState({ isLoading: true })
    // 延迟一秒,加载 项目中直接调用接口获取数据
    setTimeout(() => {
      genData(++pageIndex)
      // 添加数据
      let list: Array<EvaluationBean> = []
      for (let i = 0; i < 10; i++) {
        let item: EvaluationBean = {
          head: '',
          name: '用户' + i,
          evaluation: '' + i,
          start: 5 * Math.random(),
          date: '2018-1-1',
          pic_list: []
        }
        list.push(item)
      }
      this.setState({
        listData: this.state.listData.concat(list),
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false
      })
    }, 1000)
  }

  /**
   * 头部信息和选择按钮
   */
  renderHead = () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        marginTop: 40
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
          width: '100%'
        }}>
          <span style={{ paddingLeft: 20 }}>
            <span>总体好评率</span>
            {this.state.evaluationDetails === null || this.state.evaluationDetails.star === null ? <span></span> :
              <span>星星</span>}
          </span>
          {this.state.evaluationDetails === null || this.state.evaluationDetails.rate === null ? <span></span>
            :
            <span style={{
              fontSize: 24,
              paddingRight: 20
            }}>
              {this.state.evaluationDetails.rate}%
            </span>
          }
        </div>
        <div>
          三选
        </div>
      </div>
    )
  }

  /**
   * 评论列表
   */
  renderList = () => {
    // 分割线
    const separator = (sectionID, rowID) => (
      <div style={{}}>
      </div>
    )
    let data = this.state.listData
    let index = data.length - 1
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1
      }
      const obj = data[index--]
      return (
        <div key={rowID}>
          {this.renderListItem(obj, rowData, sectionID, rowID)}
        </div>
      )
    }
    return (
      <ListView
        style={{
          height: '100%',
          overflow: 'auto'
        }}
        dataSource={this.state.dataSource}
        renderRow={row}
        pageSize={5}
        // 在滚动的过程中，每帧最多调用一次此回调函数。调用的频率可以用scrollEventThrottle属性来控制
        onScroll={() => {
          console.log('scroll')
        }}
        // 自定义 body 的包裹组件
        renderBodyComponent={() => <MyBody/>}
        // 当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    )
  }

  /**
   * 评论列表单个
   */
  renderListItem = (item: EvaluationBean, rowData, sectionID, rowID) => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        {/*头部*/}
        <div style={{
          height: 50,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20,
            height: 40
          }}>
            <span>{item.head}</span>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginLeft: 20
            }}>
              <span>{item.name}</span>
              <span>总体评分{item.start}</span>
            </div>
          </div>
          <div>
            {item.date}
          </div>
        </div>
        <span style={{
          padding: 20,
          height: 60
        }}>{item.evaluation}</span>
        {item !== null && item.pic_list !== null &&
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 20,
          height: 50
        }}>
          {item.pic_list.map((pic) => <img src={pic.picture_url}/>)}
        </div>
        }
      </div>
    )
  }

  /**
   * 获取评价信息
   */
  getEvaluation (pageIndex: number = 0) {
    axios.get('')
      .then(data => {
        console.log('--- data =', data)
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }

  public render () {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#efeff5'
      }}>
        <Head title={'评价详情'} showLeftIcon={true} backgroundColor={'#0084e7'} rightIconOnClick={null}
              showRightIcon={false} />
        {this.renderHead()}
        {this.renderList()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

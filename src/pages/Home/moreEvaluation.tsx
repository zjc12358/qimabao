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

// 一次加载多少数据
const NUM_SECTIONS = 1
// 每页数据 内对象数
// 所以这样设置  一次就加载了25条
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

export interface Props {

}

interface State {
  evaluationDetails: EvaluationDetailsBean
  listData: Array<EvaluationBean>
  dataSource: any
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
      listData: []
    }
  }

  componentWillMount () {
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
      evaluationDetails: {
        star: 4,
        rate: 98,
        all: 999,
        title0: 666,
        title1: 333,
        title3: 0
      },
      listData: list
    })
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
        <div>
          {this.renderListItem(obj)}
        </div>
      )
    }
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
      }}>
        <ListView dataSource={this.state.listData} renderRow={row}/>
      </div>
    )
  }

  /**
   * 评论列表单个
   */
  renderListItem = (item: EvaluationBean) => {
    return (
      <div>

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
              showRightIcon={false}/>
        {this.renderHead()}
        {/*{this.renderList()}*/}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

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

let pageIndex = 0

export interface Props {

}

interface State {
  evaluationDetails: EvaluationDetailsBean
}

class Home extends React.Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      evaluationDetails: null
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
        title3: 0,
        list: list
      }
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
    let data = this.state.evaluationDetails.list
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
        <ListView dataSource={this.state.evaluationDetails.list} renderRow={row}/>
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
        justifyContent: 'flex-start',
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

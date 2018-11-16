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

// 页码
let pageIndex = 0

export interface Props {

}

interface State {
  evaluationDetails: EvaluationDetailsBean
  listData: Array<EvaluationBean>
  isLoading: boolean
  hasMore: boolean
}

class Home extends React.Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      evaluationDetails: null,
      listData: [],
      isLoading: false,
      hasMore: true
    }
  }

  componentDidMount () {
    this.getEvaluationList(0)
  }

  refresh () {
    this.getEvaluationList(0)
  }

  loadMore () {
    this.getEvaluationList(pageIndex++)
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
    return (
      <div>
      </div>
    )
  }

  /**
   * 评论列表单个
   */
  renderListItem = (item: EvaluationBean) => {
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
  getEvaluationList (page: number = 0) {
    if (this.state.isLoading || !this.state.hasMore) {
      return
    }
    this.setState({
      isLoading: true
    })
    setTimeout(() => {
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
      if (page > 0) {
        this.setState({
          evaluationDetails: {
            star: 4,
            rate: 98,
            all: 999,
            title0: 666,
            title1: 333,
            title3: 0
          },
          listData: this.state.listData.concat(list)
        })
      } else {
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
      this.setState({
        isLoading: false
      })

    }, 500)
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
              showRightIcon={false} titleColor={'#ffffff'}/>
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

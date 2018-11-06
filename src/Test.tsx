import * as React from 'react'
import { Button } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { addPageIndex, deletePageIndex } from '@store/actions/global_data'
import history from 'history/createHashHistory'

export interface Props {
  globalData: GlobalData
  addPageIndex: (pageIndex: number) => void
  deletePageIndex: (pageIndex: number) => void
}

interface State {
  collapsed: boolean
}

class Test extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  goBack = () => {
    history().goBack()
  }

  public render () {
    return (
      <div style={{ flex: 1 }}>
        <span>测试Redux</span>
        <Button onClick={() => this.props.deletePageIndex(this.props.globalData.pageIndex)}>上一页</Button>
        <Button onClick={() => this.props.addPageIndex(this.props.globalData.pageIndex)}>下一页</Button>
        <div style={{
          width: '100%',
          height: 200,
          backgroundColor: 'white'
        }} onClick={() => this.goBack()}>{this.props.globalData.pageIndex}</div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    globalData: state.globalData
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  addPageIndex,
  deletePageIndex
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)

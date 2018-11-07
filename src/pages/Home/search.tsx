import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import { updateSearchText } from '@store/actions/search_data'
import { SearchData } from '@store/reducers/searchDataReducer'

export interface Props {
  searchData: SearchData
  updateSearchText: (text: string) => void
}

interface State {
}

let his = ['面包', '鱼', '白菜', '面包', '鱼', '213', '11111', 'dsadasdas鱼', 'dsadsadasda大叔大婶大']

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {}
  }

  renderHead = () => {
    return (
      <div style={{
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
      }}>
        <div style={{
          flex: 1,
          height: '100%',
          margin: 15,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }} onClick={this.searchOnClick}>
          搜索
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
        }}>
          <span style={{ paddingLeft: 10 }}>搜索</span>
          <input style={{
            backgroundColor: '#f5f5f5', borderStyle: 'solid', paddingLeft: 10,
            borderWidth: 0
          }} className={'input'} onChange={this.textChange} value={this.props.searchData.searchText}/>
        </div>
        <div style={{
          flex: 1,
          height: '100%',
          marginRight: 15,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }} onClick={() => history().goBack()}>
          取消
        </div>

      </div>
    )
  }

  /**
   * 搜索历史
   */
  renderSearchHistory = () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
          width: '100%',
          fontSize: 16
        }}>
          <span style={{ marginLeft: 20 }}>搜索历史</span>
          <span style={{ marginRight: 20 }}>清空</span>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          width: '100%'
        }}>
          {his.map((item, index) => this.renderSearchHistoryItem(item, index))}
        </div>
      </div>
    )
  }

  /**
   * 搜索历史 单项
   */
  renderSearchHistoryItem = (item, index: number) => {
    return (
      <div style={{
        paddingLeft: 12,
        paddingRight: 12,
        marginRight: 10,
        marginLeft: 10,
        paddingTop: 4,
        paddingBottom: 4,
        marginTop: 4,
        marginBottom: 4,
        borderStyle: 'solid',
        borderWidth: 0,
        borderRadius: 20,
        backgroundColor: '#f5f5f5'
      }} onClick={() => this.historySearchOnClick(his[index])}>
        {item}
      </div>
    )
  }

  /**
   * 搜索
   */
  searchOnClick = () => {
    // TODO 2018/11/2 搜索
    console.log(this.props.searchData.searchText)
    history().push('/searchResult')
  }

  /**
   * 改变输入框文字
   * @param event
   */
  textChange = (event) => {
    this.props.updateSearchText(event.target.value)
  }

  /**
   * 历史搜索
   */
  historySearchOnClick = (text: string) => {
    this.props.updateSearchText(text)
  }

  public render () {
    return (
      <div style={{ backgroundColor: '#efeff5' }}>
        {this.renderHead()}
        {this.renderSearchHistory()}
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
  updateSearchText
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, Tabs, Badge } from 'antd-mobile'
import axios from 'axios'
import ReactSVG from 'react-svg'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import Head from '../../components/Head'

export interface Props {

}

interface State {
}

class Supplier extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {}
  }

  // componentWillMount () {
  //
  // }

  /**
   * 标签
   */
  renderTabs = () => {
    let tabs = [
      { title: <Badge>出售中</Badge> },
      { title: <Badge>已售完</Badge> },
      { title: <Badge>仓库中</Badge> },
      { title: <Badge>已下架</Badge> }]
    return (
      <div style={{
        marginTop: 40,
        marginBottom: 40
      }}>
        <Tabs
          tabs={tabs}
          initialPage={1}
          onChange={(tab, index) => {
            console.log('onChange', index, tab)
          }}
          onTabClick={(tab, index) => {
            console.log('onTabClick', index, tab)
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '150px',
            backgroundColor: '#fff'
          }}>
            Content of first tab
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '150px',
            backgroundColor: '#fff'
          }}>
            Content of second tab
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '150px',
            backgroundColor: '#fff'
          }}>
            Content of third tab
          </div>
        </Tabs>
      </div>
    )
  }

  /**
   * 滑动内容
   */
  renderTabsContent = () => {
    return (
      <div></div>
    )
  }

  /**
   * 点击搜索
   */
  searchOnClick = () => {
    console.log('搜索')
  }

  /**
   * 获取订单总数
   */
  getOrderNumber = () => {
    // TODO 2018/11/26 请求订单总数
  }

  public render () {
    return (
      <div className='vertical render-style'>
        <Head titleColor={'#ffffff'} showLeftIcon={true} backgroundColor={'#0084e7'}
              title={'商品管理'} rightIconOnClick={this.searchOnClick.bind(this)}
              showRightIcon={true} leftIconColor={'white'}/>
        {this.renderTabs()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Supplier)

import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import ReactSVG from 'react-svg'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import { HomeCategoryItemBean } from '../../datasources/HomeCategoryItemBean'
import Head from '../../components/Head'

export interface Props {
  categoryItemData: Array<HomeCategoryItemBean>
}

interface State {

}

class Supplier extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {}
  }

  /**
   * 商品一级类目列表
   */
  renderList = () => {
    return (
      <div className='vertical' style={{ marginTop: 40, flex: 1 }}>
        {this.props.categoryItemData.map((item, index) => this.renderListItem(item, index))}
      </div>
    )
  }

  /**
   * 一级列表单列
   */
  renderListItem = (item: HomeCategoryItemBean, index: number) => {
    return (
      <div className='vertical'>
        <div className='horizontal' style={{
          height: 40,
          width: '100%'
        }}>
          <div>
            {item.show ?
              <ReactSVG path='./assets/images/ic_up_arrow.svg' svgStyle={{ width: 24, height: 24 }}/> :
              <ReactSVG path='./assets/images/ic_down_arrow.svg' svgStyle={{ width: 24, height: 24 }}/>
            }
          </div>
          <div>{item.category_name}</div>
        </div>
        <div className='vertical' style={{ width: '100%' }}>
        </div>
      </div>

    )
  }

  /**
   * 二级列表
   */
  renderChildList = () => {
    return (
      <div></div>
    )
  }

  /**
   * 二级列表单列
   */
  renderChildListItem = (index: number) => {
    return (
      <div>
        <div>
          {}
        </div>
      </div>
    )
  }

  public render () {
    return (
      <div className='vertical'>
        <Head titleColor={'#ffffff'} showLeftIcon={true} backgroundColor={'#0084e7'} title={'分类设置'}
              rightIconOnClick={null} showRightIcon={false}/>
        {this.renderList()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    categoryItemData: state.categoryItemData.categoryItemData
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Supplier)

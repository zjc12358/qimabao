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
import { MyResponse } from '../../datasources/MyResponse'
import { CategoryBean } from '@datasources/CategoryBean'
import { SecondCategoryBean } from '@datasources/SecondCategoryBean'
import { updataCategoryClassId } from '@store/actions/release_data'

export interface Props {
  updataCategoryClassId: (categoryClassId: number, categoryName: string) => void
}

interface State {
  allCategory: Array<CategoryBean>
}

class Supplier extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      allCategory: []
    }
  }

  componentWillMount () {
    this.getAllCategory()
  }

  /**
   * 商品一级类目列表
   */
  renderList = () => {
    return (
      <div className='vertical' style={{ flex: 1, width: '100%' }}>
        {this.state.allCategory.map((item, index) => this.renderListItem(item, index))}
      </div>
    )
  }

  /**
   * 一级列表单列
   */
  renderListItem = (item: CategoryBean, index: number) => {
    return (
      <div className='vertical' style={{ width: '100%' }}>
        <div className='horizontal' style={{ height: 60, width: '100%', backgroundColor: 'white' }}
             onClick={() => this.categoryOnClick(index)}>
          <div style={{ marginLeft: 20 }}>
            {item.show ?
              <ReactSVG path='./assets/images/ic_up_arrow.svg' svgStyle={{ width: 24, height: 24 }}/> :
              <ReactSVG path='./assets/images/ic_down_arrow.svg' svgStyle={{ width: 24, height: 24 }}/>
            }
          </div>
          <div>{item.category_name}</div>
        </div>
        <span style={{ height: 1, width: '100%', backgroundColor: '#cccccc' }}></span>
        {item.show && this.renderChildList(item.productCategoryClassList)}
      </div>
    )
  }

  /**
   * 二级列表
   */
  renderChildList = (item: Array<SecondCategoryBean>) => {
    return (
      <div className='vertical' style={{ width: '100%' }}>
        {item.map(item => this.renderChildListItem(item))}
      </div>
    )
  }

  /**
   * 二级列表单列
   */
  renderChildListItem = (item: SecondCategoryBean) => {
    return (
      <div className='vertical' style={{ width: '100%' }}>
        <div className='vertical-center' style={{ width: '100%', height: 30, backgroundColor: 'white' }}
             onClick={() => this.secondCategoryOnClick(item.category_class_id, item.category_class_name)}>
          {item.category_class_name}
        </div>
        <span style={{ height: 1, width: '100%', backgroundColor: '#cccccc' }}></span>
      </div>
    )
  }

  /**
   * 点击一级类目
   */
  categoryOnClick = (index: number) => {
    let all = this.state.allCategory
    all.map((item, i) => index === i ? item.show = true : item.show = false)
    this.setState({
      allCategory: all
    })
  }

  /**
   * 点击二级类目
   */
  secondCategoryOnClick = (categoryId: number, categoryName: string) => {
    this.props.updataCategoryClassId(categoryId, categoryName)
    history().goBack()
  }

  /**
   * 获取所有一,二级分类
   */
  getAllCategory = () => {
    const url = 'CanteenProcurementManager/homepage/productCategory/productCategory'
    axios.get<MyResponse<Array<CategoryBean>>>(url)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          data.data.data.map(item => item.show = false)
          this.setState({
            allCategory: data.data.data
          })
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!', 1)
      })
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

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updataCategoryClassId
}

export default connect(mapStateToProps, mapDispatchToProps)(Supplier)

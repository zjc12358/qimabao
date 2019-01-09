import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast,Accordion,List } from 'antd-mobile'
import axios from 'axios'
import ReactSVG from 'react-svg'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import { HomeCategoryItemBean } from '@datasources/HomeCategoryItemBean'
import Head from '@components/Head'
import { MyResponse } from '@datasources/MyResponse'
import { CategoryBean } from '@datasources/CategoryBean'
import { SecondCategoryBean } from '@datasources/SecondCategoryBean'
import { updataCategoryClassId, updataCategoryId } from '@store/actions/release_data'
import { ProductList } from '../../../datasources/ProductList'
import {
  updateProductListDetail
} from '@store/actions/supplierProductList_data'

export interface Props {
  updateProductListDetail: (productListDetail: ProductList) => void,
  productListDetail: ProductList
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
        <Accordion className='my-accordion' style={{ width: '100%' }}>
          {this.state.allCategory.map((item, index) => this.renderListItem(item, index))}
        </Accordion>
      </div>
    )
  }

  /**
   * 一级列表单列
   */
  renderListItem = (item: CategoryBean, index: number) => {
    return (
      <Accordion.Panel header={item.category_name}>
        <List className='my-list'>
          {this.renderChildList(item.category_id, item.productCategoryClassList)}
        </List>
      </Accordion.Panel>
    )
  }

  /**
   * 二级列表
   */
  renderChildList = (categoryId: number, item: Array<SecondCategoryBean>) => {
    return (
      <div>
        {item.map(item => (
          <List.Item
            style={{ textIndent: '20px' }}
            onClick={ () => {
              this.secondCategoryOnClick(categoryId, item.category_class_id, item.category_class_name)
            }}
          >
            <span>{item.category_class_name}</span>
          </List.Item>
        ))}
      </div>
    )
  }

  /**
   * 点击二级类目
   */
  secondCategoryOnClick = (id: number, categoryId: number, categoryName: string) => {
    this.props.updataCategoryId(id)
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
              rightIconOnClick={null} showRightIcon={false} leftIconColor='white'/>
        {this.renderList()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    productListDetail: state.supplierProductListData.ProductListDetailData
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updateProductListDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(Supplier)

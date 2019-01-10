import * as React from 'react'
import { Link } from 'react-router-dom'
import { createForm } from 'rc-form'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { TextareaItem, List, InputItem, Button, ImagePicker, Toast } from 'antd-mobile'
import Drawer from '@material-ui/core/Drawer'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import Head from '../../../components/Head/index'
import './describe.less'
import {
  updateProductListDetail
} from '@store/actions/supplierProductList_data'
import { updataProductDescription } from '@store/actions/release_data'
import { ProductList } from '../../../datasources/ProductList'

export interface Props {
  updateProductListDetail: (productListDetail: ProductList) => void,
  productListDetail: ProductList
}

interface State {
  productListDetail: ProductList
  data: string
}
let IconMaxSize: number = 30
class Describe extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      productListDetail: this.props.productListDetail,
      data: ''
    }
  }
  componentDidMount () {
    focus()
  }

  onQuillChange = (content, delta, source, editor) => {
    // content 是真实的DOM节点
    // delta 记录了修改的对象，下篇文章详述
    // source 值为user或api
    // editor 文本框对象，可以调用函数获取content, delta值
    console.log(content)
  }

  public render () {
    let pro: ProductList = this.state.productListDetail
    return (
      <div className={'describeWrap'}>
        <div className='describeHead'>
          <div onClick={() => { history().goBack() }}>
            <ReactSVG svgClassName='ic' path='./assets/images/ic_back-grey.svg'/>
          </div>
          <div>商品描述</div>
          <div><ReactSVG svgClassName='ic delete' path='./assets/images/Supplier/drawerDelete.svg'/></div>
        </div>
        <div className='describeContainer'>
          <TextareaItem
            rows={8}
            defaultValue={ this.props.productListDetail.product_description ? this.props.productListDetail.product_description : '' }
            placeholder='请输入商品描述'
            onBlur={ e => {
              // console.log(e)
              pro.product_description = e
              this.setState({
                productListDetail: pro
              })
              this.props.updateProductListDetail(this.state.productListDetail)
            }}
          />
        </div>
        <div className='describeFooter'>
          {/*<div></div>*/}
          <div>
            <Button
              type='primary'
              onClick={ () => {
                console.log(this.state.data)
                history().goBack()
                Toast.success('', 2, null , false)
              }}
            >完成</Button>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Describe)

import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TextareaItem, List, InputItem, Button, ImagePicker, Toast, Modal } from 'antd-mobile'
import lrz from 'lrz'
import { Carousel } from 'element-react'
import * as dd from 'dingtalk-jsapi'
import Drawer from '@material-ui/core/Drawer'
import axios from 'axios'
import { cloneDeep, get } from 'lodash'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import Head from '../../../components/Head/index'
import '../release/release.less'
import { MyResponse } from '@datasources/MyResponse'
import {
  saveProductMsg,
  updataCategoryClassId,
  updataCategoryId,
  updataProductDescription
} from '@store/actions/release_data'
import {
  updateProductListDetail
} from '@store/actions/supplierProductList_data'
import { ProductList } from '@datasources/ProductList'
const alert = Modal.alert

export interface Props {
  saveProductMsg: (productMsg: any) => void,
  updataCategoryId: (categoryId: number) => void,
  updataCategoryClassId: (categoryClassId: number,categoryName: string) => void,
  updataProductDescription: (productDescription: string) => void,
  updateProductListDetail: (productListDetail: ProductList) => void,
  productDescription: string,
  productMsg: any,
  categoryId: number,
  categoryClassId: number,
  categoryName: string,
  productListDetail: ProductList
}

interface State {
  data: any,
  openDrawer: boolean,
  files: Array<any>,
  multiple: boolean,
  productId: string
  productData: any,
  productName: string,
  categoryId: number,
  categoryClassId: number,
  productPrice: any,
  productStock: any,
  productLabel: string,
  productDescription: string,
  msg: string,
  carouselIndex: number
  productListDetail: ProductList
}
let IconMaxSize: number = 30
class Release extends React.Component<Props, State> {
  private inputInstance: any

  constructor (props) {
    super(props)
    this.state = {
      data: {},
      openDrawer: false,
      files: [],
      multiple: false,
      productData: {},
      productId: this.props.productListDetail.product_id,
      productName: this.props.productListDetail.product_name,
      categoryId: null,
      categoryClassId: null,
      productPrice: this.props.productListDetail.product_price,
      productStock: this.props.productListDetail.product_stock,
      productLabel: this.props.productListDetail.product_label,
      productDescription: '',
      msg: '',
      carouselIndex: 0,
      productListDetail: this.props.productListDetail
    }
  }
  componentDidMount () {
    console.log(this.props.productListDetail)
  }
  toggleDrawer = (side, open) => () => {
    this.setState({ openDrawer: open })
  }

  submite = (productStatus) => {
    let url = 'CanteenProcurementManager/user/ProductInfo/updateProductEdit'
    let data = {
      productId: this.state.productId,
      productIcon: this.state.files,
      productName: this.state.productName,
      categoryClassId: this.props.productListDetail.category_class_id,
      productPrice: this.state.productPrice,
      productStock: this.state.productStock,
      productLabel: this.state.productLabel,
      productDescription: this.props.productListDetail.product_description
    }
    // let data2 = JSON.stringify(data)
    let files2 = { files: data.productIcon }
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    console.log(ret)
    let fd = new FormData()
    fd.append('productId', data.productId)
    fd.append('productIcon', JSON.stringify(files2))
    fd.append('productName', data.productName)
    fd.append('categoryClassId', JSON.stringify(data.categoryClassId))
    fd.append('productPrice', JSON.stringify(data.productPrice))
    fd.append('productStock', JSON.stringify(data.productStock))
    fd.append('productLabel', JSON.stringify(data.productLabel))
    fd.append('productDescription', data.productDescription)

    /**
     * 状态 1
     */
    console.log(this.state.productListDetail.category_class_id)
    axios.get(url,{
      params: {
        productId: this.state.productListDetail.product_id,
        productIcon: JSON.stringify(files2),
        productName: this.state.productListDetail.product_name,
        categoryClassId: this.state.productListDetail.category_class_id,
        productPrice: this.state.productListDetail.product_price,
        productStock: this.state.productListDetail.product_stock,
        productLabel: this.state.productListDetail.product_label,
        productDescription: this.state.productListDetail.product_description
      }
    })
      .then(data => {
        console.log('--- 购物车data =', data)
        if (data.data.code === 0) {
          Toast.success(data.data.msg, 2, () => {
            this.props.updataCategoryId(null)
            this.props.updataCategoryClassId(null,'')
            this.props.updataProductDescription('')
            this.props.saveProductMsg({
              productName: '',
              productPrice: null,
              productStock: '',
              productLabel: '',
              productImg: []
            })
            history().goBack()
          }, false)
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }

  /**
   * 更新productMsg的action
   */
  updataSaveProductMsg = () => {
    this.props.saveProductMsg({
      productPrice: this.state.productPrice,
      productStock: this.state.productStock,
      productLabel: this.state.productLabel,
      productName: this.state.productName,
      productImg: this.state.files
    })
  }

  /**
   * 删除轮播图当前下标图片
   */
  deleteChooseImagesClick = () => {
    if (this.state.files.length === 0) {
      Toast.fail('当前未选择任何图片！',1)
      return
    }
    alert('删除图片', '是否删除该图片', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => {
        let files = cloneDeep(this.state.files)
        files.splice(this.state.carouselIndex - 1,1)
        this.setState({ files: files },() => {
          this.updataSaveProductMsg()
          console.log(this.state.files)
          Toast.success('删除成功',1)
        })
      }}
    ])
  }

  /**
   * 图片选择器
   */
  renderImagePicker = () => {
    return (
      <div className='img_picker'
           // onClick={this.toggleDrawer('bottom',true)}
      >
        <div className={'camera' + ' ' + (this.state.files.length > 0 ? 'smallCamera' : '')}>
          <ReactSVG svgClassName='cameraIcon' path='./assets/images/Supplier/camera.svg'/>
          <input className={'fileUpload'} type={'file'} onChange={ e => {
            console.log(this.state.files)
            // if (e.target.files[0])
            let file = e.target.files[0]
            let fileLen = e.target.files.length
            // if (Number(fileSize) >= 2048) {
            //   Toast.fail('图片过大')
            //   return
            // }
            if (file === undefined) return
            console.log(file)
            lrz(file).then((rst) => {
              console.log(rst)
              let base64 = rst.base64
              let files = cloneDeep(this.state.files)
              files.push(base64)
              // console.log(base64)
              this.setState({ files: files },() => {
                this.updataSaveProductMsg()
                if (this.state.files.length > 0) {
                  this.setState({ carouselIndex: this.state.files.length - 1 },() => {
                    this.inputInstance.setActiveItem(this.state.carouselIndex)
                  })
                }
              })
            })
          }} />
        </div>
        <div className={'readImages'}
             style={{ display: (this.state.files.length ? 'block' : 'none') }}
          onClick={ (e) => {
            e.stopPropagation()
            dd.biz.util.previewImage({
              urls: this.state.files,
              current: this.state.files[0]
            }).catch(err => console.log(err))
          } }
        >
          <div onClick={ (e) => { e.stopPropagation() }}>
            <Carousel height='204px' autoplay={false} arrow='always'
              // ref = {(input) => this.inputInstance = this.state.files}
                      ref={(input) => { this.inputInstance = input }}
            >
              {
                this.state.files.map((item, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <img src={item} style={{ width: '100%' }} />
                    </Carousel.Item>
                  )
                })
              }
            </Carousel>
          </div>
        </div>
      </div>
    )
  }

  /**
   * 商家的各种参数输入框
   * @param param 参数名
   * @param type  input类型
   */
  renderParameterInput = (param,type,stateName) => {
    let pro: ProductList = this.state.productListDetail
    return (
      <List.Item>
        <div className='parameter'>
          {param}
          <InputItem
            style={{ flex: 1 }}
            type={type}
            defaultValue={stateName}
            onBlur={ (e) => {
              switch (param) {
                case '价格':
                  pro.product_price = e
                  this.setState({
                    productListDetail: pro
                  })
                  this.props.updateProductListDetail(this.state.productListDetail)
                  break
                case '库存':
                  pro.product_stock = e
                  this.setState({
                    productListDetail: pro
                  })
                  this.props.updateProductListDetail(this.state.productListDetail)
                  break
                case '产品标签':
                  pro.product_label = e
                  this.setState({
                    productListDetail: pro
                  })
                  this.props.updateProductListDetail(this.state.productListDetail)
                  break
              }
            }}
          />
        </div>
      </List.Item>
    )
  }

  /**
   * 可跳转的ListItem
   * @param param
   */
  renderListItemGoTo = (param,path) => {
    return (
      <List.Item
        className='category'
        onClick={() => { history().push(path) }}
        arrow='horizontal'
        extra={ param === '类目' ? this.props.productListDetail.category_class_name : this.props.productListDetail.product_description}
      >
        {param}
      </List.Item>
    )
  }

  /**
   * drawer弹窗
   */
  renderBottomDrawer = () => {
    return (
      <div>
        <Drawer
          style={{ backgroundColor: 'transparent' }}
          anchor='bottom'
          open={this.state.openDrawer}
          onClose={this.toggleDrawer('openDrawer', false)}
        >
          <div
            className='releaseBottomDrawer'
            tabIndex={0}
            role='button'
            onClick={this.toggleDrawer('openDrawer', false)}
            onKeyDown={this.toggleDrawer('openDrawer', false)}
          >
            <List>
              <div className='drawerTop'>
                <List.Item
                  style={{ borderTopLeftRadius: 8,borderTopRightRadius: 8 }}
                  onClick={() => { console.log(1) }}
                >
                  <div className='picker_tab'>从相册选取</div>
                </List.Item>
                <List.Item onClick={() => { console.log(1) }}>
                  <div className='picker_tab'>拍照</div>
                </List.Item>
                <List.Item
                  style={{ borderBottomLeftRadius: 8,borderBottomRightRadius: 8 }}
                  onClick={() => { console.log(1) }}
                >
                  <div className='picker_tab'>扫码识别商品信息</div>
                </List.Item>
              </div>
              <List.Item
                style={{ borderRadius: 8,marginTop: 10 }}
                onClick={() => { console.log(1) }}
              >
                <div className='picker_tab'>取消</div>
              </List.Item>
            </List>
          </div>
        </Drawer>
      </div>
    )
  }

  public render () {
    let pro: ProductList = this.state.productListDetail
    return (
      <div style={{ height: '100vh',display: 'flex',flexDirection: 'column' }}>
        <Head
          showLeftIcon='true'
          title='编辑商品'
          backgroundColor='#0084e7'
          leftIconColor='white'
          rightIconContent={(<span style={{ color: 'white' }}>删除</span>)}
          showRightIcon='true'
          rightIconOnClick={this.deleteChooseImagesClick}
        />
        <div className='releaseContainer'>
          {this.renderImagePicker()}
          <div>
            <TextareaItem
              placeholder='输入商品标题'
              rows={2}
              count={60}
              defaultValue={this.props.productListDetail.product_name}
              onBlur={ e => {
                pro.product_name = e
                this.setState({
                  productListDetail: pro
                })
                this.props.updateProductListDetail(this.state.productListDetail)
              }}
            />
            {this.renderListItemGoTo('类目', '/spCategory')}
          </div>
          <div className='paramContent' style={{ marginTop: 15, backgroundColor: 'white' }}>
            {this.renderParameterInput('价格', 'number',this.state.productListDetail.product_price)}
            {this.renderParameterInput('库存', 'number',this.state.productListDetail.product_stock)}
            {this.renderParameterInput('产品标签', 'text',this.state.productListDetail.product_label)}
            {this.renderListItemGoTo('宝贝描述', '/spDescribe')}
          </div>
          {this.renderBottomDrawer()}
        </div>
        <div className='releaseFooter'>
          <div onClick={() => {
            this.submite(2)
          }}>取消</div>
          <div onClick={() => {
            this.submite(0)
          }}>保存</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    productDescription: state.releaseData.productDescription,
    productMsg: state.releaseData.productMsg,
    categoryId: state.releaseData.categoryId,
    categoryClassId: state.releaseData.categoryClassId,
    categoryName: state.releaseData.categoryName,
    productListDetail: state.supplierProductListData.ProductListDetailData
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  saveProductMsg,
  updataCategoryId,
  updataCategoryClassId,
  updataProductDescription,
  updateProductListDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(Release)

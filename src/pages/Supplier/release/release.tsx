import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TextareaItem, List, InputItem, Button, ImagePicker, Carousel, Toast } from 'antd-mobile'
// import { Carousel } from 'element-react'
import Drawer from '@material-ui/core/Drawer'
import axios from 'axios'
import { cloneDeep, get } from 'lodash'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import Head from '../../../components/Head/index'
import './release.less'
import { MyResponse } from '@datasources/MyResponse'
import { saveProductMsg } from '@store/actions/release_data'

export interface Props {
  saveProductMsg: (productMsg: any) => void
  productDescription: string,
  productMsg: any,
  categoryId: number,
  categoryClassId: number
}

interface State {
  data: any,
  openDrawer: boolean,
  files: Array<any>,
  multiple: boolean,
  productData: any,
  productName: string,
  categoryId: number,
  categoryClassId: number,
  productPrice: number,
  productStock: number,
  productLabel: string,
  productDescription: string
}
let IconMaxSize: number = 30
class Release extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: {},
      openDrawer: false,
      files: [],
      multiple: false,
      productData: {},
      productName: this.props.productMsg.productName,
      categoryId: null,
      categoryClassId: null,
      productPrice: this.props.productMsg.productPrice,
      productStock: this.props.productMsg.productStock,
      productLabel: this.props.productMsg.productLabel,
      productDescription: ''
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({ openDrawer: open })
  }

  submite = () => {
    let url = 'CanteenProcurementManager/user/ProductInfo/releaseProduct'
    let data = {
      productName: this.state.productName,
      categoryId: this.props.categoryId,
      categoryClassId: this.props.categoryClassId,
      productPrice: this.state.productPrice,
      productStock: this.state.productStock,
      productLabel: this.state.productLabel,
      productDescription: this.props.productDescription,
      files: this.state.files
    }
    // let data2 = JSON.stringify(data)
    let files2 = { files: data.files }
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    console.log(ret)
    let fd = new FormData()
    fd.append('productName', data.productName)
    fd.append('categoryId', JSON.stringify(data.categoryId))
    fd.append('categoryClassId', JSON.stringify(data.categoryClassId))
    fd.append('productPrice', JSON.stringify(data.productPrice))
    fd.append('productStock', JSON.stringify(data.productStock))
    fd.append('productLabel', JSON.stringify(data.productLabel))
    fd.append('productDescription', data.productDescription)
    fd.append('files', JSON.stringify(files2))
    console.log(fd.get('productName'))
    axios.post(url,fd,{ headers: { 'Content-Type': 'application/json' } })
      .then(data => {
        console.log('--- 购物车data =', data)
        if (data.data.code === 0) {
          Toast.success(data.data.msg, 2, null, false)
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }

  // convertImgToBase64 = (url, callback, outputFormat) => {
  // }

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
            let file = e.target.files[0]
            console.log(file)
            // this.setState({ files: files })
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
              let base64 = reader.result
              let files = cloneDeep(this.state.files)
              files.push(base64)
              console.log(base64)
              this.setState({ files: files })
            }
          }} />
        </div>
        <div className={'readImages'}>
          <ReactSVG
            svgClassName={'delectUp ' + (this.state.files.length > 0 ? '' : 'delectUpNone')}
            path={'./assets/images/Supplier/delete_white.svg'}
            onClick={ () => {
              let files = cloneDeep(this.state.files)
              files.pop()
              this.setState({ files: files })
            }}
          />
          <Carousel
            autoplay={true}
            autoplayInterval={300}
            infinite
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => console.log('slide to', index)}
          >
            {this.state.files.map(val => (
              <a
                key={val}
                style={{ display: 'inline-block', width: '100%', height: 136 }}
              >
                <img
                  src={val}
                  style={{ width: '100%', verticalAlign: 'top' }}
                />
              </a>
            ))}
          </Carousel>
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
    return (
      <List.Item>
        <div className='parameter'>
          {param}
          <InputItem
            style={{ flex: 1 }}
            type={type}
            defaultValue={this.props.productMsg[stateName]}
            onBlur={ (e) => {
              switch (stateName) {
                case 'productPrice':
                  this.setState({ productPrice: Number(e) },() => {
                    this.props.saveProductMsg({
                      productPrice: this.state.productPrice,
                      productStock: this.state.productStock,
                      productLabel: this.state.productLabel,
                      productName: this.state.productName
                    })
                  })
                  break
                case 'productStock':
                  this.setState({ productStock: Number(e) },() => {
                    this.props.saveProductMsg({
                      productPrice: this.state.productPrice,
                      productStock: this.state.productStock,
                      productLabel: this.state.productLabel,
                      productName: this.state.productName
                    })
                  })
                  break
                case 'productLabel':
                  this.setState({ productLabel: e }, () => {
                    this.props.saveProductMsg({
                      productPrice: this.state.productPrice,
                      productStock: this.state.productStock,
                      productLabel: this.state.productLabel,
                      productName: this.state.productName
                    })
                  })
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
    return (
      <div>
        <Head
          showLeftIcon='true'
          title='发布商品'
          backgroundColor='#0084e7'
          leftIconColor='white'
        />
        <div className='releaseContainer'>
          {this.renderImagePicker()}
          <div>
            <TextareaItem
              placeholder='输入商品标题'
              rows={2}
              count={60}
              defaultValue={this.state.productName}
              onBlur={ e => {
                this.setState({ productName: e },() => {
                  this.props.saveProductMsg({
                    productPrice: this.state.productPrice,
                    productStock: this.state.productStock,
                    productLabel: this.state.productLabel,
                    productName: this.state.productName
                  })
                })
              }}
            />
            {this.renderListItemGoTo('类目', '/category')}
          </div>
          <div className='paramContent' style={{ marginTop: 15, backgroundColor: 'white' }}>
            {this.renderParameterInput('价格', 'number','productPrice')}
            {this.renderParameterInput('库存', 'number','productStock')}
            {this.renderParameterInput('产品标签', 'text','productLabel')}
            {this.renderListItemGoTo('宝贝描述', '/describe')}
          </div>
          {this.renderBottomDrawer()}
          <div className='releaseFooter'>
            <div>放入仓库</div>
            <div onClick={this.submite}>立即发布</div>
          </div>
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
    categoryClassId: state.releaseData.categoryClassId
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  saveProductMsg
}

export default connect(mapStateToProps, mapDispatchToProps)(Release)

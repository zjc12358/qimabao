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

export interface Props {

}

interface State {
  data: any,
  files: any
}
let IconMaxSize: number = 30
class Describe extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: {},
      files: {}
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
    return (
      <div>
        <div className='describeHead'>
          <div onClick={() => { history().goBack() }}>
            <ReactSVG svgClassName='ic' path='./assets/images/ic_back-grey.svg'/>
          </div>
          <div>商品描述</div>
          <div><ReactSVG svgClassName='ic delete' path='./assets/images/Supplier/drawerDelete.svg'/></div>
        </div>
        <div className='describeContainer'>
          {/*<ReactQuill*/}
            {/*theme='snow'*/}
            {/*modules={{*/}
              {/*toolbar: ['image','link']*/}
            {/*}}*/}
            {/*onChange={ this.onQuillChange }*/}
          {/*/>*/}
          <input id='input' type='file' onChange={ e => {
            let file = e.target.files[0]
            this.setState({ files: file })
          }}/>
          <div onClick={() => {
            const formData = new FormData()
            formData.append('file', this.state.files)
            let url = '/CanteenProcurementManager/picket'
            // fetch(url,{
            //   method : 'POST',
            //   body: formData,
            //   headers: {
            //     'Content-Type': 'multipart/form-data'
            //   }
            // })
            let data = new FormData()
            data.append('files',this.state.files)
            console.log(data)
            // var cfg = {
            //   'Content-type':'multipart/form-data'
            // }
            let headers = { headers: { 'Content-Type': 'multipart/form-data' } }
            // axios.post(url,data,headers).then(function (data) {
            //   console.log(data)
            // },function (err) {
            //   console.log(err)
            // })
            axios.post(url,data,{ headers: { 'Content-Type': 'multipart/form-data' } })
              .then(data => {
                console.log(data)
              })
              .catch(err => {
                console.log(err)
              })
          }}>点击</div>
          <TextareaItem
            rows={8}
            placeholder='请输入商品描述'
          />
          <div onClick={() => { history().push('/orderDetail') } }>点我跳转</div>
        </div>
        <div className='describeFooter'>
          <div>添加图片</div>
          <div>完成</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Describe)

import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TextareaItem,List,InputItem } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import Head from '../../components/Head/index'
import './release.less'

export interface Props {

}

interface State {
  data: any
}
let IconMaxSize: number = 30
class Release extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  /**
   * 图片选择器
   */
  renderImagePicker = () => {
    return (
      <div className='img_picker'>
        <div className='camera'>
          <ReactSVG svgClassName='cameraIcon' path='./assets/images/Supplier/camera.svg'/>
        </div>
      </div>
    )
  }

  /**
   * 商家的各种参数输入框
   * @param param 参数名
   * @param type  input类型
   */
  renderParameterInput = (param,type) => {
    return (
      <List.Item>
        <div className='parameter'>
          {param}
          <InputItem
            style={{ flex: 1 }}
            type={type}
          />
        </div>
      </List.Item>
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
              count = {60}
            />
            <List.Item
              className='category'
              onClick={() => { console.log(1) }}
              arrow='horizontal'
            >
              类目
            </List.Item>
          </div>
          <div style={{ marginTop: 15,backgroundColor: 'white' }}>
            {this.renderParameterInput('价格','number')}
            {this.renderParameterInput('库存','number')}
            {this.renderParameterInput('产品标签','text')}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Release)

import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TextareaItem,List,InputItem,Button,ImagePicker } from 'antd-mobile'
import Drawer from '@material-ui/core/Drawer'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import Head from '../../../components/Head/index'
import './release.less'

export interface Props {

}

interface State {
  data: any,
  openDrawer: boolean,
  files: any,
  multiple: boolean
}
let IconMaxSize: number = 30
class Release extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: {},
      openDrawer: false,
      files: [],
      multiple: false
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({ openDrawer: open })
  }

  /**
   * 图片选择器
   */
  renderImagePicker = () => {
    return (
      <div className='img_picker' onClick={this.toggleDrawer('bottom',true)}>
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

  /**
   * 可跳转的ListItem
   * @param param
   */
  renderListItemGoTo = (param) => {
    return (
      <List.Item
        className='category'
        onClick={() => { console.log(1) }}
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
              count = {60}
            />
            {this.renderListItemGoTo('类目')}
          </div>
          <div className='paramContent' style={{ marginTop: 15,backgroundColor: 'white' }}>
            {this.renderParameterInput('价格','number')}
            {this.renderParameterInput('库存','number')}
            {this.renderParameterInput('产品标签','text')}
            {this.renderListItemGoTo('宝贝描述')}
          </div>
          {this.renderBottomDrawer()}
          <div className='releaseFooter'>
            <div>放入仓库</div>
            <div>立即发布</div>
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

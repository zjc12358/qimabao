import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { ActionSheet, ImagePicker, Toast } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import { ImagePickerBean } from '../../datasources/ImagePickerBean'

export interface Props {

}

interface State {
  pictures: Array<ImagePickerBean>
  multiple: boolean,
  bigPicture: string
}

class Menu extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      pictures: [],
      multiple: false,
      bigPicture: ''
    }
  }

  /**
   * 内容
   */
  renderContent = () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
      }}>
        <span style={{ marginTop: 20, fontWeight: 'bold', marginBottom: 20 }}>拍摄/上传您的菜谱或采购清单</span>
      </div>
    )
  }

  /**
   * 大图显示区
   */
  renderShowBigPicture = () => {
    if (this.state.pictures != null && this.state.pictures.length > 0) {
      return (
        <img style={{
          height: 150,
          width: '80%'
        }} src={this.state.bigPicture}
             onClick={this.bigPicOnClick}/>
      )
    } else {
      return (
        <div style={{
          backgroundColor: 'white',
          marginTop: 20,
          marginBottom: 20,
          width: '80%',
          height: 150,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }} onClick={this.uploadPicturesOnClick}>
          <span>照相机图片</span>
          <span style={{ fontSize: 15, color: '#0084e7' }}>点击拍摄/上传您的菜谱</span>
        </div>
      )

    }

  }

  /**
   * 图片缩略图列表
   */
  renderPicturesList = () => {
    return (
      // this.state.pictures != null && this.state.pictures.length > 0 &&
      <div className='horizontal'
           style={{
             marginTop: 20,
             width: '80%',
             justifyContent: 'center'
           }}>
        <ImagePicker
          style={{
            width: '100%'
          }}
          files={this.state.pictures}
          onChange={this.onChange}
          onImageClick={(index, fs) => this.pictureSelectOnClick(index)}
          selectable={this.state.pictures.length < 7}
          length={4}
          multiple={this.state.multiple}
        />
      </div>
    )
  }

  /**
   * 点击上传图片显示弹窗
   */
  uploadPicturesOnClick = () => {
    const BUTTONS = ['拍摄', '从相册上传', '取消']
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      message: '',
      title: ' ',
      maskClosable: true
    }, (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          this.photographOnClick()
          break
        case 1:
          this.albumOnClick()
          break
        default:
          break
      }
    })
  }

  /**
   * 大图点击事件
   */
  bigPicOnClick = () => {
    if (this.state.pictures != null && this.state.pictures.length > 0) {
      console.log('显示大图')
    } else {
      this.uploadPicturesOnClick()
    }
  }

  /**
   * 拍照
   */
  photographOnClick = () => {
    console.log('拍照')
  }

  /**
   * 从相册中选择
   */
  albumOnClick = () => {
    console.log('从相册中选择')
  }

  onChange = (pictures: Array<ImagePickerBean>, type, index) => {
    console.log(pictures, type, index)
    this.setState({
      pictures
    })
    if (pictures != null && pictures.length > 0) {
      this.setState({
        bigPicture: pictures[pictures.length - 1].url
      })
    }
  }

  onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex
    this.setState({
      multiple: index === 1
    })
  }

  pictureSelectOnClick = (index) => {
    this.setState({
      bigPicture: this.state.pictures[index].url
    })
  }

  public render () {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#efeff5',
        height: '100%',
        width: '100%'
      }}>
        {this.renderContent()}
        {this.renderShowBigPicture()}
        {this.renderPicturesList()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

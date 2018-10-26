import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, ActionSheet } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import Statusbar from '@components/Statusbar'
import Head from '@components/Head'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo } from '@store/actions/global-data'

export interface Props {
}

interface State {

}

class Order extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {}
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
        <span style={{ marginTop: 60, fontWeight: 'bold' }}>拍摄/上传您的菜谱或采购清单</span>
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
      </div>
    )
  }

  renderPicturesList = () => {
    return (
      <div>
        1
      </div>
    )
  }

  /**
   * 右上方确定
   */
  okOnClick = () => {
    console.log('点击确定')
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
    },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            break
          case 1:
            break
          default:
            break
        }
      })
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

  public render () {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#efeff5',
        height: '100%'
      }}>
        <Head showRightIcon={true} backgroundColor={'#0084e7'} title={'菜谱'} showLeftIcon={false}
              rightIconOnClick={this.okOnClick.bind(this)} rightIconContent={'确定'}/>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Order)

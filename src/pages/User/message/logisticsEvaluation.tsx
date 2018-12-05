import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '../../../store/reducers/globalDataReducer'
import { Icon, Modal } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { PageTab } from '../../../datasources/PageTab'
import { UserInfo } from '../../../datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '../../../store/actions/global_data'
import '../master.css'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import { Rate,Input } from 'element-react'
import 'element-theme-default'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: string) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  data: any
  scroll: boolean
  modal: boolean
  evaluate: string
}
let starIconMaxSize: number = 25
class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: [
        { date: '',time: '',status: '',address: '[收货地址]浙江省衢州市柯城区 荷花街道  兴华苑35幢2单元' },
        { date: '10-24',time: '09:34',status: '已签收',address: '[收货地址]浙江省衢州市柯城区 荷花街道  兴华苑35幢2单元' },
        { date: '10-24',time: '09:34',status: '已签收',address: '[收货地址]浙江省衢州市柯城区 荷花街道  兴华苑35幢2单元' },
        { date: '10-24',time: '09:34',status: '已签收',address: '[收货地址]浙江省衢州市柯城区 荷花街道  兴华苑35幢2单元' },
        { date: '10-24',time: '09:34',status: '',address: '[收货地址]浙江省衢州市柯城区 荷花街道  兴华苑35幢2单元' },
        { date: '10-24',time: '09:34',status: '已签收',address: '[收货地址]浙江省衢州市柯城区 荷花街道  兴华苑35幢2单元' }
      ],
      scroll: false,
      modal: false,
      evaluate: '暂无评价'
    }
  }

  public renderNav = () => {
    return (
      <div className={'flex-flex-start-row-center'} style={{
        backgroundColor: '#0084e7',
        color: 'white',
        height: 40,
        position: 'relative'
      }}>
        <div style={{ paddingLeft: 10 }} onClick={() => history().goBack()}>
          <ReactSVG path='./components/Head/ic_back_white.svg' svgStyle={{ width: 22, height: 22 }}/>
        </div>
        <div style={{ paddingLeft: 15 }}>
          <span className={'commonFont'} style={{ fontSize: 16 }}>已签收</span>
        </div>
      </div>
    )
  }

  public renderHead = () => {
    return(
      <div style={{
        backgroundColor: '#ffffff',
        height: 110,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        border: '1px solid #ddd',
        borderRadius: 5
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          alignItems: 'flex-start',
          height: '100%'
        }}>
          <div style={{ paddingLeft: 10,paddingTop: 5 }}><span style={{ color: '#b1b1b1' }}>物流评价</span></div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10
            }}>
              <div style={{ borderRadius: '50%',width: 40, height: 40,overflow: 'hidden' }} >
                <img style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }} src='http://bpic.588ku.com/element_origin_min_pic/16/12/23/2c6eb9041609e50a683f614ca8fcc0ca.jpg' />
              </div>
              <div className={'flex-row-space-around'} style={{ width: window.innerWidth * 0.5,paddingLeft: 5 }} onClick={this.showModal}>
                <ReactSVG path='./assets/images/User/star_on.svg' svgStyle={{ width: starIconMaxSize, height: starIconMaxSize }}/>
                <ReactSVG path='./assets/images/User/star_on.svg' svgStyle={{ width: starIconMaxSize, height: starIconMaxSize }}/>
                <ReactSVG path='./assets/images/User/star_off.svg' svgStyle={{ width: starIconMaxSize, height: starIconMaxSize }}/>
                <ReactSVG path='./assets/images/User/star_off.svg' svgStyle={{ width: starIconMaxSize, height: starIconMaxSize }}/>
                <ReactSVG path='./assets/images/User/star_off.svg' svgStyle={{ width: starIconMaxSize, height: starIconMaxSize }}/>
              </div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              width: 80
            }}>
              <div style={{ borderLeft: '2px solid #eee', height: 30 }}/>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <ReactSVG path='./assets/images/User/phone.svg' svgStyle={{ width: 40, height: 40 }}/>
                <span style={{ fontSize: 14,color: '#151515' }}>电话</span>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: '#f6f6f6',width: '100%',paddingBottom: 2,borderRadius: 5 }}>
            <div style={{
              verticalAlign: 'center',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
              <span style={{ color: '#3e3e3e',paddingLeft: 10,paddingTop: 3,fontSize: 12 }}>运单号: 315645646</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  public renderContent = () => {
    if (this.state.data.length === 0) {
      return(
        <div style={{
          backgroundColor: '#ffffff',
          height: 90,
          marginTop: 20,
          marginLeft: 20,
          marginRight: 20,
          border: '1px solid #ddd',
          borderRadius: 5,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          color: '#b6b6b6'
        }}>
          当前没有物流信息
        </div>
      )
    }
    return(
      <div>
        <div style={{
          backgroundColor: '#ffffff',
          height: 20 + (this.state.scroll === true ? this.state.data.length * 60 : 140),
          marginTop: 20,
          marginLeft: 20,
          marginRight: 20,
          border: '1px solid #ddd',
          borderRadius: 5,
          position: 'relative'
        }}>
          <div style={{
            paddingTop: 20
          }}>
            {this.state.data.map((i,index) => {
              if (index > 1 && this.state.scroll !== true) { return }
              return(
                <div>
                  {this.renderTradeItem(i,index)}
                </div>
              )
            })}
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            height: 20
          }}>
            <span style={{ fontSize: 10, color: '#c3c3c3' }} onClick={this.scrollOnclick}>{!this.state.scroll ? '点击查看更多物流信息' : ''}</span>
          </div>
        </div>
        {this.renderEvaluation()}
      </div>
    )
  }

  public renderTradeItem = (i,index) => {
    let path: string = ''
    if (i.status !== null && i.status !== '') {
      path = './assets/images/User/tick.svg'
    } else {
      path = './assets/images/User/collect.svg'
    }
    return(
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        marginTop: -20
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: 20,
          width: 50,
          marginTop: -23
        }}>
          {i.date != null && i.date !== '' ? this.renderTime(i) : ''}
        </div>
        <div style={{
          height: '100%',
          position: 'relative',
          width: 50
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: '100%'
          }}>
            <div style={{ height: '50%', width: 2, backgroundColor: '#dbd8da',marginTop: 25 }} />
          </div>
          <div style={{ position: 'absolute', top: 9,left: 10 ,width: 28,height: 28 }} >
            <ReactSVG path = {path} svgStyle={{ width: 28, height: 28 }}/>
          </div>
        </div>
        {this.renderAddress(i,index)}
      </div>
    )
  }

  public renderTime = (i) => {
    return(
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: 20,
        width: 50
      }}>
        <div style={{ fontSize: 13 }}>{i.date}</div>
        <div>
          <span style={{ color: '#dadada',fontSize: 10 }}>{i.time}</span>
        </div>
      </div>
    )
  }

  public renderAddress = (i,index) => {
    if (i.status !== null && i.status !== '') {
      return(
        <div style={{ width: 200,backgroundColor: '#ffffff',marginTop: -20,fontSize: 12 }}>
          <span>{i.status}</span><br/>
          {i.address}
        </div>
      )
    }
    return(
      <div style={{ width: 200,backgroundColor: '#ffffff',marginTop: -20 ,fontSize: 12 }}>
        {i.address}
      </div>
    )
  }

  public renderEvaluation = () => {
    return(
      <Modal
        popup
        visible={this.state.modal}
        onClose={() => this.onClose()}
        animationType='slide-up'
        style={{ height: '60%' }}
      >
        <div>
          <div className={'flex-space-around-column-center'} style={{ height: 100 }}>
            <div style={{ position: 'relative',width: '100%',marginTop: 15 }}>
              <div style={{ position: 'absolute',right: 15,top: 0 }}>
                <ReactSVG onClick={() => this.onClose()} path='./assets/images/User/close.svg' svgStyle={{ height: 22,width: 22 }}/>
              </div>
              <div className={'flex-center-row-center'} >
                <span className={'commonFont'} style={{ fontSize: 18,color: '#333' }}>物流评价</span>
              </div>
            </div>
            <div className={'starLevel'} style={{ paddingBottom: 10 }}>
              <Rate colors={['#99A9BF', '#F7BA2A', '#FF9900']} onChange={(val) => this.setLevel(val)} />
            </div>
            <span className={'commonFont'} style={{ fontSize: 14,color: '#999' }}>{this.state.evaluate}</span>
          </div>
          <div className={'flex-center-column-stretch'} style={{ position: 'relative',paddingTop: 10 }}>
            <div className={'Segment_line'} />
            <div style={{ position: 'absolute',left: '35%',backgroundColor: 'white',width: '30%' }}>
              <span className={'commonFont'} style={{ fontSize: 16,color: '#333' }}>选择标签</span>
            </div>
          </div>
          <div className={'flex-center-row-center'} style={{ flexWrap: 'wrap',paddingTop: 20,alignContent: 'stretch',height: 100 }}>
            <div className={'flex-center-row-center'}
                 style={{ width: 'auto', height: 'auto', padding: '5px 10px',border: '1px solid #ccc',borderRadius: 15,marginRight: 20 }}>
              <span className={'commonFont'} style={{ fontSize: 14, color: '#333' }}>货品包装物破损</span>
            </div>
            <div className={'flex-center-row-center'}
                 style={{ width: 'auto', height: 'auto', padding: '5px 10px',border: '1px solid #ccc',borderRadius: 15,marginRight: 20 }}>
              <span className={'commonFont'} style={{ fontSize: 14, color: '#333' }}>送货前电联</span>
            </div>
            <div className={'flex-center-row-center'}
                 style={{ width: 'auto', height: 'auto', padding: '5px 10px',border: '1px solid #ccc',borderRadius: 15,marginRight: 20 }}>
              <span className={'commonFont'} style={{ fontSize: 14, color: '#333' }}>送货上门</span>
            </div>
            <div className={'flex-center-row-center'}
                 style={{ width: 'auto', height: 'auto', padding: '5px 10px',border: '1px solid #ccc',borderRadius: 15,marginRight: 20 }}>
              <span className={'commonFont'} style={{ fontSize: 14, color: '#333' }}>态度服务好</span>
            </div>
          </div>
          <div className={'flex-center-row-stretch'} style={{ padding: '10px 10px' }}>
            <Input
              type='textarea'
              autosize={{ minRows: 4, maxRows: 6 }}
              placeholder='请输入评价...'
            />
            <Button type={'primary'} style={{ marginTop: 10 }}>提交</Button>
          </div>
        </div>
      </Modal>
    )
  }
  public setLevel = (val) => {
    switch (val) {
      case 1:
        this.setState({
          evaluate: '极差'
        });break
      case 2:
        this.setState({
          evaluate: '一般'
        });break
      case 3:
        this.setState({
          evaluate: '良好'
        });break
      case 4:
        this.setState({
          evaluate: '满意'
        });break
      case 5:
        this.setState({
          evaluate: '非常满意'
        });break
    }

  }
  /**
   * 打开modal
   */
  showModal = (e) => {
    e.preventDefault() // 修复 Android 上点击穿透
    this.setState({ modal: true })
  }
  onClose = () => {
    this.setState({ modal: false })
  }

  public scrollOnclick = () => {
    this.setState({
      scroll: !this.state.scroll
    })
  }

  public render () {
    return (
      <div>
        {this.renderNav()}
        {this.renderHead()}
        {this.renderContent()}
      </div>
    )
  }

}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    pageTab: state.globalData.pageTab,
    userInfo: state.globalData.userInfo
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updatePageTab,
  updateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

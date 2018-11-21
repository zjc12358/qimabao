import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '../../../store/reducers/globalDataReducer'
import { Icon } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { PageTab } from '../../../datasources/PageTab'
import { UserInfo } from '../../../datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '../../../store/actions/global_data'
import '../master.css'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: string) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  data: any
  scroll: boolean
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
      scroll: false
    }
  }

  public renderNav = () => {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        height: 40,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        border: '1px solid #ddd',
        borderRadius: 5,
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          height: '100%'
        }}>
          <div style={{ paddingLeft: 10 }} onClick={() => history().goBack()}>
            <Icon type={'left'} />
          </div>
          <div style={{ paddingLeft: 24 }}>
            <Icon type={'loading'} />
          </div>
          <div style={{ paddingLeft: 15 }}>
            <span style={{ fontSize: 16 }}>已签收</span>
          </div>
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
          <div style={{ paddingLeft: 10 }}><span style={{ color: '#b1b1b1' }}>物流评价</span></div>
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
                }} src='http://img.gexing.me/uploads/allimg/170830/1-1FR9161152259.jpg' />
              </div>
              <div className={'flex-row-space-around'} style={{ width: window.innerWidth * 0.5,paddingLeft: 5 }}>
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

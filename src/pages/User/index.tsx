import * as React from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { NavBar,Icon } from 'antd-mobile'
import { updateUserInfo, updatePageTab } from '@store/actions/global_data'
import './master.css'
import { UserInfo } from '@datasources/UserInfo'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'

export interface Props {
  pageTab: string
  userInfo: UserInfo
  updatePageTab: (pageName: string) => void
  updateUserInfo: (userInfo: UserInfo) => void
}
interface State {

}
let OrderIconMaxSize: number = 26
class User extends React.Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  /**
   * 标题
   */
  public renderNav = () => {
    return (
      <div style={{
        position: 'fixed',
        top: '0',
        width: '100%',
        height: '40px',
        background: '#0084E7',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 100
      }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '96%',
          padding: '8px'
        }}>
          <ReactSVG path='./assets/images/User/setting.svg' svgStyle={{ width: 25, height: 25 }} onClick={this.settingOnclick}/>
          <ReactSVG path='./assets/images/User/message.svg' svgStyle={{ width: 25, height: 25 }} onClick={this.messageOnclick}/>
        </div>
      </div>
    )
  }
  /**
   * 内容
   */
  public renderContent = () => {
    return (
      <div style={{
        height: '100vh'
      }}>
        {this.renderHead()}
        {this.renderBody()}
        {this.renderFoot()}
      </div>
    )
  }
  /**
   * 内容头部
   */
  public renderHead = () => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        position: 'relative'
      }}>
        <div style={{
          height: '120px',
          backgroundColor: '#0084E7',
          position: 'relative'
        }}>
        </div>
        <div style={{
          height: '130px',
          width: '90%',
          backgroundColor: '#f8f8f8',
          borderRadius: 10,
          left: '5%',
          top: 70,
          position: 'absolute',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
            height: 50
          }}>
            <ReactSVG path='./assets/images/User/scan.svg' svgStyle={{ width: 22, height: 22 }}/>&nbsp;&nbsp;&nbsp;
            <ReactSVG path='./assets/images/User/qr_code.svg' svgStyle={{ width: 22, height: 22 }}/>&nbsp;&nbsp;&nbsp;
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 15
          }} onClick={this.couponOnclick}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center',
              paddingLeft: 20
            }}>
              <span style={{ fontSize: '18px' }}>6</span>
              <span style={{ fontSize: '14px',color: '#8d8d8d',fontFamily: '黑体' }}>优惠券</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center'
            }} onClick={this.couponOnclick}>
              <span style={{ fontSize: '18px' }}>0.00</span>
              <span style={{ fontSize: '14px',color: '#8d8d8d',fontFamily: '黑体' }}>礼品卡</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center',
              paddingRight: 20
            }} onClick={this.couponOnclick}>
              <span style={{ fontSize: '18px' }}>0</span>
              <span style={{ fontSize: '14px',color: '#8d8d8d',fontFamily: '黑体' }}>电子券</span>
            </div>
          </div>
        </div>
        <div style={{
          top: 50,
          left: '8%',
          position: 'absolute',
          zIndex: 98,
          borderRadius: '50%',
          width: 270,
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center'
        }} onClick={this.userInfoOnclick}>
          <div style={{ borderRadius: '50%',width: 85, height: 85,overflow: 'hidden', marginRight: 0 }}><img style={{
            width: '100%',
            height: '100%'
          }} src='http://img.gexing.me/uploads/allimg/170830/1-1FR9161152259.jpg' /></div>
          <div style={{ width: 150 }}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis',whiteSpace: 'nowrap',width: '100%',display: 'block' }}>衢州炒菜软件技术有限公司</span>
          </div>
        </div>
      </div>
    )
  }
  /**
   * 内容
   */
  public renderBody = () => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingTop: 100
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 10
        }} onClick={this.orderOnclick}>
          <span style={{ fontSize: '16px',fontWeight: 'bold',color: '#4f4f55', fontFamily: '幼圆' }}>我的订单</span>
          <Icon type='right'></Icon>
        </div>
        <div className='Segment_line'></div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 20,
          paddingBottom: 20,
          backgroundColor: '#ffffff'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center'
          }} onClick={this.orderOnclick}>
            <ReactSVG path='./assets/images/User/pay.svg' svgStyle={{ width: OrderIconMaxSize, height: OrderIconMaxSize }}/>
            <span style={{ fontSize: '10px',color: '#828282',fontFamily: '黑体',paddingTop: 3 }}>待付款</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center'
          }} onClick={this.orderOnclick}>
            <ReactSVG path='./assets/images/User/delivery.svg' svgStyle={{ width: OrderIconMaxSize, height: OrderIconMaxSize }}/>
            <span style={{ fontSize: '10px',color: '#828282',fontFamily: '黑体' }}>待配送</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center'
          }} onClick={this.orderOnclick}>
            <ReactSVG path='./assets/images/User/get.svg' svgStyle={{ width: OrderIconMaxSize, height: OrderIconMaxSize }}/>
            <span style={{ fontSize: '10px',color: '#828282',fontFamily: '黑体' }}>待收货</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center'
          }} onClick={this.orderOnclick}>
            <ReactSVG path='./assets/images/User/evaluation.svg' svgStyle={{ width: OrderIconMaxSize, height: OrderIconMaxSize }}/>
            <span style={{ fontSize: '10px',color: '#8d8d8d',fontFamily: '黑体' }}>待评价</span>
          </div>
        </div>
        <div className='Segment_line' />
        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          height: 70,
          paddingLeft: 28
        }}>
          <span style={{ fontSize: '16px',fontFamily: '黑体',color: '#404040' }}>最新订单</span>
          <div style={{ paddingLeft: 20 }} />
          <div style={{ borderRadius: '50%',width: 35, height: 35,overflow: 'hidden' }}><img style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%'
          }} src='http://img.gexing.me/uploads/allimg/170830/1-1FR9161152259.jpg' /></div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            paddingLeft: 10
          }} onClick={this.orderOnclick}>
            <span style={{ fontSize: '13px',color: '#0285e7', fontFamily: '幼圆' }}>待付款</span>
            <span style={{ fontSize: '10px',color: '#8d8d8d',fontFamily: '黑体', marginTop: 7 }}>9分钟后订单关闭</span>
          </div>
        </div>
        <div className='Segment_line2' />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }} onClick={this.orderOnclick}>
          <span style={{ fontSize: '16px' }}>我的购买</span>
          <Icon type='right' />
        </div>
        <div className='Segment_line2' />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }} onClick={this.afterSaleOnclick}>
          <span style={{ fontSize: '16px' }}>售后退款</span>
          <Icon type='right' />
        </div>
        <div style={{
          height: 8,
          backgroundColor: '#efeff5'
        }}/>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }}>
          <span style={{ fontSize: '16px' }}>我的店铺</span>
          <Icon type='right'></Icon>
        </div>
      </div>
    )
  }
  /**
   * 内容尾部
   */
  public renderFoot = () => {
    return (
      <div>
        <div style={{
          height: 8,
          backgroundColor: '#efeff5'
        }}/>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 10,
          backgroundColor: '#ffffff'
        }}>
          <span style={{ fontSize: '16px',fontWeight: 'bold',color: '#4f4f55', fontFamily: '幼圆' }}>常用工具</span>
          <Icon type='right'></Icon>
        </div>
        <div className='Segment_line'></div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 20,
          backgroundColor: '#ffffff'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column'
          }}>
            <Icon type='loading'></Icon>
            <span style={{ fontSize: '10px',color: '#828282',fontFamily: '黑体' }}>待付款</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column'
          }}>
            <Icon type='loading'></Icon>
            <span style={{ fontSize: '10px',color: '#828282',fontFamily: '黑体' }}>待付款</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column'
          }}>
            <Icon type='loading'></Icon>
            <span style={{ fontSize: '10px',color: '#828282',fontFamily: '黑体' }}>待付款</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column'
          }}>
            <Icon type='loading'></Icon>
            <span style={{ fontSize: '10px',color: '#828282',fontFamily: '黑体' }}>待付款</span>
          </div>
        </div>
        <div style={{
          height: 15,
          backgroundColor: '#f6f6f6'
        }}/>
      </div>
    )
  }

  public messageOnclick = () => {
    this.props.updatePageTab('UserPageTabBar')
    history().push('/message')
  }

  public settingOnclick = () => {
    this.props.updatePageTab('UserPageTabBar')
    history().push('/setting')
  }

  public userInfoOnclick = () => {
    this.props.updatePageTab('UserPageTabBar')
    history().push('/userInfoEdit')
  }

  public couponOnclick = () => {
    this.props.updatePageTab('UserPageTabBar')
    history().push('/coupon')
  }

  public orderOnclick = () => {
    this.props.updatePageTab('UserPageTabBar')
    history().push('/myOrder')
  }

  public afterSaleOnclick = () => {
    this.props.updatePageTab('UserPageTabBar')
    history().push('/afterSale')
  }

  public render () {
    return (
      <div className={'container'} style={{
        backgroundColor: '#fff'
      }}>
        {this.renderNav()}
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

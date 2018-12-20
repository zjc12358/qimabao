import * as React from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { NavBar, Icon, Toast } from 'antd-mobile'
import { updateUserInfo, updatePageTab, changeMode } from '@store/actions/global_data'
import { UserInfo } from '@datasources/UserInfo'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import Badge from '@components/Badge'
import axios from 'axios'
import { LoginBean } from '@datasources/LoginBean'
import { MyResponse } from '@datasources/MyResponse'

export interface Props {
  pageTab: string
  userInfo: UserInfo
  updatePageTab: (pageName: string) => void
  updateUserInfo: (userInfo: UserInfo) => void
  changeMode: (model: 'supplier' | 'purchaser') => void
}

interface State {
  userInfo: UserInfo
}

let OrderIconMaxSize: number = 35

class User extends React.Component<Props, State> {
  private RightIconMaxSize: number = 16
  private MenuMaxSize: number = 22

  constructor (props) {
    super(props)
    this.state = {
      userInfo: this.props.userInfo
    }
  }

  public componentDidMount () {
    window.console.log(window.navigator)
  }

  /**
   * 标题
   */
  public renderNav = () => {
    return (
      <div style={{
        position: this.props.pageTab === 'UserPageTabBar' ? 'fixed' : 'static',
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
          <ReactSVG path='./assets/images/User/setting.svg' svgStyle={{ width: 25, height: 25 }}
                    onClick={this.settingOnclick}/>
          <div style={{ position: 'relative' }}>
            <Badge num={2} left={15}/>
            <ReactSVG path='./assets/images/User/message.svg' svgStyle={{ width: 25, height: 25 }}
                      onClick={this.messageOnclick}/>
          </div>
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
          backgroundColor: '#0084E7',
          borderRadius: 15,
          left: '5%',
          top: 78,
          position: 'absolute',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column'
        }}>
        </div>
        <div style={{
          height: '130px',
          width: '90%',
          backgroundColor: '#ffffff',
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
              <span style={{ fontSize: '14px', color: '#8d8d8d', fontFamily: '微软雅黑' }}>优惠券</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center'
            }} onClick={this.couponOnclick}>
              <span style={{ fontSize: '18px' }}>0.00</span>
              <span style={{ fontSize: '14px', color: '#8d8d8d', fontFamily: '微软雅黑' }}>礼品卡</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center',
              paddingRight: 20
            }} onClick={this.couponOnclick}>
              <span style={{ fontSize: '18px' }}>0</span>
              <span style={{ fontSize: '14px', color: '#8d8d8d', fontFamily: '微软雅黑', paddingTop: 5 }}>电子券</span>
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
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <div style={{ borderRadius: '50%', width: 85, height: 85, overflow: 'hidden', marginRight: 10 }}
               onClick={this.userInfoOnclick}>
            <img
              style={{
                width: '100%',
                height: '100%'
              }} src={this.state.userInfo.user_head_portrait}/></div>
          <div style={{ width: 110 }}>
            <span style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '100%',
              display: 'block'
            }} onClick={this.testLogin}>{this.state.userInfo.user_name}</span>
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
        <div className={'flex-space-between-row-center'} style={{ padding: '16px 16px' }}>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#4f4f55', fontFamily: '微软雅黑' }}>我的订单</span>
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
            <div style={{ position: 'relative' }}>
              <Badge num={2} left={25}/>
              <ReactSVG path='./assets/images/User/pay.svg'
                        svgStyle={{ width: OrderIconMaxSize, height: OrderIconMaxSize }}/>
            </div>
            <span style={{ fontSize: '10px', color: '#828282', fontFamily: '黑体', paddingTop: 3 }}>待付款</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center'
          }} onClick={this.orderOnclick}>
            <ReactSVG path='./assets/images/User/delivery.svg'
                      svgStyle={{ width: OrderIconMaxSize, height: OrderIconMaxSize }}/>
            <span style={{ fontSize: '10px', color: '#828282', fontFamily: '黑体' }}>待配送</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center'
          }} onClick={this.orderOnclick}>
            <ReactSVG path='./assets/images/User/get.svg'
                      svgStyle={{ width: OrderIconMaxSize, height: OrderIconMaxSize }}/>
            <span style={{ fontSize: '10px', color: '#828282', fontFamily: '黑体' }}>待收货</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center'
          }} onClick={this.orderOnclick}>
            <ReactSVG path='./assets/images/User/evaluation.svg'
                      svgStyle={{ width: OrderIconMaxSize, height: OrderIconMaxSize }}/>
            <span style={{ fontSize: '10px', color: '#8d8d8d', fontFamily: '黑体' }}>待评价</span>
          </div>
        </div>
        <div className='Segment_line'/>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          height: 70,
          paddingLeft: 28
        }}>
          <span style={{ fontSize: '16px', fontFamily: '微软雅黑', color: '#404040' }}>最新订单</span>
          <div style={{ paddingLeft: 20 }}/>
          <div style={{ borderRadius: '50%', width: 35, height: 35, overflow: 'hidden', zIndex: 98 }}
               onClick={this.orderOnclick}>
            <img style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%'
            }} src='http://img.gexing.me/uploads/allimg/170830/1-1FR9161152259.jpg'/></div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            paddingLeft: 10
          }} onClick={this.orderOnclick}>
            <span style={{ fontSize: '13px', color: '#0285e7', fontFamily: '微软雅黑' }}>待付款</span>
            <span style={{ fontSize: '10px', color: '#8d8d8d', fontFamily: '微软雅黑', marginTop: 7 }}>9分钟后订单关闭</span>
          </div>
        </div>
        <div style={{ height: 'auto' }}>
          <div className='Segment_line2'/>
          <div className={'flex-space-between-row-center'} style={{ padding: '16px 16px' }} onClick={this.orderOnclick}>
            <span style={{ fontSize: '16px' }}>我的购买</span>
            <ReactSVG path='./assets/images/User/right.svg'
                      svgStyle={{ width: this.RightIconMaxSize, height: this.RightIconMaxSize }}/>
          </div>
          <div className='Segment_line2'/>
          <div className={'flex-space-between-row-center'} style={{ padding: '16px 16px' }}
               onClick={this.afterSaleOnclick}>
            <span style={{ fontSize: '16px' }}>售后退款</span>
            <ReactSVG path='./assets/images/User/right.svg'
                      svgStyle={{ width: this.RightIconMaxSize, height: this.RightIconMaxSize }}/>
          </div>
        </div>
        <div style={{
          height: 8,
          backgroundColor: '#efeff5'
        }}/>
        <div className={'flex-space-between-row-center'} style={{ padding: '16px 16px', backgroundColor: '#fff' }}
             onClick={() => this.props.changeMode('supplier')}>
          <span style={{ fontSize: '16px', whiteSpace: 'nowrap' }}>我的店铺</span>
          <div className={'flex-flex-end-row-center'}>
            <span style={{ fontSize: 12, color: 'red', whiteSpace: 'normal' }}>您有一条新的订单【点击查看】</span>
            <ReactSVG path='./assets/images/User/right.svg'
                      svgStyle={{ width: this.RightIconMaxSize, height: this.RightIconMaxSize }}/>
          </div>
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
        <div className={'flex-space-between-row-center'} style={{ padding: '10px 16px', backgroundColor: '#fff' }}>
          <div className={'flex-flex-start-row-center'}>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#4f4f55', fontFamily: '微软雅黑' }}>常用工具</span>
            <span style={{ fontSize: 12, color: 'red' }}>【工具栏】 功能暂未开放</span>
          </div>
          <ReactSVG path='./assets/images/User/right.svg'
                    svgStyle={{ width: this.RightIconMaxSize, height: this.RightIconMaxSize }}/>
        </div>
        <div className='Segment_line'/>
        <div style={{ backgroundColor: '#fff', height: 200, padding: 10 }}>
          {this.renderUtils()}
        </div>
      </div>
    )
  }
  /**
   * 工具
   */
  public renderUtils = () => {
    return (
      <div className={'flex-space-between-column-stretch'} style={{ width: '100%', height: '100%' }}>
        <div className={'flex-space-between-row-center'} style={{ padding: '10px 10px 0', height: '44%' }}>
          <div className={'flex-space-between-column-center'} style={{ height: 60 }}
               onClick={() => history().push('sProductList')}>
            <div className={'flex-center-row-center'}
                 style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#3333cc' }}>
              <img src='./assets/images/SupplierTest/commodityManagement.png' width={this.MenuMaxSize}
                   height={this.MenuMaxSize}/>
            </div>
            <div className={'commonFont'} style={{ fontSize: 14, color: '#333' }}>所有账单</div>
          </div>
          <div className={'flex-space-between-column-center'} style={{ height: 60 }}
               onClick={() => history().push('sProductList')}>
            <div className={'flex-center-row-center'}
                 style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#6633ff' }}>
              <img src='./assets/images/SupplierTest/classification.png' width={this.MenuMaxSize}
                   height={this.MenuMaxSize}/>
            </div>
            <div className={'commonFont'} style={{ fontSize: 14, color: '#333' }}>我的账户</div>
          </div>
          <div className={'flex-space-between-column-center'} style={{ height: 60 }}
               onClick={() => history().push('sProductList')}>
            <div className={'flex-center-row-center'}
                 style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#009966' }}>
              <img src='./assets/images/SupplierTest/distribution.png' width={this.MenuMaxSize}
                   height={this.MenuMaxSize}/>
            </div>
            <div className={'commonFont'} style={{ fontSize: 14, color: '#333' }}>收货地址</div>
          </div>
          <div className={'flex-space-between-column-center'} style={{ height: 60 }}
               onClick={() => history().push('detection')}>
            <div className={'flex-center-row-center'}
                 style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#0066ff' }}>
              <img src='./assets/images/SupplierTest/testing.png' width={this.MenuMaxSize} height={this.MenuMaxSize}/>
            </div>
            <div className={'commonFont'} style={{ fontSize: 14, color: '#333' }}>退款申请</div>
          </div>
        </div>
        <div className={'flex-space-between-row-center'} style={{ padding: '20px 10px 10px 10px', height: '44%' }}>
          <div className={'flex-space-between-column-center'} style={{ height: 60 }}
               onClick={() => history().push('sProductList')}>
            <div className={'flex-center-row-center'}
                 style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#3399cc' }}>
              <img src='./assets/images/SupplierTest/release.png' width={this.MenuMaxSize} height={this.MenuMaxSize}/>
            </div>
            <div className={'commonFont'} style={{ fontSize: 14, color: '#333' }}>我的评价</div>
          </div>
          <div className={'flex-space-between-column-center'} style={{ height: 60 }}
               onClick={() => history().push('sProductList')}>
            <div className={'flex-center-row-center'}
                 style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#ff6600' }}>
              <img src='./assets/images/SupplierTest/evaluate.png' width={this.MenuMaxSize} height={this.MenuMaxSize}/>
            </div>
            <div className={'commonFont'} style={{ fontSize: 14, color: '#333' }}>联系客服</div>
          </div>
          <div className={'flex-space-between-column-center'} style={{ height: 60 }}
               onClick={() => history().push('/supplierAfterSale')}>
            <div className={'flex-center-row-center'}
                 style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#0099ff' }}>
              <img src='./assets/images/SupplierTest/evaluate.png' width={this.MenuMaxSize} height={this.MenuMaxSize}/>
            </div>
            <div className={'commonFont'} style={{ fontSize: 14, color: '#333' }}>尽请期待</div>
          </div>
          <div className={'flex-space-between-column-center'} style={{ height: 60 }}
               onClick={() => history().push('/supplierAfterSale')}>
            <div className={'flex-center-row-center'}
                 style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#ff9900' }}>
              <img src='./assets/images/SupplierTest/evaluate.png' width={this.MenuMaxSize} height={this.MenuMaxSize}/>
            </div>
            <div className={'commonFont'} style={{ fontSize: 14, color: '#333' }}>尽请期待</div>
          </div>
        </div>
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

  /**
   * 测试模拟用户登录
   */
  testLogin = () => {
    let head = {
      'date': new Date(),
      'transfer-encoding': 'chunked',
      'content-type': 'application/json;charset=UTF-8'
    }
    let url = 'CanteenProcurementManager/user/nail/findNailOpenId?'
    let query = 'openId=maoxiaoyan'
    axios.get<MyResponse<LoginBean>>(url + query)
      .then(data => {
        console.log('--- data =', data)
        if (data.data.code === 0) {
          Toast.info('登录成功', 2, null, false)
        } else {
          Toast.info(data.data.msg, 2, null, false)
        }
      })
      .catch(() => {
        Toast.info('请检查网络设置!')
      })
  }

  public render () {
    return (
      <div style={{
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
  updateUserInfo,
  changeMode
}

export default connect(mapStateToProps, mapDispatchToProps)(User)

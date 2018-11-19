import * as React from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { NavBar,Icon } from 'antd-mobile'
import { updateUserInfo, updatePageTab } from '@store/actions/global_data'
import './master.css'
import { UserInfo } from '@datasources/UserInfo'
import history from 'history/createHashHistory'

export interface Props {
  pageTab: string
  userInfo: UserInfo
  updatePageTab: (pageName: string) => void
  updateUserInfo: (userInfo: UserInfo) => void
}
interface State {

}

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
          <div onClick={this.settingOnclick}><Icon type='check' color='#ffffff' size='lg'/></div>
          <div onClick={this.messageOnclick}><Icon type='check' color='#ffffff' size='lg'/></div>
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
          backgroundColor: '#efefef',
          left: '5%',
          top: 70,
          position: 'absolute',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            zIndex: 98,
            paddingTop: 15
          }}>
            <span style={{ paddingLeft: 130 }}>用户名</span>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row'
            }}>
              <span>扫码</span>&nbsp;&nbsp;&nbsp;
              <span>二维</span>&nbsp;&nbsp;&nbsp;
            </div>
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
              <span style={{ fontSize: '14px',color: '#828282',fontFamily: '黑体' }}>待付款</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center'
            }} onClick={this.couponOnclick}>
              <span style={{ fontSize: '18px' }}>0.00</span>
              <span style={{ fontSize: '14px',color: '#828282',fontFamily: '黑体' }}>待付款</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center',
              paddingRight: 20
            }} onClick={this.couponOnclick}>
              <span style={{ fontSize: '18px' }}>0</span>
              <span style={{ fontSize: '14px',color: '#828282',fontFamily: '黑体' }}>待付款</span>
            </div>
          </div>
        </div>
        <div style={{
          top: 50,
          left: 40,
          position: 'absolute',
          zIndex: 98,
          borderRadius: '50%'
        }} onClick={this.userInfoOnclick}>
          <div style={{ borderRadius: '50%',width: 85, height: 85,overflow: 'hidden' }}><img style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%'
          }} src='http://img.gexing.me/uploads/allimg/170830/1-1FR9161152259.jpg' /></div>
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
          <span style={{ fontSize: '16px',fontWeight: 'bold',fontFamily: 'FZYaoti' }}>我的订单</span>
          <Icon type='right'></Icon>
        </div>
        <div className='Segment_line'></div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 30,
          backgroundColor: '#ffffff'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#eee'
          }} onClick={this.orderOnclick}>
            <Icon type='loading'></Icon>
            <span style={{ fontSize: '10px',color: '#828282',fontFamily: '黑体' }}>待付款</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#eee'
          }} onClick={this.orderOnclick}>
            <Icon type='loading'></Icon>
            <span style={{ fontSize: '10px',color: '#828282',fontFamily: '黑体' }}>待配送</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#eee'
          }} onClick={this.orderOnclick}>
            <Icon type='loading'></Icon>
            <span style={{ fontSize: '10px',color: '#828282',fontFamily: '黑体' }}>待收货</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#eee'
          }} onClick={this.orderOnclick}>
            <Icon type='loading'></Icon>
            <span style={{ fontSize: '10px',color: '#828282',fontFamily: '黑体' }}>待评价</span>
          </div>
        </div>
        <div className='Segment_line' />
        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          marginTop: 30,
          marginBottom: 30,
          marginLeft: 10,
          marginRight: 20
        }}>
          <span style={{ fontSize: '16px',fontFamily: '黑体' }}>最新订单</span>
          <div style={{ paddingLeft: 20 }} />
          <Icon type='loading' />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            paddingLeft: 10
          }} onClick={this.orderOnclick}>
            <span style={{ fontSize: '10px',color: '#828282',fontFamily: '黑体' }}>待付款</span>
            <span style={{ fontSize: '10px',color: '#828282',fontFamily: '黑体' }}>待付款</span>
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
          <span style={{ fontSize: '16px',fontFamily: 'FZYaoti' }}>常用工具</span>
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
    history().push('/message')
  }

  public settingOnclick = () => {
    history().push('/setting')
  }

  public userInfoOnclick = () => {
    history().push('/userInfoEdit')
  }

  public couponOnclick = () => {
    this.props.updateUserInfo({ userName: 'dd',isLogin: true })
    history().push('/coupon')
  }

  public orderOnclick = () => {
    history().push('/myOrder')
  }

  public afterSaleOnclick = () => {
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

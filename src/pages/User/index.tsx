import * as React from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { NavBar,Icon } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import '../../assets/UserStyle.css'

import setting from './setting'

export interface Props {

}
interface State {

}
class User extends React.Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

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
          <Link to='/setting'><Icon type='check' color='#ffffff' size='lg'/></Link>
          <Icon type='check' color='#ffffff' size='lg'/>
        </div>
      </div>
    )
  }

  public renderContent = () => {
    return (
      <div>
        {this.renderHead()}
        {this.renderBody()}
        {this.renderFoot()}
      </div>
    )
  }

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
            padding: 20
          }}>
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
            }}>
              <span style={{ fontSize: '18px' }}>0.00</span>
              <span style={{ fontSize: '14px',color: '#828282',fontFamily: '黑体' }}>待付款</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center',
              paddingRight: 20
            }}>
              <span style={{ fontSize: '18px' }}>0</span>
              <span style={{ fontSize: '14px',color: '#828282',fontFamily: '黑体' }}>待付款</span>
            </div>
          </div>
        </div>
        <div style={{
          top: 50,
          left: 40,
          position: 'absolute'
        }}>
          <div style={{ borderRadius: '50%',backgroundColor: '#35de19',width: 85, height: 85 }}></div>
        </div>
      </div>
    )
  }

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
        }}>
          <span style={{ fontSize: '16px',fontWeight: 'bold',fontFamily: 'FZYaoti' }}>我的订单</span>
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
        <div className='Segment_line'></div>
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
          <div style={{ paddingLeft: 20 }}></div>
          <Icon type='loading'></Icon>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            paddingLeft: 10
          }}>
            <span style={{ fontSize: '10px',color: '#828282',fontFamily: '黑体' }}>待付款</span>
            <span style={{ fontSize: '10px',color: '#828282',fontFamily: '黑体' }}>待付款</span>
          </div>
        </div>
        <div className='Segment_line2'></div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }}>
          <span style={{ fontSize: '16px' }}>我的购买</span>
          <Icon type='right'></Icon>
        </div>
        <div className='Segment_line2'></div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }}>
          <span style={{ fontSize: '16px' }}>售后退款</span>
          <Icon type='right'></Icon>
        </div>
        <div style={{
          height: 15,
          backgroundColor: '#f6f6f6'
        }}></div>
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

  public renderFoot = () => {
    return (
      <div>
        <div style={{
          height: 15,
          backgroundColor: '#f6f6f6'
        }}></div>
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
        }}></div>
      </div>
    )
  }

  public render () {
    return (
      <div style={{ backgroundColor: '#ffffff' }}>
        {this.renderNav()}
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {

  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {

}

export default connect(mapStateToProps, mapDispatchToProps)(User)

import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { Icon,InputItem } from 'antd-mobile'
import Button from 'antd-mobile/lib/button'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global-data'

// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
let moneyKeyboardWrapProps
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault()
  }
}

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  data: any
  country: any
  step: number
  phoneConfirmButtonType: boolean
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: { phone: '13589458987',address: '中国大陆' },
      step: 0,
      phoneConfirmButtonType: false,   /*false为disabled */
      country: [
        { common: ['中国澳门','中国台湾','中国香港','中国大陆'], commonCode: ['+853','+886','+852','+86'] },
        { A: ['阿联酋','阿富汗','阿尔巴尼亚','安哥拉','安提瓜和巴布达','阿根廷','阿鲁巴','澳大利亚','阿塞拜疆','埃及','埃塞俄比亚','阿曼'], ACode: ['+971','+93','+355','+244','+1268','+54','+297','+61','+994','+20','+251','',''] },
        { B: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], BCode: ['','','',''] },
        { C: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], CCode: ['','','',''] },
        { D: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], DCode: ['','','',''] },
        { E: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], ECode: ['','','',''] },
        { F: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], FCode: ['','','',''] },
        { G: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], GCode: ['','','',''] },
        { H: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], HCode: ['','','',''] },
        { I: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], ICode: ['','','',''] },
        { J: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], JCode: ['','','',''] },
        { K: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], KCode: ['','','',''] },
        { L: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], LCode: ['','','',''] },
        { M: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], MCode: ['','','',''] },
        { N: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], NCode: ['','','',''] },
        { O: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], OCode: ['','','',''] },
        { P: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], PCode: ['','','',''] },
        { Q: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], QCode: ['','','',''] },
        { R: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], RCode: ['','','',''] },
        { S: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], SCode: ['','','',''] },
        { T: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], TCode: ['','','',''] },
        { U: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], UCode: ['','','',''] },
        { V: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], VCode: ['','','',''] },
        { W: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], WCode: ['','','',''] },
        { X: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], XCode: ['','','',''] },
        { Y: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], YCode: ['','','',''] },
        { Z: ['中国澳门','中国台湾','中国香港','中国大陆','','','','','','','','','','','',''], ZCode: ['','','',''] }
      ]
    }
  }
  /**
   * 页面导航栏返回上一个页面link to
   */
  public renderNav = (title, color) => {
    return (
      <div style={{
        backgroundColor: color,
        position: 'relative',
        height: 40
      }}
      >
        <div style={{ float: 'left', position: 'absolute' }}>
          <Link to='/setting'><Icon type='left' color='#000000' size='lg'/></Link>
        </div>
        <div style={{
          fontSize: 20,
          paddingTop: 5,
          color: '#000000',
          width: '100%',
          textAlign: 'center'
        }}>
          <span>{title}</span>
        </div>
      </div>
    )
  }
  /**
   * 页面导航栏本页面内跳转
   */
  public renderNav1 = (title, color,func) => {
    return (
      <div style={{
        backgroundColor: color,
        position: 'relative',
        height: 40
      }}
      >
        <div style={{ float: 'left', position: 'absolute' }} onClick={func}>
          <Icon type='left' color='#000000' size='lg'/>
        </div>
        <div style={{
          fontSize: 20,
          paddingTop: 5,
          color: '#000000',
          width: '100%',
          textAlign: 'center'
        }}>
          <span>{title}</span>
        </div>
      </div>
    )
  }
  /**
   * 安全设置
   */
  public renderContent = () => {
    return(
      <div style={{ backgroundColor: '#ffffff',color: '#858585' }}>
        <div className='Segment_line2'></div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10
        }}
             onClick={this.phoneOnclick}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>手机号</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ marginTop: 8 }}>{this.state.data.phone.replace(this.state.data.phone.slice(3,9),'******')}</span>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
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
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>支付密码设置</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
          </div>
        </div>
      </div>
    )
  }
  public phoneOnclick = () => {
    this.setState({
      step: 1
    })
  }
  public backOnclick = () => {
    this.setState({
      step: 0
    })
  }
  /**
   * 手机号
   */
  public renderContent1 = () => {
    return(
      <div>
        <div style={{ backgroundColor: '#ffffff' }}>
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
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row'
            }}>
              <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>当前手机号</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row'
            }}>
              <span style={{ marginTop: 8 }}>{this.state.data.phone.replace(this.state.data.phone.slice(3,9),'******')}</span>
            </div>
          </div>
        </div>
        <div className='Segment_line2'></div>
        <div>
          <Button type='primary' style={{
            marginTop: 35,
            width: '90%',
            color: '#ffffff',
            marginLeft: '5%'
          }} onClick={this.phoneEditOnclick}
          >更换手机号</Button>
          <span style={{ color: '#828282',marginTop: 20,marginLeft: '5%', position: 'absolute' }}>手机号可用来找回密码</span>
        </div>
      </div>
    )
  }
  public phoneEditOnclick = () => {
    this.setState({
      step: 2
    })
  }
  public backOnclick1 = () => {
    this.setState({
      step: 1
    })
  }
  /**
   * 手机号修改
   */
  public renderContent2 = () => {
    return(
      <div>
        <div style={{ backgroundColor: '#ffffff' }}>
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
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row'
            }}>
              <span style={{ fontSize: '18px', paddingTop: 7, paddingLeft: 10 }}>国家和地区</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row'
            }}>
              <span style={{ fontSize: '14px', marginTop: 8 }}>{this.state.data.address}</span>
            </div>
          </div>
          <div className='Segment_line2'></div>
          <div>
            <InputItem
              type='phone'
              placeholder='请输入您的手机号...'
              clear
              moneyKeyboardAlign='left'
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              onChange={this.onPhoneChange}
          >+86</InputItem>
          </div>
        </div>
        <div>
          <Button type='primary' disabled={!this.state.phoneConfirmButtonType} style={{
            marginTop: 35,
            width: '90%',
            color: '#ffffff',
            marginLeft: '5%'
          }} onClick={this.nextOnclick}
          >下一步</Button>
        </div>
      </div>
    )
  }
  public onPhoneChange = (value) => {
    if (value.length === 13) {
      this.setState({
        phoneConfirmButtonType: true
      })
    } else {
      this.setState({
        phoneConfirmButtonType: false
      })
    }
  }
  public adressOnclick = () => {
    this.setState({
      step: 3
    })
  }
  public nextOnclick = () => {
    this.setState({
      step: 4
    })
  }
  public backOnclick2 = () => {
    this.setState({
      step: 2
    })
  }
  /**
   * 国家和地区
   */
  public renderContent3 = () => {
    return(
      <div style={{ backgroundColor: '#ffffff',color: '#858585' }}>
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
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>手机号</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ marginTop: 8 }}>{this.state.data.phone.replace(this.state.data.phone.slice(3,9),'******')}</span>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
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
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>支付密码设置</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
          </div>
        </div>
      </div>
    )
  }
  public backOnclick3 = () => {
    this.setState({
      step: 3
    })
  }
  /**
   * 更改手机号确认短信
   */
  public renderContent4 = () => {
    return(
      <div>
        <div className='Segment_line2'></div>
        <div style={{ backgroundColor: '#ffffff',color: '#858585',textAlign: 'center',width: '100%',height: 120 }}>
          <div style={{ paddingTop: 25 }}>
            <span style={{ fontSize: 16 }}>我们已发送 </span>
            <span style={{ fontSize: 20,color: '#000000' }}>验证码</span>
            <span style={{ fontSize: 16 }}> 到您的手机</span>
            <br/>
            <br/>
            <span style={{ fontSize: 20,color: '#000000' }}>1235756566</span>
          </div>
        </div>
        <div className='Segment_line2'></div>
      </div>
    )
  }
  public backOnclick4 = () => {
    this.setState({
      step: 2
    })
  }
  /**
   * 订单
   */
  public renderContent5 = () => {
    return(
      <div style={{ backgroundColor: '#ffffff',color: '#858585' }}>
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
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>手机号</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ marginTop: 8 }}>{this.state.data.phone.replace(this.state.data.phone.slice(3,9),'******')}</span>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
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
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>支付密码设置</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
          </div>
        </div>
      </div>
    )
  }
  public backOnclick5 = () => {
    this.setState({
      step: 3
    })
  }
  /**
   * 订单
   */
  public renderContent6 = () => {
    return(
      <div style={{ backgroundColor: '#ffffff',color: '#858585' }}>
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
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>手机号</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ marginTop: 8 }}>{this.state.data.phone.replace(this.state.data.phone.slice(3,9),'******')}</span>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
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
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>支付密码设置</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
          </div>
        </div>
      </div>
    )
  }
  public backOnclick6 = () => {
    this.setState({
      step: 3
    })
  }
  /**
   * 订单
   */
  public renderContent7 = () => {
    return(
      <div style={{ backgroundColor: '#ffffff',color: '#858585' }}>
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
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>手机号</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ marginTop: 8 }}>{this.state.data.phone.replace(this.state.data.phone.slice(3,9),'******')}</span>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
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
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='loading' style={{ marginTop: 3 }}></Icon>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>支付密码设置</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
          </div>
        </div>
      </div>
    )
  }
  public backOnclick7 = () => {
    this.setState({
      step: 3
    })
  }

  public render () {
    switch (this.state.step) {
      case 0 : return (
      <div>
        {this.renderNav('安全设置','#ffffff')}
        {this.renderContent()}
      </div>)
      case 1 : return (
        <div>
          {this.renderNav1('手机号','#ffffff',this.backOnclick)}
          {this.renderContent1()}
        </div>)
      case 2 : return (
        <div>
          {this.renderNav1('更换手机号','#ffffff',this.backOnclick1)}
          {this.renderContent2()}
        </div>)
      case 3 : return (
        <div>
          {this.renderNav1('国家和地区','#ffffff',this.backOnclick2)}
          {this.renderContent2()}
        </div>)
      case 4 : return (
        <div>
          {this.renderNav1('更换手机号','#ffffff',this.backOnclick3)}
          {this.renderContent4()}
        </div>)
    }
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

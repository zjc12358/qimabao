import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { Toast,Modal, List, Button, WhiteSpace, WingBlank,Icon,InputItem } from 'antd-mobile'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global-data'
import '../../assets/UserStyle.css'

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
  phone: string
  modal2: boolean
  resetpasswordtype: string
  passwordConfirmButtonType: boolean
  resetpassword: string
}

class User extends React.Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      data: { phone: '13589458987',address: '中国大陆' },   /*数据源 */
      step: 0,       /*页面步骤 */
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
      ],
      modal2: false,
      phone: '',     /*要换绑的手机号  */
      resetpasswordtype: 'password',       /*要重置的密码输入框类型  */
      passwordConfirmButtonType: false,  /*false为disabled */
      resetpassword: ''     /*要重置的密码 */
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
  componentDidMount () {
    return 0
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
            <span style={{ marginTop: 8 }}>{this.state.data.phone.replace(/(\d{3})(\d{6})(\d{2})/,'$1******$3')}</span>
            <Icon type='right' style={{ marginTop: 6 }}></Icon>
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
        }}
             onClick={this.payOnclick}
        >
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
  public payOnclick = () => {
    this.setState({
      step: 5
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
              <span style={{ marginTop: 8 }}>{this.state.data.phone.replace(/(\d{3})(\d{6})(\d{2})/,'$1******$3')}</span>
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
          <div className='Segment_line2' />
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
          <div className='Segment_line2' />
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
        phoneConfirmButtonType: true,
        phone: value
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
        <div className='Segment_line2' />
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
            <Icon type='loading' style={{ marginTop: 3 }} />
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>手机号</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ marginTop: 8 }}>{this.state.data.phone.replace(/(\d{3})(\d{4})(\d{4})/,'$1****$3')}</span>
            <Icon type='right' style={{ marginTop: 6 }} />
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
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='loading' style={{ marginTop: 3 }} />
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>支付密码设置</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='right' style={{ marginTop: 6 }} />
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
            <span style={{ fontSize: 20,color: '#000000' }}>{this.state.phone.replace(/\s+/g,'').replace(/(\d{3})(\d{6})(\d{2})/,'$1******$3')}</span>
          </div>
        </div>
        <div className='Segment_line2'></div>
        <div style={{ backgroundColor: 'transparent',textAlign: 'center' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            paddingTop: 50
          }}>
            <InputItem
              maxLength={1}
              className='Verification'
              autoFocus={true}
              type={'money'}
              moneyKeyboardAlign='left'
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            />
            <InputItem
              maxLength={1}
              className='Verification'
              type={'money'}
              moneyKeyboardAlign='left'
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            />
            <InputItem
              maxLength={1}
              className='Verification'
              type={'money'}
              moneyKeyboardAlign='left'
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            />
            <InputItem
              maxLength={1}
              className='Verification'
              type={'money'}
              moneyKeyboardAlign='left'
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            />
          </div>
          <div style={{
            paddingTop: 20
          }}>
            <span style={{
              fontSize: 16,
              color: '#6265ee'
            }}>重发短信</span>
          </div>
          <div style={{
            paddingTop: 50
          }}>
            <span style={{
              fontSize: 14,
              color: '#6265ee'
            }}>&nbsp;&nbsp;&nbsp;收不到验证码？</span>
          </div>
        </div>
      </div>
    )
  }

  public backOnclick4 = () => {
    this.setState({
      step: 2,
      phoneConfirmButtonType: false
    })
  }
  /**
   * 修改支付密码页面
   * 是否记得账号（手机号）当前使用的密码做选择
   */
  public renderContent5 = () => {
    return(
      <div>
        <div className='Segment_line2' />
        <div style={{
          textAlign: 'center',
          backgroundColor: '#ffffff',
          color: '#9c9c9c',
          paddingTop: 35,
          paddingBottom: 20
        }}>
          <span style={{ fontSize: 16 }}>您是否记得账号 </span>
          <span style={{ fontSize: 20,color: '#000000' }}>{this.state.data.phone.replace(/(\d{3})(\d{6})(\d{2})/,'$1******$3')}</span>
          <br/>
          <div style={{ paddingTop: 10 }}>
            <span style={{ fontSize: 16 }}> 当前使用的支付密码</span>
          </div>
        </div>
        <div className='Segment_line2' />
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'row',
          paddingTop: 20
        }}>
          <Button style={{
            width: 150,
            fontSize: 16
          }} onClick={this.forgetOnclick}
          >不记得</Button>
          <Button type='primary' style={{
            width: 150,
            fontSize: 16
          }} onClick={this.rememberOnclick}
          >记得</Button>
        </div>
      </div>
    )
  }
  public forgetOnclick = () => {
    this.setState({
      step: 6
    })
  }
  public rememberOnclick = () => {
    this.setState({
      step: 7
    })
  }
  public backOnclick5 = () => {
    this.setState({
      step: 0
    })
  }
  /**
   * 忘记密码找回
   */
  public renderContent6 = () => {
    return(
      <div>
        <div className='Segment_line2' />
        <div style={{
          backgroundColor: 'transparent',
          padding: 15,
          color: '#aeaeae'
        }}>
          <span style={{ fontSize: '16px' }}>选一个方式重置密码</span>
        </div>
        <div className='Segment_line2' />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 10,
          paddingBottom: 15,
          paddingRight: 10,
          backgroundColor: '#ffffff'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>短信验证码+身份证</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
            <Icon type='right' style={{ marginTop: 6 }} />
          </div>
        </div>
        <div className='Segment_line2' />
      </div>
    )
  }
  public backOnclick6 = () => {
    this.setState({
      step: 5
    })
  }
  /**
   * 验证支付密码（6位数字界面）
   */
  public renderContent7 = () => {
    return(
      <div>
        <div className='Segment_line2'></div>
        <div style={{
          textAlign: 'center',
          backgroundColor: '#ffffff',
          color: '#9c9c9c',
          paddingTop: 35,
          paddingBottom: 35
        }}>
          <span style={{ fontSize: 16 }}>输入支付密码，完成验证 </span>
        </div>
        <div className='Segment_line2' />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          paddingTop: 40
        }}>
          <div className='passContainer'>
            <input maxLength={6} autoFocus={true} type='password' className={'passWordInput'} onChange={(e) => this.passwordOnchange(e)}/>
            <div className='passItem'/>
            <div className='passItem'/>
            <div className='passItem'/>
            <div className='passItem'/>
            <div className='passItem'/>
            <div className='passItem'/>
          </div>
        </div>
        <div style={{
          textAlign: 'center',
          paddingTop: 50
        }}>
          <span style={{ color: '#6265ee' }}>忘记密码？</span>
        </div>
      </div>
    )
  }
  public backOnclick7 = () => {
    this.setState({
      step: 5
    })
  }
  passwordOnchange (e) {
    console.log(e.target.value + '   ' + e.target.value.length)
    if (e.target.value.length === 6) {
      this.setState({
        step: 8
      })
    }
  }
  /**
   * 重置支付密码
   */
  public renderContent8 = () => {
    return(
      <div>
        <div className='Segment_line2'></div>
        <div style={{
          textAlign: 'center',
          backgroundColor: '#ffffff',
          paddingTop: 35,
          paddingBottom: 35
        }}>
          <div style={{ fontSize: 16,color: '#868686' }}>
            <span>请为账号 </span>
            <span>{this.state.data.phone.replace(/(\d{3})(\d{6})(\d{2})/,'$1******$3')}</span>
            <br/>
          </div>
          <div style={{ paddingTop: 10 }}>
            <span style={{ fontSize: 16 }}> 设置支付密码</span>
          </div>
        </div>
        <div className='Segment_line2' />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: 20,
          border: '1px solid #dddddd',
          backgroundColor: '#ffffff'
        }}>
          <input type={this.state.resetpasswordtype} className='editpasswordinput' placeholder={'请输入密码'} onChange={this.onPasswordChange}/>
          <Icon type={'loading'} style={{ marginTop: 8 }} />
        </div>
        <div style={{
          padding: 13
        }}>
          <span style={{ fontSize: 16,color: '#868686' }}>说明文字</span>
        </div>
        <Button type='primary' disabled={!this.state.passwordConfirmButtonType} style={{
          marginTop: 35,
          width: '90%',
          color: '#ffffff',
          marginLeft: '5%'
        }} onClick={this.next1Onclick}
        >下一步</Button>
      </div>
    )
  }
  public backOnclick8 = () => {
    this.setState({
      step: 7
    })
  }
  public next1Onclick = () => {
    let reg2 = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){8,18}/
    let reg3 = /[a-zA-Z]+/
    let reg4 = /[0-9]+/
    if (reg2.test(this.state.resetpassword) && reg3.test(this.state.resetpassword) && reg4.test(this.state.resetpassword)) {
      this.setState({
        step: 9
      })
    } else if (!reg2.test(this.state.resetpassword)) {
      Toast.info('长度必须在8-18位！', 1)
      return false
    } else if (!reg3.test(this.state.resetpassword)) {
      Toast.info('必须包含字母！', 1)
      return false
    } else if (!reg4.test(this.state.resetpassword)) {
      Toast.info('必须包含数字！', 1)
      return false
    }
  }
  public onPasswordChange = (e) => {
    if (e.target.value.length > 6) {
      this.setState({
        passwordConfirmButtonType: true,
        resetpassword: e.target.value
      })
    } else {
      this.setState({
        passwordConfirmButtonType: false
      })
    }
  }
  /**
   * 重置密码验证码界面
   */
  public renderContent9 = () => {
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
            <span style={{ fontSize: 20,color: '#000000' }}>{this.state.phone.replace(/\s+/g,'').replace(/(\d{3})(\d{6})(\d{2})/,'$1******$3')}</span>
          </div>
        </div>
        <div className='Segment_line2'></div>
        <div style={{ backgroundColor: 'transparent',textAlign: 'center' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            paddingTop: 50
          }}>
            <InputItem
              maxLength={1}
              className='Verification'
              autoFocus={true}
              type={'money'}
              moneyKeyboardAlign='left'
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            />
            <InputItem
              maxLength={1}
              className='Verification'
              type={'money'}
              moneyKeyboardAlign='left'
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            />
            <InputItem
              maxLength={1}
              className='Verification'
              type={'money'}
              moneyKeyboardAlign='left'
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            />
            <InputItem
              maxLength={1}
              className='Verification'
              type={'money'}
              moneyKeyboardAlign='left'
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            />
          </div>
          <div style={{
            paddingTop: 20
          }}>
            <span style={{
              fontSize: 16,
              color: '#6265ee'
            }}>重发短信</span>
          </div>
          <div style={{
            paddingTop: 50
          }}>
            <span style={{
              fontSize: 14,
              color: '#6265ee'
            }}>&nbsp;&nbsp;&nbsp;收不到验证码？</span>
          </div>
        </div>
      </div>
    )
  }
  public backOnclick9 = () => {
    this.setState({
      step: 8
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
          {this.renderContent3()}
        </div>)
      case 4 : return (
        <div>
          {this.renderNav1('更换手机号','#ffffff',this.backOnclick4)}
          {this.renderContent4()}
        </div>)
      case 5 : return (
        <div>
          {this.renderNav1('修改支付密码','#ffffff',this.backOnclick5)}
          {this.renderContent5()}
        </div>)
      case 6 : return (
        <div>
          {this.renderNav1('修改支付密码','#ffffff',this.backOnclick6)}
          {this.renderContent6()}
        </div>)
      case 7 : return (
        <div>
          {this.renderNav1('设置支付密码','#ffffff',this.backOnclick7)}
          {this.renderContent7()}
        </div>)
      case 8 : return (
        <div>
          {this.renderNav1('设置支付密码','#ffffff',this.backOnclick8)}
          {this.renderContent8()}
        </div>)
      case 9 : return (
        <div>
          {this.renderNav1('设置支付密码','#ffffff',this.backOnclick9)}
          {this.renderContent9()}
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

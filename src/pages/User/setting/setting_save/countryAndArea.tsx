import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { GlobalData } from '@store/reducers/globalDataReducer'
import { Toast,Modal, List, Button, WhiteSpace, WingBlank,Icon,InputItem } from 'antd-mobile'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global_data'
import Nav from '@components/Head/nav'
import history from 'history/createHashHistory'
import '../../master.css'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: PageTab) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  country: any
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
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
   * 国家和地区
   */
  public renderContent = () => {
    return(
      <div style={{ backgroundColor: '#ffffff',color: '#858585' }}>
        <div className='Segment_line2' />
        <div className={'flex-row-space-between-p1510'}>
          <div className={'flex-row-center'}>
            <Icon type='loading' style={{ marginTop: 3 }} />
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>手机号</span>
          </div>
          <div className={'flex-row-center'}>
            <span style={{ marginTop: 8 }}>{this.state.country.phone.replace(/(\d{3})(\d{4})(\d{4})/,'$1****$3')}</span>
            <Icon type='right' style={{ marginTop: 6 }} />
          </div>
        </div>
        <div className='Segment_line2' />
        <div className={'flex-row-space-between-p1510'}>
          <div className={'flex-row-center'}>
            <Icon type='loading' style={{ marginTop: 3 }} />
            <span style={{ fontSize: '16px', paddingTop: 7, paddingLeft: 10 }}>支付密码设置</span>
          </div>
          <div className={'flex-row-center'}>
            <Icon type='right' style={{ marginTop: 6 }} />
          </div>
        </div>
      </div>
    )
  }

  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Nav title={'国家和地区'} color={'#ffffff'} />
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

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
import Nav from '@components/Head/nav'
import history from 'history/createHashHistory'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: string) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  data: any
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: [
        { code: '2226946446889846', status: '订单已签收', description: '衢州炒菜软件有限公司衢州炒菜软件有限公司衢州炒菜软件有限公司衢州炒',img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541570509552&di=f4e63321f04e7cde3f8fb1a043318871&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fdbb44aed2e738bd4a55a771daa8b87d6277ff9a7.jpg' },
        { code: '2226946446889846', status: '订单已签收', description: '衢州炒菜软件有限公司',img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541570509552&di=f4e63321f04e7cde3f8fb1a043318871&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fdbb44aed2e738bd4a55a771daa8b87d6277ff9a7.jpg' },
        { code: '2226946446889846', status: '订单已关闭', description: '衢州炒菜软件有限公司',img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541570509552&di=f4e63321f04e7cde3f8fb1a043318871&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fdbb44aed2e738bd4a55a771daa8b87d6277ff9a7.jpg' }
      ]
    }
  }

  public renderContent = () => {
    return(
      <div>
        {this.state.data.map((i, index) => (
          <div>
            {this.renderItem(i, index)}
          </div>
        ))}
      </div>
    )
  }

  public renderItem = (i, index) => {
    return(
      <div style={{
        backgroundColor: '#ffffff',
        height: 100,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        border: '1px solid #ddd',
        borderRadius: 5
      }} onClick={this.tradeOnclick}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingLeft: 15,
          paddingTop: 15
        }}>
          <div style={{ fontSize: 16 }}>{i.status}</div>
          <div style={{
          }}>
            <div style={{ width: 50, height: 50,overflow: 'hidden',float: 'left' }} >
              <img style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%'
              }} src={i.img} />
            </div>
            <div>
              <div style={{
                fontSize: 12,
                width: '78%',
                backgroundColor: '#fcfcfc',
                float: 'left',
                top: 5,
                height: 50,
                marginLeft: '1%',
                position: 'relative'
              }}>
                <div style={{
                  padding: 5
                }}>
                  <div style={{ color: '#373737',position: 'absolute',top: 0 }}>{i.description}</div>
                  <div style={{ color: '#aeaeae',position: 'absolute',bottom: 0 }}>运单编号：{i.code}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  public tradeOnclick = () => {
    history().push('/tradeEvaluation')
  }

  public render () {
    return (
      <div style={{
        height: '100vh'
      }}>
        <Nav title={'交易信息'} color={'#ffffff'} />
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

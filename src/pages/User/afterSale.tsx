import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Tabs,Icon } from 'antd-mobile'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global_data'
import './master.css'
import Nav from '@components/Head/nav'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: string) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  getEmpty: boolean
  data: any
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      getEmpty: true,
      data: [
        { code: '2226946446889846', status: '交易关闭', business: '衢州炒菜软件有限公司',Commodity: '有机红洋葱',price: '15.5',weight: '1000',total: '55.2' },
        { code: '2226946446889846', status: '交易关闭', business: '衢州炒菜软件有限公司',Commodity: '有机红洋葱',price: '15.5',weight: '1000',total: '55.2' },
        { code: '2226946446889846', status: '交易关闭', business: '衢州炒菜软件有限公司',Commodity: '有机红洋葱',price: '15.5',weight: '1000',total: '55.2' }
      ]
    }
  }
  /**
   * 内容
   */
  public renderContent = () => {
    return(
      <div style={{
        paddingTop: 0
      }}>
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
        width: '100%',
        float: 'right'
      }}>
        <div className={'Segment_line2'} />
        <div className={'flex-row-space-between-p1510'}>
          <div>订单号：{i.code}</div>
          <div>{i.status}</div>
        </div>
        <div className={'Segment_line2'} />
        <div className={'flex-row-space-between-p1510'}>
          <div className={'flex-row-center'}>
            <Icon type='loading' style={{ marginTop: 3 }} />
            <span style={{ fontSize: '14px', paddingTop: 7, paddingLeft: 10 }}>{i.business}</span>
          </div>
          <div className={'flex-row-center'}>
            <Icon type='right' style={{ marginTop: 6 }} />
          </div>
        </div>
        <div style={{
          paddingLeft: 20,
          paddingRight: 20,
          height: 130,
          paddingBottom: 10
        }}>
          <div style={{
            borderRadius: '20px 20px',
            backgroundColor: '#ebeaf3',
            height: '100%',
            width: '100%',
            position: 'relative'
          }}>
            <div style={{
              top: 16,
              left: 16,
              position: 'absolute',
              zIndex: 98,
              borderRadius: '50%'
            }}>
              <div style={{ borderRadius: '50%',width: 85, height: 85,overflow: 'hidden' }}><img style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%'
              }} src='http://img.gexing.me/uploads/allimg/170830/1-1FR9161152259.jpg' /></div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'column',
              position: 'absolute',
              left: 130,
              top: 30,
              alignItems: 'flex-start'
            }}>
              <div style={{ fontSize: 15, color: '#191919' }}>{i.Commodity}</div>
              <div style={{ fontSize: 15, color: '#191919' }}>单价：<span style={{ fontSize: 18,color: '#ff0000' }}>￥{i.price}</span>/500g</div>
              <div style={{ fontSize: 15, color: '#191919' }}>重量：{i.weight}</div>
            </div>
          </div>
        </div>
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          position: 'relative',
          paddingTop: 3
        }}>
          <div style={{ right: 20, position: 'absolute' }}>
            合计：<span style={{ fontSize: 18,color: '#ff0000' }}>￥{i.price}</span>
          </div>
        </div>
        <br/>
        <div style={{
          height: 40,
          backgroundColor: '#f9f9f9',
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <button style={{ height: 28, width: 70, borderRadius: 5,border: '1px solid #0084E7',backgroundColor: '#0084E7',color: '#ffffff',fontSize: 14,marginRight: 10 }}>退款查询</button>
        </div>
      </div>
    )
  }
  /**
   * 空
   */
  public renderNone = () => {
    return(
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
        空空如也
      </div>
    )
  }
  public render () {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        height: '100vh'
      }}>
        <Nav title={'售后服务'} color={'#ffffff'} />
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

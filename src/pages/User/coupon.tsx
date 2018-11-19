import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Tabs,Icon } from 'antd-mobile'
import { PageTab } from '@datasources/PageTab'
import { UserInfo } from '@datasources/UserInfo'
import { updateUserInfo, updatePageTab } from '@store/actions/global_data'
import './master.css'

export interface Props {
  pageTab: PageTab
  userInfo: UserInfo
  updatePageTab: (pageTab: string) => void
  updateUserInfo: (userInfo: UserInfo) => void
}

interface State {
  getEmpty: boolean
  data: any
  data1: any
  data2: any
}

class User extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      getEmpty: true,
      data: [
        { amount: '100', applicability: '超市', incentives: '优惠政策说明',date: '2018.10.30-2018-11.30' },
        { amount: '100', applicability: '适用于蔬菜鲜果', incentives: '优惠政策说明',date: '2018.10.30-2018-11.30' }
      ],
      data1: [
        { amount: '100', applicability: '生鲜', incentives: '优惠政策说明',date: '2018.10.30-2018-11.30' },
        { amount: '2222', applicability: '不饿适用于蔬菜鲜果', incentives: '优惠政策说明',date: '2018.10.30-2018-11.30' },
        { amount: '333', applicability: '适用于蔬菜鲜果', incentives: '优惠政策说明',date: '2018.10.30-2018-11.30' }
      ],
      data2: [
        { amount: '15', applicability: '适用于蔬菜鲜果', incentives: '优惠政策说明',date: '2018.10.30-2018-11.30' }
      ]
    }
  }

  public renderNav = () => {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        position: 'relative',
        height: 40
      }}
      >
        <div style={{ float: 'left', position: 'absolute' }}>
          <Link to='/NavBar'><Icon type='left' color='#000000' size='lg' onClick={this.backOnclick} /></Link>
        </div>
        <div style={{
          fontSize: 20,
          paddingTop: 5,
          color: '#000000',
          width: '100%',
          textAlign: 'center'
        }}>
          <span>我的优惠券</span>
        </div>
      </div>
    )
  }
  backOnclick = () => {
    this.props.updatePageTab('UserPageTabBar')
  }

  public renderContent = () => {
    const tabs = [
      { title: '优惠券' },
      { title: '礼品卡' },
      { title: '电子券' }
    ]
    return(
      <div style={{ color: '#858585' }}>
        <div className={'Segment_line3'} />
        <Tabs tabs={tabs} animated={false} initialPage={2}
        >
          {this.state.getEmpty ? this.renderCoupon : this.renderNone}
          {this.state.getEmpty ? this.renderGiftCard : this.renderNone}
          {this.state.getEmpty ? this.renderElectronicCoupon : this.renderNone}
        </Tabs>
      </div>
    )
  }
  /**
   * 优惠券
   */
  public renderCoupon = () => {
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
  /**
   * 礼品卡
   */
  public renderGiftCard = () => {
    return(
      <div>
        {this.state.data1.map((i, index) => (
          <div>
            {this.renderItem(i, index)}
          </div>
        ))}
      </div>
    )
  }
  /**
   * 电子券
   */
  public renderElectronicCoupon = () => {
    return(
      <div>
        {this.state.data2.map((i, index) => (
          <div>
            {this.renderItem(i, index)}
          </div>
        ))}
      </div>
    )
  }
  /**
   * 空
   */
  public renderNone = () => {
    return(
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
        当前无任何优惠券，消费即可获得
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
        borderRadius: 5,
        position: 'relative'
      }}>
        <div style={{ position: 'absolute' }}>
          即将过期
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 15,
          paddingTop: 20
        }}>
          <div>
            <div>
              <span style={{ fontSize: 30,color: 'red',paddingLeft: 15 }}>{i.amount}</span>
              <span>元</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 16 }}>{i.applicability}</div>
            <div style={{ fontSize: 14, color: 'red',paddingTop: 5 }}>{i.incentives}</div>
            <div style={{ fontSize: 10, color: 'gray',paddingTop: 5 }}>{i.date}</div>
          </div>
          <div style={{ paddingRight: 20 }}>
            <Icon type={'right'} />
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

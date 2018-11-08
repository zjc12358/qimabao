import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Toast, Calendar } from 'antd-mobile'
import Cal from 'react-calendar'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import './menuCss.css'
import { MenuBean } from '@datasources/MenuBean'

export interface Props {

}

interface State {
  data: Date
}

class Menu extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: new Date()
    }
  }

  /**
   * 日历选择
   */
  renderCalendar = () => {
    return (
      <div className='cal'>
        <Cal
          // 当前日期
          value={this.state.data}
          //  默认值 ： US ，us表示第一天是周天， 其他的 都是 ISO8601 第一天是周一
          calendarType='US'
          // 允许选择的最大日期
          // maxDate={new Date(this.funDate(7))}
          // 允许选择的最小日期
          minDate={this.state.data}
        />
      </div>
    )
  }

  /**
   * 菜谱列表
   */
  renderMenuList = () => {
    return (
      <div className='vertical'>
        {}
      </div>
    )
  }

  /**
   * 菜谱列表单项
   */
  renderMenuListItem = (item: MenuBean) => {
    return (
      <div className='vertical'
           style={{
             marginBottom: 10
           }}>
        <div className='horizontal'
             style={{
               justifyContent: 'space-between',
               height: 40
             }}>
          <div>
            <span>口</span>
            <span>{item.menuName}</span>
          </div>
          <span>↑</span>
        </div>
        <div>
          <div style={{
            padding: 20
          }}>
            {item.productList.map((item) =>
              <div style={{
                marginLeft: 10
              }}>{item.name}</div>
            )}
          </div>
        </div>
      </div>
    )
  }

  funDate = (addDayCount) => {
    let dd = new Date()
    dd.setDate(dd.getDate() + addDayCount)// 获取AddDayCount天后的日期
    let y = dd.getFullYear()
    let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1)// 获取当前月份的日期，不足10补0
    let d = dd.getDate() < 10 ? dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
    return y + '-' + m + '-' + d
  }

  public render () {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#efeff5',
        height: '100%',
        width: '100%'
      }}>
        {this.renderCalendar()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

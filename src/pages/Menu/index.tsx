import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import Head from '@components/Head'
import { changeMenuState, setReload, updateMenuList } from '@store/actions/menu_data'
import MenuUpload from './menuUpload'
import MenuSelect from './menuSelect'
import { MenuBean } from '@datasources/MenuBean'
import { ProductBean } from '@datasources/ProductBean'
import ReactSVG from 'react-svg'

export interface Props {
  selectMenu: boolean
  changeMenuState: (selectMenu: boolean) => void
}

interface State {
}

class Order extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {}
  }

  /**
   * 根据步骤显示页面
   */
  renderContent = () => {
    return (
      <div style={{
        marginTop: 40,
        width: '100%'
      }}>
        {this.props.selectMenu === true ? <MenuSelect/> : <MenuUpload/>}
      </div>
    )
  }

  /**
   * 右上方确定
   */
  okOnClick = () => {
    if (this.props.selectMenu) {
      console.log('点击拍照')
      this.props.changeMenuState(false)
    } else {
      console.log('点击确定')
      this.props.changeMenuState(true)
    }
  }

  renderIcon = () => {
    return (
      this.props.selectMenu === true ?
        <ReactSVG path='./assets/images/ic_go_take_pic.svg' svgStyle={{ width: 30, height: 30 }}/> :
        <span>确定</span>
    )
  }

  public render () {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#efeff5',
        height: '100%'
      }}>
        <Head showRightIcon={true} backgroundColor={'#0084e7'} title={'菜谱'} showLeftIcon={false}
              rightIconOnClick={this.okOnClick.bind(this)}
              rightIconContent={this.renderIcon()}/>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    selectMenu: state.menuData.selectMenu
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  changeMenuState
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)

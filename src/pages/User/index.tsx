import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { NavBar,Icon } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'

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
          flexDirection: 'row-reverse',
          width: '96%',
          padding: '8px'
        }}>
          <Icon type='check' color='#ffffff' size='lg'/>
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
          height: '150px',
          width: '90%',
          backgroundColor: '#efefef',
          boxAlign: 'center',
          left: '5%',
          top: 50,
          position: 'absolute'
        }}>
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
        paddingTop: 150
      }}>
        <div style={{ height: '50px',backgroundColor: '#ffffff' }}>
          <span style={{ fontSize: '18px',fontWeight: 'bold',fontFamily: 'FZYaoti' }}>我的订单</span>
          <Icon type='right'></Icon>
        </div>
        <div style={{ height: '50px',backgroundColor: '#ffffff' }}>
        </div>
        <div style={{ height: '50px',backgroundColor: '#0084E7' }}>
        </div>
        <div style={{ height: '50px',backgroundColor: '#ffffff' }}>
        </div>
        <div style={{ height: '50px',backgroundColor: '#0084E7' }}>
        </div>
        <div style={{ height: '50px',backgroundColor: '#ffffff' }}>
        </div>
        <div style={{ height: '50px',backgroundColor: '#0084E7' }}>
        </div>
        <div style={{ height: '50px',backgroundColor: '#ffffff' }}>
        </div>
        <div style={{ height: '50px',backgroundColor: '#0084E7' }}>
        </div>
        <div style={{ height: '50px',backgroundColor: '#ffffff' }}>
        </div>
        <div style={{ height: '50px',backgroundColor: '#0084E7' }}>
        </div>
        <div style={{ height: '50px',backgroundColor: '#ffffff' }}>
        </div>
        <div style={{ height: '50px',backgroundColor: '#0084E7' }}>
        </div>
        <div style={{ height: '50px',backgroundColor: '#ffffff' }}>
        </div>
        <div style={{ height: '50px',backgroundColor: '#0084E7' }}>
        </div>
        <div style={{ height: '50px',backgroundColor: '#ffffff' }}>
        </div>
        <div style={{ height: '50px',backgroundColor: '#0084E7' }}>
        </div>
        <div style={{ height: '50px',backgroundColor: '#ffffff' }}>
        </div>
      </div>
    )
  }

  public renderFoot = () => {
    return (
      <div>
      </div>
    )
  }

  public render () {
    return (
      <div style={{ height: '100%', backgroundColor: '#ffffff' }}>
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

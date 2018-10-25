import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'

export interface Props {

}

interface State {
  title: String,
  showLeftIcon: Boolean,
  showRightIcon: Boolean,
  backgroundColor: String
}

class Head extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      title: '',
      showLeftIcon: true,
      showRightIcon: false,
      backgroundColor: '#0084E7'
    }
  }

  public render () {
    return (
      <div style={{
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
      }}>
        <div style={{
          flex: 1
        }}>

        </div>
        <div style={{
          flex: 5
        }}>
          {this.state.title}
        </div>
        <div>

        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Head)

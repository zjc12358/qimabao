import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'

export interface Props {
  num: number
  left: number
}

interface State {
}

class Badge extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  public render () {
    return(
      <div style={{
        position: 'absolute',
        width: 15,
        height: 15,
        backgroundColor: '#ee0813',
        borderRadius: '50%',
        fontSize: 8,
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        left: this.props.left
      }}>{this.props.num}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = () => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Badge)

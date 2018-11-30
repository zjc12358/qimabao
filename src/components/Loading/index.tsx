import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'

export interface Props {
}

interface State {
}

class Loading extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  public render () {
    return(
      <div className={'flex-center-row-center'} style={{ width: '100%',paddingTop: 20,paddingBottom: 20 }}>
      <div className={'flex-center-row-center'} style={{ backgroundColor: '#fff',borderRadius: '50%',width: 30,height: 30,boxShadow: '0px 0px 4px #bbb' }}>
        <CircularProgress thickness={6} size={20} style={{ color: '#5cc3ff' }}/>
      </div>
    </div>)
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = () => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Loading)

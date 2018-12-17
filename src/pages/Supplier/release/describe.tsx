import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TextareaItem,List,InputItem,Button,ImagePicker } from 'antd-mobile'
import Drawer from '@material-ui/core/Drawer'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import Head from '../../../components/Head/index'
import './release.less'

export interface Props {

}

interface State {
  data: any
}
let IconMaxSize: number = 30
class Describe extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  public render () {
    return (
      <div>
        <Head
          showLeftIcon='true'
          title='发布商品'
          backgroundColor='#0084e7'
          leftIconColor='white'
        />
        <div className='describeHead'>
          <div><ReactSVG svgClassName='ic' path='./assets/images/ic_back-grey.svg'/></div>
          <div>商品描述</div>
          <div><ReactSVG svgClassName='ic' path='./assets/images/ic_back-grey.svg'/></div>
        </div>
        <div className='releaseContainer'>
          2332233
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Describe)

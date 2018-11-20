import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, Icon, DatePicker, List, Modal, Button, Radio, Checkbox, TextareaItem } from 'antd-mobile'
import Head from '../../components/Head/index'
import history from 'history/createHashHistory'

const nowTimeStamp = Date.now()
const now = new Date(nowTimeStamp)
const RadioItem = Radio.RadioItem

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

  componentDidMount () {
    console.log(1)
  }

  componentWillReceiveProps (nextProps) {
    console.log(1)
  }

  public render () {
    return (
      <div>
        <div>时间段还是亏了就啊哈德生科技拉风的斯科拉飞机的开始垃圾费多少空间发的克里斯建安费考虑到撒酒疯考虑到撒反对隆盛科技</div>
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

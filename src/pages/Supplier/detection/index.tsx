import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { List,InputItem,Button,ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile'
import axios from 'axios'
import { GlobalData } from '@store/reducers/globalDataReducer'
import history from 'history/createHashHistory'
import ReactSVG from 'react-svg'
import Head from '../../../components/Head/index'
import './index.less'

export interface Props {

}

interface State {
  data: any,
  files: Array<any>,
  multiple: boolean,
}
let IconMaxSize: number = 30

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
})

class Detection extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: {},
      files: [1,2],
      multiple: false
    }
  }

  onChange = (files, type, index) => {
    console.log(files, type, index)
    console.log(this.state.files)
    this.setState({
      files: files
    })
  }
  onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex
    this.setState({
      multiple: index === 1
    })
  }

  uploadChange = (event) => {
    console.log(event.target.value)
    console.log(this.state.files)
    let file = event.target.value
    let files = this.state.files
    files.push(file)
    console.log(files)
    this.setState({ files: files })
  }

  /**
   * 检测项目
   */
  renderDetectionName = () => {
    return (
      <div className='detectionName'>
        <div>检测项目</div>
        <div>
          <select defaultValue='0' name=''>
            <option value='0' disabled>请选择检测项目</option>
            <option value='1'>1.有机认证</option>
            <option value='2'>2.农药残留</option>
            <option value='3'>3.瘦肉精检测</option>
            <option value='4'>4.无公害农业基地</option>
          </select>
        </div>
      </div>
    )
  }

  /**
   * 上传照片
   */
  renderImagesPicker = () => {
    return (
      <div className='uploadImages'>
        <div>检测项目</div>
        <div>
          {/*<ImagePicker*/}
            {/*style={{*/}
              {/*width: '100%'*/}
            {/*}}*/}
            {/*files={this.state.files}*/}
            {/*onChange={this.onChange}*/}
            {/*onImageClick={(index, fs) => console.log(index, fs)}*/}
            {/*selectable={this.state.files.length < 3}*/}
            {/*length={4}*/}
            {/*multiple={this.state.multiple}*/}
          {/*/>*/}
        </div>
      </div>
    )
  }

  public render () {
    return (
      <div className='bigContainer detection'>
        <Head
          showLeftIcon='true'
          title='提现申请'
          backgroundColor='#0084e7'
          leftIconColor='white'
        />
        <div className='bigContent'>
          <div className='topContent' style={{ background: 'white' }}>
            {this.renderDetectionName()}
            {this.renderImagesPicker()}
            <div>
              <div>上传照片</div>
              {this.state.files.map(i => (
                i
              ))}
              <div className='picker_wrap'>
                <input className='picker_input' type='file'
                       multiple accept='image/*'
                       onChange={ this.uploadChange }/>
              </div>
            </div>
          </div>
          <img src='data:image/jpg;base64,QzpcZmFrZXBhdGhcQ2hyeXNhbnRoZW11bS5qcGc%3D'/>
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Detection)

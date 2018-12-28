import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { List, InputItem, Button, ImagePicker, TextareaItem, WingBlank, SegmentedControl, Toast } from 'antd-mobile'
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
      files: [],
      multiple: false
    }
  }

  onChange = (files, type, index) => {
    console.log(files, type, index)
    // console.log(this.state.files)
    this.setState({
      files
    })
  }

  onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex
    this.setState({
      multiple: index === 1
    })
  }
  /**
   * 检测项目
   */
  renderDetectionName = () => {
    return (
      <div className='detectionName'>
        <div>检测项目</div>
        <div style={{ position: 'relative' }}>
          <select defaultValue='0' name=''>
            <option value='0' disabled>请选择检测项目</option>
            <option value='1'>1.有机认证</option>
            <option value='2'>2.农药残留</option>
            <option value='3'>3.瘦肉精检测</option>
            <option value='4'>4.无公害农业基地</option>
          </select>
          <div className='triangle'></div>
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
          <ImagePicker
            style={{
              width: '100%'
            }}
            files={this.state.files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={this.state.files.length < 3}
            length={3}
            multiple={this.state.multiple}
          />
        </div>
      </div>
    )
  }

  /**
   * 检测申请
   */
  renderTestDescription = () => {
    return (
      <div className='testDescription'>
        <div>检测描述</div>
        <TextareaItem
          style={{ fontSize: 14 }}
          placeholder='请输入简单描述'
          data-seed='logId'
          autoHeight
          // ref={el => this.customFocusInst = el}
        />
      </div>
    )
  }

  /**
   * 预约时间
   */
  renderPresetTime = () => {
    return (
      <div className='pressTime'>
        <div>预约时间</div>
        <div>
        </div>
      </div>
    )
  }

  /**
   * 联系人
   */
  renderLinkman = () => {
    return (
      <div className='linkman'>
        <div>联系人</div>
        <div>
          <InputItem
            style={{ height: '30px' }}
          />
        </div>
      </div>
    )
  }

  /**
   * 联系号码
   */
  renderLinkNumber = () => {
    return (
      <div className='linkNumber'>
        <div>联系号码</div>
        <div>
          <InputItem
            style={{ height: '30px' }}
            type='phone'
          />
        </div>
      </div>
    )
  }

  /**
   * 所在区域
   */
  renderArea = () => {
    return (
      <div className='area'>
        <div>所在地区</div>
        <div>
          <InputItem
            style={{ height: '30px' }}
          />
        </div>
      </div>
    )
  }

  /**
   * 详细地址
   */
  renderAreaDetail = () => {
    return (
      <div className='areaDetail'>
        <div>详细地址</div>
        <TextareaItem
          style={{ fontSize: 14 }}
          placeholder='请输入您的详细地址'
          data-seed='logId'
          autoHeight
        />
      </div>
    )
  }
  public render () {
    return (
      <div className='bigContainer detection'>
        <Head
          showLeftIcon='true'
          title='检测申请'
          backgroundColor='#0084e7'
          leftIconColor='white'
        />
        <div className='bigContent'>
          <div className='topContent' style={{ background: 'white' }}>
            {this.renderDetectionName()}
            {this.renderImagesPicker()}
            {this.renderTestDescription()}
          </div>
          <div className='bottomContent'>
            {this.renderPresetTime()}
            {this.renderLinkman()}
            {this.renderLinkNumber()}
            {this.renderArea()}
          </div>
          {this.renderAreaDetail()}
        </div>
        <div className='footerSubmite'>
          <Button type='primary'
            onClick={() => {
              Toast.success('提交成功',2)
            }}
          >提交</Button>
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

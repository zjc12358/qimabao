import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { Modal } from 'antd-mobile'
import ReactSVG from 'react-svg'

export interface Props {
  modal: boolean   // 控制窗体关闭
  result: string   // '提交成功' 之类的语句
  onClose: any     // 关闭窗口函数
}

interface State {
}
function closest (el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el
    }
    el = el.parentElement
  }
  return null
}
class Result extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return
    }
    const pNode = closest(e.target, '.am-modal-content')
    if (!pNode) {
      e.preventDefault()
    }
  }
  public render () {
    return(
      <Modal
        visible={this.props.modal}
        transparent
        maskClosable={true}
        onClose={this.props.onClose}
        footer={[{ text: '确认', onPress: this.props.onClose }]}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      >
        <div className={'flex-space-around-column-center'} style={{ height: 100 }}>
          <ReactSVG path='assets/images/Supplier/correct.svg' svgStyle={{ width: 70, height: 70 }}/>
          <span style={{ color: '#333',fontSize: 16 }}>{this.props.result}</span>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = () => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Result)

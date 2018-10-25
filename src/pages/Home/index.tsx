import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar, Carousel } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import Statusbar from '@components/Statusbar'

export interface Props {

}

interface State {
  imgData: any
}

class Home extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      imgData: []
    }
  }

  componentDidMount () {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        imgData: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI']
      })
    }, 100)
  }

  /**
   * 顶部搜索框和按钮
   */
  renderHead = () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 40,
        width: '100%',
        backgroundColor: '#0084e7',
        paddingLeft: 10,
        paddingRight: 10
      }}>
        <div style={{
          flex: 1
        }} onClick={this.locationOnclick}>
          定位图标
        </div>
        <div style={{
          flex: 6,
          borderStyle: 'solid',
          borderWidth: 0,
          borderRadius: 25,
          backgroundColor: 'white',
          height: 30
        }} onClick={this.searchOnclick}>

        </div>
        <div style={{
          flex: 1
        }} onClick={this.scanOnclick}>
          扫一扫图标
        </div>
        <div style={{
          flex: 1
        }} onClick={this.messageOnclick}>
          消息图标
        </div>
      </div>
    )
  }

  /**
   * 轮播图
   */
  renderCarousel = () => {
    return (
      <Carousel
        autoplay={true}
        infinite={true}
        style={{
          height: 140,
          width: '100%',
          marginTop: 10,
          borderStyle: 'solid',
          borderWidth: 0,
          borderRadius: 10,
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10
        }}
      >
        {this.state.imgData.map(val => (
          <a
            key={val}
            href='http://www.alipay.com'
            style={{
              display: 'inline-block', width: '100%', height: 140
            }}
          >
            <img
              src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
              alt=''
              style={{
                width: '100%', verticalAlign: 'top'
              }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'))
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }

  renderIconList = () => {
    return (
      <div>

      </div>
    )
  }

  renderIconListItem = () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        height: 0,
        width: '33%',
        paddingBottom: '34%'
      }}>

      </div>
    )
  }

  /**
   * 点击头部定位
   */
  locationOnclick = () => {
    // TODO 2018/10/24 点击头部定位按钮
    console.log('定位')
  }

  /**
   * 点击头部搜索
   */
  searchOnclick = () => {
    // TODO 2018/10/24 点击搜索跳转搜索页
    console.log('搜索')
  }

  /**
   * 点击头部扫一扫
   */
  scanOnclick = () => {
    // TODO 2018/10/24 点击头部扫一扫
    console.log('扫一扫')
  }

  /**
   * 点击头部消息按钮
   */
  messageOnclick = () => {
    // TODO 2018/10/24 点击头部消息
    console.log('打开消息')
  }

  public render () {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
      }}>
        <Statusbar />
        {this.renderHead()}
        {this.renderCarousel()}
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

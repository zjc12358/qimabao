import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux'
import { TabBar,Icon,DatePicker,List,Modal,Radio,Checkbox } from 'antd-mobile'
import { GlobalData } from '@store/reducers/globalDataReducer'
import './default.css'
import Head from '../../components/Head/index'
import { ShopCartSupplierBean } from '@datasources/ShopCartSupplierBean'
import { ShopCartProductBean } from '@datasources/ShopCartProductBean'
import history from 'history/createHashHistory'
import { ShopCartTestBean } from '@datasources/ShopCartTestBean'
import { updateShopCartTest } from '@store/actions/shopCartTest-data'
import Mbutton from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import Input from '@material-ui/core/Input'

// function Transition (props) {
//   return <Slide direction='up' {...props} />
// }

export interface Props {
  updateShopCartTest: (shopCartTest: ShopCartTestBean) => void,
  data: null
}

interface State {
  data: {},
  open: boolean
}

class History extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = {
      data: {},
      open: false
    }
  }
  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentDidMount () {
    console.log('componentDidMount')
    this.props.updateShopCartTest({
      name: '张三',
      img: '',
      price: 0,
      unit: '',
      count: 0
    })
    this.setState({ data: this.props.data })
  }
  componentWillReceiveProps (nextProps) {
    console.log(111)
    if (nextProps !== this.props) {
      console.log(111111111111)
    }
  }
  public render () {
    return (
      <div>
        <div onClick = { () => {
          this.props.updateShopCartTest({
            name: '张三',
            img: '',
            price: 0,
            unit: '',
            count: 0
          })
        } }>dsjalfdjsakl</div>
        <div style={{ height: 100,width: 100,backgroundColor: 'red' }}></div>
        <div>
          <Mbutton variant='contained' color='primary'>
            Hello World
          </Mbutton>
        </div>
        <div>
          <Mbutton onClick={this.handleClickOpen}>Slide in alert dialog</Mbutton>
          <Dialog
            open={this.state.open}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby='alert-dialog-slide-title'
            aria-describedby='alert-dialog-slide-description'
          >
            <DialogTitle id='alert-dialog-slide-title'>
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-slide-description'>
                <h1>dsafhdsajkdhs</h1>
                Let Google help apps determine location. This means sending anonymous location data to
                Google, even when no apps are running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Mbutton onClick={this.handleClose} color='primary'>
                Disagree
              </Mbutton>
              <Mbutton onClick={this.handleClose} color='primary'>
                Agree
              </Mbutton>
            </DialogActions>
          </Dialog>
          <Input/>
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any) => {
  return {
    data: state.shopCartTestData
  }
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  updateShopCartTest
}

export default connect(mapStateToProps, mapDispatchToProps)(History)

/**
 * Created by liuzhengdong on 2016/11/16.
 */
/**
 * Created by liuzhengdong on 2016/11/16.
 */
import React from 'react'
import Button from './Button'
import './less/confirm.less'

class Confirm extends React.Component {
  constructor (props) {
    super(props)
  }

  doClose () {
    this.props.onClose()
    this.props.onClick()
  }

  doCancel () {
    this.props.onClick()
  }

  render () {
    const props = { ...this.props };
    return (
      <div className="zd_confirm">
        <span className="zd_confirm_bg"/>
        <div className="zd_confirm_warp">
          <div className="zd_confirm_word bo bo-ac bo-pc">{props.title}</div>
          <div className="zd_confirm_btn bo">
            <Button className="btn_confirm" onClick={this.doCancel.bind(this)}>取消</Button>
            <Button className="btn_confirm" onClick={this.doClose.bind(this)}>确定</Button>
          </div>
        </div>
      </div>
    )
  }
}
Confirm.propTypes = {
  title: React.PropTypes.string,
  onClose: React.PropTypes.func,
  onClick: React.PropTypes.func,
}
Confirm.defaultProps = {
  title: '',
  onClose: () => {
  },
  onClick: () => {
  }
}
export default Confirm
/**
 * Created by liuzhengdong on 2016/11/14.
 */
import React from 'react'
import PureRenderMixin from 'rc-util/lib/PureRenderMixin'

class Notify extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  shouldComponentUpdate (...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  timing

  render () {
    const props = { ...this.props };
    return (
      <div className="zd_notify">{props.title}</div>
    )
  }
}
Notify.propTypes = {
  title: React.PropTypes.string,
  onClose: React.PropTypes.bool
}
Notify.defaultProps = {
  title: '提示信息',
  onClose: () => {
  }
}
export default Notify
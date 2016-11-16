/**
 * Created by liuzhengdong on 2016/11/16.
 */
import React from 'react'
import './less/notice.less'

class Notice extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const props = { ...this.props };
    return (
      <div className="zd_notify">
        <span/>
        <div>{props.title}</div>
      </div>
    )
  }
}
Notice.propTypes = {
  title: React.PropTypes.string
}
Notice.defaultProps = {
  title: ''
}
export default Notice
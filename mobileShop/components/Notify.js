/**
 * Created by liuzhengdong on 2016/11/14.
 */
import React from 'react'

class Notify extends React.Component {

  render () {
    return (
      <div></div>
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
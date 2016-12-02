/**
 * Created by liuzhengdong on 2016/11/30.
 */
import React from 'react'
import { connect } from 'react-redux'

class Own extends React.Component {
  constructor (props) {
    window.document.title = '我的'
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="bo-f1">
        <span>我的</span>
      </div>
    )
  }
}
Own.contextTypes = {
  router: React.PropTypes.object.isRequired
};
// 基于全局 state ，哪些是我们想注入的 props ?
function mapStateToProps (state) {
  return {
    user: state.loginReducer
  };
}

export  default connect(mapStateToProps)(Own)
/**
 * Created by liuzhengdong on 2016/11/30.
 */
import React from 'react'
import { connect } from 'react-redux'

class Label extends React.Component {
  constructor (props) {
    window.document.title = '分类'
    super(props)
    this.state = {}
  }

  render () {
    console.log(this.props.location.query)
    return (
      <div className="bo-f1">
        <span>分类</span>
      </div>
    )
  }
}
Label.contextTypes = {
  router: React.PropTypes.object.isRequired
};
// 基于全局 state ，哪些是我们想注入的 props ?
function mapStateToProps (state) {
  return {
    user: state.loginReducer
  };
}

export  default connect(mapStateToProps)(Label)
/**
 * Created by liuzhengdong on 2016/11/30.
 */
import React from 'react'
import { connect } from 'react-redux'
import mlUtils from './../../utils/mlUtils'

class Cart extends React.Component {
  constructor (props) {
    mlUtils.setTitle('购物车')
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="bo-f1">
        <span>购物车</span>
      </div>
    )
  }
}
Cart.contextTypes = {
  router: React.PropTypes.object.isRequired
};
// 基于全局 state ，哪些是我们想注入的 props ?
function mapStateToProps (state) {
  return {
    user: state.loginReducer
  };
}

export  default connect(mapStateToProps)(Cart)
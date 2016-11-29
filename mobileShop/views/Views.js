/**
 * Created by liuzhengdong on 16/9/22.
 */
import React from 'react'
import { connect } from 'react-redux'
import loginAction from '../actions/LoginAction'

class Views extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      title: '',
    }
  }

  doLoginOut () {
    this.props.doLoginOut()
    this.context.router.push('/login')
  }

  render () {
    console.log(this.props.user)
    return (
      <div className="bo bo-ver bo-f1">
        <div className="bo-f1">{this.props.children}</div>
        <div className="footer_warp">
          <ul className="footer_menu">
            <li className="menu_li">
              <i/>
              <span>首页</span>
            </li>
            <li>
              <i/>
              <span>分类</span>
            </li>
            <li>
              <i/>
              <span>购物车</span>
            </li>
            <li onClick={this.doLoginOut.bind(this)}>
              <i/>
              <span>待定/退出</span>
            </li>
            <li>
              <i/>
              <span>我的</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

Views.contextTypes = {
  router: React.PropTypes.object.isRequired
};

// 基于全局 state ，注入我们所需要的的 props
function mapStateToProps (state) {
  return {
    user: state.loginReducer
  };
}

export default connect(mapStateToProps, loginAction)(Views);
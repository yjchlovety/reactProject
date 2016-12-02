/**
 * Created by liuzhengdong on 16/9/22.
 */
import React from 'react'
import { connect } from 'react-redux'
import loginAction from '../actions/LoginAction'
import { Link, IndexLink } from 'react-router'

class Views extends React.Component {

  constructor (props) {
    super(props)
  }

  doLoginOut () {
    this.props.doLoginOut()
    this.context.router.push('/login')
  }

  render () {
    return (
      <div className="bo bo-ver bo-f1">
        <div className="bo-f1 bo">{this.props.children}</div>
        <div className="footer_warp">
          <ul className="footer_menu bo">
            <li>
              <IndexLink to="/" activeClassName="footer_btn_a">
                <i className="iconfont icon-home"/><span>首页</span>
              </IndexLink>
            </li>
            <li>
              <Link to="/label" activeClassName="footer_btn_a">
                <i className="iconfont icon-menuunfold"/><span>分类</span>
              </Link>
            </li>
            <li>
              <Link to="/cart" activeClassName="footer_btn_a">
                <i className="iconfont icon-shoppingcart"/><span>购物车</span>
              </Link>
            </li>
            <li onClick={this.doLoginOut.bind(this)}>
              <i className="iconfont icon-logout"/>
              <span>待定/退出</span>
            </li>
            <li>
              <Link to="/own" activeClassName="footer_btn_a">
                <i className="iconfont icon-user"/><span>我的</span>
              </Link>
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
import React from 'react'
import './login.css'
import logo from '../../img/logo01.svg'
import loginAction from '../../actions/LoginAction'
import { connect } from 'react-redux'
import { post } from '../../utils/api'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: 'hycgjt',
      password: '123456a',
      checked: true,
      date: ''
    }
  }

  remember () {
    this.setState({ checked: !this.state.checked });
    console.log(this.props)
  }

  userNameChange (e) {
    this.setState({ username: e.target.value });
  }

  passWordChange (e) {
    this.setState({ password: e.target.value });
  }

  loginIn () {
    const user = {
      username: this.state.username,
      password: this.state.password,
      token: 9876543210
    }
    post('/mock/login', user).then((res) => {
      console.log(res)
    }).catch(error => {
      console.log('错误')
    })
    // this.props.doLoginIn(user)
    // setTimeout(()=> {
    //   this.context.router.push('/')
    // }, 1000)
  }

  render () {
    return (
      <div className="login">
        <div className="login_top">
          <img className="logo logo_animate" src={logo}/>
          <span className="title_word">后台管理系统 {this.props.user.username}</span>
        </div>

        <div className="login_foot">
          <span>©2016&nbsp;React&nbsp;</span>
          <span>QQ:&nbsp;335758663</span>
          <span>新浪微博:&nbsp;不知道起什么名字好1223</span>
        </div>
      </div>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};

// 基于全局 state ，哪些是我们想注入的 props ?
function mapStateToProps (state) {
  return {
    user: state.loginReducer
  };
}

export default connect(mapStateToProps, loginAction)(Login);
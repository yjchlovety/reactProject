import React from 'react'
import Footer from './Footer'
import '../css/login.less'
import loginImg from '../img/img-login.jpg'
import uUser from '../img/u-user.png'
import uPassWord from '../img/u-password.png'
import email from '../img/email.png'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLogin: true
    }
  }

  getLoginInShow () {

  }

  tabClick () {
    this.setState("isLogin", false)
  }

  loginInShow () {

  }

  loginUpShow () {

  }

  render () {
    let divStyle = {
      display: this.state ? 'none' : 'block',
    };
    return (
      <div className="bo bo-f1 bo-ver">
        <header className="login-header">
          <img className="img-login" src={loginImg}/>
          <div className="login-word bo bo-pc bo-ver">
            <h2>Sign Up</h2>
            <p>Beautifully crafted UI Kit for you</p>
          </div>
        </header>
        <nav className="nav-login bo">
          <a onClick={this.tabClick.bind(this)} className="nav-lga">Sign In</a>
          <a onClick={this.tabClick.bind(this)}>Sign Up</a>
        </nav>
        <div className="login-warp bo-f1">
          <div className="warp-login-in" style={divStyle}>
            <div className="login-ddv bo ">
              <img className="img-login-icon" src={uUser}/>
              <div className="login-input bo-f1">
                <input className="input-blog" placeholder="username"/>
              </div>
            </div>
            <div className="login-ddv bo">
              <img className="img-login-icon" src={uPassWord}/>
              <div className="login-input bo-f1">
                <input className="input-blog" placeholder="Password"/>
              </div>
            </div>
          </div>
          <div className="warp-login-up">
            <div className="login-ddv bo ">
              <img className="img-login-icon" src={uUser}/>
              <div className="login-input bo-f1">
                <input className="input-blog" placeholder="username"/>
              </div>
            </div>
            <div className="login-ddv bo ">
              <img className="img-login-icon" src={email}/>
              <div className="login-input bo-f1">
                <input className="input-blog" placeholder="email"/>
              </div>
            </div>
            <div className="login-ddv bo">
              <img className="img-login-icon" src={uPassWord}/>
              <div className="login-input bo-f1">
                <input className="input-blog" placeholder="Password"/>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Login;
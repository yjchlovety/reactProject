import React from 'react'
import Footer from './Footer'
import '../css/login.less'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '登陆',
      isLogin: true,
      opacity: 11,
      userName: '',
      passWord: '',
      email: ''
    }
  }

  tabClick (v) {
    this.setState({ isLogin: v })
  }

  loginInOrUp (v) {
    if (v) {
      return { display: "block" }
    }
    return { display: "none" }
  }

  cgUserName (e) {
    this.setState({ userName: e.target.value })
  }

  cgPassWord (e) {
    this.setState({ passWord: e.target.value })
  }

  cgEmail (e) {
    this.setState({ email: e.target.value })
  }

  doLoginIn () {

  }

  doLoginUp () {

  }

  componentWillMount () {
    window.document.title = this.state.title
  }

  render () {
    return (
      <div className="bo bo-f1 bo-ver login">
        <header className="login_header">
          <div className="login_word bo bo-pc bo-ver">
            <h2>Sign Up</h2>
            <p>Beautifully crafted UI Kit for you</p>
          </div>
        </header>
        <nav className="nav_login bo">
          <a onClick={this.tabClick.bind(this, true)} className={this.state.isLogin ? "nav_lga" : ""}>
            Sign In<span/>
          </a>
          <a onClick={this.tabClick.bind(this, false)} className={this.state.isLogin ? "" : "nav_lga" }>
            Sign Up<span/>
          </a>
        </nav>
        <div className="login_warp bo-f1">
          <div className="warp_login_in">
            <div className="login_ddv bo ">
              <i className="img_ii icon_user"/>
              <div className="login_input bo-f1">
                <input className=" input_blog" placeholder="username" type="number"
                       onChange={this.cgUserName.bind(this)} value={this.state.userName}
                />
              </div>
            </div>
            <div className="login_ddv bo">
              <i className="img_ii icon_psd"/>
              <div className="login_input bo-f1">
                <input className="input_blog" placeholder="password" type="password"
                       onChange={this.cgPassWord.bind(this)} value={this.state.passWord}/>
              </div>
            </div>
            <div className="login_ddv " style={this.loginInOrUp(!this.state.isLogin)}>
              <i className="img_ii icon_email"/>
              <div className="login_input bo-f1">
                <input className="input_blog" placeholder="email" type="number"
                       onChange={this.cgEmail.bind(this)} value={this.state.email}/>
              </div>
            </div>
            <div className="login_ddv"></div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Login;
import React from 'react'
import Footer from './Footer'
import '../css/login.less'
import { Button } from '../components/Cpt'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '登陆',
      isLogin: true,
      opacity: 11,
      userName: '',
      passWord: '',
      imgWord: 'Sign In'
    }
  }

  tabClick (v) {
    if (v) {
      this.setState({ isLogin: v, title: '登陆', imgWord: 'Sign In' })
    } else {
      this.setState({ isLogin: v, title: '注册', imgWord: 'Sign Up' })
    }
  }

  cgUserName (e) {
    this.setState({ userName: e.target.value })
  }

  cgPassWord (e) {
    this.setState({ passWord: e.target.value })
  }

  doLoginIn () {
    console.log('点击登陆了')
  }

  doLoginUp () {
    console.log('点击注册了')
  }

  doBtnClick () {
    if (this.state.isLogin) {
      this.doLoginIn()
    } else {
      this.doLoginUp()
    }
  }

  componentWillMount () {
    window.document.title = this.state.title
  }

  render () {
    return (
      <div className="bo bo-f1 bo-ver login">
        <header className="login_header">
          <div className="login_word bo bo-pc bo-ver">
            <h2>{this.state.imgWord}</h2>
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
                <input maxLength="11" className=" input_blog" placeholder="手机号码" type="tel"
                       onChange={this.cgUserName.bind(this)} value={this.state.userName}
                />
              </div>
            </div>
            <div className="login_ddv bo">
              <i className="img_ii icon_psd"/>
              <div className="login_input bo-f1">
                <input maxLength="30" className="input_blog" placeholder="密码" type="password"
                       onChange={this.cgPassWord.bind(this)} value={this.state.passWord}/>
              </div>
            </div>
            <div className="btn_login">
              <Button onClick={this.doBtnClick.bind(this)} size='large'>{this.state.title}</Button>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Login;
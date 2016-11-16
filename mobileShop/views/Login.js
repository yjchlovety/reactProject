import React from 'react'
import Footer from './Footer'
import '../css/login.less'
import { Button, Loading, Notify } from '../components/Cpt'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '登陆',
      loading: false,
      loadWords: '正在加载...',
      notify: '错误提示',
      isLogin: true,
      opacity: 11,
      userName: '',
      passWord: '',
      imgWord: 'Sign In'
    }
  }

  tabClick (v) {
    if (v) {
      this.setState({ isLogin: v, title: '登陆', imgWord: 'Sign In' }, () => {
        this.setDocTitle()
      })
    } else {
      this.setState({ isLogin: v, title: '注册', imgWord: 'Sign Up' }, () => {
        this.setDocTitle()
      })
    }
  }

  cgUserName (e) {
    this.setState({ userName: e.target.value })
  }

  cgPassWord (e) {
    this.setState({ passWord: e.target.value })
  }

  doLoginIn () {
    this.setState({ loading: true, loadWords: '正在登陆...' })
    setTimeout(() => {
      this.setState({ loading: false })
      Notify.notice({ title: '登陆出错了' })
    }, 1000)
  }

  doLoginUp () {
    this.setState({ loading: true, loadWords: '正在注册...' })
    setTimeout(() => {
      this.setState({ loading: false })
      Notify.confirm({
        title: '你确定要注册嘛！', onClose: () => {
          console.log(222)
        }
      })
    }, 1000)
  }

  doBtnClick () {
    if (this.state.isLogin) {
      this.doLoginIn()
    } else {
      this.doLoginUp()
    }
  }

  setDocTitle () {
    window.document.title = this.state.title

  }

  componentWillMount () {
    this.setDocTitle()
  }

  render () {
    return (
      <div className="bo bo-f1 bo-ver login">
        <Loading loadWords={this.state.loadWords} state={this.state.loading}/>
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
            <div className="login_ddv ">
              <i className="img_ii icon_user"/>
              <div className="login_input">
                <input maxLength="11" className=" input_blog" placeholder="手机号码" type="tel"
                       onChange={this.cgUserName.bind(this)} value={this.state.userName}
                />
              </div>
            </div>
            <div className="login_ddv">
              <i className="img_ii icon_psd"/>
              <div className="login_input">
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
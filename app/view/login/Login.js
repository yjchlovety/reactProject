import React from 'react'
import { Form, Input, Button, Checkbox, DatePicker, message } from 'antd'
import './login.css'
import logo from '../../img/logo01.svg'
const FormItem = Form.Item
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: 'admin',
      passWod: '123456',
      checked: true,
      date: ''
    }
  }

  onChange1 () {
    this.setState({ checked: !this.state.checked });
  }

  loginIn () {
    alert(1111)
  }

  handleChange (date) {
    message.info('您选择的日期是: ' + date.toString());
    this.setState({ date });
    alert(date)
  }

  render () {
    return (
      <div className="login">
        <div className="login_top">
          <img className="logo logo_animate" src={logo}/>
          <span className="title_word">后台管理系统</span>
        </div>
        <div className="login_warp">
          <FormItem label="账户">
            <Input size="large" value={this.state.userName} placeholder="请输入账户名"/>
          </FormItem>
          <FormItem label="密码">
            <Input size="large" value={this.state.passWod} type="password" placeholder="请输入密码"/>
          </FormItem>
          <FormItem>
            <Checkbox onClick={this.onChange1.bind(this)} checked={this.state.checked}><span >记住我</span></Checkbox>
          </FormItem>
          <Button onClick={this.loginIn.bind(this)} size="large" type="primary">登录</Button>
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

export default Login;
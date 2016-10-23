import React from 'react'

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

  render () {
    let style = {
      width: '100%',
      height: '10rem',
      background: '#999'
    }
    return (
      <div className="login">
        <div>测试 测试</div>
        <h1>111</h1>
        <h2>2222</h2>
        <h3>333</h3>
        <h4>444</h4>
        <h5>555</h5>
        <h6>666</h6>

        <div style={ style }></div>
      </div>
    )
  }
}

export default Login;
import React from 'react'
import './css/common.css'
import './css/base.less'
import './css/blog.less'

class App extends React.Component {
  render () {
    return (
      <div className="bo bo_body">
        {this.props.children || "Welcome to your zdliu"}
      </div>
    )
  }
}

export default App;
import React from 'react'
import './css/common.css'

class App extends React.Component {
  render () {
    return (
      <div className="zd_dream">
        {this.props.children || "Welcome to your zdliu"}
      </div>
    )
  }
}

export default App;
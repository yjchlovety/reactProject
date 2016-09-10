/**
 * Created by liuzhengdong on 16/9/3.
 */
import React from 'react'
import Pagination from './../components/Pagination'

class Demo02 extends React.Component {
  constructor () {
    super()
    this.state = {
      p: 5,
      total: 245
    }
  }

  pageCall (v) {
    this.setState({ p: v })
  }

  render () {
    return (
      <div className="ptb5">
        <Pagination pageCallBack={this.pageCall.bind(this)} totalNumber={this.state.total} page={this.state.p}/>
      </div>
    )

  }
}

export default Demo02;
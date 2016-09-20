/**
 * Created by liuzhengdong on 16/8/29.
 */

import React from 'react'

class Loading extends React.Component {
  constructor (props) {
    super(props)
  }

  loadClass () {
    return [ 'loading', this.props.loading ? '' : 'zdHide' ].join(' ')
  }

  render () {
    return (
      <div className={this.loadClass()}>正在加载...</div>
    )
  }
}

Loading.defaultProps = {
  loading: false
}

export default Loading;
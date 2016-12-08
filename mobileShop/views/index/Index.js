/**
 * Created by liuzhengdong on 2016/11/30.
 */
import React from 'react'
import { connect } from 'react-redux'
import { Loading } from '../../components/Cpt'
import Search from '../Search'
import mlUtils from './../../utils/mlUtils'

class Index extends React.Component {
  constructor (props) {
    mlUtils.setTitle('首页')
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1000)
  }

  render () {
    return (
      <div className="bo-f1 main_warp">
        <Search/>
        <Loading state={this.state.loading}/>
        <span>首页</span>
      </div>
    )
  }
}
Index.contextTypes = {
  router: React.PropTypes.object.isRequired
};
// 基于全局 state ，哪些是我们想注入的 props ?
function mapStateToProps (state) {
  return {
    user: state.loginReducer
  };
}

export  default connect(mapStateToProps)(Index)
/**
 * Created by liuzhengdong on 16/9/22.
 */
import React from 'react'
import { Link } from 'react-router'

class Views extends React.Component {
  render () {
    return (
      <div className="zd_dream">
        <div className="dream_head">
          <h1>React Router Demo</h1>
        </div>
        <div className="dream_body zdFix">
          <div className="dream_menu">
            <ul className="dream_menu_ul">
              <li><Link to="/">index</Link></li>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/concat">数据表格/DataGrid</Link></li>
            </ul>
          </div>
          <div className="dream_content">
            {this.props.children || '首页'}
          </div>
        </div>
      </div>
    )
  }
}

export default Views;
import React from 'react'
import { Link } from 'react-router'
import './css/reset.css'
import './css/components.css'
import './css/view.css'

class App extends React.Component {
  render () {
    return (
      <div className="zd_dream">
        <div className="dream_head">
          <h1>React Router Demo</h1>
        </div>
        <div className="dream_body zdFix">
          <div className="dream_menu">
            <ul className="dream_menu_ul">
              <li><Link to="/">Home</Link></li>
              <li className=""><Link to="/demo01">数据表格/DataGrid</Link></li>
              <li><Link to="/demo02">分页/Pagination</Link></li>
              <li><Link to="/concat">日期框/DateBox</Link></li>
              <li><Link to="/concat">选项卡/Tabs</Link></li>
              <li><Link to="/concat">日历/Calendar</Link></li>
              <li><Link to="/concat">提示/Messager</Link></li>
              <li><Link to="/concat">进度条/ProgressBar</Link></li>
              <li><Link to="/concat">树/Tree</Link></li>
              <li><Link to="/concat">正在记载.../Loading</Link></li>
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

export default App;
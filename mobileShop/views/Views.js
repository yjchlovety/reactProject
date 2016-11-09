/**
 * Created by liuzhengdong on 16/9/22.
 */
import React from 'react'

class Views extends React.Component {
  render () {

    return (
      <div className="bo bo-ver bo-f1">
        <div className="bo-f1"></div>
        <div className="footer_warp">
          <ul className="footer_menu">
            <li className="menu_li">
              <i/>
              <span>首页</span>
            </li>
            <li>
              <i/>
              <span>热门</span>
            </li>
            <li>
              <i className="middle_add"/>
              <span>添加</span>
            </li>
            <li>
              <i/>
              <span>标签</span>
            </li>
            <li>
              <i/>
              <span>我的</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Views;
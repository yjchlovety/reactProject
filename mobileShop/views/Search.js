/**
 * Created by liuzhengdong on 2016/11/30.
 */
import React from 'react'
import { Button } from '../components/Cpt'

class Search extends React.Component {

  render () {
    return (
      <div className="ml-search">
        <div className="ml-search-top">
          <div className="search-left">搜索</div>
          <div className="search-warp"></div>
          <div className="search-right">取消</div>
        </div>
        <div className="ml-search-warp">
          <div className="hot-search">
            热搜
            <span>面膜</span>
          </div>
          <div className="history-sch">
            <ul>
              <li>历史111</li>
              <li>历史111</li>
              <li>历史111</li>
            </ul>
            <Button>清空历史搜索</Button>
          </div>
        </div>
        <div className="ml-search-result">
          <ul>
            <li>搜索11</li>
            <li>搜索22</li>
            <li>搜索33</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Search
/**
 * Created by liuzhengdong on 16/9/3.
 */

import React from 'react'

class Pagination extends React.Component {
  constructor (props) {
    super(props)
  }

  pagnAlign () {
    return 'pagn ' + 'pagn_' + this.props.align
  }

  jumpPage (num) {
    this.props.pageCallBack(num)
  }

  jumpNextOrPrev (v) {
    if (this.props.page + v < 0 || this.props.page + v > Math.ceil(this.props.totalNumber / this.props.pageSize)) {
      return
    }
    this.props.pageCallBack(this.props.page + v)
  }

  createPages () {
    let pageAry = []
    let pg = Math.ceil(this.props.totalNumber / this.props.pageSize)
    let startPage = this.calculation(pg, this.props.page)
    if (this.props.page > 1) {
      pageAry.push(<span key={'pageFirst'} onClick={this.jumpPage.bind(this, 1)}>First</span>)
      pageAry.push(<span key={'pageOne'} onClick={this.jumpNextOrPrev.bind(this, -1)}>prev</span>)
    }
    for (let p = 0; p < 7 && startPage + p <= pg; p++) {
      pageAry.push(<span className={startPage + p === this.props.page ? 'page_num' : ''}
                         onClick={this.jumpPage.bind(this, startPage + p)}
                         key={'page_' + startPage + p}>{startPage + p}</span>)
    }
    if (this.props.page < pg) {
      pageAry.push(<span key={'page' + this.props.totalNumber} onClick={this.jumpNextOrPrev.bind(this, 1)}>next</span>)
      pageAry.push(<span key={'pageLast'} onClick={this.jumpPage.bind(this, pg)}>Last</span>)
    }

    return pageAry
  }

  calculation (pg, page) {
    if (page > this.props.beApart && page < pg - this.props.beApart) {
      return page - this.props.beApart;
    } else if (page < this.props.beApart + 1) {
      return 1;
    } else {
      return pg - 2 * this.props.beApart;
    }
  }

  render () {
    return (
      <div className="zd_pagination">
        <span>{Math.ceil(this.props.totalNumber / this.props.pageSize)}</span>
        <div className={this.pagnAlign()}>
          {this.createPages()}
        </div>
      </div>
    )
  }
}
Pagination.defaultProps = {
  totalNumber: 0,
  page: 0,
  pageSize: 20,// 默认分页数
  beApart: 3, // 左右相隔个数 默认为3
  pageCallBack: () => {
  },//分页回调事件
  align: 'center', //left center right  默认显示中间
}
Pagination.propTypes = {
  totalNumber: React.PropTypes.number,
  page: React.PropTypes.number,
  align: React.PropTypes.string,
  pageSize: React.PropTypes.number,
  beApart: React.PropTypes.number,
  pageCallBack: React.PropTypes.func
}
export default Pagination
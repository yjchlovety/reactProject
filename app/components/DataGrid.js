/**
 * Created by zdliu on 16/8/29.
 */
import React from 'react'
import StringUtils from './StringUtils'

class DataGrid extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      allState: false,// 所有数据选中状态
      checkAry: [],// 存储所有数据checkbox状态
    };
  }

  createTHeadTrTds () {
    let tdsAry = []
    if (this.props.columnItems) {
      if (this.props.checkBox) {
        tdsAry.push(
          <td className="td_checkbox" key={'allTds'}>
            <input onClick={this.selectAllTds.bind(this)} type="checkbox"/>
          </td>
        )
      }
      this.props.columnItems.forEach(v => {
        tdsAry.push(<td key={v.name}>{v.name}</td>)
      })
    }
    return tdsAry
  }

  createTBodyTr () {
    let trsAry = []
    if (this.props.items) {
      this.props.items.forEach((v, idx) => {
        trsAry.push(
          <tr className={!this.props.checkBox && this.state.checkAry[ idx ] && this.props.select ? "tr_checked" : ""}
              onClick={this.props.checkBox || this.props.select ? this.selectOneTd.bind(this, idx) : ""} key={idx}>
            {this.createTBodyTds(v, idx)}
          </tr>)
      })
    }
    return trsAry
  }

  createTBodyTds (item, trIdx) {
    let tdsAry = []
    if (this.props.columnItems) {
      if (this.props.checkBox) {
        tdsAry.push(
          <td className="td_checkbox" key={'childTd'}>
            <input checked={this.state.checkAry[ trIdx ] ? 'checked' : ''} type="checkbox"/>
          </td>
        )
      }
      this.props.columnItems.forEach((v, idx) => {
        if (!StringUtils.isEmpty(v.inlineFuc) && typeof v.inlineFuc === 'function') {
          tdsAry.push(<td key={idx}>{v.inlineFuc(item [ v.column ])}</td>)
        } else {
          tdsAry.push(<td key={idx}>{item [ v.column ]}</td>)
        }
      })
    }
    return tdsAry
  }

  /*
   * name:gridCallBack 回调函数
   * callback:Array返回值
   * */
  gridCallBack () {
    if (!StringUtils.isEmpty(this.props.callBackData)) {
      let ary = []
      this.state.checkAry.forEach((v, index)=> {
        if (v) {
          ary.push(this.props.items[ index ])
        }
      })
      this.props.callBackData(ary)
    }
  }

  selectAllTds () {
    this.setState({
      allState: !this.state.allState,
      checkAry: this.state.checkAry.map(() => {
        return !this.state.allState
      })
    }, () => {
      this.gridCallBack()
    })
  }

  selectOneTd (trIdx) {
    let stateAry = this.state.checkAry
    if (!this.props.checkBox) {
      stateAry = stateAry.map(v => {
        return false
      })
    }
    stateAry[ trIdx ] = !this.state.checkAry[ trIdx ]
    this.setState({ checkAry: stateAry }, () => {
      this.gridCallBack()
    })
  }

  //初始化 数据的Checkbox的状态值
  initStateAry () {
    this.setState({ allState: false })
    if (this.props.items && this.props.checkBox) {
      this.setState({
        checkAry: this.props.items.map(() => {
          return false
        })
      })
    }
    console.log(this.state)
  }

  render () {
    return (
      <div className="data_grid">
        <table className="data_grid_table">
          <thead className="data_grid_thead">
          <tr>
            {
              this.createTHeadTrTds()
            }
          </tr>
          </thead>
          <tbody className="data_grid_tbody">
          {
            this.createTBodyTr()
          }
          </tbody>
        </table>
      </div>
    )
  }

  //在挂载发生之前立即被调用
  componentWillMount () {
    console.log('组件初始化...')
    this.initStateAry()
  }

  //在挂载结束之后马上被调用。需要DOM节点的初始化操作应该放在这里。
  componentDidMount () {

  }

  // 当一个挂载的组件接收到新的props的时候被调用。该方法应该用于比较this.props和nextProps，然后使用this.setState()来改变state。
  componentWillReceiveProps (nextProps) {
    // this.setProps(nextProps, () => {
    // })
  }

  // boolean当组件做出是否要更新DOM的决定的时候被调用。实现该函数，优化this.props和nextProps，以及this.state和nextState的比较，如果不需要React更新DOM，则返回false。
  shouldComponentUpdate (nextProps, nextState) {
    return true
  }

  //在更新发生之前被调用。你可以在这里调用this.setState()。
  componentWillUpdate (nextProps, nextState) {
    // this.initStateAry()
    console.log('组件更新...')
  }

  //在更新发生之后调用。
  componentDidUpdate (prevProps, prevState) {

  }

  //组件移除前方法
  componentWillUnmount () {

  }

}

DataGrid.defaultProps = {
  columnItems: [],//栏目名称和字段名
  getJsonUrl: '',//请求URL地址
  keywords: '', //关键字
  items: [],// 数据
  checkBox: false,// 是否显示checkbox 显示为多选,隐藏为单选
  select: false,// 点击行是否选中前提 checkBox 为false
  pageSize: 20, // 每页条数 默认每页20条数据
  enablePage: false, // 是否启用分页
  callBackData: ()=> { // 匿名函数返回选中的值List
  },

};

DataGrid.propTypes = {
  columnItems: React.PropTypes.array,
  items: React.PropTypes.array,
  getJsonUrl: React.PropTypes.string,
  keywords: React.PropTypes.string,
  checkBox: React.PropTypes.bool,
  pageSize: React.PropTypes.number,
  enablePage: React.PropTypes.bool,
  callBackData: React.PropTypes.func,
};

export default DataGrid;
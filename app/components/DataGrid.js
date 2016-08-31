/**
 * Created by zdliu on 16/8/29.
 */
import React from 'react'
import Loading from './Loading'
import StringUtils from './StringUtils'

var columnItems = [
  { name: "Item ID", column: "id" },
  { name: "Product", column: "product" },
  { name: "Price", column: "price" },
  { name: "Unit Cost", column: "cost" },
  { name: "Attribute", column: "attribute" },
  {
    name: "状态", column: "status", inlineFuc: (v) => {
    return v === 1 ? '是' : "否"
  }
  },
  { name: "地址", column: "address" }
]
var items = [
  {
    "id": 142,
    "product": "RP-SN-01",
    "price": 36.9,
    "cost": 123,
    "attribute": "Large",
    "status": 1,
    "address": "中国江苏南京"
  },
  {
    "id": 143,
    "product": "RP-SN-02",
    "price": 99.99,
    "cost": 123,
    "attribute": "Spotted Adult Female",
    "status": 1,
    "address": "中国江苏南京"
  },
  {
    "id": 145,
    "product": "RP-SN-03",
    "price": 38.5,
    "cost": 78,
    "attribute": "Venomless",
    "status": 0,
    "address": "中国江苏南京"
  },
  {
    "id": 1425,
    "product": "RP-SN-03",
    "price": 38.5,
    "cost": 78,
    "attribute": "Venomless",
    "status": 0,
    "address": "中国江苏南京"
  },
  {
    "id": 1452,
    "product": "RP-SN-03",
    "price": 38.5,
    "cost": 78,
    "attribute": "Venomless",
    "status": 0,
    "address": "中国江苏南京"
  }
]
class DataGrid extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      page: 1,//当前页码
      loading: true,
      items: [], //数据item
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
    if (this.state.items) {
      this.state.items.forEach((v, idx) => {
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
          ary.push(this.state.items[ index ])
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
  initStateAry (item) {
    if (item && this.props.checkBox) {
      this.setState({
        checkAry: item.map(() => {
          return false
        })
      })
    }
  }

  //在挂载发生之前立即被调用
  componentWillMount () {
    this.initStateAry(this.state.items)
  }

  render () {
    return (
      <div className="data_grid">
        <div className="data_grid_body">
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
        <Loading loading={this.state.loading}/>
      </div>
    );
  }

  //在挂载结束之后马上被调用。需要DOM节点的初始化操作应该放在这里。
  componentDidMount () {
    setTimeout(()=> {
      this.setState({ items: items, loading: false });
      this.initStateAry(items)
    }, 1000)
  }

  // 当一个挂载的组件接收到新的props的时候被调用。该方法应该用于比较this.props和nextProps，然后使用this.setState()来改变state。
  componentWillReceiveProps (nextProps) {
  }

  // boolean当组件做出是否要更新DOM的决定的时候被调用。实现该函数，优化this.props和nextProps，以及this.state和nextState的比较，如果不需要React更新DOM，则返回false。
  shouldComponentUpdate (nextProps, nextState) {
    return true
  }

  //在更新发生之前被调用。你可以在这里调用this.setState()。
  componentWillUpdate (nextProps, nextState) {
  }

  //在更新发生之后调用。
  componentDidUpdate (prevProps, prevState) {

  }

  //组件移除前方法
  componentWillUnmount () {

  }

}

DataGrid.defaultProps = {
  columnItems: columnItems,//栏目名称和字段名
  getJsonUrl: '',//请求URL地址
  keywords: '', //关键字
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
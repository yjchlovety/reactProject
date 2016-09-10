/**
 * Created by liuzhengdong on 16/8/31.
 */
import React from 'react'
import DataGrid from './../components/DataGrid'
class Demo01 extends React.Component {
  constructor () {
    super()
    this.state = {
      columnItems: [
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
      ],
      items: [
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
      ],
      items1: [
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
    }
  }

  csJson1 (v) {
    console.log('回调了函数data1===' + v)
  }

  csJson2 (v) {
    console.log('回调了函数data2===' + v)
  }

  refreshData () {
    let ary1 = this.state.items.length > 0 ? [] : this.state.items1
    this.setState({
      items: ary1
    })
  }

  render () {
    return (
      <div>
        <div className="ptb10">
          <div className="ptb5">
            <input type="button" onClick={this.refreshData.bind(this)} value="换一组数据"/>
          </div>
          <DataGrid items={this.state.items} columnItems={this.state.columnItems}
                    checkBox={true} select={true} callBackData={this.csJson1}/>
        </div>
        <div className="ptb10">
          <DataGrid items={this.state.items} columnItems={this.state.columnItems}
                    select={true} callBackData={this.csJson2}/>
        </div>
        <div className="ptb10">
          <DataGrid items={this.state.items} columnItems={this.state.columnItems}/>
        </div>
      </div>

    );
  }
}
export default Demo01;
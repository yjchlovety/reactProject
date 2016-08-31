import React from 'react'
import ReactDOM from 'react-dom'
import DataGrid from './components/DataGrid'
import './css/reset.css'
import './css/components.css'

function csJson (v) {
  console.log('回调了函数data===' + v)
}

ReactDOM.render(
  <DataGrid callBackData={csJson}/>,
  document.getElementById('app')
);


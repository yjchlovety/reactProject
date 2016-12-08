import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Router from './router'
import './css/common.css'
ReactDOM.render(
  <Router/>,
  document.getElementById('app')
);
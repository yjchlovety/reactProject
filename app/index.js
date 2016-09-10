/**
 * Created by liuzhengdong on 16/8/31.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import App from './app'
import Demo01 from './view/Demo01'
import Demo02 from './view/Demo02'
import Concat from './view/concat'
import { Router, Route } from 'react-router'

const router = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <Route path="demo01" component={Demo01}/>
      <Route path="demo02" component={Demo02}/>
      <Route path="concat" component={Concat}/>
    </Route>
  </Router>
);
ReactDOM.render(
  router,
  document.getElementById('app')
);
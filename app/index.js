/**
 * Created by liuzhengdong on 16/8/31.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import App from './app'
import About from './view/demo_01'
import Concat from './view/concat'
import { Router, Route } from 'react-router'

const router = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <Route path="demo_01" component={About}/>
      <Route path="concat" component={Concat}/>
    </Route>
  </Router>
);
ReactDOM.render(
  router,
  document.getElementById('app')
);
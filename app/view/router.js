/**
 * Created by liuzhengdong on 16/10/8.
 */
import React from 'react'
import { Router, Route } from 'react-router'
import Concat from './demo/Concat'
import Home from './demo/Home'

const router =
  <Router>
    <Route path="concat" component={Concat}/>
    <Route path="home" component={Home}/>
  </Router>
export default router;

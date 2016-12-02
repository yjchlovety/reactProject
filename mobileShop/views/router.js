/**
 * Created by liuzhengdong on 16/10/8.
 */
import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import Index from './index/Index'
import Cart from './cart/Cart'
import Label from './label/Label'
import Own from './my/Own'

const router =
  <Router>
    <IndexRoute  component={Index}/>
    <Route path="cart" component={Cart}/>
    <Route path="label" component={Label}/>
    <Route path="own" component={Own}/>
  </Router>
export default router;

/**
 * Created by liuzhengdong on 16/10/8.
 */

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Concat from './concat'

class router extends React.Component {
  render () {
    return (
      <Route>
        <IndexRoute component={Concat}/>
        <Route path="concat" component={Concat}/>
        <Route path="home" component={Concat}/>
      </Route>
    );
  }
}
export default router;

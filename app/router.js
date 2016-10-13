/**
 * Created by liuzhengdong on 16/9/21.
 */
import React from 'react'
import { Router, Route, Redirect } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Provider } from 'react-redux'
import Store from './store'
import App from './app'
import Login from './view/login/Login'
import Views from './view/Views'
import viewRouter from './view/router'

class router extends React.Component {
  constructor (props) {
    super(props);
  }

  checkLogin (next, replace) {
    if (!Store.getState().loginReducer.token) {
      replace('/login');
    }
  }

  render () {
    return (
      <Provider store={Store}>
        <Router history={createBrowserHistory()}>
          <Route component={App}>
            <Route path="login" component={Login}/>
            <Route path="/" component={Views} onEnter={this.checkLogin}>
              {viewRouter}
            </Route>
          </Route>
          <Redirect from="*" to="/"/>
        </Router>
      </Provider>
    );
  }
}
export default router;

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
import childRouter from './view/router'
// import Concat from './view/concat'

class router extends React.Component {
  constructor (props) {
    super(props);
  }

  checkLogin (next, replace) {
    console.log('token======' + Store.getState().loginReducer.token)
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
              <Route component={childRouter}/>
            </Route>
          </Route>
          <Redirect from="*" to="/"/>
        </Router>
      </Provider>
    );
  }
}
export default router;

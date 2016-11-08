/**
 * Created by zdliu on 16/9/21.
 */
import React from 'react'
import { Router, Route, Redirect, browserHistory, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import Store from './store'
import App from './app'
import Login from './views/Login'
import Views from './views/Views'
import viewRouter from './views/router'
// import createBrowserHistory from 'history/lib/createBrowserHistory'

const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

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
        <Router history={history}>
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

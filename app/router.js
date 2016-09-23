/**
 * Created by liuzhengdong on 16/9/21.
 */
import React from 'react'
import { Router, Route, IndexRoute, Redirect } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Provider } from 'react-redux'
import Store from './store'
import App from './app'
import Login from './view/login/Login'
import Concat from './view/concat'
import Views from './view/Views'

class router extends React.Component {
  constructor (props) {
    super(props);
  }

  checkLogin (next, replace) {
    // let isLogin = Store.getState().auth.token;
    // if (!isLogin && !this.checkLocalSession()) {
    //   replace('/login');
    // }
    replace('/login');
  }

  checkLocalSession () {
    let localToken = window.localStorage.getItem('session');
    if (localToken) {
      //verify
      const authData = JSON.parse(localToken);
      Store.dispatch(setAuthAction(authData));
      return true;
    } else {
      return false;
    }
  }

  render () {
    return (
      <Provider store={Store}>
        <Router history={createBrowserHistory()}>
          <Route component={App}>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Views} onEnter={this.checkLogin}>
              <IndexRoute component={Concat}/>
              <Route path="concat" component={Concat}/>
            </Route>
          </Route>
          <Redirect from="*" to="/"/>
        </Router>
      </Provider>
    );
  }
}

export default router;

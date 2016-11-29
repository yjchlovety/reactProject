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
import Icons from './components/Icons'
import storage from './utils/storage'

const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

class router extends React.Component {
  constructor (props) {
    super(props);
  }

  checkLogin (next, replace) {
    let user = storage.getItemJson('user')
    if (!Store.getState().loginReducer.token && (!user || !user.token)) {
      replace('/login');
      console.log('用户未登陆')
    }
    Store.dispatch({ type: 'LOGIN_IN', user })
  }

  render () {
    return (
      <Provider store={Store}>
        <Router history={history}>
          <Route component={App}>
            <Route path="login" component={Login}/>
            <Route path="icon" component={Icons}/>
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

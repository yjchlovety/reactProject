/**
 * Created by liuzhengdong on 16/9/21.
 */
import { createStore, combineReducers } from 'redux'
import auth from './stores/auth.reducer'
import message from './stores/message.reducer'
import accounts from './stores/accounts.reducer'
import dashboard from './stores/dashboard.reducer'
import login from './stores/login.reducer'

let Store = createStore(
  combineReducers({
    auth,
    message,
    dashboard,
    accounts,
    login,
  })
);

export default Store;

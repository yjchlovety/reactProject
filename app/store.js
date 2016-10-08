/**
 * Created by liuzhengdong on 16/9/21.
 */
import { createStore, combineReducers } from 'redux'
import loginReducer from './stores/LoginReducer'

let Store = createStore(
  combineReducers({
    loginReducer,
  })
);

export default Store;

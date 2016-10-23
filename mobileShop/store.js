/**
 * Created by zdliu on 16/9/21.
 */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import loginReducer from './stores/LoginReducer'

const logger = createLogger()

let Store = createStore(
  combineReducers({
    loginReducer,
  }),
  applyMiddleware(logger)
);

export default Store;

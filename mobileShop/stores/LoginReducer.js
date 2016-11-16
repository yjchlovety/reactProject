/**
 * Created by liuzhengdong on 16/9/27.
 */
import { LOGIN_IN, LOGIN_OUT } from '../constants/actions'
import storage from '../utils/storage'

const userState = {
  username: '',
  password: '',
  token: null
};

export default (state = userState, action) => {
  switch (action.type) {
    case LOGIN_IN:
      storage.setItemJson('user', Object.assign({}, action.user))
      return Object.assign({}, action.user);
    case LOGIN_OUT:
      return state;
    default:
      return state;
  }
}

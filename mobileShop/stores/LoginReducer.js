/**
 * Created by liuzhengdong on 16/9/27.
 */
import { LOGIN_IN, LOGIN_OUT } from '../constants/actions'

const userState = {
  username: 'zldiu',
  password: '111111',
  token: null
};

export default (state = userState, action) => {
  switch (action.type) {
    case LOGIN_IN:
      return Object.assign({}, action.user);
    case LOGIN_OUT:
      return state;
    default:
      return state;
  }
}

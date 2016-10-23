/**
 * Created by zdliu on 16/9/27.
 */

import { LOGIN_IN, LOGIN_OUT } from '../constants/actions'

export default {
  doLoginIn: (user) => {
    return {
      type: LOGIN_IN,
      user
    }
  },
  doLoginOut: () => {
    return {
      type: LOGIN_OUT
    }
  }

}
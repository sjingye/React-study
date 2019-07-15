
import { USER_INFO } from '../actions/auth.js';

export default function auth(state = {
  userInfo: {}
}, action) {
  switch (action.type) {
    case USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.userInfo
      })
    default:
      return state;
  }
}
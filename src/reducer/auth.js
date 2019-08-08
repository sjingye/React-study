
import { USER_INFO } from '../actions/auth.js';
import { USER_TOKEN } from '../actions/auth.js';

export default function auth(state = {
  userInfo: {},
  userToken: ''
}, action) {
  switch (action.type) {
    case USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.userInfo
      })
    case USER_TOKEN:
      return Object.assign({}, state, {
        userToken: action.token
      })
    default:
      return state;
  }
}
import auth from './auth.js';
import count from './count.js';
import { combineReducers } from 'redux';

/*
  @desciption 只有一个单一的 store 和一个根级的 reduce 函数（reducer）
  分别独立地操作 state 树的不同部分
*/
const rootReducer = combineReducers({
    auth,
    count
})

export default rootReducer;
import { combineReducers } from 'redux';

//test
import isReducer from './isReducer';
import testReducer from './testReducer';
//Reducer
import isLoginReducer from './isLogin';
import postsReducer from './postsAll';
import postReducer from './postEach';
import modal from './modal';

const rootReducer = combineReducers({
  testReducer,
  isReducer,
  isLoginReducer,
  postsReducer,
  postReducer,
  modal,
});

export default rootReducer;
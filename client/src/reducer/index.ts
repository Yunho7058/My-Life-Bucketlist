import { combineReducers } from 'redux';

//test
import isReducer from './isReducer';
import testReducer from './testReducer';
//Reducer
import isLoginReducer from './isLoginReducer';
import postsReducer from './postsReducer';

const rootReducer = combineReducers({
  testReducer,
  isReducer,
  isLoginReducer,
  postsReducer,
});

export default rootReducer;

import { combineReducers } from 'redux';

//Reducer
import isLoginReducer from './isLogin';
import postsReducer from './postsAll';
import postReducer from './postEach';
import modal from './modal';
import isDarkeMode from './isDarkMode';
import userInfo from './userInfo';
import s3Photo from './s3Photo';
import commentAll from './comment';
import boolean from './boolean';

const rootReducer = combineReducers({
  isLoginReducer,
  postsReducer,
  postReducer,
  modal,
  isDarkeMode,
  userInfo,
  s3Photo,
  commentAll,
  boolean,
});

export default rootReducer;

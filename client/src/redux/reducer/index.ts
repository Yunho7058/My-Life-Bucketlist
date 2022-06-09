import { combineReducers } from 'redux';

//Reducer
import isLoginReducer from './isLogin';
import postsReducer from './postsAll';
import postReducer from './postEach';
import modal from './modal';
import isDarkeMode from './isDarkMode';
import userInfo from './userInfo';
import s3Poto from './s3Poto';
import commentAll from './comment';

const rootReducer = combineReducers({
  isLoginReducer,
  postsReducer,
  postReducer,
  modal,
  isDarkeMode,
  userInfo,
  s3Poto,
  commentAll,
});

export default rootReducer;

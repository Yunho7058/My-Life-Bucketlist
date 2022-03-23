import { combineReducers } from 'redux';

//test
import isReducer from './isReducer';
import testReducer from './testReducer';
//Reducer
import isLoginReducer from './isLoginReducer';

const rootReducer = combineReducers({ testReducer, isReducer, isLoginReducer });

export default rootReducer;

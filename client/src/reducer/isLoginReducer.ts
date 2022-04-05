import { IS_LOGIN, IS_LOGOUT } from '../action';

const isLoginReducer = (state = false, action: any) => {
  switch (action.type) {
    case IS_LOGIN:
      return (state = true);
    case IS_LOGOUT:
      return (state = false);
    default:
      return state;
  }
};

export default isLoginReducer;

import { IS_LOGIN, IS_LOGOUT } from '../action';

interface TypeAction {
  type: string;
}

const isLoginReducer = (state = false, action: TypeAction): boolean => {
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

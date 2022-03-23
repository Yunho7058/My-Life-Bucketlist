import { IS_LOGIN } from '../action';

const isLoginReducer = (state = false, action: any) => {
  switch (action.type) {
    case IS_LOGIN:
      return (state = true);
    default:
      return state;
  }
};

export default isLoginReducer;

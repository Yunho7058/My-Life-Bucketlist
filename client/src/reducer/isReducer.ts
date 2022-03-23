import { IS } from '../action/testActions';

const isReducer = (state = false, action: any) => {
  switch (action.type) {
    case IS:
      return !state;

    default:
      return state;
  }
};

export default isReducer;

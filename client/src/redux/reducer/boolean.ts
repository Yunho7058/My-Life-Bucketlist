import {
  IS_NOT_SELECT_BUCKETLIST_POTO,
  IS_SELECT_BUCKETLIST_POTO,
} from '../action';
import TypeRedux from './typeRedux';

const initialization = {
  isPoto: false,
};

const boolean = (state = initialization, action: TypeRedux.TypeAction) => {
  switch (action.type) {
    case IS_SELECT_BUCKETLIST_POTO:
      return { ...state, isPoto: true };
    case IS_NOT_SELECT_BUCKETLIST_POTO:
      return { ...state, isPoto: false };
    default:
      return state;
  }
};

export default boolean;

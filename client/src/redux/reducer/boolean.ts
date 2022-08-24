import {
  IS_NOT_SELECT_BUCKETLIST_PHOTO,
  IS_SELECT_BUCKETLIST_PHOTO,
} from '../action';
import TypeRedux from './typeRedux';

const initialization = {
  isPhoto: false,
};

const boolean = (state = initialization, action: TypeRedux.TypeAction) => {
  switch (action.type) {
    case IS_SELECT_BUCKETLIST_PHOTO:
      return { ...state, isPhoto: true };
    case IS_NOT_SELECT_BUCKETLIST_PHOTO:
      return { ...state, isPhoto: false };
    default:
      return state;
  }
};

export default boolean;

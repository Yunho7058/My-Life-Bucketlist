import { POST_ALL, POST_ALL_ADD } from '../action/index';
import TypeRedux from './typeRedux';

const initialization: TypeRedux.TypePostsData[] = [];

const postsAllReducer = (
  state: TypeRedux.TypePostsData[] = initialization,
  action: TypeRedux.TypePosts
) => {
  switch (action.type) {
    case POST_ALL:
      let allData = action.payload.postAlldata;

      return allData;
    case POST_ALL_ADD:
      let allDataAdd = action.payload.postAlldata;

      if (state[state.length - 1].id === allDataAdd[allDataAdd.length - 1].id) {
        return state;
      } else {
        return state.concat(allDataAdd);
      }

    // case POST_TEST:
    //   let copy = [...state];
    //   console.log(action.payload);

    //   return copy;

    default:
      return state;
  }
};
export default postsAllReducer;

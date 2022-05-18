import axiosInstance from '../../components/axios';
import { POST_ALL } from '../action/index';
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

    // case POST_TEST:
    //   let copy = [...state];
    //   console.log(action.payload);

    //   return copy;

    default:
      return state;
  }
};
export default postsAllReducer;

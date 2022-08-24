import axios from 'axios';
import {
  POST_ALL,
  POST_ALL_ADD,
  POST_ALL_PHOTO_S3_DOWNLOAD,
} from '../action/index';
import TypeRedux from './typeRedux';

const postsAllReducer = (
  state: TypeRedux.TypePostsData[] = [],
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

    case POST_ALL_PHOTO_S3_DOWNLOAD:
      let copy_allPost = state;

      const allDataS3 = copy_allPost.map((el) => {
        return {
          ...el,
          bucketlist: el.bucketlist.map((el) => {
            return el.id === action.payload.id
              ? { ...el, image_path: action.payload.url }
              : { ...el };
          }),
        };
      });
      return allDataS3;

    default:
      return state;
  }
};
export default postsAllReducer;

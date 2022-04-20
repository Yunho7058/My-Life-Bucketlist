import {
  POST_BUCKETLIST_EDIT,
  POST_EACH,
  POST_BUCKETLIST_DELET,
  POST_BUCKETLIST_NEW,
  POST_EACH_LIKE,
  POST_EACH_BOOKMARK,
} from '../action/index';
import TypeRedux from './typeRedux';

const initialization = {
  title: '',
  id: 0,
  nickname: '',
  updated_at: '',
  like_count: 0,
  owner: false,
  bookmark: false,
  like: false,
  bucketlist: [
    {
      id: 0,
      content: '',
      detaile: '',
      image_path: '',
    },
  ],
};

const postReducer = (
  state: TypeRedux.TypePostData = initialization,
  action: TypeRedux.TypePost
) => {
  switch (action.type) {
    case POST_EACH:
      let copy = action.payload.postEachData;

      return { ...copy };

    case POST_EACH_LIKE:
      let like_copy = { ...state };
      if (state.like) {
        like_copy.like_count--;
        return {
          ...state,
          like: false,
          like_count: like_copy.like_count,
        };
      } else {
        like_copy.like_count++;
        return {
          ...state,
          like: true,
          like_count: like_copy.like_count,
        };
      }

    case POST_EACH_BOOKMARK:
      if (state.bookmark) {
        return {
          ...state,
          bookmark: false,
        };
      } else {
        return {
          ...state,
          bookmark: true,
        };
      }
    case POST_BUCKETLIST_EDIT:
      let data = action.payload.data;

      let content_copy = state.bucketlist.map((el) => {
        return data.content
          ? el.id === action.payload.id
            ? { ...el, content: data.content }
            : { ...el }
          : el.id === action.payload.id
          ? { ...el, detail: data.detail }
          : { ...el };
      });
      return { ...state, bucketlist: content_copy };
    case POST_BUCKETLIST_DELET:
      let delete_copy = state.bucketlist.filter((el) => {
        return el.id !== action.payload.id;
      });
      return { ...state, bucketlist: delete_copy };

    case POST_BUCKETLIST_NEW:
      const { id, content, detail } = action.payload;

      let new_copy = state.bucketlist.map((el) => {
        return el.id !== id
          ? { id: id, content: content, detail: detail }
          : { ...el };
      });
      return {
        ...state,
        bucketlist: new_copy,
      };

    default:
      return state;
  }
};
export default postReducer;

import { POST_ALL } from '../action/index';
import TypeRedux from './typeRedux';

const initialization = [
  {
    title: '',
    id: 0,
    nickname: '',
    updated_at: '',
    like_count: 0,
    bucketlist: [
      {
        id: 0,
        content: '',
        data: '',
        image_path: '',
      },
    ],
  },
];

const postsReducer = (
  state: TypeRedux.TypePostsData[] = initialization,
  action: TypeRedux.TypePosts
) => {
  switch (action.type) {
    case POST_ALL:
      let copy = action.payload.postAlldata;
      return copy;
    default:
      return state;
  }
};
export default postsReducer;

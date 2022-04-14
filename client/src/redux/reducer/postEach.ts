import { POST_CONTENT_EDIT, POST_EACH } from '../action/index';
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
      data: '',
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
      return copy;
    case POST_CONTENT_EDIT:
      let { content, id } = action.payload;
      let copy_content = state.bucketlist.filter((el) => {
        return el.id === id;
      })[0];
      copy_content = { ...copy_content, content: content.key };

      //copy_content.bucketlist[id].content = content.key;
      console.log(content);
      return state; //Object.assign({}, ...state, copy_content);
    default:
      return state;
  }
};
export default postReducer;

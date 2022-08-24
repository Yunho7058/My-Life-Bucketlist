import {
  COMMENT_ALL_ADD,
  COMMENT_CONTENT_DELETE,
  COMMENT_CONTENT_EDIT,
  COMMENT_NEW_CONTENT_ADD,
  COMMENT_PROFILE_PHOTO_DOWNLOAD,
} from '../action';
import TypeRedux from './typeRedux';

const commentAll = (state: TypeRedux.TypeComment[] = [], action: any) => {
  switch (action.type) {
    case COMMENT_ALL_ADD:
      let commentAll = action.payload;

      return commentAll;
    case COMMENT_PROFILE_PHOTO_DOWNLOAD:
      let { id, url } = action.payload;

      let copy = state.map((el) => {
        return el.user_id === id ? { ...el, image_path: url } : { ...el };
      });

      return copy;

    case COMMENT_NEW_CONTENT_ADD:
      let newComment = action.payload;

      return [...state, newComment];

    case COMMENT_CONTENT_EDIT:
      let editComment = state.map((el) => {
        return el.id === action.payload.id
          ? {
              ...el,
              content: action.payload.content,
              updated_at: action.payload.updated_at,
            }
          : { ...el };
      });
      return editComment;
    case COMMENT_CONTENT_DELETE:
      let deleteComment = state.filter((el) => {
        return el.id !== action.payload.id;
      });

      return deleteComment;

    default:
      return state;
  }
};

export default commentAll;

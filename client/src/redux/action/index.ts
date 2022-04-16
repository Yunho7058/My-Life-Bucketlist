import TypeRedux from '../reducer/typeRedux';
export const IS_LOGIN = 'IS_LOGIN';
export const IS_LOGOUT = 'IS_LOGOUT';
export const POST_ALL = 'POST_ALL';
export const POST_EACH = 'POST_EACH';
export const POST_CONTENT_EDIT = 'POST_CONTENT_EDIT';
export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

export const isLogin = () => {
  return {
    type: IS_LOGIN,
  };
};

export const isLogout = () => {
  return {
    type: IS_LOGOUT,
  };
};

export const postAll = (data: TypeRedux.TypePosts) => {
  return {
    type: POST_ALL,
    payload: {
      postAlldata: data,
    },
  };
};

export const postEach = (data: TypeRedux.TypePost) => {
  return {
    type: POST_EACH,
    payload: {
      postEachData: data,
    },
  };
};

export const postContentEdit = (
  content: TypeRedux.TypeKeyString,
  id: number
) => {
  return {
    type: POST_CONTENT_EDIT,
    payload: {
      content,
      id,
    },
  };
};

export const modalOpen = (msg: string, commentId?: number) => {
  return {
    type: MODAL_OPEN,
    payload: { msg, commentId },
  };
};

export const modalClose = () => {
  return {
    type: MODAL_CLOSE,
  };
};

import TypeRedux from '../reducer/typeRedux';
export const IS_LOGIN = 'IS_LOGIN';
export const IS_LOGOUT = 'IS_LOGOUT';
export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';
export const POST_ALL = 'POST_ALL';
export const POST_EACH = 'POST_EACH';
export const POST_EACH_LIKE = 'POST_EACH_LIKE';
export const POST_EACH_BOOKMARK = 'POST_EACH_BOOKMARK';
export const POST_BUCKETLIST_EDIT = 'POST_BUCKETLIST_EDIT';
export const POST_BUCKETLIST_DELET = 'POST_BUCKETLIST_DELET';
export const POST_BUCKETLIST_NEW = 'POST_BUCKETLIST_NEW';

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

export const postEachLike = () => {
  return {
    type: POST_EACH_LIKE,
  };
};

export const postEachBookMark = () => {
  return {
    type: POST_EACH_BOOKMARK,
  };
};

export const postBucketlistEdit = (
  id: number,
  data: TypeRedux.TypeKeyString
) => {
  if (data.content) {
    return {
      type: POST_BUCKETLIST_EDIT,
      payload: {
        id,
        data,
      },
    };
  } else {
    return {
      type: POST_BUCKETLIST_EDIT,
      payload: {
        id,
        data,
      },
    };
  }
};
export const postBucketlistDelete = (id: number) => {
  return {
    type: POST_BUCKETLIST_DELET,
    payload: { id },
  };
};

export const postBucketlistNew = (
  id: number,
  content: string,
  detail: string
) => {
  return {
    type: POST_BUCKETLIST_NEW,
    payload: { id, content, detail },
  };
};

export const modalOpen = (msg: string, item?: string, id?: number) => {
  return {
    type: MODAL_OPEN,
    payload: { msg, item: item, id },
  };
};

export const modalClose = () => {
  return {
    type: MODAL_CLOSE,
  };
};

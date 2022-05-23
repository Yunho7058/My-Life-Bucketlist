import axiosInstance from '../../utils/axios';
import TypeRedux from '../reducer/typeRedux';
export const IS_DARK_MODE = 'DARK_MODE';
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
export const GET_USER_INFO = 'GET_USER_INFO';
export const POST_BUCKETLIST_POTO_UPLOAD = 'POST_BUCKETLIST_POTO_UPLOAD';
//export const POST_TEST = 'POST_TEST';
export const POST_IMG_DOWNLOAD = 'POST_IMG_DOWNLOAD';
export const POST_IMG_ORIGIN = 'POST_IMG_ORIGIN';
export const POST_ALL_ADD = 'POST_ALL_ADD';
export const USER_INFO = 'USER_INFO';

export const userInfoSave = () => {
  return {
    type: USER_INFO,
  };
};

export const postImgOrigin = (url: string, id: number) => {
  return {
    type: POST_IMG_ORIGIN,
    payload: {
      url,
      id,
    },
  };
};

export const postImgDownload = (url: string, id: number) => {
  console.log(url, '2');

  return {
    type: POST_IMG_DOWNLOAD,
    payload: {
      url,
      id,
    },
  };
};

export const darkMode = () => {
  return {
    type: IS_DARK_MODE,
  };
};

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
export const postAllAdd = (data: TypeRedux.TypePosts) => {
  return {
    type: POST_ALL_ADD,
    payload: {
      postAlldata: data,
    },
  };
};

// export const postTest = () => {
//   let data;
//   axiosInstance
//     .get(`/post`)
//     .then((res) => {
//       data = res.data;
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log(err, 'Post All err ');
//     });
//   return {
//     type: POST_TEST,
//     payload: {
//       data,
//     },
//   };
// };

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

export const postBucketlistImgUpload = (id: number, img: string) => {
  console.log(id, img);
  return {
    type: POST_BUCKETLIST_POTO_UPLOAD,
    payload: { id: id, image_path: img },
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
  detail: string,
  image_path: string
) => {
  console.log(image_path);
  return {
    type: POST_BUCKETLIST_NEW,
    payload: { id, content, detail, image_path },
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

export const getUserInfo = () => {
  return {
    type: GET_USER_INFO,
  };
};

import TypeRedux from '../reducer/typeRedux';
export const IS_LOGIN = 'IS_LOGIN';
export const IS_LOGOUT = 'IS_LOGOUT';
export const POST_ALL = 'POST_ALL';
export const GET_USERINFO = 'GET_USERINFO';

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

export const getUserInfo = (data: TypeRedux.TypeUserInfo) => {
  return {
    type: GET_USERINFO,
    payload: {
      userInfo: data,
    },
  };
};

import {
  GET_USER_INFO,
  USER_INFO_NICKNAME_EDIT,
  USER_INFO_PHOTO,
} from '../action/index';

const initialization = {};

const userInfo = (state = initialization, action: any) => {
  switch (action.type) {
    case GET_USER_INFO:
      let copy = action.payload;

      return copy;

    case USER_INFO_NICKNAME_EDIT:
      let copy_nickname = { ...state, nickname: action.payload };
      return copy_nickname;

    case USER_INFO_PHOTO:
      let copy_photo = { ...state, image_path: action.payload };
      return copy_photo;

    default:
      return state;
  }
};

export default userInfo;

import { USER_INFO } from '../action/index';

const initialization = {
  user_id: 0,
  post_id: 0,
  nickname: '',
  email: '',
  dimain: '',
  image_path: '',
};

const userInfo = (state = initialization, action: { type: string }) => {
  switch (action.type) {
    case USER_INFO:
      let copy = state;
      let getUser = window.localStorage.getItem('user');

      if (getUser) {
        const parse_user_email = JSON.parse(getUser).email,
          parse_user_id = JSON.parse(getUser).id,
          parse_post_id = Number(JSON.parse(getUser).post_id),
          parse_user_nickname = JSON.parse(getUser).nickname,
          parse_user_domain = JSON.parse(getUser).domain,
          parse_user_image_path = JSON.parse(getUser).image_path;
        copy = {
          user_id: parse_user_id,
          post_id: parse_post_id,
          nickname: parse_user_nickname,
          email: parse_user_email,
          dimain: parse_user_domain,
          image_path: parse_user_image_path,
        };

        return copy;
      }

      return copy;
    default:
      return state;
  }
};

export default userInfo;

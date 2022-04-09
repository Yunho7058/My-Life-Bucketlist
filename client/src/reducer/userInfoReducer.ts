import { GET_USERINFO } from '../action';
import TypeRedux from './typeRedux';

const initialization = {
  email: '',
  nickname: '',
  id: 0,
};

const userInfoReducer = (
  state: TypeRedux.TypeUserInfo = initialization,
  action: TypeRedux.TypeUserInfoAction
) => {
  switch (action.type) {
    case GET_USERINFO:
      let copy = action.payload.userInfo;
      return copy;
    default:
      return state;
  }
};

export default userInfoReducer;

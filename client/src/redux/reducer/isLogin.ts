import axiosInstance from '../../components/axios';
import { GET_USER_INFO, IS_LOGIN, IS_LOGOUT } from '../action';

interface TypeAction {
  type: string;
}

const isLoginReducer = (state = false, action: TypeAction): boolean => {
  switch (action.type) {
    case IS_LOGIN:
      return (state = true);
    case IS_LOGOUT:
      return (state = false);
    case GET_USER_INFO:
      console.log('실행?');
      axiosInstance
        .get(`/me`)
        .then((res) => {
          //console.log(res.data);
          window.localStorage.setItem(
            'user',
            JSON.stringify({
              id: res.data.id,
              email: res.data.email,
              nickname: res.data.nickname,
              post_id: res.data.post_id,
              domain: res.data.domain,
              image_path: res.data.image_path,
            })
            //! 읽을때 JSON.part()
          );
        })
        .catch((err) => console.log(err, '로그인 후 해당유저 정보 불러오기'));
      return state;
    default:
      return state;
  }
};

export default isLoginReducer;

import axios from 'axios';
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
          // window.localStorage.setItem(
          //   'user',
          //   JSON.stringify({
          //     id: res.data.id,
          //     email: res.data.email,
          //     nickname: res.data.nickname,
          //     post_id: res.data.post_id,
          //     domain: res.data.domain,
          //     image_path: res.data.image_path,
          //   })
          //   //! 읽을때 JSON.parse()
          //   );
          let user_id = res.data.id;
          let user_email = res.data.email;
          let user_nickname = res.data.nickname;
          let user_post_id = res.data.post_id;
          let user_domain = res.data.domain;

          axios
            .post(
              'https://p9m7fksvha.execute-api.ap-northeast-2.amazonaws.com/s3/presigned-url',
              { key: res.data.image_path }
            )
            .then((res) => {
              axios
                .get(res.data.data, { responseType: 'blob' })
                .then((res) => {
                  let url = window.URL.createObjectURL(new Blob([res.data]));
                  window.localStorage.setItem(
                    'user',
                    JSON.stringify({
                      id: user_id,
                      email: user_email,
                      nickname: user_nickname,
                      post_id: user_post_id,
                      domain: user_domain,
                      image_path: url,
                    })
                    //! 읽을때 JSON.part()
                  );
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err, '로그인 후 해당유저 정보 불러오기'));
      return state;
    default:
      return state;
  }
};

export default isLoginReducer;

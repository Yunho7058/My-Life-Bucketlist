import axios from 'axios';
import axiosInstance from '../../utils/axios';
import {
  GET_USER_INFO,
  USER_INFO,
  USER_INFO_NICKNAME_EDIT,
  USER_INFO_POTO,
} from '../action/index';

const initialization = {};

const userInfo = (state = initialization, action: any) => {
  switch (action.type) {
    case GET_USER_INFO:
      // console.log('실행');
      // axiosInstance
      //   .get(`/me`)
      //   .then((res) => {
      //     let user_id = res.data.id;
      //     let user_email = res.data.email;
      //     let user_nickname = res.data.nickname;
      //     let user_post_id = res.data.post_id;
      //     let user_domain = res.data.domain;

      //     if (res.data.image_path) {
      //       axios
      //         .post(
      //           'https://p9m7fksvha.execute-api.ap-northeast-2.amazonaws.com/s3/presigned-url',
      //           { key: res.data.image_path }
      //         )
      //         .then((res) => {
      //           axios
      //             .get(res.data.data, { responseType: 'blob' })
      //             .then((res) => {
      //               const url = window.URL.createObjectURL(
      //                 new Blob([res.data])
      //               );

      //               return {
      //                 id: user_id,
      //                 email: user_email,
      //                 nickname: user_nickname,
      //                 post_id: user_post_id,
      //                 domain: user_domain,
      //                 image_path: url,
      //               };
      //               // window.localStorage.setItem(
      //               //   'user',
      //               //   JSON.stringify({
      //               //     id: user_id,
      //               //     email: user_email,
      //               //     nickname: user_nickname,
      //               //     post_id: user_post_id,
      //               //     domain: user_domain,
      //               //     image_path: url,
      //               //   })
      //               //   //! 읽을때 JSON.part()
      //               // );

      //               //dispatch(getUserImg(url));
      //             })
      //             .catch((err) => console.log(err));
      //         })
      //         .catch((err) => console.log(err));
      //     } else {
      //       return {
      //         id: user_id,
      //         email: user_email,
      //         nickname: user_nickname,
      //         post_id: user_post_id,
      //         domain: user_domain,
      //         image_path: null,
      //       };
      //       // window.localStorage.setItem(
      //       //   'user',
      //       //   JSON.stringify({
      //       //     id: user_id,
      //       //     email: user_email,
      //       //     nickname: user_nickname,
      //       //     post_id: user_post_id,
      //       //     domain: user_domain,
      //       //     image_path: '',
      //       //   })
      //       // );
      //     }
      //   })
      //   .catch((err) => console.log(err, '로그인 후 해당유저 정보 불러오기'));
      // console.log(state);
      let copy = action.payload;

      return copy;

    case USER_INFO_NICKNAME_EDIT:
      let copy_nickname = { ...state, nickname: action.payload };
      return copy_nickname;

    case USER_INFO_POTO:
      let copy_poto = { ...state, image_path: action.payload };
      return copy_poto;
    // case USER_INFO:
    //   let copy = state;
    //   let getUser = window.localStorage.getItem('user');

    //   if (getUser) {
    //     const parse_user_email = JSON.parse(getUser).email,
    //       parse_user_id = JSON.parse(getUser).id,
    //       parse_post_id = Number(JSON.parse(getUser).post_id),
    //       parse_user_nickname = JSON.parse(getUser).nickname,
    //       parse_user_domain = JSON.parse(getUser).domain,
    //       parse_user_image_path = JSON.parse(getUser).image_path;
    //     copy = {
    //       user_id: parse_user_id,
    //       post_id: parse_post_id,
    //       nickname: parse_user_nickname,
    //       email: parse_user_email,
    //       dimain: parse_user_domain,
    //       image_path: parse_user_image_path,
    //     };

    //     return copy;
    //   }

    //   return copy;
    default:
      return state;
  }
};

export default userInfo;

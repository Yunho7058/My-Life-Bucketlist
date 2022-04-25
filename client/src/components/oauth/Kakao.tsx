import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserInfo, isLogin } from '../../redux/action';

const KakaoLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //인가코드
  let code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URI}oauth/kakao`,
        { data: code },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .then((res) => {
        //로그인 상태 변경
        //유저정보 로컬에 저장 .. 리덕스로 변경할껀지?
        let accessToken = res.data.access_token;
        window.localStorage.setItem('accessToken', accessToken);
        dispatch(isLogin());
        dispatch(getUserInfo());
        navigate('/');
      })
      .catch((err) => console.log(err, 'kakao login err'));
  }, []);
  return <>카카오 로그인</>;
};

export default KakaoLogin;

import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserInfo, isLogin } from '../../redux/action';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = new URL(window.location.href);
  const hash = url.hash;
  const code = hash.split('=')[1].split('&')[0];
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URI}oauth/google`,
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
      .catch((err) => {
        console.log(err, 'google login err');
      });
  }, []);
  return <>구글 로그인</>;
};

export default GoogleLogin;

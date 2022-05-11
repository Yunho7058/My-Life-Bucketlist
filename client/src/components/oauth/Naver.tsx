import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserInfo, isLogin } from '../../redux/action';

const NaverLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = new URL(window.location.href);
  const urlSplit = url.href.split('=');
  const code = urlSplit[1].split('&')[0];
  const state = urlSplit[2];
  console.log(state);
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URI}oauth/google`,
        { data: { code, state } },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .then((res) => {
        let accessToken = res.data.access_token;
        window.localStorage.setItem('accessToken', accessToken);
        dispatch(isLogin());
        dispatch(getUserInfo());
        navigate('/');
      })
      .catch((err) => {
        console.log(err, 'naver login err');
      });
  }, []);
  return <>네이버 로그인</>;
};

export default NaverLogin;

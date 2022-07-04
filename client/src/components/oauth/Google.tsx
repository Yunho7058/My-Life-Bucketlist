import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserInfo, isLogin } from '../../redux/action';
import Spinner from '../../utils/spinner';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = new URL(window.location.href);
  const hash = url.hash;
  const code = hash.split('=')[1].split('&')[0];
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URI}/oauth/google`,
        { token: code },
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
        navigate('/main');
      })
      .catch((err) => {
        console.log(err, 'google login err');
      });
  }, []);
  return (
    <>
      <Spinner></Spinner>
    </>
  );
};

export default GoogleLogin;

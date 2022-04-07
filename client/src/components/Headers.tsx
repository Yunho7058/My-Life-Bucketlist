//library
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//components
import { TypeRootReducer } from '../store/store';
import { HeaderBack, LoginBtn } from './style/HeadersS';
import { isLogin, isLogout } from '../action';
import axios from 'axios';

function Headers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateIsLogin = useSelector(
    (state: TypeRootReducer) => state.isLoginReducer
  );
  useEffect(() => {
    if (window.localStorage.getItem('accessToken')) {
      //redux로 이메일 유지
      dispatch(isLogin());
    }
    return;
  }, []);

  //! 로그아웃
  const handleLoginLogoutBtn = () => {
    if (stateIsLogin) {
      let accessToken = window.localStorage.getItem('accessToken');
      axios
        .get(`${process.env.REACT_APP_SERVER_URI}/logout`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          window.localStorage.removeItem('accessToken');
          dispatch(isLogout());
          navigate('/');
        })
        .catch((err) => {
          console.log(err, '로그아웃 err');
        });
    } else {
      navigate('/login');
    }
  };

  //! useEffect 더 공부해보기
  //참고 링크 https://www.rinae.dev/posts/a-complete-guide-to-useeffect-ko
  //useReducer, useCallback, useMemo 배우기
  //! 새로고침

  return (
    <HeaderBack>
      <div onClick={() => navigate('/')}>여기는 헤더,클릭시 메인페이지로</div>

      <LoginBtn
        onClick={() => {
          handleLoginLogoutBtn();
        }}
      >
        {stateIsLogin ? '로그아웃' : '로그인'}
      </LoginBtn>
    </HeaderBack>
  );
}

export default Headers;

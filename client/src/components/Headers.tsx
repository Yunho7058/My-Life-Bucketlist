//library
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//components
import { HeaderBack, LoginBtn } from './style/HeadersS';
import { isLogin } from '../action';

function Headers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.localStorage.getItem('accessToken')) {
      //redux로 이메일 유지
      dispatch(isLogin());
    }
  }, []);

  return (
    <HeaderBack>
      <div onClick={() => navigate('/')}>여기는 헤더,클릭시 메인페이지로</div>

      <LoginBtn
        onClick={() => {
          navigate('/login');
        }}
      >
        로그인
      </LoginBtn>
    </HeaderBack>
  );
}

export default Headers;

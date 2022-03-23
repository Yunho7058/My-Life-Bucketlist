//library
import styled, { keyframes } from 'styled-components';
import {
  AiFillCloseCircle,
  AiFillLock,
  AiOutlineDoubleRight,
} from 'react-icons/ai';
import { MdAlternateEmail } from 'react-icons/md';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
// 'Content-Type': 'application/x-www-form-urlencoded'

//components
import Headers from '../components/Headers';
import { isLogin } from '../action';
import * as LS from '../components/style/LoginS';

export const LoginSNSBack = styled.div`
  width: 200px;
  height: 100px;
  border: 1px solid;
`;

export const LoginSNS = styled.div``;

function Login() {
  //유저정보
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  });
  //이메일,비밀번호 검사 상태에따른 msg
  const [msg, setMsg] = useState({
    emailMsg: '\u00a0',
    passwordMsg: '\u00a0',
  });
  //input 삭제 버튼
  const [removeIcon, setRemoveIcon] = useState({
    emailIcon: false,
    passwordIcon: false,
  });
  //입력창
  const handleInput = (key: string) => (e: { target: HTMLInputElement }) => {
    setUserInfo({ ...userInfo, [key]: e.target.value.toLowerCase() });
    // console.log(userInfo);
  };
  //삭제 버튼 클릭시 input창 정보 삭제
  const handleInputRemove = (value: string) => {
    setUserInfo({ ...userInfo, [value]: '' });
  };
  //로그인 상태
  // const stateIsLogin = useSelector((state: TypeRootReducer) => {
  //   return state.isLoginReducer;
  // });
  //console.log(stateIsLogin, '로그인 성공');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //삭제 버튼 상태관리
  useEffect(() => {
    if (userInfo.username.length >= 1) {
      setRemoveIcon({ ...removeIcon, emailIcon: true });
    } else {
      setRemoveIcon({ ...removeIcon, emailIcon: false });
    }
  }, [userInfo.username]);
  useEffect(() => {
    if (userInfo.password.length >= 1) {
      setRemoveIcon({ ...removeIcon, passwordIcon: true });
    } else {
      setRemoveIcon({ ...removeIcon, passwordIcon: false });
    }
  }, [userInfo.password]);

  //로그인 요청
  const handleLogin = () => {
    if (!userInfo.username.length) {
      setMsg({ ...msg, emailMsg: '이메일을 입력해주세요.' });
    } else if (!userInfo.password.length) {
      setMsg({ ...msg, passwordMsg: '비밀번호를 입력해주세요.' });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URI}/login`,
          qs.stringify(userInfo),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
        .then((res) => {
          let accessToken = res.data.access_token;
          window.localStorage.setItem('accessToken', accessToken);
          dispatch(isLogin());
          navigate('/');
          //! setCookie(client) 와 headers(server)에 담긴 cookie 차이는?
        })
        .catch((err) => {
          console.log(err.response.data.detail);
          if (err.response.data.detail === 'email') {
            setMsg({
              ...msg,
              emailMsg: '이메일이 틀렸습니다. 다시 입력해주세요.',
            });
          } else if (err.response.data.detail === 'password') {
            setMsg({
              emailMsg: '',
              passwordMsg: '비밀번호가 틀렸습니다. 다시 입력해주세요',
            });
          } else {
            console.log(err, '로그인 err');
          }
        });
    }
  };

  return (
    <>
      <Headers></Headers>
      <LS.LoginBack>
        <LS.LoginBox>
          <LS.LoginInputBox>
            <LS.LoginInputText>아이디(email)</LS.LoginInputText>
            <div>&nbsp;</div>
            <LS.LoginInput
              type="email"
              value={userInfo.username}
              onChange={handleInput('username')}
            />
            {removeIcon.emailIcon && (
              <AiFillCloseCircle
                size={18}
                onClick={() => handleInputRemove('username')}
              />
            )}
            <LS.LoginMsg>{msg.emailMsg}</LS.LoginMsg>
            <MdAlternateEmail className="loginIcon" size={18} />
          </LS.LoginInputBox>
          <LS.LoginInputBox>
            <LS.LoginInputText>비밀번호</LS.LoginInputText>
            <div>&nbsp;</div>
            <LS.LoginInput
              type="password"
              value={userInfo.password}
              onChange={handleInput('password')}
            />
            {removeIcon.passwordIcon && (
              <AiFillCloseCircle
                size={18}
                onClick={() => handleInputRemove('password')}
              />
            )}
            <LS.LoginMsg>{msg.passwordMsg}</LS.LoginMsg>
            <AiFillLock className="loginIcon" size={18} />
          </LS.LoginInputBox>
          <LS.LoginBtn onClick={() => handleLogin()}>로그인</LS.LoginBtn>
          비밀번호 찾기
          <LS.LoginLine>or</LS.LoginLine>
          <LoginSNSBack>
            SNS 로그인
            <LoginSNS></LoginSNS>
            <LoginSNS></LoginSNS>
          </LoginSNSBack>
        </LS.LoginBox>
        <LS.LoginSignupBtn
          onClick={() => {
            navigate('/signup');
          }}
        >
          회원가입
          <AiOutlineDoubleRight size={23} />
        </LS.LoginSignupBtn>
      </LS.LoginBack>
    </>
  );
}

export default Login;

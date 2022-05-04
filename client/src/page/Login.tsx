//library
import styled from 'styled-components';
import {
  AiFillCloseCircle,
  AiFillLock,
  AiOutlineDoubleRight,
} from 'react-icons/ai';
import { MdAlternateEmail } from 'react-icons/md';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
// 'Content-Type': 'application/x-www-form-urlencoded'

//components
import Headers from '../components/Headers';
import { getUserInfo, isLogin } from '../redux/action';
import * as LS from './style/LoginS';
import axiosInstance from '../components/axios';
import Modal from '../components/Modal';

export const LoginSNSBack = styled.div`
  width: 100%;
  padding: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const LoginSNS = styled.div`
  border: 1px solid;
  height: 60px;
  width: 60px;
  text-align: center;
  cursor: pointer;
`;

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
    usernamelIcon: false,
    passwordIcon: false,
  });
  //입력창
  const handleInput = (key: string) => (e: { target: HTMLInputElement }) => {
    setUserInfo({ ...userInfo, [key]: e.target.value.toLowerCase() });
    //console.log(key);

    //input 창 삭제 아이콘 관리
    if (e.target.value.length >= 1) {
      if (key === 'username') {
        setRemoveIcon({ ...removeIcon, usernamelIcon: true });
      } else {
        setRemoveIcon({ ...removeIcon, passwordIcon: true });
      }
    } else {
      if (key === 'username') {
        setRemoveIcon({ ...removeIcon, usernamelIcon: false });
      } else {
        setRemoveIcon({ ...removeIcon, passwordIcon: false });
      }
    }
  };
  //삭제 버튼 클릭시 input창 정보 삭제
  const handleInputRemove = (value: string) => {
    setUserInfo({ ...userInfo, [value]: '' });
    if (value === 'username') {
      setRemoveIcon({ ...removeIcon, usernamelIcon: false });
    } else {
      setRemoveIcon({ ...removeIcon, passwordIcon: false });
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          //handleGetUserinfo();
          dispatch(getUserInfo());
          navigate('/');
          //! setCookie(client) 와 headers(server)에 담긴 cookie 차이는?
        })
        .catch((err) => {
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
  //유저정보 저장
  // const handleGetUserinfo = () => {
  //   //let accessToken = window.localStorage.getItem('accessToken');
  //   axiosInstance
  //     .get(`/me`)
  //     .then((res) => {
  //       window.localStorage.setItem(
  //         'user',
  //         JSON.stringify({
  //           id: res.data.id,
  //           email: res.data.email,
  //           nickname: res.data.nickname,
  //           post_id: res.data.post_id,
  //         })
  //         //! 읽을때 JSON.part()
  //       );
  //     })
  //     .catch((err) => console.log(err, '로그인 후 해당유저 정보 불러오기'));
  // };

  const enterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      return handleLogin();
    }
  };

  //구글 로그인
  const handleGoogleLogin = () => {
    window.location.assign(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email`
    );
  };
  //카카오 로그인
  const handleKakaoLogin = () => {
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`
    );
  };
  //네이버 로그인
  const handleNaverLogin = () => {
    window.location.assign(
      `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=${process.env.REACT_APP_NAVER_CLIENT_STATE}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}`
    );
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
              onKeyPress={enterKey}
            />
            {removeIcon.usernamelIcon && (
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
              onKeyPress={enterKey}
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
            <LoginSNS
              onClick={() => {
                handleKakaoLogin();
              }}
            >
              카카오
            </LoginSNS>
            <LoginSNS
              onClick={() => {
                handleGoogleLogin();
              }}
            >
              구글
            </LoginSNS>
            <LoginSNS
              onClick={() => {
                handleNaverLogin();
              }}
            >
              네이버
            </LoginSNS>
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

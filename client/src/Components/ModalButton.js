'use strict';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

import Login from '../Page/Login';
import Signup from '../Page/Signup';
import axios from 'axios';

const LoginBtn = styled.button`
  color: green;
`;

function ModalButton() {
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isSignupModal, setIsSignupModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const loginClick = () => {
    setIsLoginModal(!isLoginModal);
  };
  const signupClick = () => {
    setIsLoginModal(false);
    setIsSignupModal(!isSignupModal);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    axios
      .get('url', {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        setIsLogin(true);
      })
      .catch((err) => {
        setIsLogin(false);
        console.log(err, '로그인 새로고침 err');
      });
  }, []);

  const handleLogoutClick = () => {
    axios
      .get('url', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        localStorage.clear();
        setIsLogin(false);
      })
      .catch((err) => {
        console.log(err, '로그아웃 err');
      });
  };

  return (
    <div>
      {isLogin ? (
        <button onClick={handleLogoutClick}>로그아웃</button>
      ) : (
        <LoginBtn onClick={loginClick}>로그인</LoginBtn>
      )}
      {isLoginModal ? (
        <Login
          loginClick={loginClick}
          signupClick={signupClick}
          setIsLogin={setIsLogin}
          setIsSignupModal={setIsSignupModal}
        />
      ) : null}
      {isSignupModal ? (
        <Signup
          signupClick={signupClick}
          setIsLoginModal={setIsLoginModal}
          setIsSignupModal={setIsSignupModal}
        />
      ) : null}
    </div>
  );
}

export default ModalButton;

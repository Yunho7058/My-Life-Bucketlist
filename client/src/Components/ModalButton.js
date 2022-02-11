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
    const accessToken = localStorage.getItem('access');
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    if (localStorage.getItem('accToken')) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  // useEffect(() => {
  //   const url = new URL(window.location.href);
  //   const authorizationCode = url.searchParams.get('code');
  //   if (authorizationCode) {
  //     setIsLoading(true);
  //     getAccessToken(authorizationCode);
  //   } else {
  //     issueTokens();
  //   })

  const handleLogoutClick = () => {
    localStorage.clear();
    setIsLogin(false);
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
          setIsLoginModal={setIsLoginModal}
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

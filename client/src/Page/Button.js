'use strict';
import styled from 'styled-components';
import { useState } from 'react';
import Login from './Login';
const LoginBtn = styled.button`
  color: green;
`;

function LoginButton() {
  const [isLoginModal, setIsLoginModal] = useState(false);
  const loginClick = () => {
    setIsLoginModal(!isLoginModal);
  };

  return (
    <div>
      <LoginBtn onClick={loginClick}>로그인</LoginBtn>
      {isLoginModal ? <Login loginClick={loginClick} /> : null}
    </div>
  );
}

export default LoginButton;

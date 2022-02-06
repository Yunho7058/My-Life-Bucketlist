'use strict';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const LoginBack = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;
  place-items: center;
`;

const LoginView = styled.div`
  background-color: white;
  border-radius: 3px;
  width: 400px;
  height: 500px;
  text-align: center;
`;

const LoginInput = styled.input`
  width: 80%;
  height: 30px;
  margin: 5px;
`;

const Btn = styled.button``;

const ErrMsg = styled.div`
  color: red;
`;

const ClossBtn = styled.span`
  cursor: pointer;
  margin: 10px;
`;

function Login(props) {
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
  });

  const handleLoginBtnClick = () => {
    if (!(loginInfo.username, loginInfo.password)) {
      return setErrMsg('아이디와 비밀번호를 입력 해주세요.');
    } else {
      axios
        .post('http://127.0.0.1:8000/api/token/', loginInfo, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        .then((res) => {
          // 1. 로컬스토리지에 토큰 저장(왜 토큰을 저장할까???)
          localStorage.setItem('accToken', res.data.access);
          // 2. 모달 창 꺼지고
          props.setIsSignupModal(false);
          // 3. 로그인 상태로 변경
          props.setIsLogin(true);
        })
        .catch((err) => {
          setErrMsg('아이디 또는 비밀번호과 틀립니다.');
          console.log(err, '로그인 err');
        });
    }
  };

  const [errmsg, setErrMsg] = useState('');

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value.toLowerCase() });
    console.log(loginInfo);
  };

  const enterKey = (e) => {
    if (e.key === 'Enter') return handleLoginBtnClick();
  };

  return (
    <LoginBack onClick={props.loginClick}>
      <LoginView onClick={(e) => e.stopPropagation()}>
        로그인
        <ClossBtn onClick={props.loginClick}>&times;</ClossBtn>
        <div>
          <LoginInput
            type="id"
            onChange={handleInputValue('username')}
            onKeyPress={enterKey}
            placeholder="아디를 입력하세요."
          ></LoginInput>
          <LoginInput
            type="password"
            onChange={handleInputValue('password')}
            onKeyPress={enterKey}
            placeholder="비밀번호를 입력하세요."
          ></LoginInput>
        </div>
        <ErrMsg>{errmsg}</ErrMsg>
        <Btn onClick={handleLoginBtnClick}>로그인</Btn>
        <Btn onClick={props.signupClick}>회원가입</Btn>
        <div>
          <Btn>카카오톡으로 로그인</Btn>
        </div>
        <div>
          <Btn>비밀번호찾기</Btn>
        </div>
      </LoginView>
    </LoginBack>
  );
}

export default Login;

'use strict';
import styled from 'styled-components';

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

function Login(props) {
  return (
    <LoginBack onClick={props.loginClick}>
      <LoginView onClick={(e) => e.stopPropagation()}>
        로그인
        <div>
          <LoginInput type="id" placeholder="아디를 입력하세요."></LoginInput>
          <LoginInput
            type="password"
            placeholder="비밀번호를 입력하세요."
          ></LoginInput>
        </div>
        <Btn>로그인</Btn>
        <Btn>회원가입</Btn>
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

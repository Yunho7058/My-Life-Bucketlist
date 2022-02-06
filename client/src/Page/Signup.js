'use strict';
import axios from 'axios';
import { useState } from 'react/cjs/react.development';
import styled from 'styled-components';

const SignupBack = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 990;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;
  place-items: center;
`;

const SignupView = styled.div`
  background-color: white;
  border-radius: 3px;
  width: 400px;
  height: 500px;
  text-align: center;
`;

const SignupInput = styled.input`
  width: 80%;
  height: 30px;
  margin: 5px;
`;

const ClossBtn = styled.span`
  cursor: pointer;
  margin: 10px;
`;

const SuccessSignupBack = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 990;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;
  place-items: center;
`;

const SuccessSignupView = styled.div`
  background-color: white;
  border-radius: 3px;
  width: 220px;
  height: 100px;
  text-align: center;
`;

function Signup(props) {
  const [signupInfo, setSignupInfo] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    name: '',
  });
  const [msg, setMsg] = useState({
    msgId: '',
    msgPassword: '',
    msgPasswordC: '',
    msgEmail: '',
    msgName: '',
    msgSignup: '',
  });
  const [check, setCheck] = useState({
    checkId: false,
    checkPassword: false,
    checkEmail: false,
    checkName: false,
  });
  const [isSuccessSignup, setIsSuccessSignup] = useState(false);

  const inputValueId = (key) => (e) => {
    const { value } = e.target;
    const only = value.replace(
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,
      ''
    );
    if (only.length < 4) {
      setMsg({ ...msg, msgId: '4글자 이상 입력해 주세요' });
      setCheck({ ...check, checkId: false });
    } else {
      setMsg({ ...msg, msgId: '사용할 수 있는 아이디 입니다.' });
      setCheck({ ...check, checkId: true });
    }
    setSignupInfo({ ...signupInfo, [key]: only });
  };

  const inputValuePassword = (key) => (e) => {
    const { value } = e.target;
    if (signupInfo.passwordConfirm.length === 0 && value.length === 0) {
      setMsg({ ...msg, msgPasswordC: '' });
    } else if (value.length < 8) {
      setMsg({ ...msg, msgPassword: '8글자 이상 입력해 주세요.' });
    } else if (value.length >= 8) {
      setMsg({ ...msg, msgPassword: '사용할 수 있는 비밀번호 입니다.' });
    }

    setSignupInfo({ ...signupInfo, [key]: value });
  };

  const inputValuePasswordC = (key) => (e) => {
    const { value } = e.target;
    if (signupInfo.password.length === 0 && value.length === 0) {
      setMsg({ ...msg, msgPasswordC: '' });
      setCheck({ ...check, checkPassword: false });
    } else if (
      (signupInfo.password !== value && signupInfo.passwordConfirm !== value) ||
      value.length === 0
    ) {
      setMsg({ ...msg, msgPasswordC: '비밀번호를 확인해주세요.' });
      setCheck({ ...check, checkPassword: false });
    } else if (
      signupInfo.password === value ||
      signupInfo.passwordConfirm === value
    ) {
      setMsg({ ...msg, msgPasswordC: '비밀번호가 일치합니다.' });
      setCheck({ ...check, checkPassword: true });
    }
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  const inputValueEmail = (key) => (e) => {
    const { value } = e.target;
    const emailReplace =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (emailReplace.test(value)) {
      setMsg({ ...msg, msgEmail: '사용할 수 있는 이메일입니다.' });
      setCheck({ ...check, checkEmail: true });
    } else {
      setMsg({ ...msg, msgEmail: '올바른 이메일 형식이 아닙니다.' });
      setCheck({ ...check, checkEmail: false });
    }
    setSignupInfo({ ...signupInfo, [key]: value });
  };

  const inputValueName = (key) => (e) => {
    const { value } = e.target;
    const only = value.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z]/g, '');
    setSignupInfo({ ...signupInfo, [key]: only });
    if (only.length < 2) {
      setMsg({ ...msg, msgName: '두글자 이상 입력해주세요' });
      setCheck({ ...check, checkName: false });
    } else {
      setMsg({ ...msg, msgName: '' });
      setCheck({ ...check, checkName: true });
    }
  };

  const hadleSignupClick = () => {
    if (
      check.checkId &&
      check.checkName &&
      check.checkPassword &&
      check.checkEmail
    ) {
      setMsg({ ...msg, msgSignup: '' });
      axios
        .post('url', signupInfo, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        .then((res) => {
          //1. 회원가입 완료 모달 실행

          setIsSuccessSignup(true);
          setMsg({ ...msg, msgSignup: '회원가입이 되었습니다.' });
          //2. 확인 버튼 누르면 로그인 모달로 이동
        })
        .catch((err) => {
          setMsg({ ...msg, msgSignup: '잘못된 요청입니다.' });
          console.log(err, '회원가입 err');
        });
    } else {
      setMsg({ ...msg, msgSignup: '모든 정보를 입력해주세요.' });
    }
  };

  const openSuccessSignupModal = () => {
    setIsSuccessSignup(false);

    props.setIsSignupModal(false);
    props.setIsLoginModal(true);
  };

  return (
    <div>
      <SignupBack onClick={props.signupClick}>
        <SignupView onClick={(e) => e.stopPropagation()}>
          <div>회원가입</div>
          <ClossBtn onClick={props.signupClick}>&times;</ClossBtn>
          <SignupInput
            type="id"
            value={signupInfo.username}
            placeholder="아이디를 입력해주세요."
            onChange={inputValueId('username')}
          />
          <div>{msg.msgId}</div>
          <SignupInput
            type="password"
            value={signupInfo.password}
            placeholder="비밀번호를 입력해주세요."
            onChange={inputValuePassword('password')}
          />
          <div>{msg.msgPassword}</div>
          <SignupInput
            type="password"
            value={signupInfo.passwordConfirm}
            placeholder="비밀번호를 재입력해주세요."
            onChange={inputValuePasswordC('passwordConfirm')}
          />
          <div>{msg.msgPasswordC}</div>
          <SignupInput
            placeholder="이메일을 입력해주세요."
            type="email"
            value={signupInfo.email}
            onChange={inputValueEmail('email')}
          />
          <div>{msg.msgEmail}</div>
          <SignupInput
            placeholder="이름을 입력해주세요."
            type="text"
            value={signupInfo.name}
            onChange={inputValueName('name')}
          />
          <div>{msg.msgName}</div>
          <div>{msg.msgSignup}</div>
          <button onClick={hadleSignupClick}>회원가입</button>
        </SignupView>
      </SignupBack>
      {isSuccessSignup ? (
        <SuccessSignupBack>
          <SuccessSignupView>
            <div>{msg.msgSignup}</div>
            <button onClick={openSuccessSignupModal}>확인</button>
          </SuccessSignupView>
        </SuccessSignupBack>
      ) : null}
    </div>
  );
}

export default Signup;

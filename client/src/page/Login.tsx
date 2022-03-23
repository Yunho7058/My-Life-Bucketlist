//library
import styled from 'styled-components';
import { AiFillCloseCircle, AiFillLock } from 'react-icons/ai';
import { MdAlternateEmail } from 'react-icons/md';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
// 'Content-Type': 'application/x-www-form-urlencoded'

//components
import Headers from '../components/Headers';
import { TypeRootReducer } from '../store/store';
import { isLogin } from '../action';

export const LoginBack = styled.div`
  background-color: ${({ theme }) => theme.mode.background1};
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginBox = styled.div`
  background-color: ${({ theme }) => theme.mode.background2};
  box-shadow: 0px 0px 1px 1px ${({ theme }) => theme.mode.borderBox};
  width: 300px;
  height: 380px;
  margin-top: 80px;
  border-radius: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
export const LoginInputBox = styled.div`
  text-align: center;
  position: relative;
  > svg {
    top: 35px;
    right: 8px;
    position: absolute;
    cursor: pointer;
  }
  > svg.loginIcon {
    left: 5px;
  }
`;

export const LoginInput = styled.input`
  width: 220px;
  height: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #696969;
  padding-left: 30px;
  padding-right: 30px;

  background-color: ${({ theme }) => theme.mode.BGInput};
  color: ${({ theme }) => theme.mode.FCInput};
  outline: none;
  &:hover {
    border: 1px solid rgb(100, 100, 255);
  }
  &:focus {
    border: 1px solid #4169e1;
    background-color: ${({ theme }) => theme.mode.background2};
  }
`;

export const LoginInputText = styled.div`
  position: absolute;
  left: -2px;
  top: 3px;
`;
export const LoginBtn = styled.div`
  width: 280px;
  height: 45px;
  border: 1px solid;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  line-height: 45px;
  color: #a9a9a9;
  &:hover {
    color: ${({ theme }) => theme.mode.primaryText};
    background-color: rgba(112, 128, 144, 0.5);
  }
`;

export const LoginSNSBack = styled.div`
  width: 200px;
  height: 100px;
  border: 1px solid;
`;
export const LoginMsg = styled.div`
  font-size: 12px;
  color: #fa8072;
`;

export const LoginSNS = styled.div``;

export const LoginLine = styled.div`
  display: flex;
  font-size: 15px;
  align-items: center;
  margin: 8px 0px;
  color: ${({ theme }) => theme.mode.loginLine};
  ::before {
    content: '';
    width: 130px;
    flex-grow: 1;
    background-color: ${({ theme }) => theme.mode.loginLine};
    height: 1px;
    line-height: 0px;
    margin: 0px 16px;
  }
  ::after {
    content: '';
    width: 130px;
    flex-grow: 1;
    background-color: ${({ theme }) => theme.mode.loginLine};
    height: 1px;
    line-height: 0px;
    margin: 0px 16px;
  }
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
  const stateIsLogin = useSelector((state: TypeRootReducer) => {
    return state.isLoginReducer;
  });
  //console.log(stateIsLogin, '로그인 성공');
  const dispatch = useDispatch();

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

  //로그인 버튼 클릭시 server로 로그인 요청
  const handleLogin = () => {
    if (!userInfo.username.length) {
      setMsg({ ...msg, emailMsg: '이메일을 입력해주세요.' });
    } else if (!userInfo.password.length) {
      setMsg({ ...msg, passwordMsg: '비밀번호를 입력해주세요.' });
    } else {
      //${process.env.REACT_APP_SERVER_URI}
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
          //accessToken 은 localStorage 에
          let accessToken = res.data.access_token;
          window.localStorage.setItem('accessToken', accessToken);
          dispatch(isLogin());
          //refreshToken 은 쿠키로 관리
          //! setCookie(client) 와 headers(server)에 담긴 cookie 차이는?
          //로그인 상태 redux로 관리
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
      <LoginBack>
        <LoginBox>
          <LoginInputBox>
            <LoginInputText>아이디(email)</LoginInputText>
            <div>&nbsp;</div>
            <LoginInput
              type="email"
              value={userInfo.username}
              onChange={handleInput('username')}
            />
            {removeIcon.emailIcon && (
              <AiFillCloseCircle
                size={18}
                onClick={() => handleInputRemove('email')}
              />
            )}
            <LoginMsg>{msg.emailMsg}</LoginMsg>
            <MdAlternateEmail className="loginIcon" size={18} />
          </LoginInputBox>
          <LoginInputBox>
            <LoginInputText>비밀번호</LoginInputText>
            <div>&nbsp;</div>
            <LoginInput
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
            <LoginMsg>{msg.passwordMsg}</LoginMsg>
            <AiFillLock className="loginIcon" size={18} />
          </LoginInputBox>
          <LoginBtn onClick={() => handleLogin()}>로그인</LoginBtn>
          비밀번호 찾기
          <LoginLine>or</LoginLine>
          <LoginSNSBack>
            SNS 로그인
            <LoginSNS></LoginSNS>
            <LoginSNS></LoginSNS>
          </LoginSNSBack>
        </LoginBox>
        회원가입
      </LoginBack>
    </>
  );
}

export default Login;

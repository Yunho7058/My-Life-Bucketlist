import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  MdAlternateEmail,
  MdMarkEmailRead,
  MdTimer,
  MdLock,
} from 'react-icons/md';
import { FaUserTag } from 'react-icons/fa';
import axios from 'axios';
//
import Headers from '../components/Headers';
import { Terms_2 } from '../components/terms/Terms_2';
import { Terms_1 } from '../components/terms/Terms_1';
import * as SS from './style/SignupS';
import axiosInstance from '../components/axios';
import Modal from '../components/Modal';

function Signup() {
  const [isPage, setIsPage] = useState({
    isPageOne: true,
    isPageTwo: false,
    isPageThree: false,
    isPageFour: false,
    isPageFive: false,
  });
  const [signupInfo, setSignupInfo] = useState({
    email: '',
    emailCode: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });
  const [validityCheck, setValidityCheck] = useState({
    msgEmail: '이메일을 입력해주세요.',
    isEmail: false,
    isEmailCode: false,
    msgPassword: '',
    isPassword: false,
    msgPasswordConfirm: '',
    isPasswordConfirm: false,
    isNickname: false,
    msgNickname: '',
    isTerms: false,
    msgTerms: '',
  });

  //! 다음으로 버튼
  const next = () => {
    if (isPage.isPageOne) {
      setIsPage({ ...isPage, isPageOne: false, isPageTwo: true });
    } else if (isPage.isPageTwo) {
      setIsPage({ ...isPage, isPageTwo: false, isPageThree: true });
    } else if (isPage.isPageThree) {
      setIsPage({ ...isPage, isPageThree: false, isPageFour: true });
    } else if (isPage.isPageFour) {
      setIsPage({ ...isPage, isPageFour: false, isPageFive: true });
    } else if (isPage.isPageFive) {
      setIsPage({ ...isPage, isPageFive: false, isPageOne: true });
    }
  };

  //! 약관동의 체크박스
  const handleTermsCheck = () => {
    setValidityCheck({ ...validityCheck, isTerms: !validityCheck.isTerms });
  };

  //! input 입력 이벤트
  const handleInput = (key: string) => (e: { target: HTMLInputElement }) => {
    console.log(e.target.id);

    if (e.target.id === 'password') {
      const passwordReplace =
        /^.*(?=.{8,})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]).*$/;
      if (passwordReplace.test(e.target.value)) {
        setValidityCheck({
          ...validityCheck,
          msgPassword: '사용가능한 비밀번호입니다.',
          isPassword: true,
        });
        setSignupInfo({ ...signupInfo, [key]: e.target.value });
      } else {
        setValidityCheck({
          ...validityCheck,
          msgPassword: '특수문자,숫자를 포함하여 8글자 이상 작성해주세요.',
          isPassword: false,
        });
        setSignupInfo({ ...signupInfo, [key]: e.target.value });
      }
    } else if (e.target.id === 'passwordConfirm') {
      if (e.target.value === signupInfo.password) {
        setValidityCheck({
          ...validityCheck,
          msgPasswordConfirm: '비밀번호가 일치합니다.',

          isPasswordConfirm: true,
        });
        setSignupInfo({ ...signupInfo, [key]: e.target.value });
      } else {
        setValidityCheck({
          ...validityCheck,
          msgPasswordConfirm:
            '비밀번호가 틀립니다. 비밀번호를 다시 확인해주세요.',
          isPasswordConfirm: false,
        });
        setSignupInfo({ ...signupInfo, [key]: e.target.value });
      }
    } else {
      setSignupInfo({ ...signupInfo, [key]: e.target.value });
    }
    console.log(signupInfo);
  };

  //! 이메일 중복 체크 및 해당유저 이메일로 코드 발송(server)
  const handleEmailCheck = () => {
    if (signupInfo.email.length < 1) {
      setValidityCheck({
        ...validityCheck,
        msgEmail: `이메일을 입력해주세요.`,
        isEmail: false,
      });
    } else {
      axiosInstance
        .post(`/email`, { email: signupInfo.email })
        .then((res) => {
          setValidityCheck({
            ...validityCheck,
            msgEmail: `입력하신 이메일로 인증번호가 전송되었습니다.`,
            isEmail: false,
            isEmailCode: true,
          });
          setSeconds(59);
          setMinutes(2);
        })
        .catch((err) => {
          setValidityCheck({
            ...validityCheck,
            msgEmail: `중복된 이메일 또는 없는 이메일입니다.`,
            isEmail: false,
          });
          console.log(err, 'emailcheck err');
        });
    }
  };
  //! 이메일 인증코드 server로 전송(server에서 코드 비교)
  const handleEmailCodeCheck = () => {
    if (signupInfo.emailCode.length < 1) {
      setValidityCheck({
        ...validityCheck,
        msgEmail: `이메일 인증번호를 입력해주세요. `,

        isEmail: false,
      });
    } else {
      console.log(signupInfo.emailCode);
      axiosInstance
        .post(`/email/code`, { code: signupInfo.emailCode })
        .then((res) => {
          setValidityCheck({
            ...validityCheck,
            msgEmail: `인증이 완료되었습니다. 다음 단계로 넘어가세요.`,
            isEmail: true,
          });
        })
        .catch((err) => {
          setValidityCheck({
            ...validityCheck,
            msgEmail: `인증번호가 틀립니다. 다시 확인해주세요.`,
            isEmail: false,
          });
          console.log(err, 'emailCode err');
        });
    }
  };
  const navigate = useNavigate();
  //!확인 버튼 클릭시 step별 함수
  const handleSignupStepSuccess = (inputValue: string) => {
    switch (inputValue) {
      case 'terms':
        if (validityCheck.isTerms) {
          next();
        } else {
          setValidityCheck({
            ...validityCheck,
            msgTerms: `이용약관 및 개인정보 동의를 해주세요.`,
            isTerms: false,
          });
        }
        return;
      case 'email':
        if (validityCheck.isEmail) {
          next();
        } else if (!validityCheck.isEmail) {
          setValidityCheck({
            ...validityCheck,
            msgEmail: `입력창을 확인해주세요.`,
            isEmail: false,
          });
        }
        return;
      case 'password':
        if (
          validityCheck.isPassword &&
          validityCheck.isPasswordConfirm &&
          signupInfo.password === signupInfo.passwordConfirm
        ) {
          next();
        } else if (!validityCheck.isPasswordConfirm) {
          setValidityCheck({
            ...validityCheck,
            msgPasswordConfirm: '비밀번호를 확인해주세요.',
            isPasswordConfirm: false,
          });
        } else {
          setValidityCheck({
            ...validityCheck,
            msgPassword: '비밀번호를 확인해주세요.',
            isPassword: false,
            msgPasswordConfirm: '비밀번호를 확인해주세요.',
            isPasswordConfirm: false,
          });
        }
        return;
      case 'nickname':
        if (validityCheck.isNickname) {
          //! 회원가입 모든 정보 서버로 보내기(마지막 단계)
          axiosInstance
            .post(`/signup`, {
              email: signupInfo.email,
              password: signupInfo.password,
              nickname: signupInfo.nickname,
            })
            .then((res) => {
              next();
            })
            .catch((err) => {
              console.log(err, '회원가입 회원정보 보내기 err');
            });
        } else if (!validityCheck.isNickname) {
          setValidityCheck({
            ...validityCheck,
            msgNickname: `입력창 및  닉네임 중복체크를 완료해주세요.`,
            isNickname: false,
          });
        }
        return;
      case 'signupMoveLogin':
        navigate('/login');
    }
    return;
  };
  //이메일 인증코드 타이머
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (validityCheck.isEmailCode) {
      const countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(countdown);
            setValidityCheck({
              ...validityCheck,
              msgEmail: `인증번호 기간이 만료되었습니다. 인증을 재요청해주세요.`,
              isEmail: false,
            });
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [minutes, seconds]);
  //! 닉네임 중복 확인
  const handleNicknameCheck = () => {
    if (signupInfo.nickname.length < 1) {
      setValidityCheck({
        ...validityCheck,
        msgNickname: '닉네임을 입력해주세요.',
        isNickname: false,
      });
    } else {
      axiosInstance
        .post(`/nickname`, {
          nickname: signupInfo.nickname,
        })
        .then((res) => {
          setValidityCheck({
            ...validityCheck,
            msgNickname: '사용 가능한 닉네임입니다.',
            isNickname: true,
          });
        })
        .catch((err) => {
          setValidityCheck({
            ...validityCheck,
            msgNickname: '중복된 닉네임입니다.',
            isNickname: false,
          });
          console.log(err, 'nickname check err');
        });
    }
  };

  return (
    <>
      <Headers></Headers>
      <SS.SignupBack>
        <SS.SignupAnyBack>
          <SS.StepIcon
            className={`${isPage.isPageOne ? 'current' : 'after'}`}
          ></SS.StepIcon>
          <SS.StepIcon
            className={`${
              isPage.isPageTwo
                ? 'current'
                : isPage.isPageThree
                ? 'after'
                : isPage.isPageFour
                ? 'after'
                : isPage.isPageFive
                ? 'after'
                : ''
            }`}
          ></SS.StepIcon>
          <SS.StepIcon
            className={`${
              isPage.isPageThree
                ? 'current'
                : isPage.isPageFour
                ? 'after'
                : isPage.isPageFour
                ? 'after'
                : isPage.isPageFive
                ? 'after'
                : ''
            }`}
          ></SS.StepIcon>
          <SS.StepIcon
            className={`${
              isPage.isPageFour ? 'current' : isPage.isPageFive ? 'after' : ''
            }`}
          ></SS.StepIcon>
          <SS.StepIcon
            className={`${isPage.isPageFive ? 'current' : ''}`}
          ></SS.StepIcon>
        </SS.SignupAnyBack>
        <SS.SignupBox className={`${isPage.isPageOne ? 'terms' : ''}`}>
          {/* 1페이지 소개 및 이용약관 */}
          {isPage.isPageOne && (
            <SS.SignupStepBox>
              <SS.TermsTitle>
                서비스 이용약관 동의<span> (필수)</span>
              </SS.TermsTitle>
              <SS.TermsBox>
                <Terms_1 />
              </SS.TermsBox>
              <SS.TermsTitle>
                개인정보 수집 및 이용 동의<span> (필수)</span>
              </SS.TermsTitle>
              <SS.TermsBox>
                <Terms_2 />
              </SS.TermsBox>
              <SS.SignupMsg
                className="terms"
                color={validityCheck.isEmail ? '	#90EE90' : '#fa8072'}
              >
                {validityCheck.msgTerms}
              </SS.SignupMsg>
              <SS.TermsAll>
                전체동의
                <SS.TermsCheckBox
                  type="checkbox"
                  onChange={() => handleTermsCheck()}
                />
              </SS.TermsAll>
              <SS.SignupNextBtn
                onClick={() => {
                  handleSignupStepSuccess('terms');
                }}
              >
                확인
              </SS.SignupNextBtn>
            </SS.SignupStepBox>
          )}
          {/* 2페이지 이메일 인증 및 등록 */}
          {isPage.isPageTwo && (
            <SS.SignupStepBox>
              <SS.SignupInputdev>
                <SS.SignupInputBox>
                  <SS.SignupInputLabal>이메일</SS.SignupInputLabal>
                  <SS.SignupInput
                    type="email"
                    value={signupInfo.email}
                    id="email"
                    onChange={handleInput('email')}
                  />
                  <MdAlternateEmail size={20} />
                </SS.SignupInputBox>

                <SS.SignupEmailCheckBtn onClick={() => handleEmailCheck()}>
                  이메일 인증요청
                </SS.SignupEmailCheckBtn>
                <SS.SignupInputBox>
                  <SS.SignupInputLabal>인증번호</SS.SignupInputLabal>
                  <SS.SignupInput
                    className="code"
                    value={signupInfo.emailCode}
                    type="text"
                    id="emailCode"
                    onChange={handleInput('emailCode')}
                  />
                  <MdMarkEmailRead size={20} />
                  <SS.TimerBox>
                    <MdTimer />
                    <>
                      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </>
                  </SS.TimerBox>
                </SS.SignupInputBox>
                <SS.SignupEmailCheckBtn
                  className="codeCheckBtn"
                  onClick={() => handleEmailCodeCheck()}
                >
                  인증번호 확인
                </SS.SignupEmailCheckBtn>
              </SS.SignupInputdev>
              <SS.SignupMsg
                color={validityCheck.isEmail ? '	#90EE90' : '#fa8072'}
              >
                {validityCheck.msgEmail}
              </SS.SignupMsg>
              <SS.SignupNextBtn
                onClick={() => {
                  handleSignupStepSuccess('email');
                }}
              >
                확인
              </SS.SignupNextBtn>
            </SS.SignupStepBox>
          )}
          {/* 3페이지 비밀번호 등록 */}
          {isPage.isPageThree && (
            <SS.SignupStepBox>
              <SS.SignupInputdev>
                <SS.SignupInputBox>
                  <div>
                    <SS.SignupInputLabal>비밀번호</SS.SignupInputLabal>
                    <SS.SignupInput
                      type="password"
                      id="password"
                      value={signupInfo.password}
                      onChange={handleInput('password')}
                    ></SS.SignupInput>
                  </div>
                  <MdLock size={20} />
                  <SS.SignupMsg
                    className="password"
                    color={validityCheck.isPassword ? '	#90EE90' : '#fa8072'}
                  >
                    {validityCheck.msgPassword}
                  </SS.SignupMsg>
                </SS.SignupInputBox>
                <SS.SignupInputBox>
                  <SS.SignupInputLabal>비밀번호 재확인</SS.SignupInputLabal>
                  <SS.SignupInput
                    type="password"
                    id="passwordConfirm"
                    value={signupInfo.passwordConfirm}
                    onChange={handleInput('passwordConfirm')}
                  ></SS.SignupInput>
                  <MdLock size={20} />
                  <SS.SignupMsg
                    className="passwordConfirm"
                    color={
                      validityCheck.isPasswordConfirm ? '	#90EE90' : '#fa8072'
                    }
                  >
                    {validityCheck.msgPasswordConfirm}
                  </SS.SignupMsg>
                </SS.SignupInputBox>
              </SS.SignupInputdev>
              <SS.SignupNextBtn
                onClick={() => {
                  handleSignupStepSuccess('password');
                }}
              >
                확인
              </SS.SignupNextBtn>
            </SS.SignupStepBox>
          )}
          {/* 4페이지 닉네임 등록 */}
          {isPage.isPageFour && (
            <SS.SignupStepBox>
              <SS.SignupInputdev>
                <SS.SignupInputBox className="nickname">
                  <SS.SignupInputLabal>닉네임</SS.SignupInputLabal>
                  <SS.SignupInput
                    type="text"
                    value={signupInfo.nickname}
                    id="nickname"
                    onChange={handleInput('nickname')}
                    maxLength={16}
                  />
                  <FaUserTag size={20} />
                  <SS.SignupEmailCheckBtn onClick={() => handleNicknameCheck()}>
                    닉네임 중복체크
                  </SS.SignupEmailCheckBtn>
                </SS.SignupInputBox>
              </SS.SignupInputdev>
              <SS.SignupMsg
                color={validityCheck.isNickname ? '	#90EE90' : '#fa8072'}
              >
                {validityCheck.msgNickname}
              </SS.SignupMsg>
              <SS.SignupNextBtn
                onClick={() => {
                  handleSignupStepSuccess('nickname');
                }}
              >
                확인
              </SS.SignupNextBtn>
            </SS.SignupStepBox>
          )}
          {isPage.isPageFive && (
            <SS.SignupStepBox>
              <SS.SignupSuccessMsg>
                회원가입을 축하드립니다.🥳 <br />
                <br />
                <br />
                <br />
                <p>
                  확인 버튼을 클릭후 <span>로그인</span>을 해주세요.
                </p>
              </SS.SignupSuccessMsg>
              <SS.SignupNextBtn
                onClick={() => {
                  handleSignupStepSuccess('signupMoveLogin');
                }}
              >
                확인
              </SS.SignupNextBtn>
            </SS.SignupStepBox>
          )}
        </SS.SignupBox>
        {/* //! 테스트용
        <button
          onClick={() => {
            next();
          }}
        >
          다음으로
        </button> */}
      </SS.SignupBack>
    </>
  );
}

export default Signup;

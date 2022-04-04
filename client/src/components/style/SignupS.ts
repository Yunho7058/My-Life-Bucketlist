import styled from 'styled-components';

export const SignupBack = styled.div`
  background-color: ${({ theme }) => theme.mode.background1};
  width: 100vw;
  height: 100vh;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const SignupBox = styled.div`
  background-color: ${({ theme }) => theme.mode.background2};
  width: 340px;
  height: 340px;

  border-radius: 40px;
  position: relative;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  &.terms {
    height: 500px;
  }
`;
export const SignupStepBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
export const SignupTitle = styled.div`
  font-size: 20px;

  margin-top: 30px;
`;

export const SignupInput = styled.input`
  width: 200px;
  height: 25px;
  margin-top: 5px;
  margin-bottom: 25px;
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
export const SignupInputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  > svg {
    position: absolute;
    top: 34px;
    left: 7px;
  }
`;
export const SignupInputLabal = styled.div`
  margin-bottom: 5px;
`;
export const SignupEmailFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const SignupEmailCheckBtn = styled.div`
  padding: 5px;
  top: 70px;
  right: 0px;
  position: absolute;
  border-radius: 10px;
  border: 1px solid #696969;
  font-size: 11px;
  width: 80px;
  height: 15px;
  line-height: 15px;
  margin-left: 10px;
  text-align: center;
  cursor: pointer;
  box-shadow: 1px 0px 1px 0px #dadce0;
  &:active {
    box-shadow: 0px 0px 0px 0px #dadce0;
    top: 72px;
    right: -1px;
  }

  &.codeCheckBtn {
    top: 158px;
    &:active {
      box-shadow: 0px 0px 0px 0px #dadce0;
      top: 159px;
      right: -1px;
    }
  }
`;
export const SignupNextBtn = styled.div`
  border-radius: 10px;
  border: 1px solid;
  width: 100px;
  height: 30px;
  text-align: center;
  margin-bottom: 20px;
  line-height: 30px;
  cursor: pointer;
`;
export const SignupInputdev = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SignupMsg = styled.div`
  color: ${(props) => props.color};
  margin-top: 18px;
  text-align: center;
  margin-bottom: 10px;

  &.password {
    margin-top: 0px;
    color: ${(props) => props.color};
    margin-bottom: 20px;
    font-size: 12px;
  }

  &.passwordConfirm {
    margin-top: 0px;
    color: ${(props) => props.color};
    margin-bottom: 20px;
    font-size: 12px;
  }
  &.terms {
    height: 15px;
    font-size: 15px;
    margin-top: 0px;
    margin-bottom: 20px;
  }
`;

export const TimerBox = styled.div`
  position: absolute;
  padding: 5px;
  left: 20px;
  top: 60px;
  > svg {
    top: 5px;
    left: -15px;
    position: absolute;
  }
`;
export const SignupSuccessMsg = styled.div`
  padding: 15px;
  font-size: 26px;
  text-align: center;
  margin-top: 30px;

  > p {
    font-size: 15px;
    > span {
      color: #6495ed;
      font-size: 17px;
    }
  }
`;

export const TermsAll = styled.div`
  position: absolute;
  right: 40px;
  bottom: 80px;
`;
export const TermsTitle = styled.div`
  margin-top: 10px;
  font-size: 15px;
  > span {
    font-size: 13px;
    color: #4169e1;
  }
`;
export const TermsBox = styled.div`
  border: 1px solid;
  width: 300px;
  height: 120px;
  overflow-y: scroll;
`;
export const TermsCheckBox = styled.input.attrs({ type: 'checkbox' })`
  border-radius: 20px;
  color: red;
`;

export const SignupAnyBack = styled.div`
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const StepIcon = styled.div`
  width: 5px;

  height: 5px;
  background-color: ${({ theme }) => theme.mode.stepIconBackColor};
  border-radius: 10px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  &.current {
    transform: scale(2.5);
  }
  &.after {
    transform: scale(2);
    background-color: #32cd32;
  }
`;

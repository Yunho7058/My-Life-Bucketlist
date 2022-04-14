import styled, { keyframes } from 'styled-components';

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
export const LoginMsg = styled.div`
  font-size: 12px;
  color: #fa8072;
`;

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
export const errowMove = keyframes`
 0%{
  right: -25px;
 }
 100%{
  right: -32px;
 }
`;

export const LoginSignupBtn = styled.div`
  font-size: 20px;
  width: 300px;
  cursor: pointer;
  position: relative;
  margin-right: 0px;
  margin-top: 10px;
  text-align: right;
  > svg {
    top: -1px;
    right: -25px;
    position: absolute;
  }
  &:hover {
    > svg {
      animation: ${errowMove} 1s 1s infinite;
    }
  }
`;

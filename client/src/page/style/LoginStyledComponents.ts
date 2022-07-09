import styled, { keyframes } from 'styled-components';

export const LoginBack = styled.div`
  background-color: ${({ theme }) => theme.mode.background1};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  align-items: center;
`;

export const LoginBox = styled.div`
  background-color: ${({ theme }) => theme.mode.background2};
  box-shadow: 0px 0px 1px 1px ${({ theme }) => theme.mode.borderBox};
  width: 80%;
  height: 410px;
  margin-top: 50px;
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

export const LoginSNSBack = styled.div`
  width: 100%;
  padding: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const LoginSNS = styled.img`
  height: 60px;
  width: 60px;
  cursor: pointer;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  &.google {
    height: 40px;
    width: 40px;
    box-shadow: 0px 0px 0px 0px;
  }
`;

export const LoginSNSGoogleBack = styled.div`
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5);
  border: 1px solid;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 60px;
  height: 60px;
`;

export const LoginPasswordFind = styled.div`
  width: 100%;
  text-align: right;
  margin-right: 20px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: #6495ed;
  }
`;

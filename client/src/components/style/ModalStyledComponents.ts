import styled from 'styled-components';

export const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;
  place-items: center;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.4);
`;
export const ModalBox = styled.div`
  z-index: 10;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  height: 200px;
  background-color: ${({ theme }) => theme.mode.background2};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  &.password {
    height: 400px;
    width: 300px;
  }
  &.signout {
    height: 250px;
    width: 300px;
  }
  &.passwordFind {
    height: 250px;
    width: 300px;
  }
`;
export const ModalText = styled.div`
  padding: 30px;
  font-size: 22px;
  text-align: center;
  letter-spacing: 1px;
  word-spacing: 1px;
  line-height: 30px;
`;
export const ModalBtnBack = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
export const ModalBtn = styled.div`
  margin: 10px;
  margin-bottom: 20px;
  width: 90px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  text-align: center;
  line-height: 40px;
  z-index: 991;
  cursor: pointer;
  &:hover {
    background-color: #6495ed;
  }
  &.commentDel {
    &:hover {
      background-color: #c77171;
    }
  }
`;
export const ModalPassword = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 5px;
`;
export const ModalPasswordInput = styled.input`
  width: 220px;
  height: 35px;

  border-radius: 10px;
  border: 1px solid #696969;
  padding-left: 10px;
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
export const ModalPasswordBack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-items: center;
  row-gap: 10px;
`;

export const ModalPasswordMSG = styled.div`
  font-size: 14px;

  color: #c77171;
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

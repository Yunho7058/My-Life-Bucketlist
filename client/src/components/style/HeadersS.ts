import styled from 'styled-components';

export const HeaderBack = styled.div`
  width: 100%;
  min-width: 400px;
  height: 50px;
  position: fixed;
  right: 0px;
  top: 0px;

  z-index: 999px;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.mode.background2};
  box-shadow: 0px 0px 1px 1px ${({ theme }) => theme.mode.borderBox};
`;

export const LoginBtn = styled.div`
  width: 100px;
  height: 50px;
  color: ${({ theme }) => theme.mode.fontColor};
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.mode.primaryText};
  }
`;

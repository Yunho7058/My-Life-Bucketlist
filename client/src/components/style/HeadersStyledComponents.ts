import styled from 'styled-components';
import { dark } from './theme';

export const HeaderBack = styled.div`
  width: 100%;
  min-width: 230px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export const CreatePostBtn = styled.div`
  position: fixed;
  right: 10px;
  top: 300px;
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.mode.background2};
  box-shadow: 3px 3px 4px 2px ${({ theme }) => theme.mode.borderBox};
  transition: 500ms;
  &:hover {
    transition: 500ms;
    width: 200px;
  }
  cursor: pointer;
  > svg {
    padding: 10px;
  }
`;
export const LogoTitle = styled.div`
  > img {
    width: 150px;
    height: 100px;
    @media screen and (max-width: 600px) {
      width: 100px;
      height: 80px;
    }
  }
`;

//https://cssarrowplease.com/ 말풍선 커스텀 사이트
export const SidebarBack = styled.div`
  z-index: 999;
  position: absolute;
  padding: 20px;
  padding-left: 50px;
  top: 60px;
  right: 215px;
  width: 200px;
  height: 200px;
  border-radius: 15px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  &.arrow_box {
    position: relative;
    background-color: ${({ theme }) =>
      theme.mode === dark ? theme.mode.background4 : '#ffffff'};
  }
  &.arrow_box:after,
  &.arrow_box:before {
    bottom: 100%;
    left: 90%;
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &.arrow_box:after {
    border-color: rgba(136, 183, 213, 0);
    border-bottom-color: ${({ theme }) => theme.mode.background2};
    border-width: 10px;
    margin-left: -20px;
  }
  &.arrow_box:before {
    border-color: rgba(194, 225, 245, 0);
    border-width: 13px;
    margin-left: -23px;
  }
`;
export const SideId = styled.div`
  margin-bottom: 20px;
`;
export const SideLine = styled.div`
  position: absolute;
  top: 80px;
  left: 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  width: 100%;
`;
export const SideMenu = styled.div`
  cursor: pointer;
  &:hover {
    transform: scale(1.01);
    //color: #6495ed;
  }
`;

export const SideBtn = styled.div`
  margin: 5px;
  margin-right: 20px;
  width: 40px;
  height: 40px;

  border-radius: 20px;
  position: relative;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  > svg {
    position: absolute;
    border-radius: 10px;
    width: 40px;
    height: 40px;
    top: 0px;
    right: 0px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const ProfileImg = styled.img`
  position: absolute;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  top: 0px;
  right: 0px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export const SearchBack = styled.div`
  height: 40px;
  width: 20%;
  /* border: 1px solid #696969; */
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  position: relative;
  > svg {
    position: absolute;
    right: 8px;
    top: 6px;
  }
  @media screen and (max-width: 600px) {
    width: 150px;
  }
`;
export const SearchSelect = styled.div`
  width: 25%;
  opacity: 0.6;
  text-align: center;
  line-height: 40px;
  padding: 1px;
  font-size: 12px;
`;
export const SearchInput = styled.input`
  width: 100%;
  font-size: 16px;
  border: 1px solid #696969;
  border-radius: 15px;
  padding-left: 10px;
  padding-right: 10px;
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
export const SearchBtn = styled.div`
  border: 1px solid #696969;
  border-left: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 15%;
  opacity: 0.6;
  text-align: center;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

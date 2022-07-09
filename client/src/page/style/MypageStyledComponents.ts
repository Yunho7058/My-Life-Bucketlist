import styled from 'styled-components';

export const MypageBack = styled.div`
  width: 100%;
  height: 100%;
  min-width: 350px;
  min-height: 100vh;
  padding-bottom: 30px;
  background-color: ${({ theme }) => theme.mode.background1};
  display: flex;
  column-gap: 10px;
  overflow: auto;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
  @media screen and (min-width: 600px) {
    justify-content: center;
  }
`;

export const ListBox = styled.div`
  margin-top: 10%;
  padding: 10px;
  width: 25%;
  height: 150px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.mode.background2};
  box-shadow: 0px 0px 1px 1px ${({ theme }) => theme.mode.borderBox};
  @media screen and (max-width: 600px) {
    margin-top: 20px;
    padding: 10px;
    width: 70%;
    height: 120px;
    border-radius: 20px;
  }
`;

export const ContentBox = styled.div`
  margin-top: 10%;
  display: flex;
  padding: 30px;
  flex-direction: column;
  justify-content: space-around;
  width: 60%;
  height: 300px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.mode.background2};
  box-shadow: 0px 0px 1px 1px ${({ theme }) => theme.mode.borderBox};
  &.profile {
    height: 400px;
    align-items: center;
    @media screen and (max-width: 600px) {
      height: 250px;
    }
  }
  @media screen and (max-width: 600px) {
    margin-top: 10px;
  }
`;

export const ListTitle = styled.div`
  padding: 10px;
  padding-left: 20px;
  text-align: left;
  height: 40px;
  line-height: 40px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.mode.background1};
  }
  > svg {
    margin-bottom: 5px;
    padding-right: 15px;
  }
`;
export const MyBucketlist = styled.div`
  cursor: pointer;
  &:hover {
    color: #6495ed;
    text-decoration: underline;
  }
`;

export const BookBucketlistBack = styled.div`
  font-size: 20px;
  padding: 10px;
  line-height: 20px;
`;
export const BookTitle = styled.div`
  font-size: 21px;
  padding: 10px;
  height: 30px;
  line-height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  > svg {
    padding-right: 5px;
  }
  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

export const BookBucketlistBox = styled.div`
  border-radius: 10px;
  font-size: 15px;
  padding: 10px;
  background-color: ${({ theme }) => theme.mode.background4};
  width: 95%;
  height: 200px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ffffff;
  }
`;

export const BookBucketlist = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    color: #6495ed;
    text-decoration: underline;
  }
`;
export const ProfilList = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  > svg {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
  @media screen and (max-width: 600px) {
  }
`;
export const ProfilTilte = styled.div`
  text-align: left;
  font-size: 16px;
  opacity: 0.6;
  min-width: 100px;
  height: 20px;
  margin-left: 20px;
  line-height: 20px;
  @media screen and (max-width: 600px) {
    margin-left: 0px;
    font-size: 12px;
    min-width: 80px;
  }
`;
export const ProfilContent = styled.div`
  width: 100px;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  @media screen and (max-width: 600px) {
    font-size: 13px;
    width: 100px;
  }
`;
export const ProfilContentInput = styled.input`
  width: 200px;
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
  @media screen and (max-width: 600px) {
    font-size: 13px;
    width: 70px;
  }
`;
export const Btn = styled.div`
  border-radius: 10px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  cursor: pointer;
  font-size: 14px;
  width: 80px;
  &.delete {
    background-color: #cd5c5c;
    width: 130px;
    margin-left: 5px;
    &:hover {
      background-color: #c77171;
    }
    @media screen and (max-width: 600px) {
      width: 80px;
      font-size: 10px;
    }
  }
  &.change {
    width: 130px;
    margin-left: 12px;
    &:hover {
      background-color: #6495ed;
    }
    @media screen and (max-width: 600px) {
      width: 80px;
      font-size: 10px;
    }
  }
  &:hover {
    background-color: #6495ed;
  }
  @media screen and (max-width: 600px) {
    width: 40px;
    font-size: 10px;
    height: 15px;
    line-height: 15px;
  }
`;
export const ImgInput = styled.input`
  cursor: pointer;
  display: none;
`;
export const PostPoto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (max-width: 600px) {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
`;

export const Line = styled.div`
  width: 90%;
  border-bottom: 1px solid rgba(94, 94, 94, 0.3);
`;

export const DivLine = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  height: 50px;
  > svg {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const NicknameBtn = styled.div`
  display: flex;
  column-gap: 10px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    row-gap: 3px;
  }
`;

import styled from 'styled-components';

export const MypageBack = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding-bottom: 30px;
  background-color: ${({ theme }) => theme.mode.background1};
  display: flex;
  justify-content: center;
  justify-content: space-around;
  overflow: auto;
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
    height: 500px;
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

  > svg {
    padding-right: 5px;
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
  width: 95%;
  height: 50px;
  display: flex;

  justify-content: space-around;
  align-items: center;

  > svg {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
`;
export const ProfilTilte = styled.div`
  text-align: center;
  font-size: 16px;
  opacity: 0.6;
  width: 200px;
  height: 20px;
`;
export const ProfilContent = styled.div`
  width: 300px;

  height: 40px;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
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
`;
export const Btn = styled.div`
  border-radius: 10px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  cursor: pointer;
  font-size: 14px;
  width: 80px;
  &.delete {
    background-color: #cd5c5c;
    width: 20%;
    &:hover {
      background-color: #c77171;
    }
  }
  &.change {
    width: 40%;
    width: 100px;
    &:hover {
      background-color: #6495ed;
    }
  }
  &:hover {
    background-color: #6495ed;
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
  width: 150px;
  height: 50px;
  > svg {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
`;

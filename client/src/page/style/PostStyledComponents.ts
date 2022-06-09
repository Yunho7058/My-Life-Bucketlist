import styled from 'styled-components';

export const PostBack = styled.div`
  width: 100%;
  height: 100%;

  min-height: 100vh;
  background-color: ${({ theme }) => theme.mode.background1};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;
export const PostBox = styled.div`
  margin-top: 8%;

  overflow-x: hidden;
  margin-bottom: 20px;
  height: auto;
  width: 90vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.mode.background2};
  box-shadow: 0px 0px 1px 1px ${({ theme }) => theme.mode.borderBox};
  border-radius: 50px;
`;
export const PostTitle = styled.div`
  padding: 20px;
  padding-top: 40px;
  font-size: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  height: 1%;
`;
export const PostTitleSide = styled.div`
  display: flex;

  justify-content: right;
  width: 100%;
  margin: 10px;
  flex-direction: row;
  > span {
    font-size: 15px;
    margin-right: 20px;
    line-height: 30px;
  }
  > div {
    margin-right: 10px;
    font-size: 15px;
    width: 80px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    &:hover {
      color: #6495ed;
    }
  }
`;

export const BucketlistBox = styled.div`
  width: 80%;
  height: 60%;
  margin-bottom: 10px;
`;
export const BucketlistBody = styled.div`
  width: 100%;
  height: 30%;
`;
export const BucketlistView = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50%;
  position: relative;
  border-radius: 30px;
  > svg {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    &:hover {
      color: #6495ed;
    }
  }
  > div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: space-around;
  }
  &:hover {
    background-color: ${({ theme }) => theme.mode.background1};
  }
`;
export const BucketlistImg = styled.div`
  border: 1px solid;
  text-align: center;
  line-height: 200px;
  border-radius: 30px;
  min-width: 250px;
  height: 200px;
  background-color: grey;
`;

export const BucketlistContent = styled.div`
  display: flex;
  width: 55%;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  border-radius: 30px;
  margin-right: 115px;

  > div.content {
    font-size: 18px;
    width: 800px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    > div {
      display: flex;
      flex-direction: row;
    }
  }
  &.simple {
    padding: 10px;
    width: 100%;
    height: 30px;
    flex-direction: row;
    &:hover {
      background-color: ${({ theme }) => theme.mode.background1};
    }
  }
`;
export const Btn = styled.div`
  margin: 10px;
  width: 200px;
  height: 50px;
  border-radius: 20px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  margin-top: 20px;
  &.imgEdit {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100px;
    height: 50px;
  }
  &.imgDelete {
    margin: 0px;
    width: 200px;
    height: 30px;
    line-height: 30px;
    background-color: #cd5c5c;
    &:hover {
      background-color: #c77171;
    }
  }
  &.delete {
    background-color: #cd5c5c;
    &:hover {
      background-color: #c77171;
    }
  }
  &.modify {
    &:hover {
      background-color: #6495ed;
    }
  }
  &.createBtn {
    width: 420px;
    &:hover {
      background-color: #6495ed;
    }
  }
  &.create {
    height: 200px;
    background-color: rgba(70, 70, 70, 0.3);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > svg {
      width: 100%;
      z-index: 0;
      opacity: 0.6;
    }
    &:hover {
      background-color: rgba(10, 10, 10, 0.3);
    }
  }
  &.Simple {
    margin: 0px;
    font-size: 12px;
    margin: 10px;
    width: 50px;
    height: 30px;
    line-height: 30px;
  }
  &.createSimple {
    height: 50px;
  }
  &.simpleCreate {
    font-size: 15px;
    height: 30px;
    line-height: 30px;
    width: 130px;
    &:hover {
      background-color: #6495ed;
    }
  }
`;
export const BucketlistCreate = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const InputBox = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  height: 20%;
  border-radius: 10px;
  border: 1px solid #696969;
  padding-left: 15px;
  padding-right: 15px;
  resize: none;
  background-color: ${({ theme }) => theme.mode.BGInput};
  color: ${({ theme }) => theme.mode.FCInput};
  outline: none;
  &.simple {
    margin-bottom: 0px;
    height: 25px;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.title {
    width: 95%;
    height: 40px;
  }
`;
export const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 5px;
  height: 60%;
  border-radius: 10px;
  border: 1px solid #696969;
  padding-left: 15px;
  padding-right: 15px;
  resize: none;
  background-color: ${({ theme }) => theme.mode.BGInput};
  color: ${({ theme }) => theme.mode.FCInput};
  outline: none;
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

export const PostPoto = styled.img`
  width: 250px;
  height: 200px;
  padding: 0px;

  border-radius: 15px;
`;

export const ImgInput = styled.input`
  cursor: pointer;
  display: none;
`;

export const ImgDelete = styled.button`
  cursor: pointer;
`;

export const ImgUploadBack = styled.div`
  margin-top: 10px;
`;

export const BookAndlikeBtn = styled.div`
  width: 90%;
  height: 30px;
  display: flex;
  margin-top: 20px;
  column-gap: 20px;
  align-items: flex-start;
  align-items: center;
  > svg {
    &:hover {
      cursor: pointer;
    }
  }
`;
export const Pagination = styled.div`
  display: flex;
  width: 65%;
  justify-content: space-around;
`;

export const PaginationBtn = styled.div`
  border: 1px solid;
  width: 80px;
  text-align: center;
  line-height: 30px;
  height: 30px;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: #6495ed;
  }
`;

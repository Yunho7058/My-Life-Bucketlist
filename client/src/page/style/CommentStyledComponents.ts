import styled from 'styled-components';

export const CommentBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
`;
export const CommentCreateBox = styled.div`
  padding: 10px;

  width: 95%;
  height: 130px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
export const CommentListBox = styled.div`
  padding: 10px;

  width: 95%;
  height: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
`;
export const CommentList = styled.div`
  border-radius: 15px;
  margin-top: 20px;
  padding: 10px;
  width: 95%;
  height: 20%;
  display: flex;
  flex-direction: row;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
export const CommentProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > svg.my {
    margin-bottom: 20px;
  }
  > img {
    border-radius: 10px;
    width: 60px;
    height: 60px;
    margin-bottom: 30px;

    &.comments {
      margin: 0px;
      width: 40px;
      height: 40px;
      @media screen and (max-width: 600px) {
        border-radius: 20px;
        width: 30px;
        height: 30px;
      }
    }
    @media screen and (max-width: 600px) {
      border-radius: 10px;
      width: 30px;
      height: 30px;
    }
  }
  &.list {
    width: 60px;
    justify-content: flex-start;
    > div {
      margin-left: 5px;
      width: 100%;
    }
  }
`;
export const CommentTextArea = styled.textarea`
  width: 95%;
  height: 60px;
  border-radius: 10px;
  border: 1px solid #696969;
  padding: 10px;
  resize: none;
  background-color: ${({ theme }) => theme.mode.BGInput};
  color: ${({ theme }) => theme.mode.FCInput};
  outline: none;
  &.list {
    width: 100%;
  }
  @media screen and (max-width: 600px) {
    width: 90%;
    height: 40px;
    border-radius: 10px;
  }
`;
export const CommentTextAreaBox = styled.div`
  flex-grow: 5;
  height: 120px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const CommentListProfile = styled.div``;
export const CommentListBody = styled.div`
  border-radius: 15px;
  position: relative;
  padding: 15px;
  height: 100%;
  font-size: 15px;
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;
export const CommentListBtn = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin-top: 18px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

export const CommentCreateBtn = styled.div`
  width: 50px;
  padding: 10px;
  height: 5px;
  border: 1px solid;
  text-align: center;
  line-height: 5px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #6495ed;
  }
  @media screen and (max-width: 600px) {
    width: 30px;
    padding: 8px;
    height: 3px;
    line-height: 3px;
    margin: 5px;
    font-size: 12px;
  }
`;
export const CommentBtnBack = styled.div`
  width: 100px;
  z-index: 1;
  padding: 10px;
  height: 80px;
  top: 33px;
  right: 5px;
  row-gap: 15px;
  border-radius: 10px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.mode.background3};
  box-shadow: 2px 3px 3px 3px rgba(0, 0, 0, 0.2);
`;

export const CommentEditBox = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: right;
`;
export const CommentEditBtn = styled.div`
  display: flex;
  margin-top: 10px;
  column-gap: 10px;
  > div {
    padding: 10px;
    width: 50px;
    height: 15px;
    border-radius: 15px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    text-align: center;
    line-height: 15px;
    cursor: pointer;
    &:hover {
      background-color: #c77171;
    }
    &.edit {
      &:hover {
        background-color: #6495ed;
      }
    }
    @media screen and (max-width: 600px) {
      padding: 8px;
      width: 30px;
      height: 10px;
      border-radius: 5px;
      border: 2px solid rgba(0, 0, 0, 0.2);
      text-align: center;
      line-height: 10px;
      font-size: 12px;
    }
  }
`;

export const CommentDiv = styled.div`
  width: 80%;
`;
export const CommentUser = styled.div`
  display: flex;
  column-gap: 12px;
  margin-bottom: 5px;
  > div.date {
    line-height: 18px;
    font-size: 12px;
    opacity: 0.7;
  }
`;

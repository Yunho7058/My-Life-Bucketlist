import styled from 'styled-components';
import { FaUserCircle, FaTrashAlt } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { modalOpen } from '../redux/action';
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
  padding: 10px;
  width: 95%;
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
export const CommentProfile = styled.div`
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg.my {
    margin-bottom: 20px;
  }
  &.list {
    width: 150px;
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
`;
export const CommentTextAreaBox = styled.div`
  flex-grow: 5;
  height: 120px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
export const CommentListProfile = styled.div`
  flex-grow: 0.5;
`;
export const CommentListBody = styled.div`
  flex-grow: 1;
  position: relative;
  padding: 5px;
  height: 60px;
  > div.date {
    position: absolute;
    bottom: -15px;
    left: 0px;
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
`;
export const CommentBtnBack = styled.div`
  width: 100px;
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
//댓글 작성한 유저:작성,삭제,수정
//다른유저:신고,해당게시물 유저:삭제
const Comment = () => {
  //클릭시 수정,삭제
  //삭제 버튼 클릭 시 모달 오픈
  const [isBtn, setIsBtn] = useState(false);
  const dispatch = useDispatch();
  const handleClickBtn = () => {
    setIsBtn(!isBtn);
  };
  const handleDelete = (commentId: number) => {
    dispatch(modalOpen('정말 삭제하시겠습니까?', commentId));
  };
  return (
    <CommentBox>
      <CommentCreateBox>
        <CommentProfile>
          <FaUserCircle className="my" size={50}></FaUserCircle>
        </CommentProfile>
        <CommentTextAreaBox>
          <CommentTextArea>댓글 내용 작성</CommentTextArea>
          <CommentCreateBtn>게시</CommentCreateBtn>
        </CommentTextAreaBox>
      </CommentCreateBox>
      <CommentListBox>
        <CommentList>
          <CommentProfile className="list">
            <FaUserCircle size={30}></FaUserCircle>
            <div>닉네임암거나</div>
          </CommentProfile>
          <CommentListBody>
            잘보고 가요~
            <div className="date">2022-04-15</div>
          </CommentListBody>
          <CommentListBtn>
            <BiDotsVerticalRounded
              size={30}
              onClick={() => handleClickBtn()}
            ></BiDotsVerticalRounded>
            {/* comment에 유저아이디와 로컬유저 아이디와 맞을때 버튼 보이기 */}
            {isBtn && (
              <CommentBtnBack>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '10px',
                  }}
                  onClick={() => {
                    handleDelete(1);
                  }}
                >
                  <FaTrashAlt size={20} />
                  삭제
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '10px',
                  }}
                >
                  <MdModeEdit size={20} />
                  수정
                </div>
              </CommentBtnBack>
            )}
          </CommentListBtn>
        </CommentList>
        <CommentList>
          <CommentProfile className="list">
            <FaUserCircle size={30}></FaUserCircle>
            <div>닉네임암거나</div>
          </CommentProfile>
          <CommentListBody>잘보고 가요~</CommentListBody>
        </CommentList>
      </CommentListBox>
    </CommentBox>
  );
};

export default Comment;

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { TypeRootReducer } from '../redux/store/store';
import { modalClose, modalOpen, postBucketlistDelete } from '../redux/action';
import axios from 'axios';
import axiosInstance from './axios';

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
  width: 40%;
  height: 50px;
  border-radius: 20px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  text-align: center;
  line-height: 50px;
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

//모달창 구현시 참고

const Modal = () => {
  const stateModal = useSelector((state: TypeRootReducer) => state.modal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(modalClose());
  };
  //!모달 open 후 버킷리스트 항목,댓글 삭제
  const handleCommentDelete = (item?: string, id?: number) => {
    let accessToken = window.localStorage.getItem('accessToken');
    console.log(item, '여기는 삭제 모달');
    if (item === 'comment' && id) {
      axiosInstance
        .delete(`/comment/${id}`)
        .then((res) => {
          dispatch(modalOpen('삭제되었습니다.'));
        })
        .catch((err) => {
          console.log(err, 'modal comment delete err');
        });
    } else if (item === 'bucketlist' && id) {
      axiosInstance
        .delete(`/bucketlist/${id}`)
        .then((res) => {
          dispatch(modalOpen('삭제되었습니다.'));
          dispatch(postBucketlistDelete(id));
        })
        .catch((err) => console.log(err, '게시물 삭제 err'));
    }
  };

  return (
    <>
      {stateModal.show && (
        <ModalBack>
          <ModalBox>
            <ModalText>{stateModal.msg}</ModalText>
            {stateModal.id ? (
              <ModalBtnBack>
                <ModalBtn onClick={() => handleClose()}>취소</ModalBtn>
                <ModalBtn
                  className="commentDel"
                  onClick={() => {
                    handleCommentDelete(stateModal.item, stateModal.id);
                  }}
                >
                  삭제
                </ModalBtn>
              </ModalBtnBack>
            ) : (
              <ModalBtnBack>
                <ModalBtn onClick={() => handleClose()}>확인</ModalBtn>
              </ModalBtnBack>
            )}
          </ModalBox>
        </ModalBack>
      )}
    </>
  );
};

export default Modal;

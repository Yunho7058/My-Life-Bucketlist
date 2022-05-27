import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { TypeRootReducer } from '../redux/store/store';
import {
  isLogout,
  modalClose,
  modalOpen,
  postBucketlistDelete,
} from '../redux/action';
import axios from 'axios';
import axiosInstance from '../utils/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const Modal = () => {
  const stateModal = useSelector((state: TypeRootReducer) => state.modal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(modalClose());
    setPasswordEdit({
      isPassword: false,
      isPasswordConfirm: false,
      msg: '',
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
    });
  };
  //!모달 open 후 버킷리스트 항목,댓글 삭제
  const handleCommentDelete = (item?: string, id?: number) => {
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

  useEffect(() => {
    if (stateModal.msg === 'password') {
      setModalList(1);
    } else if (stateModal.msg === 'signout') {
      setModalList(2);
    } else {
      setModalList(0);
    }
  }, [stateModal]);
  const [modalList, setModalList] = useState(0);
  const [passwordEdit, setPasswordEdit] = useState({
    isPassword: false,
    isPasswordConfirm: false,
    msg: '',
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  //! input 입력 이벤트
  const handleInput = (key: string) => (e: { target: HTMLInputElement }) => {
    if (key === 'newPassword') {
      const passwordReplace =
        /^.*(?=.{8,})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]).*$/;
      if (passwordReplace.test(e.target.value)) {
        setPasswordEdit({
          ...passwordEdit,
          msg: '',
          isPassword: true,
          [key]: e.target.value,
        });
      } else {
        setPasswordEdit({
          ...passwordEdit,
          msg: '특수문자,숫자를 포함하여 8글자 이상 작성해주세요.',
          isPassword: false,
          [key]: e.target.value,
        });
      }
    } else if (key === 'newPasswordConfirm') {
      if (e.target.value === passwordEdit.newPassword) {
        setPasswordEdit({
          ...passwordEdit,
          msg: '',
          isPasswordConfirm: true,
          [key]: e.target.value,
        });
      } else {
        setPasswordEdit({
          ...passwordEdit,
          msg: '비밀번호가 틀립니다. 비밀번호를 다시 확인해주세요.',
          isPasswordConfirm: false,
          [key]: e.target.value,
        });
      }
    } else {
      setPasswordEdit({ ...passwordEdit, [key]: e.target.value });
    }
  };

  const handlePasswordEdit = () => {
    axiosInstance
      .patch('/password', {
        password: passwordEdit.password,
        new_password: passwordEdit.newPassword,
      })
      .then((res) => {
        dispatch(modalOpen('비밀번호가 변경되었습니다.'));
        setPasswordEdit({
          isPassword: false,
          isPasswordConfirm: false,
          msg: '',
          password: '',
          newPassword: '',
          newPasswordConfirm: '',
        });
      })
      .catch((err) => {
        setPasswordEdit({ ...passwordEdit, msg: '현재 비밀번호가 틀립니다.' });
        console.log(err, 'password edit err');
      });
  };

  const handleSignout = () => {
    if (!passwordEdit.password) {
      setPasswordEdit({ ...passwordEdit, msg: '비밀번호를 입력해주세요.' });
    } else {
      axiosInstance
        .delete('/user', {
          data: {
            password: passwordEdit.password,
          },
        })
        .then((res) => {
          dispatch(modalOpen('회원탈퇴가 완료 됐습니다.😢'));
          window.localStorage.removeItem('accessToken');
          window.localStorage.removeItem('user');
          dispatch(isLogout());
          setPasswordEdit({
            isPassword: false,
            isPasswordConfirm: false,
            msg: '',
            password: '',
            newPassword: '',
            newPasswordConfirm: '',
          });
          navigate('/');
        })
        .catch((err) => {
          setPasswordEdit({ ...passwordEdit, msg: '비밀번호를 확인해주세요.' });
          console.log(err, 'signout err');
        });
    }
  };

  return (
    <>
      {stateModal.show && !modalList && (
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
      {stateModal.show && modalList === 1 && (
        <ModalBack>
          <ModalBox className="password">
            <ModalText>비밀번호 변경</ModalText>
            <ModalPasswordBack>
              <ModalPassword>
                현재 비밀번호
                <ModalPasswordInput
                  type="password"
                  value={passwordEdit.password}
                  onChange={handleInput('password')}
                ></ModalPasswordInput>
              </ModalPassword>
              <ModalPassword>
                변경 비밀번호
                <ModalPasswordInput
                  type="password"
                  value={passwordEdit.newPassword}
                  onChange={handleInput('newPassword')}
                ></ModalPasswordInput>
              </ModalPassword>
              <ModalPassword>
                변경 비밀번호 재확인
                <ModalPasswordInput
                  type="password"
                  value={passwordEdit.newPasswordConfirm}
                  onChange={handleInput('newPasswordConfirm')}
                ></ModalPasswordInput>
              </ModalPassword>
              <ModalPasswordMSG>{passwordEdit.msg}</ModalPasswordMSG>
            </ModalPasswordBack>
            <ModalBtnBack>
              <ModalBtn onClick={() => handlePasswordEdit()}>확인</ModalBtn>
              <ModalBtn onClick={() => handleClose()}>취소</ModalBtn>
            </ModalBtnBack>
          </ModalBox>
        </ModalBack>
      )}
      {stateModal.show && modalList === 2 && (
        <ModalBack>
          <ModalBox className="signout">
            <ModalText>회원탈퇴</ModalText>
            <ModalPasswordBack>
              <ModalPassword>
                비밀번호
                <ModalPasswordInput
                  type="password"
                  value={passwordEdit.password}
                  onChange={handleInput('password')}
                ></ModalPasswordInput>
              </ModalPassword>
              <ModalPasswordMSG>{passwordEdit.msg}</ModalPasswordMSG>
            </ModalPasswordBack>
            <ModalBtnBack>
              <ModalBtn onClick={() => handleSignout()}>확인</ModalBtn>
              <ModalBtn onClick={() => handleClose()}>취소</ModalBtn>
            </ModalBtnBack>
          </ModalBox>
        </ModalBack>
      )}
    </>
  );
};

export default Modal;

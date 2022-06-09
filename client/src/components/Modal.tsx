import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { TypeRootReducer } from '../redux/store/store';
import {
  isLogout,
  modalClose,
  modalOpen,
  postBucketlistDelete,
} from '../redux/action';

import axiosInstance from '../utils/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as MS from './style/ModalStyledComponents';

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
        <MS.ModalBack>
          <MS.ModalBox>
            <MS.ModalText>{stateModal.msg}</MS.ModalText>
            {stateModal.id ? (
              <MS.ModalBtnBack>
                <MS.ModalBtn onClick={() => handleClose()}>취소</MS.ModalBtn>
                <MS.ModalBtn
                  className="commentDel"
                  onClick={() => {
                    handleCommentDelete(stateModal.item, stateModal.id);
                  }}
                >
                  삭제
                </MS.ModalBtn>
              </MS.ModalBtnBack>
            ) : (
              <MS.ModalBtnBack>
                <MS.ModalBtn onClick={() => handleClose()}>확인</MS.ModalBtn>
              </MS.ModalBtnBack>
            )}
          </MS.ModalBox>
        </MS.ModalBack>
      )}
      {stateModal.show && modalList === 1 && (
        <MS.ModalBack>
          <MS.ModalBox className="password">
            <MS.ModalText>비밀번호 변경</MS.ModalText>
            <MS.ModalPasswordBack>
              <MS.ModalPassword>
                현재 비밀번호
                <MS.ModalPasswordInput
                  type="password"
                  value={passwordEdit.password}
                  onChange={handleInput('password')}
                ></MS.ModalPasswordInput>
              </MS.ModalPassword>
              <MS.ModalPassword>
                변경 비밀번호
                <MS.ModalPasswordInput
                  type="password"
                  value={passwordEdit.newPassword}
                  onChange={handleInput('newPassword')}
                ></MS.ModalPasswordInput>
              </MS.ModalPassword>
              <MS.ModalPassword>
                변경 비밀번호 재확인
                <MS.ModalPasswordInput
                  type="password"
                  value={passwordEdit.newPasswordConfirm}
                  onChange={handleInput('newPasswordConfirm')}
                ></MS.ModalPasswordInput>
              </MS.ModalPassword>
              <MS.ModalPasswordMSG>{passwordEdit.msg}</MS.ModalPasswordMSG>
            </MS.ModalPasswordBack>
            <MS.ModalBtnBack>
              <MS.ModalBtn onClick={() => handlePasswordEdit()}>
                확인
              </MS.ModalBtn>
              <MS.ModalBtn onClick={() => handleClose()}>취소</MS.ModalBtn>
            </MS.ModalBtnBack>
          </MS.ModalBox>
        </MS.ModalBack>
      )}
      {stateModal.show && modalList === 2 && (
        <MS.ModalBack>
          <MS.ModalBox className="signout">
            <MS.ModalText>회원탈퇴</MS.ModalText>
            <MS.ModalPasswordBack>
              <MS.ModalPassword>
                비밀번호
                <MS.ModalPasswordInput
                  type="password"
                  value={passwordEdit.password}
                  onChange={handleInput('password')}
                ></MS.ModalPasswordInput>
              </MS.ModalPassword>
              <MS.ModalPasswordMSG>{passwordEdit.msg}</MS.ModalPasswordMSG>
            </MS.ModalPasswordBack>
            <MS.ModalBtnBack>
              <MS.ModalBtn onClick={() => handleSignout()}>확인</MS.ModalBtn>
              <MS.ModalBtn onClick={() => handleClose()}>취소</MS.ModalBtn>
            </MS.ModalBtnBack>
          </MS.ModalBox>
        </MS.ModalBack>
      )}
    </>
  );
};

export default Modal;

import styled from 'styled-components';
import { FaUserCircle, FaTrashAlt } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  commentAllAdd,
  commentDelete,
  commentEdit,
  commentNewContentAdd,
  commentProfilePotoDownload,
  modalOpen,
} from '../redux/action';
import axios from 'axios';

import TypeRedux from '../redux/reducer/typeRedux';
import { TypeRootReducer } from '../redux/store/store';
import * as CS from './style/CommentStyledComponents';

import axiosInstance from '../utils/axios';
import { useParams } from 'react-router-dom';

const Comment = () => {
  const dispatch = useDispatch();
  const stateComment: TypeRedux.TypeComment[] = useSelector(
    (state: TypeRootReducer) => state.commentAll
  );
  const stateUserInfo = useSelector((state: TypeRootReducer) => state.userInfo);
  //해당유저가 작성한 댓글 관리시 필요한 데이타(수성,삭제)

  const statePost: TypeRedux.TypePostData = useSelector(
    (state: TypeRootReducer) => state.postReducer
  );
  const stateIsLogin = useSelector(
    (state: TypeRootReducer) => state.isLoginReducer
  );
  const [allComment, setAllComment] = useState<TypeRedux.TypeComment[]>([]);
  //신규 생성 state
  const [newComment, setNewComment] = useState({
    content: '',
  });
  //수정 state
  const [editComment, setEditComment] = useState({
    content: '',
    comment_id: 0,
  });
  const postURL = useParams();

  //!댓글 불러오기
  useEffect(() => {
    axiosInstance
      .get(`/comment/${postURL.id}`)
      .then((res) => {
        dispatch(commentAllAdd(res.data));
        res.data.forEach((el: TypeRedux.TypeComment) =>
          s3Download(el.user_id, el.image_path)
        );
        //이미지만 s3 보내기
      })
      .catch((err) => console.log(err, 'comment get err'));
  }, []);

  const s3Download = (id: number, image?: string) => {
    if (image) {
      axios
        .post(
          'https://p9m7fksvha.execute-api.ap-northeast-2.amazonaws.com/s3/presigned-url',
          { key: image }
        )
        .then((res) => {
          axios
            .get(res.data.data, { responseType: 'blob' })
            .then((res) => {
              let url = window.URL.createObjectURL(new Blob([res.data]));
              dispatch(commentProfilePotoDownload(id, url));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err, 's3 err');
        });
    } else {
      dispatch(commentProfilePotoDownload(id, ''));
    }
  };

  //!댓글 삭제
  const handleDelete = (commentId: number) => {
    axiosInstance
      .delete(`/comment/${commentId}`)
      .then((res) => {
        dispatch(commentDelete(commentId));

        setCommentEditMiniModal2(0);
        setCommentEditMiniModal(0);
        dispatch(modalOpen('댓글이 삭제되었습니다.'));
      })
      .catch((err) => {
        console.log(err, 'comment delete err');
      });
  };

  //! 댓글 수정
  const handleTextCommentEdit = () => {
    axiosInstance
      .patch(`/comment/${editComment.comment_id}`, {
        content: editComment.content,
      })
      .then((res) => {
        dispatch(
          commentEdit(
            editComment.comment_id,
            editComment.content,
            res.data.updated_at
          )
        );

        dispatch(modalOpen('수정이 완료됐습니다.'));
        setCommentEditMiniModal2(0);
      })
      .catch((err) => {
        console.log(err, 'comment edit err');
      });
  };
  //!댓글 수정 text 창 관리
  const handleInputEditComment =
    (key: string) => (e: { target: HTMLTextAreaElement }) => {
      const comment_id = Number(e.target.id);
      setEditComment({
        ...editComment,
        [key]: e.target.value,
        comment_id: comment_id,
      });
    };
  //!댓글 작성 text 창 관리
  const handleInputNewComment =
    (key: string) => (e: { target: HTMLTextAreaElement }) => {
      setNewComment({ ...newComment, [key]: e.target.value });
    };
  //!댓글 작성
  const handleCommentClick = () => {
    if (!stateIsLogin) {
      dispatch(modalOpen('로그인을 진행해주세요.'));
    } else if (!newComment.content.length) {
      dispatch(modalOpen('내용을 입력해주세요.'));
    } else {
      axiosInstance
        .post(`/comment/${statePost.id}`, newComment)
        .then((res) => {
          let data = {
            id: res.data.id,
            user_id: stateUserInfo.user_id,
            content: newComment.content,
            nickname: stateUserInfo.nickname,
            updated_at: res.data.updated_at,
            image_path: stateUserInfo.image_path,
          };
          dispatch(commentNewContentAdd(data));

          setNewComment({ content: '' });
          dispatch(modalOpen('댓글이 작성됐습니다.'));
        })
        .catch((err) => {
          console.log(err, 'comment create err');
        });
    }
  };

  //!댓글 수정,삭제 모달 버튼 관리 state 및 함수
  const [commentEditMiniModal, setCommentEditMiniModal] = useState(0);
  const [commentEditMiniModal2, setCommentEditMiniModal2] = useState(0);
  const handleCommentEdit = (id: number) => {
    if (commentEditMiniModal2 === id) {
      setCommentEditMiniModal2(0);
    } else {
      setCommentEditMiniModal2(id);
    }
    setCommentEditMiniModal(0);
  };
  //... 클릭
  const handleClickBtn = (id: number) => {
    if (commentEditMiniModal === id) {
      //0일때는 모달창 clos
      setCommentEditMiniModal(0);
    } else {
      //user_id 같으면 open
      setCommentEditMiniModal(id);
    }
  };

  return (
    <CS.CommentBox>
      <CS.CommentCreateBox>
        <CS.CommentProfile>
          {stateUserInfo.image_path ? (
            <img src={stateUserInfo.image_path} />
          ) : (
            <FaUserCircle className="my" size={50}></FaUserCircle>
          )}
        </CS.CommentProfile>
        <CS.CommentTextAreaBox>
          <CS.CommentTextArea
            maxLength={200}
            onChange={handleInputNewComment('content')}
            placeholder=" 댓글 내용 작성"
            name={newComment.content}
            value={newComment.content}
          />
          <CS.CommentCreateBtn
            onClick={() => {
              handleCommentClick();
            }}
          >
            게시
          </CS.CommentCreateBtn>
        </CS.CommentTextAreaBox>
      </CS.CommentCreateBox>
      <CS.CommentListBox>
        {stateComment
          .slice(0)
          .reverse()
          .map((el) => {
            return (
              <CS.CommentList key={el.id}>
                <CS.CommentProfile className="list">
                  {el.image_path ? (
                    <img src={el.image_path} />
                  ) : (
                    <FaUserCircle size={30} />
                  )}
                  <div>{el.nickname}</div>
                </CS.CommentProfile>
                {el.id === commentEditMiniModal2 ? (
                  <CS.CommentEditBox>
                    <CS.CommentTextArea
                      onChange={handleInputEditComment('content')}
                      name={el.content}
                      id={`${el.id}`}
                      defaultValue={el.content}
                    />
                    <CS.CommentEditBtn>
                      <div onClick={() => setCommentEditMiniModal2(0)}>
                        취소
                      </div>
                      <div
                        className="edit"
                        onClick={() => {
                          handleTextCommentEdit();
                        }}
                      >
                        수정
                      </div>
                    </CS.CommentEditBtn>
                  </CS.CommentEditBox>
                ) : (
                  <CS.CommentListBody>
                    {el.content}
                    <div className="date">{el.updated_at.split('T')[0]}</div>
                  </CS.CommentListBody>
                )}

                {el.user_id === stateUserInfo.user_id && (
                  <CS.CommentListBtn>
                    <BiDotsVerticalRounded
                      size={30}
                      onClick={() => handleClickBtn(el.id)}
                    ></BiDotsVerticalRounded>
                    {el.id === commentEditMiniModal && (
                      <CS.CommentBtnBack>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '10px',
                          }}
                          onClick={() => {
                            handleDelete(el.id);
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
                          onClick={() => handleCommentEdit(el.id)}
                        >
                          <MdModeEdit size={20} />
                          수정
                        </div>
                      </CS.CommentBtnBack>
                    )}
                  </CS.CommentListBtn>
                )}
              </CS.CommentList>
            );
          })}
      </CS.CommentListBox>
    </CS.CommentBox>
  );
};

export default Comment;

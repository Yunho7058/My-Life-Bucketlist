import styled from 'styled-components';
import { FaUserCircle, FaTrashAlt } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpen } from '../redux/action';
import axios from 'axios';
import TypeRedux from '../redux/reducer/typeRedux';
import { TypeRootReducer } from '../redux/store/store';
import * as CS from './style/CommentStyledComponents';

const Comment = () => {
  const dispatch = useDispatch();
  const accessToken = window.localStorage.getItem('accessToken');
  //해당유저가 작성한 댓글 관리시 필요한 데이타(수성,삭제)
  let parseUserId = window.localStorage.getItem('user');
  let parse_user_id: number;
  if (parseUserId !== null) {
    parse_user_id = Number(JSON.parse(parseUserId).id);
  }
  const statePost: TypeRedux.TypePostData = useSelector(
    (state: TypeRootReducer) => state.postReducer
  );
  const [allComment, setAllComment] = useState([
    {
      id: 0,
      user_id: 0,
      nickname: '',
      content: '',
      update_ad: '',
    },
  ]);
  //신규 생성 state
  const [newComment, setNewComment] = useState({
    content: '',
  });
  //수정 state
  const [editComment, setEditComment] = useState({
    content: '',
    comment_id: 0,
  });
  //!댓글 불러오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URI}/comment/${statePost.id}`)
      .then((res) => {
        console.log('실행');
        setAllComment([...res.data]);
      })
      .catch((err) => console.log(err, 'comment get err'));
  }, []);

  //!댓글 삭제
  const handleDelete = (commentId: number) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URI}/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setAllComment(
          allComment.filter((el) => {
            return el.id !== commentId;
          })
        );
        setSelectId2(0);
        setSelectId(0);
        dispatch(modalOpen('댓글이 삭제되었습니다.'));
      })
      .catch((err) => {
        console.log(err, 'comment delete err');
      });
  };

  //! 댓글 수정
  const handleTextCommentEdit = () => {
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URI}/comment/${editComment.comment_id}`,
        { content: editComment.content },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setAllComment(
          allComment.map((el) => {
            return el.id === editComment.comment_id
              ? { ...el, content: editComment.content }
              : { ...el };
          })
        );
        setSelectId2(0);
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
  //!댓글 신규 text 창 관리
  const handleInputNewComment =
    (key: string) => (e: { target: HTMLTextAreaElement }) => {
      setNewComment({ ...newComment, [key]: e.target.value });
    };
  //!댓글 신규 post 요청(댓글 게시)
  const handleCommentClick = () => {
    if (!newComment.content.length) {
      dispatch(modalOpen('내용을 입력해주세요.'));
    } else {
      const accessToken = window.localStorage.getItem('accessToken');
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URI}/comment/${statePost.id}`,
          newComment,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          //댓글 아이디 받기,만든 날짜
          setAllComment({ ...allComment });
          // setAllComment(
          //   allComment.map((el) => {
          //     return el.id !== res.data.id
          //       ? el
          //       : {
          //           id: res.data.id,
          //           content: newComment.content,
          //           nickname: 로컬,
          //           update_ad: res.data.update_at,
          //         };
          //   })
          // );
        })
        .catch((err) => {
          console.log(err, 'comment create err');
        });
    }
  };

  //!댓글 수정,삭제 버튼 관리 state 및 함수
  const [selectId, setSelectId] = useState(0);
  const [selectId2, setSelectId2] = useState(0);
  const handleCommentEdit = (id: number) => {
    if (selectId2 === id) {
      setSelectId2(0);
    } else {
      setSelectId2(id);
    }
    setSelectId(0);
  };
  const handleClickBtn = (id: number) => {
    if (selectId === id) {
      setSelectId(0);
    } else {
      setSelectId(id);
    }
  };

  return (
    <CS.CommentBox>
      <CS.CommentCreateBox>
        <CS.CommentProfile>
          <FaUserCircle className="my" size={50}></FaUserCircle>
        </CS.CommentProfile>
        <CS.CommentTextAreaBox>
          <CS.CommentTextArea
            maxLength={200}
            onChange={handleInputNewComment('content')}
            placeholder=" 댓글 내용 작성"
            name={newComment.content}
            defaultValue={newComment.content}
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
        {allComment.map((el) => {
          return (
            <CS.CommentList key={el.id}>
              <CS.CommentProfile className="list">
                <FaUserCircle size={30}></FaUserCircle>
                <div>{el.nickname}</div>
              </CS.CommentProfile>
              {el.id === selectId2 ? (
                <CS.CommentEditBox>
                  <CS.CommentTextArea
                    onChange={handleInputEditComment('content')}
                    name={el.content}
                    id={`${el.id}`}
                    defaultValue={el.content}
                  />
                  <CS.CommentEditBtn>
                    <div onClick={() => setSelectId2(0)}>취소</div>
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
                  <div className="date">{el.update_ad}</div>
                </CS.CommentListBody>
              )}

              {el.user_id === parse_user_id && (
                <CS.CommentListBtn>
                  <BiDotsVerticalRounded
                    size={30}
                    onClick={() => handleClickBtn(el.id)}
                  ></BiDotsVerticalRounded>
                  {el.id === selectId && (
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

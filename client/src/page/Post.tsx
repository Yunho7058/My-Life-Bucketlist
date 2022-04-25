//library
import styled from 'styled-components';
import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams, useNavigate, useLocation } from 'react-router-dom';
//component
import Headers from '../components/Headers';
import { TypeRootReducer } from '../redux/store/store';
import TypeRedux from '../redux/reducer/typeRedux';
import { useEffect } from 'react';
import {
  postEach,
  postBucketlistEdit,
  modalOpen,
  postBucketlistNew,
  postEachLike,
  postEachBookMark,
} from '../redux/action';
import Modal from '../components/Modal';
import * as PS from './style/PostStyledComponents';
import Comment from './Comment';
import SimpleMode from './PostPage/SimpleMode';
import DetailMode from './PostPage/DetailMode';
import axiosInstance from '../components/axios';
//import { TypeProps } from '../App';

//편집모드 클릭 시 수정 삭제 추가 버튼 보이게 하기
//! 만약 로컬 아이디와 포스트 아이디 다르면 편집모드 숨기기
//
//

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

function Post() {
  const postURL = useParams();
  const [postId, setPostId] = useState(postURL.id);
  useEffect(() => {
    setPostId(postURL.id);
  }, [postURL.id]);
  const dispatch = useDispatch();
  const statePost: TypeRedux.TypePostData = useSelector(
    (state: TypeRootReducer) => state.postReducer
  );
  const [isPost, setIsPost] = useState({
    isEditMode: false,
    isSimple: false,
    isCreate: false,
  });
  let accessToken = window.localStorage.getItem('accessToken');
  //! 게시물 불러오기
  useEffect(() => {
    axiosInstance
      .get(`/post/${postId}`)
      .then((res) => {
        //setPostData(res.data);
        console.log('하이');
        dispatch(postEach(res.data));
      })
      .catch((err) => console.log(err, '각 게시물 클릭 err'));
  }, [dispatch]);
  //사이드바 옵션 버튼
  console.log(statePost);
  console.log('두번');

  const handleIsPost = (value: string) => {
    console.log(value);
    switch (value) {
      case 'edit':
        return setIsPost({ ...isPost, isEditMode: !isPost.isEditMode });
      case 'simple':
        return setIsPost({ ...isPost, isSimple: !isPost.isSimple });
      default:
        return;
    }
  };
  //!사진 올리기
  // const [imgFile, setImgFile] = useState<any>('');
  // const handlePoto = (event: any) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  // };
  // const onLoadFile = (e: { target: HTMLInputElement }) => {
  //   const file = e.target.files;
  //   console.log(file);
  //   setImgFile(file);
  // };
  //! 편집 on Input(content,detail) 입력
  const handleInputItem =
    (key: string) =>
    (e: { target: HTMLInputElement | HTMLTextAreaElement }) => {
      let id = Number(e.target.id);
      dispatch(postBucketlistEdit(id, { [key]: e.target.value }));
    };
  //! 저장(수정) 클릭
  const handleEdit = (id: number) => {
    //let accessToken = window.localStorage.getItem('accessToken')
    let data = statePost.bucketlist.filter((el) => el.id === id);
    console.log('수정하기 버튼 클릭', data);
    axiosInstance
      .put(`/bucketlist/${id}`, data[0])
      .then((res) => {
        dispatch(modalOpen('수정이 완료되었습니다.'));
      })
      .catch((err) => {
        console.log(err, 'bucketlist edit err');
      });
    console.log(data[0]);
  };
  //생성('버킷리스트를 추가해주세요',+) 버튼 클릭시
  const handleBucketlistCreate = () => {
    if (isPost.isCreate) {
      dispatch(modalOpen('추가한 버킷리스트를 생성 후 클릭해주세요.'));
    } else {
      setIsPost({ ...isPost, isCreate: true });
    }
  };
  const [newBucketlist, setNewBucketlist] = useState({
    content: '',
    detail: '',
    image_path: '',
  });
  //! 생성 (내용 입력시 state 저장)
  const handleInputNewItem =
    (key: string) =>
    (e: { target: HTMLInputElement | HTMLTextAreaElement }) => {
      setNewBucketlist({ ...newBucketlist, [key]: e.target.value });
    };
  //! bucketlist 생성 버튼
  const handleNewBucketlist = () => {
    //100개 초과시 더이상 버킷리스트를 만들 수 없습니다 문구 띄우기.
    if (!newBucketlist.content.length) {
      dispatch(modalOpen('버킷리스트를 작성해주세요.'));
    } else {
      axiosInstance
        .post(`/bucketlist`, newBucketlist)
        .then((res) => {
          console.log(res.data);
          dispatch(
            postBucketlistNew(
              res.data.id,
              newBucketlist.content,
              newBucketlist.detail
            )
          );
          dispatch(modalOpen('생성되었습니다.'));
          setIsPost({ ...isPost, isCreate: false });
          setNewBucketlist({
            content: '',
            detail: '',
            image_path: '',
          });
        })
        .catch((err) => {
          console.log(err, 'new bucketlist create err');
        });
    }
  };
  //! 삭제
  const handleDelete = (id: number) => {
    console.log('삭제');
    dispatch(modalOpen('정말 삭제하시겠습니까?', 'bucketlist', id));
  };
  const handleLikeClick = () => {
    let post_id = statePost.id;
    axiosInstance
      .put(`/like/${post_id}`, {})
      .then((res) => {
        dispatch(postEachLike());
      })
      .catch((err) => {
        console.log(err, 'like click err');
      });
  };
  //! bookmark
  const handleBookClick = () => {
    let post_id = statePost.id;
    console.log(post_id);
    if (statePost.owner) {
    } else {
      axiosInstance
        .put(`/bookmark/${post_id}`, {})
        .then((res) => {
          dispatch(postEachBookMark());
          if (statePost.bookmark) {
            dispatch(modalOpen('북마크를 취소하였습니다.'));
          } else {
            dispatch(modalOpen('북마크를 추가하였습니다.'));
          }
        })
        .catch((err) => {
          console.log(err, 'book click err');
        });
    }
  };

  const [paginationStart, setPaginationStart] = useState(0);
  const [paginationEnd, setPaginationEnd] = useState(20);
  const handlePaginationClick = (s: number, e: number) => {
    console.log(statePost.bucketlist.length);
    setPaginationStart(s);
    setPaginationEnd(e);
  };
  return (
    <>
      <Headers></Headers>
      <Modal></Modal>
      <PS.PostBack>
        <PS.PostBox>
          <PS.PostTitle>
            <div>{statePost.title}</div>
            {/* {isPost.isEditMode ? (
              <>
                <PS.InputBox
                  placeholder="제목을 작성해주세요."
                  className="title"
                  name={statePost.title}
                  defaultValue={statePost.title}
                />
                <PS.Btn className="simpleCreate">저장</PS.Btn>
              </>
            ) : (
              statePost.title
            )} */}
            <PS.PostTitleSide>
              {statePost.owner && (
                <div
                  onClick={() => {
                    handleIsPost('edit');
                  }}
                >
                  {isPost.isEditMode ? '편집 OFF' : '편집 ON'}
                </div>
              )}
              <div
                onClick={() => {
                  handleIsPost('simple');
                }}
              >
                {isPost.isSimple ? '이미지 보기' : '간략히 보기'}
              </div>
              <span>{statePost.updated_at.split('T')[0]}</span>
            </PS.PostTitleSide>
          </PS.PostTitle>
          {isPost.isSimple ? (
            <SimpleMode
              isPost={isPost}
              handleInputItem={handleInputItem}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleBucketlistCreate={handleBucketlistCreate}
              handleInputNewItem={handleInputNewItem}
              newBucketlist={newBucketlist}
              handleNewBucketlist={handleNewBucketlist}
              paginationStart={paginationStart}
              paginationEnd={paginationEnd}
            ></SimpleMode>
          ) : (
            <DetailMode
              isPost={isPost}
              handleInputItem={handleInputItem}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleBucketlistCreate={handleBucketlistCreate}
              handleInputNewItem={handleInputNewItem}
              newBucketlist={newBucketlist}
              handleNewBucketlist={handleNewBucketlist}
              paginationStart={paginationStart}
              paginationEnd={paginationEnd}
            ></DetailMode>
          )}

          <Pagination>
            <PaginationBtn onClick={() => handlePaginationClick(0, 20)}>
              1~20위
            </PaginationBtn>
            {statePost.bucketlist.length > 20 && (
              <PaginationBtn onClick={() => handlePaginationClick(21, 41)}>
                21~40위
              </PaginationBtn>
            )}
            {statePost.bucketlist.length > 40 && (
              <PaginationBtn onClick={() => handlePaginationClick(41, 61)}>
                41~60위
              </PaginationBtn>
            )}

            {statePost.bucketlist.length > 60 && (
              <PaginationBtn onClick={() => handlePaginationClick(61, 81)}>
                61~80위
              </PaginationBtn>
            )}

            {statePost.bucketlist.length > 80 && (
              <PaginationBtn onClick={() => handlePaginationClick(81, 101)}>
                81~100위
              </PaginationBtn>
            )}
          </Pagination>
          <BookAndlikeBtn>
            {statePost.bookmark ? (
              <BsBookmarkPlusFill
                size={25}
                onClick={() => {
                  handleBookClick();
                }}
              />
            ) : (
              <BsBookmarkPlus
                size={25}
                onClick={() => {
                  handleBookClick();
                }}
              />
            )}
            {statePost.like ? (
              <FaHeart
                size={25}
                onClick={() => {
                  handleLikeClick();
                }}
              />
            ) : (
              <FaRegHeart
                size={25}
                onClick={() => {
                  handleLikeClick();
                }}
              />
            )}
            좋아요 {statePost.like_count}개
          </BookAndlikeBtn>
          <Comment />
        </PS.PostBox>
        {/* <input
                    type="file"
                    accept="image/*"
                    name="file"
                    id="bucketlistImg"
                    onChange={onLoadFile}
                  />
                  <button
                  // onClick={() => {
                  //   handlePoto();
                  // }}
                  >
                    사진 올리기
                  </button> */}
      </PS.PostBack>
    </>
  );
}

export default Post;

/*
게시물 공유하기 안하기
비로그인 클릭시 '먼저 로그인을 해주세요' 문구 후 로그인 페이지로
*/

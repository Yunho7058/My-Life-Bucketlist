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
  postBucketlistImgUpload,
  postImgDownload,
  postImgOrigin,
  isS3PotoDownload,
  postBlobType,
  presignPostUpload,
  isNotSelectPoto,
} from '../redux/action';
import Modal from '../components/Modal';
import * as PS from './style/PostStyledComponents';
import Comment from './Comment';
import SimpleMode from './PostPage/SimpleMode';
import DetailMode from './PostPage/DetailMode';
import axiosInstance from '../utils/axios';
import axios from 'axios';
import Spinner from '../utils/spinner';

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

  const stateIsLogin = useSelector(
    (state: TypeRootReducer) => state.isLoginReducer
  );
  const stateS3 = useSelector((state: TypeRootReducer) => state.s3Poto);
  const stateBoolean = useSelector((state: TypeRootReducer) => state.boolean);
  const [isPost, setIsPost] = useState({
    isEditMode: false,
    isSimple: false,
    isCreate: false,
    isPublic: false,
  });
  interface TypeBucketlist {
    id: number;
    content: string;
    detail: string;
    image_path: string;
  }

  //! 게시물 불러오기
  useEffect(() => {
    axiosInstance
      .get(`/post/${postId}`)
      .then((res) => {
        setIsPost({ ...isPost, isPublic: res.data.is_public });
        dispatch(postEach(res.data));
        res.data.bucketlist.forEach((el: TypeBucketlist) => {
          s3Download(el.image_path, el.id);
        });
        setSpinner(false);
      })
      .catch((err) => console.log(err, '각 게시물 클릭 err'));
  }, []);

  const s3Download = (data: string, id: number) => {
    if (data) {
      axios
        .post(
          'https://p9m7fksvha.execute-api.ap-northeast-2.amazonaws.com/s3/presigned-url',
          { key: data }
        )
        .then((res) => {
          axios
            .get(res.data.data, { responseType: 'blob' })
            .then((res) => {
              let url = window.URL.createObjectURL(new Blob([res.data]));
              dispatch(postImgDownload(url, id));
              dispatch(postImgOrigin(url, id));

              setSpinnerImg(false);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err, 's3 err');
        });
    } else {
      dispatch(postImgOrigin(null, id));
      setSpinnerImg(false);
    }
  };

  const handleIsPost = (value: string) => {
    switch (value) {
      case 'edit':
        return setIsPost({ ...isPost, isEditMode: !isPost.isEditMode });
      case 'simple':
        return setIsPost({ ...isPost, isSimple: !isPost.isSimple });
      case 'public':
        return axiosInstance
          .patch(`/post`)
          .then((res) => {
            if (isPost.isPublic) {
              dispatch(modalOpen('비공개로 설정됐습니다.'));
              setIsPost({ ...isPost, isPublic: false });
            } else {
              dispatch(modalOpen('공개로 설정됐습니다.'));
              setIsPost({ ...isPost, isPublic: true });
            }
          })
          .catch((err) => {
            console.log(err, 'public err');
          });
      default:
        return;
    }
  };
  //!사진 올리기

  //! 편집 on Input(content,detail) 입력
  const handleInputItem =
    (key: string) =>
    (e: { target: HTMLInputElement | HTMLTextAreaElement }) => {
      let id = Number(e.target.id);
      dispatch(postBucketlistEdit(id, { [key]: e.target.value }));
    };
  //! 저장(수정) 클릭
  const handleEdit = (id: number) => {
    let data = statePost.bucketlist.filter((el) => el.id === id);

    if (stateS3.presignPost) {
      dispatch(isS3PotoDownload());
      data[0].image_path = stateS3.presignPost;
    } else if (stateBoolean.isPoto) {
      //선택한 사진이 없음

      //사진이 없는 경우와 원래 있었던 경우
      //dispatch(postBucketlistImgUpload(id, null));
      dispatch(postBucketlistImgUpload(id, null));
      data[0].image_path = null;
    }
    axiosInstance
      .put(`/bucketlist/${id}`, data[0])
      .then((res) => {
        dispatch(modalOpen('수정이 완료되었습니다.'));
        setBucketlistSelect(0);
        dispatch(isNotSelectPoto());
      })
      .catch((err) => {
        console.log(err, 'bucketlist edit err');
      });
  };
  //생성('버킷리스트를 추가해주세요',+) 버튼 클릭시
  const handleBucketlistCreate = () => {
    if (isPost.isCreate) {
      dispatch(modalOpen('추가한 버킷리스트를 작성해주세요.'));
    } else {
      handleBucketlistSelect(0);
      setIsPost({ ...isPost, isCreate: true });
    }
  };
  const handleBucketlistCancel = () => {
    setIsPost({ ...isPost, isCreate: false });
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
    //? 100개 초과시 더이상 버킷리스트를 만들 수 없습니다 문구 띄우기.

    if (!newBucketlist.content.length) {
      dispatch(modalOpen('버킷리스트를 작성해주세요.'));
    } else {
      if (stateS3.presignPost) {
        dispatch(isS3PotoDownload());
      }

      axiosInstance
        .post(`/bucketlist`, {
          ...newBucketlist,
          image_path: stateS3.presignPost || '',
        })
        .then((res) => {
          dispatch(
            postBucketlistNew(
              res.data.id,
              newBucketlist.content,
              newBucketlist.detail,
              stateS3.potoBlob
            )
          );
          dispatch(modalOpen('생성되었습니다.'));
          setIsPost({ ...isPost, isCreate: false });
          setNewBucketlist({
            content: '',
            detail: '',
            image_path: '',
          });
          dispatch(isS3PotoDownload());
          setBucketlistSelect(0);
          dispatch(postBlobType(''));
        })
        .catch((err) => {
          console.log(err, 'new bucketlist create err');
        });
    }
  };
  //! 삭제
  const handleDelete = (id: number) => {
    dispatch(modalOpen('정말 삭제하시겠습니까?', 'bucketlist', id));
  };
  const handleLikeClick = () => {
    let post_id = statePost.id;
    if (!stateIsLogin) {
      dispatch(modalOpen('로그인을 진행해주세요.'));
    } else {
      axiosInstance
        .put(`/like/${post_id}`)
        .then((res) => {
          dispatch(postEachLike());
        })
        .catch((err) => {
          console.log(err, 'like click err');
        });
    }
  };

  //! bookmark
  const handleBookClick = () => {
    let post_id = statePost.id;
    if (!stateIsLogin) {
      dispatch(modalOpen('로그인을 진행해주세요.'));
    } else if (statePost.owner) {
    } else {
      axiosInstance
        .put(`/bookmark/${post_id}`)
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
    setPaginationStart(s);
    setPaginationEnd(e);
  };

  const [spinner, setSpinner] = useState(true);
  const [spinnerImg, setSpinnerImg] = useState(true);
  const [bucketlistSelect, setBucketlistSelect] = useState(0);

  const handleBucketlistSelect = (id: number) => {
    dispatch(presignPostUpload(''));
    dispatch(isNotSelectPoto());
    if (!isPost.isCreate) {
      if (bucketlistSelect === id) {
        setBucketlistSelect(0);
      } else {
        setBucketlistSelect(id);
      }
    } else {
      dispatch(modalOpen('추가한 버킷리스트를 생성해주세요.'));
    }
  };
  return (
    <>
      {spinner && <Spinner></Spinner>}
      {!spinner && (
        <>
          <Headers></Headers>
          <Modal></Modal>
          <PS.PostBack>
            <PS.PostBox>
              <PS.PostTitle>
                <div>{statePost.nickname}의 버킷리스트</div>

                <PS.PostTitleSide>
                  {statePost.owner && (
                    <div
                      onClick={() => {
                        handleIsPost('public');
                      }}
                    >
                      {isPost.isPublic ? '공개 상태' : '비공개 상태'}
                    </div>
                  )}

                  <div
                    onClick={() => {
                      handleIsPost('simple');
                    }}
                  >
                    {isPost.isSimple ? '이미지 보기' : '간략히 보기'}
                  </div>
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
                  bucketlistSelect={bucketlistSelect}
                  handleBucketlistSelect={handleBucketlistSelect}
                  spinnerImg={spinnerImg}
                  handleBucketlistCancel={handleBucketlistCancel}
                ></DetailMode>
              )}

              <PS.Pagination>
                <PS.PaginationBtn onClick={() => handlePaginationClick(0, 20)}>
                  1~20위
                </PS.PaginationBtn>
                {statePost.bucketlist.length > 20 && (
                  <PS.PaginationBtn
                    onClick={() => handlePaginationClick(21, 41)}
                  >
                    21~40위
                  </PS.PaginationBtn>
                )}
                {statePost.bucketlist.length > 40 && (
                  <PS.PaginationBtn
                    onClick={() => handlePaginationClick(41, 61)}
                  >
                    41~60위
                  </PS.PaginationBtn>
                )}

                {statePost.bucketlist.length > 60 && (
                  <PS.PaginationBtn
                    onClick={() => handlePaginationClick(61, 81)}
                  >
                    61~80위
                  </PS.PaginationBtn>
                )}

                {statePost.bucketlist.length > 80 && (
                  <PS.PaginationBtn
                    onClick={() => handlePaginationClick(81, 101)}
                  >
                    81~100위
                  </PS.PaginationBtn>
                )}
              </PS.Pagination>
              <PS.BookAndlikeBtn>
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
              </PS.BookAndlikeBtn>

              <Comment />
            </PS.PostBox>
          </PS.PostBack>
        </>
      )}
    </>
  );
}

export default Post;

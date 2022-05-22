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
} from '../redux/action';
import Modal from '../components/Modal';
import * as PS from './style/PostStyledComponents';
import Comment from './Comment';
import SimpleMode from './PostPage/SimpleMode';
import DetailMode from './PostPage/DetailMode';
import axiosInstance from '../utils/axios';
import axios from 'axios';
import Spinner from '../utils/spinner';
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

  // let getUser = window.localStorage.getItem('user');
  // const [userInfo, setUserInfo] = useState({
  //   parse_user_id: 0,
  // });
  // useEffect(() => {
  //   if (getUser !== null) {
  //     setUserInfo({
  //       parse_user_id: Number(JSON.parse(getUser).id),
  //     });
  //   }
  // }, []);

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
        dispatch(postEach(res.data));
        res.data.bucketlist.forEach((el: TypeBucketlist) => {
          s3Download(el.image_path, el.id);
        });
        setSpinner(false);
      })
      .catch((err) => console.log(err, '각 게시물 클릭 err'));
  }, []);
  //사이드바 옵션 버튼
  // console.log(statePost);
  // console.log('두번');

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
              setTimeout(() => {
                setSpinnerImg(false);
              }, 3000);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err, 's3 err');
        });
    } else {
      dispatch(postImgOrigin('', id));
    }
  };
  // let abc: { id: number; url: string }[] = [];
  // const test111 = (url: string, id: number) => {
  //   abc.push({ id, url });
  //   //setSelectImg([{ img: url, id: id }]);
  // };

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
    //let accessToken = window.localStorage.getItem('accessToken')
    console.log(fileName);
    let data = statePost.bucketlist.filter((el) => el.id === id);
    if (fileName) {
      handleS3ImgUpload();
      data[0].image_path = presignedPost?.fields.key;
    } else {
      data[0].image_path = '';
    }
    axiosInstance
      .put(`/bucketlist/${id}`, data[0])
      .then((res) => {
        dispatch(modalOpen('수정이 완료되었습니다.'));
        if (typeof data[0].image_path === 'string') {
          dispatch(postBucketlistImgUpload(id, imgUrl));
          dispatch(postImgOrigin(imgUrl, id));
        }
        setBucketlistSelect(0);
      })
      .catch((err) => {
        console.log(err, 'bucketlist edit err');
      });
    //console.log(data[0]);
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
  const [newImgUrl, setNewImgUrl] = useState('');

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

  useEffect(() => {
    if (fileName) {
      handleS3ImgUpload();
      if (typeof presignedPost?.fields.key === 'string')
        setNewBucketlist({
          ...newBucketlist,
          image_path: presignedPost.fields.key,
        });
    } else {
      setNewBucketlist({ ...newBucketlist, image_path: '' });
    }
  }, [newImgUrl]);
  //! bucketlist 생성 버튼
  const handleNewBucketlist = () => {
    //? 100개 초과시 더이상 버킷리스트를 만들 수 없습니다 문구 띄우기.

    if (!newBucketlist.content.length) {
      dispatch(modalOpen('버킷리스트를 작성해주세요.'));
    } else {
      axiosInstance
        .post(`/bucketlist`, newBucketlist)
        .then((res) => {
          dispatch(
            postBucketlistNew(
              res.data.id,
              newBucketlist.content,
              newBucketlist.detail,
              newImgUrl
            )
          );
          dispatch(modalOpen('생성되었습니다.'));
          setIsPost({ ...isPost, isCreate: false });
          setNewBucketlist({
            content: '',
            detail: '',
            image_path: '',
          });
          setNewImgUrl('');
          setBucketlistSelect(0);
        })
        .catch((err) => {
          console.log(err, 'new bucketlist create err');
        });
    }
  };
  //! 삭제
  const handleDelete = (id: number) => {
    //console.log('삭제');
    dispatch(modalOpen('정말 삭제하시겠습니까?', 'bucketlist', id));
  };
  const handleLikeClick = () => {
    let post_id = statePost.id;
    if (!stateIsLogin) {
      dispatch(modalOpen('로그인을 진행해주세요.'));
    } else {
      axiosInstance
        .put(`/like/${post_id}`, {})
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
    console.log(post_id);
    if (!stateIsLogin) {
      dispatch(modalOpen('로그인을 진행해주세요.'));
    } else if (statePost.owner) {
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

  const [file, setFile] = useState<FileList | undefined>();
  const [fileName, setFileName] = useState<string>('');
  const [presignedPost, setPresignedPost] = useState<TypePresignedPost>();

  interface TypePresignedPost {
    url: string;
    fields: {
      Policy: string;
      'X-Amz-Algorithm': string;
      'X-Amz-Credential': string;
      'X-Amz-Date': string;
      'X-Amz-Security-Token': string;
      'X-Amz-Signature': string;
      bucket: string;
      key: string;
    };
  }
  const [imgUrl, setImgUrl] = useState('');
  const [userId, setUserId] = useState(0);

  //사진 선택시
  const onLoadFile = (e: { target: HTMLInputElement }) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      const fileList = e.target.files;

      if (e.target.id === 'new') {
        setNewImgUrl(URL.createObjectURL(fileList[0]));
      } else {
        const id = Number(e.target.id);
        setImgUrl(URL.createObjectURL(fileList[0]));
        setUserId(id);
      }
      setFile(fileList);
      setFileName(fileList[0].name);
    }
  };
  useEffect(() => {
    dispatch(postBucketlistImgUpload(userId, imgUrl));
  }, [imgUrl]);

  //server로부터 key get
  useEffect(() => {
    if (fileName) {
      axiosInstance
        .get(`/bucketlist/presigned-post?file_name=${fileName}`)
        .then((res) => {
          setPresignedPost(res.data);
        })
        .catch((err) => {
          console.log('poto err');
        });
    }
  }, [fileName]);

  //! 사진 삭제
  const handleImgDelete = (id: number) => {
    if (id === 0) {
      setNewImgUrl('');
    } else {
      setFile(undefined);
      setFileName('');
      setImgUrl('');
      dispatch(postBucketlistImgUpload(id, ''));
    }
    //! 만약 사진 삭제 누르고 요청시 서버에서 빈배열로 들어갈때 파일삭제 가능?
    //만약 사진이 있다면 삭제하는 요청 보내기
  };
  //삭제 버튼 클릭 시 만약 그전에 사진이 있다면 사진 전송 하기

  //formdata 새로 생성후 s3전송
  //! 생성 or 저장 버튼 클릭 시 변경?
  //! 아니면 올리자마자 바로 저장
  const handleS3ImgUpload = () => {
    const formData = new FormData();
    if (presignedPost && file) {
      Object.entries(presignedPost.fields).forEach((entry) => {
        const [key, value] = entry;
        formData.append(key, value);
      });
      formData.append('file', file[0]);
      axios
        .post(presignedPost.url, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          setNewBucketlist({
            ...newBucketlist,
            image_path: presignedPost.fields.key,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [paginationStart, setPaginationStart] = useState(0);
  const [paginationEnd, setPaginationEnd] = useState(20);
  const handlePaginationClick = (s: number, e: number) => {
    //console.log(statePost.bucketlist.length);
    setPaginationStart(s);
    setPaginationEnd(e);
  };

  const [spinner, setSpinner] = useState(true);
  const [spinnerImg, setSpinnerImg] = useState(true);
  const [bucketlistSelect, setBucketlistSelect] = useState(0);

  const handleBucketlistSelect = (id: number) => {
    if (!isPost.isCreate) {
      let selectFilter = statePost.bucketlist.filter((el) => {
        return el.id === id || el.id === bucketlistSelect;
      });
      selectFilter.forEach((el) => {
        if (typeof el.image_path_origin === 'string') {
          dispatch(postBucketlistImgUpload(el.id, el.image_path_origin));
        }
      });
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
                        handleIsPost('public');
                      }}
                    >
                      {isPost.isPublic ? '공개 상태' : '비공개 상태'}
                    </div>
                  )}

                  {/* {statePost.owner && (
                    <div
                      onClick={() => {
                        handleIsPost('edit');
                      }}
                    >
                      추가하기
                    </div>
                  )} */}
                  <div
                    onClick={() => {
                      handleIsPost('simple');
                    }}
                  >
                    {isPost.isSimple ? '이미지 보기' : '간략히 보기'}
                  </div>
                  {/* <span>{statePost.updated_at.split('T')[0]}</span> */}
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
                  onLoadFile={onLoadFile}
                  handleImgDelete={handleImgDelete}
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
                  onLoadFile={onLoadFile}
                  handleImgDelete={handleImgDelete}
                  bucketlistSelect={bucketlistSelect}
                  handleBucketlistSelect={handleBucketlistSelect}
                  newImgUrl={newImgUrl}
                  spinnerImg={spinnerImg}
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
          </PS.PostBack>
        </>
      )}
    </>
  );
}

export default Post;

/*
게시물 공유하기 안하기
비로그인 클릭시 '먼저 로그인을 해주세요' 문구 후 로그인 페이지로
*/

//library
import styled from 'styled-components';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//component
import Headers from '../components/Headers';
import { TypeRootReducer } from '../redux/store/store';
import TypeRedux from '../redux/reducer/typeRedux';
import { useEffect } from 'react';
import { postEach, postContentEdit, modalOpen } from '../redux/action';
import Modal from '../components/Modal';
import * as PS from './style/PostStyledComponents';
//import { TypeProps } from '../App';

//편집모드 클릭 시 수정 삭제 추가 버튼 보이게 하기
//! 만약 로컬 아이디와 포스트 아이디 다르면 편집모드 숨기기
//
//
function Post() {
  const postURL = useParams();
  const dispatch = useDispatch();
  const statePost: TypeRedux.TypePostData = useSelector(
    (state: TypeRootReducer) => state.postReducer
  );

  const [isPost, setIsPost] = useState({
    isEditMode: false,
    isSimple: false,
    isCreate: false,
  });
  const [eventPost, setEnevtPost] = useState<number[]>([]);
  //! 게시물 불러오기
  let accessToken = window.localStorage.getItem('accessToken');
  useEffect(() => {
    let id = postURL.id;
    axios
      .get(`${process.env.REACT_APP_SERVER_URI}/post/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        //setPostData(res.data);
        dispatch(postEach(res.data));
      })
      .catch((err) => console.log(err, '각 게시물 클릭 err'));
  }, []);

  //네이바 옵션 버튼
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

  //! 수정버튼 클릭시
  const handleIsSimple = (idx: number) => {
    if (eventPost.includes(idx)) {
      setEnevtPost(
        eventPost.filter((el) => {
          return el !== idx;
        })
      );
    } else {
      setEnevtPost([...eventPost, idx]);
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

  //! 편집 on content
  const handleInputContent =
    (key: string) => (e: { target: HTMLInputElement }) => {
      let id = Number(e.target.id);
      dispatch(postContentEdit({ key: e.target.value }, id));
      //key 별로 조건문으로 나눠서 content, detail 수정 하기
      console.log(statePost, '여기는 post');
    };
  //! 수정 클릭
  const handleEdit = (id: number) => {
    console.log('수정하기 버튼 클릭', id);
  };
  //! 생성
  const handleBucketlistCreate = () => {
    if (isPost.isCreate) {
      //모달 open
      dispatch(modalOpen('추가한 버킷리스트를 저장 후 생성해주세요.'));
    } else {
      setIsPost({ ...isPost, isCreate: true });
    }
  };
  //! 삭제
  const handleDelete = (idx: number) => {
    console.log('삭제');
    axios
      .delete(`${process.env.REACT_APP_SERVER_URI}/bucketlist/${idx}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        //dispatch 로 게시물 아이디 같이 보내 삭제
        //문구 띄우기
      })
      .catch((err) => console.log(err, '게시물 삭제 err'));
  };
  let ex = {
    bookmark: false,
    bucketlist: [{}, {}, {}],
    id: 0,
    like: false,
    like_count: 0,
    nickname: '',
    owner: false,
    title: '',
    updated_at: '',
  };

  //const [postData, setPostData] = useState();
  console.log(statePost.owner);
  return (
    <>
      <Headers></Headers>
      <Modal></Modal>
      <PS.PostBack>
        <PS.PostBox>
          <PS.PostTitle>
            {isPost.isEditMode ? (
              <>
                <PS.InputBox
                  placeholder="제목을 작성해주세요."
                  className="title"
                  defaultValue={statePost.title}
                />{' '}
                <PS.Btn className="simpleCreate">저장</PS.Btn>
              </>
            ) : (
              statePost.title
            )}
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
            <PS.BucketlistBox>
              {statePost.bucketlist.map((el, idx) => {
                return eventPost.includes(idx) ? (
                  <PS.BucketlistView
                    key={idx}
                    onClick={() => {
                      handleIsSimple(idx);
                    }}
                  >
                    {/* 간략하게 보기,선택 상세보기 */}

                    {/* 간략하게 보기,선택 상세보기,편집 on */}

                    {isPost.isEditMode ? (
                      <>
                        <div>
                          <PS.BucketlistImg />
                          <PS.BucketlistContent>
                            <PS.InputBox
                              id={`${el.id}`}
                              placeholder="버킷리스트를 작성해주세요"
                              defaultValue={el.content}
                              onChange={handleInputContent('content')}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            />
                            <PS.TextArea
                              placeholder="내용을 작성해주세요. 100이내로 작성해주세요."
                              maxLength={100}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              {el.content}
                            </PS.TextArea>
                          </PS.BucketlistContent>
                        </div>
                        <div>
                          <PS.Btn
                            className="delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(idx);
                            }}
                          >
                            삭제
                          </PS.Btn>
                          <PS.Btn
                            className="modify"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(el.id);
                            }}
                          >
                            저장
                          </PS.Btn>
                        </div>
                      </>
                    ) : (
                      <div>
                        <PS.BucketlistImg />
                        {/* //이미지 경로 설정 */}
                        <PS.BucketlistContent>
                          <div className="content">
                            {idx + 1}. {el.content}
                          </div>
                          <div>
                            365일 기계처럼 일하는 내 인생 언젠간 서핑만은
                            해보고싶다!!
                          </div>
                        </PS.BucketlistContent>
                      </div>
                    )}
                  </PS.BucketlistView>
                ) : (
                  <PS.BucketlistContent
                    onClick={() => {
                      handleIsSimple(idx);
                    }}
                    key={idx}
                    className="simple"
                  >
                    {/* 간략하게 보기,편집 on */}

                    {isPost.isEditMode ? (
                      <div className="content">
                        <PS.InputBox
                          id={`${el.id}`}
                          className="simple"
                          placeholder="버킷리스트를 작성해주세요"
                          defaultValue={el.content}
                          onChange={handleInputContent('content')}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        ></PS.InputBox>
                        <div>
                          <PS.Btn
                            className="delete Simple"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(idx);
                            }}
                          >
                            삭제
                          </PS.Btn>
                          <PS.Btn
                            className="modify Simple"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(el.id);
                            }}
                          >
                            저장
                          </PS.Btn>
                        </div>
                      </div>
                    ) : (
                      <div className="content">
                        {idx + 1}. {el.content}
                      </div>
                    )}
                  </PS.BucketlistContent>
                );
              })}
              {isPost.isCreate && isPost.isEditMode && (
                <PS.BucketlistContent className="simple">
                  {/* 간략하게 보기,편집 on */}
                  <div className="content">
                    <PS.InputBox
                      className="simple"
                      placeholder="버킷리스트를 작성해주세요"
                      onChange={handleInputContent('content')}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    ></PS.InputBox>
                    <div>
                      <PS.Btn className="simpleCreate">생성</PS.Btn>
                    </div>
                  </div>
                </PS.BucketlistContent>
              )}
              {/* 간략하게 보기,생성 버튼 */}
              {isPost.isEditMode && (
                <PS.BucketlistCreate
                  onClick={() => {
                    handleBucketlistCreate();
                  }}
                >
                  <PS.Btn className="create createSimple">
                    <BsPlusCircleDotted size={30} />
                  </PS.Btn>
                </PS.BucketlistCreate>
              )}
            </PS.BucketlistBox>
          ) : (
            <PS.BucketlistBox>
              {/* 이미지 보기,편집 on */}
              {statePost.bucketlist.map((el, idx) => {
                return (
                  <PS.BucketlistView key={el.id}>
                    {isPost.isEditMode ? (
                      <>
                        <div>
                          <PS.BucketlistImg />
                          <PS.BucketlistContent>
                            <PS.InputBox
                              id={`${el.id}`}
                              placeholder="버킷리스트를 작성해주세요"
                              defaultValue={el.content}
                              onChange={handleInputContent('content')}
                            />
                            <PS.TextArea
                              placeholder="내용을 작성해주세요. 100이내로 작성해주세요."
                              maxLength={100}
                            >
                              {el.content}
                            </PS.TextArea>
                          </PS.BucketlistContent>
                        </div>
                        <div>
                          <PS.Btn
                            className="delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(idx);
                            }}
                          >
                            삭제
                          </PS.Btn>
                          <PS.Btn
                            className="modify"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(el.id);
                            }}
                          >
                            저장
                          </PS.Btn>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* 이미지 보기,편집 off */}
                        <div>
                          <PS.BucketlistImg />
                          {/* //이미지 경로 설정 */}
                          <PS.BucketlistContent>
                            <div className="content">
                              {idx + 1}. {el.content}
                            </div>
                            <div>
                              365일 기계처럼 일하는 내 인생 언젠간 서핑만은
                              해보고싶다!!
                            </div>
                          </PS.BucketlistContent>
                        </div>
                      </>
                    )}
                  </PS.BucketlistView>
                );
              })}
              {/* 생성 박스 */}
              {isPost.isCreate && isPost.isEditMode && (
                <>
                  <PS.BucketlistView>
                    <div>
                      <PS.BucketlistImg />
                      <PS.BucketlistContent>
                        <PS.InputBox
                          placeholder="버킷리스트를 작성해주세요"
                          onChange={handleInputContent('content')}
                        />
                        <PS.TextArea
                          placeholder="내용을 작성해주세요. 100이내로 작성해주세요."
                          maxLength={100}
                        ></PS.TextArea>
                      </PS.BucketlistContent>
                    </div>
                    <div>
                      <PS.Btn className="createBtn" onClick={() => {}}>
                        생성
                      </PS.Btn>
                    </div>
                  </PS.BucketlistView>
                </>
              )}
              {/* 생성 버튼 */}
              {isPost.isEditMode && (
                <PS.BucketlistCreate
                  onClick={() => {
                    handleBucketlistCreate();
                  }}
                >
                  <PS.Btn className="create">
                    <div>버킷리스트 추가</div>
                    <BsPlusCircleDotted size={40} />
                  </PS.Btn>
                </PS.BucketlistCreate>
              )}
            </PS.BucketlistBox>
          )}
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

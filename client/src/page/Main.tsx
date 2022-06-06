//library
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//components
import Headers from '../components/Headers';
import { TypeRootReducer } from '../redux/store/store';
import TypeRedux from '../redux/reducer/typeRedux';
import {
  postAll,
  postAllAdd,
  postAllpotoDownload,
  postEach,
} from '../redux/action';
import { useEffect, useRef, useState } from 'react';
import Spinner from '../utils/spinner';
import axiosInstance from '../utils/axios';
import finger1 from '../assets/poto/손1.png';
import finger2 from '../assets/poto/손2.png';
import finger3 from '../assets/poto/손3.png';

export const MainDiv = styled.div`
  background-color: ${({ theme }) => theme.mode.background1};
  height: 100px;
`;
export const MainBack = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: ${({ theme }) => theme.mode.background1};
  display: flex;
  flex-direction: row;
  justify-content: center;

  min-width: 200px;
`;
export const MainPostBack = styled.div`
  //flex-grow: 3;
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //  justify-content: space-around;

  flex-flow: row wrap;
  row-gap: 30px;
  column-gap: 30px;
  text-align: center;
`;

// export const MainRankingBox = styled.div`
//  // flex-grow: 1;
//   width: 200px;
//   height: 400px;
//   border-radius: 10px;
//   margin-right: 50px;
//   background-color: ${({ theme }) => theme.mode.background2};
//   box-shadow: 0px 0px 1px 1px ${({ theme }) => theme.mode.borderBox};
//   @media screen and (max-width: 950px) {
//     width: 0px;
//     height: 0px;
//     box-shadow: 0px 0px 0px 0px;
//     overflow: hidden;
//   }
// `;
export const MainPostSort = styled.div``;
export const MainPost = styled.div`
  height: 350px;
  width: 300px;
  z-index: 0px;
  background-color: ${({ theme }) => theme.mode.background2};
  box-shadow: 0px 0px 1px 1px ${({ theme }) => theme.mode.borderBox};
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  transition: 600ms;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  opacity: 0.8;
  &:hover {
    opacity: 1;
    transform: translateY(-15px);
    transition: 500ms;
  }
  @media screen and (max-width: 1170px) {
    height: 270px;
    width: 210px;
  }
  @media screen and (max-width: 600px) {
    height: 400px;
    width: 360px;
    min-width: 300px;
  }
`;

export const PostImg = styled.img`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
  height: 50%;
`;
export const PostContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 50%;
`;
export const PostBoxNickname = styled.div`
  border: 1px solid;
  text-align: right;

  width: 100%;
  height: 60px;
`;
export const Line = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
`;
export const PostBucketlist = styled.div`
  padding-left: 20px;
  line-height: 22px;
  text-align: left;
`;
export const PostBucketlistLine = styled.div`
  width: 95%;
  overflow: hidden;
  font-weight: 300;
  white-space: nowrap;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
`;
export const PostBucketlistNickname = styled.div`
  font-size: 12px;
  color: #6495ed;
  text-align: right;
  padding: 10px;
  padding-right: 20px;
`;

function Main() {
  const stateAllPost: TypeRedux.TypePostsData[] = useSelector(
    (state: TypeRootReducer) => state.postsReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //! POST 클릭시
  const handlePostClick = (id: number) => {
    navigate(`/post/${id}`);
  };

  const [spinner, setSpinner] = useState(false);
  //! 모든 게시물 불러오기
  useEffect(() => {
    axiosInstance
      .get(`/post`)
      .then((res) => {
        console.log(res.data);
        dispatch(postAll(res.data));
        res.data.forEach((el: TypeRedux.TypePostsData) =>
          el.bucketlist.forEach((el) => s3Download(el.id, el.image_path))
        );
        setSpinner(true);
      })
      .catch((err) => {
        console.log(err, 'Post All err ');
      });
  }, []);

  const s3Download = (id: number, data?: string) => {
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
              dispatch(postAllpotoDownload(id, url));
              // dispatch(postImgDownload(url, id));
              // dispatch(postImgOrigin(url, id));

              // setSpinnerImg(false);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err, 's3 err');
        });
    } else {
      dispatch(postAllpotoDownload(id, null));
      //dispatch(postImgOrigin('', id));
    }
  };

  const [postInfiniteScrollEnd, setPostInfiniteScrollEnd] = useState(false);
  const getAllpost = () => {
    axiosInstance
      .get(`/post?last_id=${stateAllPost[stateAllPost.length - 1].id}`)
      .then((res) => {
        if (res.data.length !== 0) {
          dispatch(postAllAdd(res.data));
        } else {
          setPostInfiniteScrollEnd(true);
        }
      })
      .catch((err) => {
        console.log(err, 'Post All err ');
      });
  };

  const observerRef = useRef<IntersectionObserver>();
  const boxRef = useRef(null);

  useEffect(() => {
    if (!postInfiniteScrollEnd) {
      observerRef.current = new IntersectionObserver((entries, io) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            io.unobserve(entry.target);
            getAllpost();
          }
        });
      });
      boxRef.current && observerRef.current.observe(boxRef.current);
    }
  }, [stateAllPost]);
  return (
    <>
      {!spinner && <Spinner />}
      <Headers></Headers>
      <MainBack>
        <MainPostBack>
          {stateAllPost.map((el: TypeRedux.TypePostsData, idx) => {
            if (stateAllPost.length - 5 === idx) {
              return (
                <MainPost
                  key={el.id}
                  onClick={() => {
                    handlePostClick(el.id);
                  }}
                  ref={boxRef}
                >
                  {el.bucketlist[0].image_path &&
                  el.bucketlist[0].image_path.includes('blob') ? (
                    <PostImg src={el.bucketlist[0].image_path} />
                  ) : el.bucketlist[0].image_path === null ? (
                    <div>사진 없음</div>
                  ) : (
                    <Spinner></Spinner>
                  )}
                  <PostContentBox>
                    <PostBucketlist>
                      {el.bucketlist
                        .filter((el, idx) => {
                          return idx < 3;
                        })
                        .map((el, idx) => {
                          return (
                            <PostBucketlistLine key={idx}>
                              <img
                                src={
                                  idx === 0
                                    ? finger1
                                    : idx === 1
                                    ? finger2
                                    : finger3
                                }
                                style={{ width: '15px', height: '22px' }}
                              />
                              . {el.content}
                            </PostBucketlistLine>
                          );
                        })}
                    </PostBucketlist>
                    <Line></Line>
                    <PostBucketlistNickname>
                      {el.nickname}
                    </PostBucketlistNickname>
                  </PostContentBox>
                </MainPost>
              );
            } else {
              return (
                <MainPost
                  key={el.id}
                  onClick={() => {
                    handlePostClick(el.id);
                  }}
                >
                  {el.bucketlist[0].image_path &&
                  el.bucketlist[0].image_path.includes('blob') ? (
                    <PostImg src={el.bucketlist[0].image_path} />
                  ) : el.bucketlist[0].image_path === null ? (
                    <div>사진 없음</div>
                  ) : (
                    <Spinner></Spinner>
                  )}

                  <PostContentBox>
                    <PostBucketlist>
                      {el.bucketlist
                        .filter((el, idx) => {
                          return idx < 3;
                        })
                        .map((el, idx) => {
                          return (
                            <PostBucketlistLine key={idx}>
                              <img
                                src={
                                  idx === 0
                                    ? finger1
                                    : idx === 1
                                    ? finger2
                                    : finger3
                                }
                                style={{
                                  width: '15px',
                                  height: '22px',
                                  marginRight: '10px',
                                  marginTop: '12px',
                                }}
                              />
                              {el.content}
                            </PostBucketlistLine>
                          );
                        })}
                    </PostBucketlist>
                    <Line></Line>
                    <PostBucketlistNickname>
                      {el.nickname}
                    </PostBucketlistNickname>
                  </PostContentBox>
                </MainPost>
              );
            }
          })}
        </MainPostBack>
      </MainBack>
    </>
  );
}

export default Main;

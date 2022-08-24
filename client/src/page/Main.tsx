//library
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//components or efc
import Headers from '../components/Headers';
import { TypeRootReducer } from '../redux/store/store';
import TypeRedux from '../redux/reducer/typeRedux';
import { postAll, postAllAdd, postAllphotoDownload } from '../redux/action';
import { useEffect, useRef, useState } from 'react';
import Spinner from '../utils/spinner';
import axiosInstance from '../utils/axios';
import finger1 from '../assets/photo/손1.png';
import finger2 from '../assets/photo/손2.png';
import finger3 from '../assets/photo/손3.png';
import * as MS from './style/MainStyledComponents';

function Main() {
  const stateAllPost: TypeRedux.TypePostsData[] = useSelector(
    (state: TypeRootReducer) => state.postsReducer
  );
  const [search, setSearch] = useState({
    nickname: '',
  });
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

  const s3Download = (id: number, data?: string | null) => {
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
              dispatch(postAllphotoDownload(id, url));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err, 's3 err');
        });
    } else {
      dispatch(postAllphotoDownload(id, null));
      //dispatch(postImgOrigin('', id));
    }
  };

  const [postInfiniteScrollEnd, setPostInfiniteScrollEnd] = useState(false);
  const getAllpost = () => {
    axiosInstance
      .get(
        `/post?last_id=${stateAllPost[stateAllPost.length - 1].id}&nickname=${
          search.nickname
        }`
      )
      .then((res) => {
        if (res.data.length !== 0) {
          dispatch(postAllAdd(res.data));
          res.data.forEach((el: TypeRedux.TypePostsData) =>
            el.bucketlist.forEach((el) => s3Download(el.id, el.image_path))
          );
        } else {
          setPostInfiniteScrollEnd(true);
        }
      })
      .catch((err) => {
        console.log(err, 'Post All err ');
      });
  };

  //! Intersection Observer API 블로깅 하기
  const observerRef = useRef<IntersectionObserver>(); //뷰포트
  const boxRef = useRef(null); //target 관찰자

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
  }, [boxRef.current]);

  const handleInput = (key: string) => (e: { target: HTMLInputElement }) => {
    setSearch({ ...search, [key]: e.target.value });
  };

  return (
    <>
      {!spinner ? (
        <Spinner />
      ) : (
        <>
          <Headers search={search} handleInput={handleInput}></Headers>
          <MS.MainBack>
            {!stateAllPost.length && (
              <MS.SearchFail>조건에 맞는 버킷리스트가 없습니다.</MS.SearchFail>
            )}
            <MS.MainPostBack>
              {stateAllPost.map((el: TypeRedux.TypePostsData, idx) => {
                return (
                  <MS.MainPost
                    key={el.id}
                    onClick={() => {
                      handlePostClick(el.id);
                    }}
                    ref={stateAllPost.length - 5 === idx ? boxRef : null}
                  >
                    {el.bucketlist[0].image_path &&
                    el.bucketlist[0].image_path.includes('blob') ? (
                      <MS.PostImg src={el.bucketlist[0].image_path} />
                    ) : el.bucketlist[0].image_path === null ? (
                      <div>사진 없음</div>
                    ) : (
                      <Spinner></Spinner>
                    )}
                    <MS.PostContentBox>
                      <MS.PostBucketlist>
                        {el.bucketlist
                          .filter((el, idx) => {
                            return idx < 3;
                          })
                          .map((el, idx) => {
                            return (
                              <MS.PostBucketlistLine key={idx}>
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
                              </MS.PostBucketlistLine>
                            );
                          })}
                      </MS.PostBucketlist>
                      <MS.Line></MS.Line>
                      <MS.PostBucketlistNickname>
                        {el.nickname}
                      </MS.PostBucketlistNickname>
                    </MS.PostContentBox>
                  </MS.MainPost>
                );
              })}
            </MS.MainPostBack>
          </MS.MainBack>
        </>
      )}
    </>
  );
}

export default Main;

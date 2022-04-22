//library
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MdEditCalendar } from 'react-icons/md';
//components
import { TypeRootReducer } from '../redux/store/store';
import { HeaderBack, LoginBtn } from './style/HeadersS';
import { isLogin, isLogout, modalOpen, postAll } from '../redux/action';
import axios from 'axios';
import axiosInstance from './axios';

export const CreatePostBtn = styled.div`
  position: fixed;
  right: 10px;
  top: 300px;
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.mode.background2};
  box-shadow: 3px 3px 4px 2px ${({ theme }) => theme.mode.borderBox};
  transition: 500ms;
  &:hover {
    transition: 500ms;
    width: 200px;
  }
  cursor: pointer;
  > svg {
    padding: 10px;
  }
`;
function Headers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateIsLogin = useSelector(
    (state: TypeRootReducer) => state.isLoginReducer
  );
  //! 새로고침
  useEffect(() => {
    if (window.localStorage.getItem('accessToken')) {
      dispatch(isLogin());
    }
    return;
  }, [dispatch]);

  //! 모든 게시물 불러오기
  useEffect(() => {
    axiosInstance
      .get(`/post`)
      .then((res) => {
        dispatch(postAll(res.data));
      })
      .catch((err) => {
        console.log(err, 'Post All err ');
      });
  }, []);

  //! 로그아웃
  const handleLoginLogoutBtn = () => {
    if (stateIsLogin) {
      let accessToken = window.localStorage.getItem('accessToken');
      axiosInstance
        .get(`/logout`)
        .then((res) => {
          window.localStorage.removeItem('accessToken');
          window.localStorage.removeItem('user');
          dispatch(isLogout());
          navigate('/');
        })
        .catch((err) => {
          console.log(err, '로그아웃 err');
        });
    } else {
      navigate('/login');
    }
  };

  //! useEffect 더 공부해보기
  //참고 링크 https://www.rinae.dev/posts/a-complete-guide-to-useeffect-ko
  //useReducer, useCallback, useMemo 배우기
  let getPostId = window.localStorage.getItem('user');
  let parse_post_id: number;
  if (getPostId !== null) {
    parse_post_id = Number(JSON.parse(getPostId).post_id);
  }
  const handleMyPostBtn = () => {
    if (parse_post_id) {
      navigate(`/`);
      setTimeout(() => {
        navigate(`/post/${parse_post_id}`);
      }, 10);
    } else {
      dispatch(modalOpen('로그인을 먼저 진행해주세요.'));
      navigate(`/login`);
    }
  };
  const handleMypageMove = () => {
    navigate('/mypage');
  };

  return (
    <HeaderBack>
      <div onClick={() => navigate('/')}>여기는 헤더,클릭시 메인페이지로</div>

      <LoginBtn
        onClick={() => {
          handleLoginLogoutBtn();
        }}
      >
        {stateIsLogin ? '로그아웃' : '로그인'}
      </LoginBtn>
      <LoginBtn
        onClick={() => {
          handleMypageMove();
        }}
      >
        마이페이지
      </LoginBtn>
      <CreatePostBtn
        onClick={() => {
          handleMyPostBtn();
        }}
      >
        <MdEditCalendar size={30}></MdEditCalendar>
      </CreatePostBtn>
    </HeaderBack>
  );
}

export default Headers;

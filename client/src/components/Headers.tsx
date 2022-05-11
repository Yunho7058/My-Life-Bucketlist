//library
import { useEffect, useState } from 'react';
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
import ScrollTopBtn from '../utils/scrollTopBtn';
import Toggle from './toggle';

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
export const LogoTitle = styled.div`
  text-align: center;
  padding-left: 15px;
  height: 50px;
  line-height: 50px;
`;

//https://cssarrowplease.com/ 말풍선 커스텀 사이트
export const TestCss = styled.div`
  position: absolute;
  padding: 20px;
  padding-left: 50px;
  top: 70px;
  right: 230px;
  width: 180px;
  height: 200px;
  border-radius: 15px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  &.arrow_box {
    position: relative;
    background-color: ${({ theme }) => theme.mode.background2};
  }
  &.arrow_box:after,
  &.arrow_box:before {
    bottom: 100%;
    left: 90%;
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &.arrow_box:after {
    border-color: rgba(136, 183, 213, 0);
    border-bottom-color: ${({ theme }) => theme.mode.background2};
    border-width: 10px;
    margin-left: -20px;
  }
  &.arrow_box:before {
    border-color: rgba(194, 225, 245, 0);
    border-width: 13px;
    margin-left: -23px;
  }
`;
export const SideId = styled.div`
  margin-bottom: 20px;
`;
export const SideLine = styled.div`
  position: absolute;
  top: 80px;
  left: 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  width: 100%;
`;
export const SideMenu = styled.div`
  cursor: pointer;
  &:hover {
    transform: scale(1.01);
    //color: #6495ed;
  }
`;

function Headers() {
  const [isSidebar, setIsSiderbar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let getUserId = window.localStorage.getItem('user');
  let parse_user_email: string = '';
  let parse_user_nickname: string = '';
  if (getUserId !== null) {
    parse_user_email = JSON.parse(getUserId).email;
    parse_user_nickname = JSON.parse(getUserId).nickname;
  }
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
  const handleIsSidebar = () => {
    setIsSiderbar(!isSidebar);
  };
  return (
    <div style={{ position: 'relative', zIndex: '1000px' }}>
      <HeaderBack>
        <ScrollTopBtn></ScrollTopBtn>
        <LogoTitle onClick={() => navigate('/')}>My Life Bucketlist</LogoTitle>

        {stateIsLogin ? (
          <>
            <div
              className="프로필 사진(임시)"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'white',
                borderRadius: '20px',
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={() => {
                handleIsSidebar();
              }}
            >
              {isSidebar && (
                <TestCss
                  className="arrow_box"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <SideId>
                    {parse_user_nickname}
                    <div>{parse_user_email}</div>
                  </SideId>
                  <SideLine></SideLine>
                  <SideMenu
                    onClick={() => {
                      handleMyPostBtn();
                    }}
                  >
                    나의 버킷리스트
                  </SideMenu>
                  <SideMenu
                    onClick={() => {
                      handleMypageMove();
                    }}
                  >
                    마이페이지
                  </SideMenu>
                  <SideMenu
                    onClick={() => {
                      handleLoginLogoutBtn();
                    }}
                  >
                    로그아웃
                  </SideMenu>
                  <Toggle></Toggle>
                </TestCss>
              )}
            </div>
          </>
        ) : (
          <LoginBtn
            onClick={() => {
              handleLoginLogoutBtn();
            }}
          >
            로그인
          </LoginBtn>
        )}
      </HeaderBack>
    </div>
  );
}

export default Headers;

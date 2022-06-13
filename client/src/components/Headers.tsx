//library
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

//components
import { TypeRootReducer } from '../redux/store/store';
import * as HS from './style/HeadersStyledComponents';
import { getUserInfo, isLogin, isLogout } from '../redux/action';

import { FaUserCircle } from 'react-icons/fa';
import axiosInstance from '../utils/axios';
import ScrollTopBtn from '../utils/scrollTopBtn';
import Toggle from './toggle';
import Spinner from '../utils/spinner';
import TypeRedux from '../redux/reducer/typeRedux';

const Headers = function () {
  const [isSidebar, setIsSiderbar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stateIsLogin = useSelector(
    (state: TypeRootReducer) => state.isLoginReducer
  );
  const stateUserInfo: TypeRedux.TypeUserInfo = useSelector(
    (state: TypeRootReducer) => state.userInfo
  );

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(userInfoSave());
  //   }, 2000);
  // }, [stateIsLogin]);

  //! 새로고침
  useEffect(() => {
    if (window.localStorage.getItem('accessToken')) {
      dispatch(isLogin());
      if (!stateUserInfo.user_id) {
        dispatch(getUserInfo());
      }
    }
    return;
  }, [dispatch]);

  //! 로그아웃
  const handleLoginLogoutBtn = () => {
    if (stateIsLogin) {
      axiosInstance
        .get(`/logout`)
        .then((res) => {
          window.localStorage.removeItem('accessToken');
          //window.localStorage.removeItem('user');
          dispatch(isLogout());
          navigate('/');
          window.location.reload();
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
  // let getPostId = window.localStorage.getItem('user');
  // let parse_post_id: number;
  // if (getPostId !== null) {
  //   parse_post_id = Number(JSON.parse(getPostId).post_id);
  // }
  const handleMyPostBtn = () => {
    window.location.replace(`/post/${stateUserInfo.post_id}`);
    //navigate(`/post/${parse_post_id}`);
  };
  const handleMypageMove = () => {
    navigate('/mypage');
  };
  const handleIsSidebar = () => {
    setIsSiderbar(!isSidebar);
  };

  return (
    <div style={{ position: 'relative', zIndex: '1000px' }}>
      <HS.HeaderBack>
        <ScrollTopBtn></ScrollTopBtn>
        <HS.LogoTitle onClick={() => navigate('/')}>
          My Life Bucketlist
        </HS.LogoTitle>

        {stateIsLogin ? (
          <>
            <HS.SideBtn
              onClick={() => {
                handleIsSidebar();
              }}
            >
              {/* {stateUserInfo.image_path ? (
                stateUserInfo.image_path !== null ? (
                  <HS.ProfileImg src={stateUserInfo.image_path} />
                ) : (
                  <FaUserCircle size={40} />
                )
              ) : (
                <Spinner type="profilePoto" />
              )} */}
              {stateUserInfo.image_path !== null ? (
                stateUserInfo.image_path ? (
                  <HS.ProfileImg src={stateUserInfo.image_path} />
                ) : (
                  <Spinner type="profilePoto" />
                )
              ) : (
                <FaUserCircle size={40} />
              )}

              {isSidebar && (
                <HS.SidebarBack
                  className="arrow_box"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <HS.SideId>
                    {stateUserInfo.nickname}
                    <div>{stateUserInfo.email}</div>
                  </HS.SideId>
                  <HS.SideLine></HS.SideLine>
                  <HS.SideMenu
                    onClick={() => {
                      handleMyPostBtn();
                    }}
                  >
                    나의 버킷리스트
                  </HS.SideMenu>
                  <HS.SideMenu
                    onClick={() => {
                      handleMypageMove();
                    }}
                  >
                    마이페이지
                  </HS.SideMenu>
                  <HS.SideMenu
                    onClick={() => {
                      handleLoginLogoutBtn();
                    }}
                  >
                    로그아웃
                  </HS.SideMenu>
                  <Toggle></Toggle>
                </HS.SidebarBack>
              )}
            </HS.SideBtn>
          </>
        ) : (
          <HS.LoginBtn
            onClick={() => {
              handleLoginLogoutBtn();
            }}
          >
            로그인
          </HS.LoginBtn>
        )}
      </HS.HeaderBack>
    </div>
  );
};

export default Headers;

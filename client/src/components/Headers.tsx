//library
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';

//components
import { TypeRootReducer } from '../redux/store/store';
import * as HS from './style/HeadersStyledComponents';
import {
  getUserInfo,
  isLogin,
  isLogout,
  postAll,
  postAllpotoDownload,
} from '../redux/action';

import { FaUserCircle } from 'react-icons/fa';
import axiosInstance from '../utils/axios';
import ScrollTopBtn from '../utils/scrollTopBtn';
import Toggle from './toggle';
import Spinner from '../utils/spinner';
import TypeRedux from '../redux/reducer/typeRedux';
import axios from 'axios';
import logoBlack from '../assets/poto/logo_black.png';
import logoWhite from '../assets/poto/logo_white.png';

const Headers = function ({
  search,
  handleInput,
}: {
  search?: { nickname: string };
  handleInput?: (key: string) => (e: { target: HTMLInputElement }) => void;
}) {
  const [isSidebar, setIsSiderbar] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stateIsLogin = useSelector(
    (state: TypeRootReducer) => state.isLoginReducer
  );
  const stateUserInfo: TypeRedux.TypeUserInfo = useSelector(
    (state: TypeRootReducer) => state.userInfo
  );
  const stateDarkMode = useSelector(
    (state: TypeRootReducer) => state.isDarkeMode
  );

  //! 새로고침
  useEffect(() => {
    if (window.localStorage.getItem('accessToken')) {
      dispatch(isLogin());
      // dispatch(getUserInfo());
      if (!stateUserInfo.user_id) {
        dispatch(getUserInfo());
      }
    }
  }, []);

  //! 로그아웃
  const handleLoginLogoutBtn = () => {
    if (stateIsLogin) {
      axiosInstance
        .get(`/logout`)
        .then((res) => {
          navigate('/');
          window.localStorage.removeItem('accessToken');
          window.location.reload();
          dispatch(isLogout());
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

  const handleMyPostBtn = () => {
    window.location.replace(`/post/${stateUserInfo.post_id}`);
  };
  const handleMypageMove = () => {
    navigate('/mypage');
  };
  const handleIsSidebar = () => {
    setIsSiderbar(!isSidebar);
  };

  const handlePostNicknameSearch = () => {
    if (search && search.nickname) {
      axiosInstance.get(`/post?nickname=${search.nickname}`).then((res) => {
        dispatch(postAll(res.data));
        res.data.forEach((el: TypeRedux.TypePostsData) =>
          el.bucketlist.forEach((el) => s3Download(el.id, el.image_path))
        );
      });
    }
  };
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
              dispatch(postAllpotoDownload(id, url));
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
  const enterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      return handlePostNicknameSearch();
    }
  };

  const [locationHref, setLocationHref] = useState(false);
  useEffect(() => {
    if (
      window.location.href === 'http://localhost:3000/' ||
      window.location.href === 'https://mylifebucketlist.shop/'
    ) {
      setLocationHref(true);
    } else {
      setLocationHref(false);
    }
  }, [window.location.href]);
  return (
    <div style={{ position: 'relative', zIndex: '1000px' }}>
      <HS.HeaderBack>
        <ScrollTopBtn></ScrollTopBtn>
        <HS.LogoTitle onClick={() => navigate('/')}>
          <img src={stateDarkMode === 'dark' ? logoBlack : logoWhite} />
        </HS.LogoTitle>
        {locationHref && (
          <HS.SearchBack>
            <HS.SearchInput
              type="text"
              value={search && search.nickname}
              onChange={handleInput && handleInput('nickname')}
              onKeyPress={enterKey}
            ></HS.SearchInput>
            <HS.SearchBtn onClick={() => handlePostNicknameSearch()}>
              <AiOutlineSearch size={25} />
            </HS.SearchBtn>
          </HS.SearchBack>
        )}
        {stateIsLogin ? (
          <>
            <HS.SideBtn
              onClick={() => {
                handleIsSidebar();
              }}
            >
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

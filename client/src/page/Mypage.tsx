import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../components/axios';
import Headers from '../components/Headers';
import Modal from '../components/Modal';
import { getUserInfo, modalOpen } from '../redux/action';

export const MypageBack = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.mode.background1};
  display: flex;
  justify-content: center;
  justify-content: space-around;
  overflow: auto;
`;

export const ListBox = styled.div`
  margin-top: 20%;
  padding: 10px;
  width: 25%;
  height: 150px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.mode.background2};
  box-shadow: 0px 0px 1px 1px ${({ theme }) => theme.mode.borderBox};
`;

export const ContentBox = styled.div`
  margin-top: 20%;
  display: flex;
  padding: 30px;
  flex-direction: column;
  justify-content: space-around;
  width: 60%;
  height: 300px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.mode.background2};
  box-shadow: 0px 0px 1px 1px ${({ theme }) => theme.mode.borderBox};
`;

export const ListTitle = styled.div`
  padding: 10px;
  padding-left: 50px;
  height: 40px;
  line-height: 40px;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.mode.background1};
  }
`;
export const MyBucketlist = styled.div`
  cursor: pointer;
  &:hover {
    color: #6495ed;
    text-decoration: underline;
  }
`;
export const BookBucketlistBack = styled.div``;
export const BookBucketlistBox = styled.div`
  border: 1px solid;
  width: 90%;
  height: 160px;
`;
export const BookBucketlist = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    color: #6495ed;
    text-decoration: underline;
  }
`;
export const ProfilList = styled.div`
  display: flex;
  margin-left: 40px;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 70px;
`;
export const ProfilTilte = styled.div`
  text-align: center;
  width: 80px;
`;
export const ProfilContent = styled.div`
  padding: 8px;
  width: 120px;
  height: 40px;
`;
export const ProfilContentInput = styled.input`
  width: 140px;
  height: 35px;
  margin-right: -29px;
  margin-bottom: 18px;
  border-radius: 10px;
  border: 1px solid #696969;
  padding-left: 10px;
  background-color: ${({ theme }) => theme.mode.BGInput};
  color: ${({ theme }) => theme.mode.FCInput};
  outline: none;
  &:hover {
    border: 1px solid rgb(100, 100, 255);
  }
  &:focus {
    border: 1px solid #4169e1;
    background-color: ${({ theme }) => theme.mode.background2};
  }
`;
export const Btn = styled.div`
  border-radius: 10px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  cursor: pointer;
  width: 70px;
  &.delete {
    background-color: #cd5c5c;
    width: 20%;
    &:hover {
      background-color: #c77171;
    }
  }
  &.change {
    width: 40%;
    width: 100px;
    &:hover {
      background-color: #6495ed;
    }
  }
  &:hover {
    background-color: #6495ed;
  }
`;
type bookBucketlistInfo = { nickname: string; id: number }[];
const Mypage = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState(0);
  const [bookBucketlist, setBookBucketlist] = useState<bookBucketlistInfo>();
  const handleListChange = (list: number) => {
    setList(list);
  };
  const navigate = useNavigate();
  let getUser = window.localStorage.getItem('user');
  const [userInfo, setUserInfo] = useState({
    parse_post_id: 0,
    parse_user_email: '',
    parse_user_nickname: '',
    parse_user_domain: '',
  });
  useEffect(() => {
    if (getUser !== null) {
      setUserInfo({
        parse_user_email: JSON.parse(getUser).email,
        parse_post_id: Number(JSON.parse(getUser).post_id),
        parse_user_nickname: JSON.parse(getUser).nickname,
        parse_user_domain: JSON.parse(getUser).domain,
      });
    }
  }, []);

  //! 북마크 게시물 리스트
  useEffect(() => {
    axiosInstance
      .get('/bookmark')
      .then((res) => {
        setBookBucketlist(
          res.data.map((el: { nickname: string; id: number }) => {
            return { nickname: el.nickname, id: el.id };
          })
        );
      })
      .catch((err) => {
        console.log(err, 'bookmark get err');
      });
  }, []);
  const [nicknameChange, setNicknameChange] = useState({
    is: false,
    isNickNameCheck: false,
    nickname: '',
  });
  const handleNicknameInput =
    (key: string) => (e: { target: HTMLInputElement }) => {
      setNicknameChange({ ...nicknameChange, [key]: e.target.value });
    };
  const handleNicknameEdit = () => {
    if (nicknameChange.nickname.length < 1) {
      dispatch(modalOpen('닉네임을 입력해주세요.'));
    } else {
      axiosInstance
        .post(`/nickname`, {
          nickname: nicknameChange.nickname,
        })
        .then((res) => {
          setNicknameChange({ ...nicknameChange, isNickNameCheck: true });
        })
        .catch((err) => {
          dispatch(modalOpen('중복된 닉네임입니다.'));
          console.log(err, 'nickname check err');
        });
    }
  };
  useEffect(() => {
    axiosInstance
      .patch('/nickname', { nickname: nicknameChange.nickname })
      .then((res) => {
        dispatch(modalOpen('닉네임이 변경되었습니다.'));
        setNicknameChange({
          ...nicknameChange,
          is: false,
          isNickNameCheck: false,
        });
        setUserInfo({
          ...userInfo,
          parse_user_nickname: nicknameChange.nickname,
        });
        dispatch(getUserInfo());
      })
      .catch((err) => {
        console.log(err, 'nickname edit err');
      });
  }, [nicknameChange.isNickNameCheck]);

  const handlePasswordEdit = () => {
    if (!userInfo.parse_user_domain) {
      dispatch(modalOpen('password'));
    } else {
      dispatch(modalOpen('SNS이용자는 변경하실 수 없습니다.'));
    }
  };
  const handleSignout = () => {
    dispatch(modalOpen('signout'));
  };

  return (
    <>
      <Headers></Headers>
      <Modal></Modal>
      <MypageBack>
        <ListBox>
          <ListTitle onClick={() => handleListChange(0)}>
            버킷리스트 관리
          </ListTitle>
          <ListTitle onClick={() => handleListChange(1)}>프로필 설정</ListTitle>
        </ListBox>
        <ContentBox>
          {list === 0 && (
            <>
              <MyBucketlist
                onClick={() => {
                  navigate(`/post/${userInfo.parse_post_id}`);
                }}
              >
                나의 버킷리스트 바로가기
              </MyBucketlist>
              <BookBucketlistBack>
                북마크한 버킷리스트
                <BookBucketlistBox>
                  {bookBucketlist &&
                    bookBucketlist.map((el, idx) => {
                      return (
                        <BookBucketlist
                          key={el.id}
                          onClick={() => navigate(`/post/${el.id}`)}
                        >
                          {idx + 1}. {el.nickname}님의 버킷리스트
                        </BookBucketlist>
                      );
                    })}
                </BookBucketlistBox>
              </BookBucketlistBack>
            </>
          )}
          {list === 1 && (
            <>
              <ProfilList>
                <ProfilTilte>사진</ProfilTilte>
              </ProfilList>
              <ProfilList>
                <ProfilTilte>닉네임</ProfilTilte>
                {nicknameChange.is ? (
                  <ProfilContentInput
                    type="text"
                    value={nicknameChange.nickname}
                    placeholder={`${userInfo.parse_user_nickname}`}
                    onChange={handleNicknameInput('nickname')}
                  />
                ) : (
                  <ProfilContent>{userInfo.parse_user_nickname}</ProfilContent>
                )}

                {nicknameChange.is ? (
                  <div
                    style={{
                      display: 'flex',
                      columnGap: '10px',
                    }}
                  >
                    <Btn
                      onClick={() => {
                        handleNicknameEdit();
                      }}
                    >
                      수정
                    </Btn>
                    <Btn
                      onClick={() => {
                        setNicknameChange({ ...nicknameChange, is: false });
                      }}
                    >
                      취소
                    </Btn>
                  </div>
                ) : (
                  <Btn
                    className="change"
                    onClick={() => {
                      setNicknameChange({ ...nicknameChange, is: true });
                    }}
                  >
                    닉네임 변경
                  </Btn>
                )}
              </ProfilList>
              <ProfilList>
                <ProfilTilte>이메일</ProfilTilte>
                <ProfilContent>{userInfo.parse_user_email}</ProfilContent>
              </ProfilList>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Btn className="change" onClick={() => handlePasswordEdit()}>
                  비밀번호 변경
                </Btn>
                <Btn className="delete" onClick={() => handleSignout()}>
                  회원탈퇴
                </Btn>
              </div>
            </>
          )}
        </ContentBox>
      </MypageBack>
    </>
  );
};

export default Mypage;

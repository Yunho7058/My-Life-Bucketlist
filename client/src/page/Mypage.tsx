import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaUserEdit } from 'react-icons/fa';
import styled from 'styled-components';
import axiosInstance from '../utils/axios';
import Headers from '../components/Headers';
import Modal from '../components/Modal';
import { modalOpen, userNicknameEdit, userPhotoEdit } from '../redux/action';
import { BiBook } from 'react-icons/bi';
import { BsBucketFill } from 'react-icons/bs';
import { TypeRootReducer } from '../redux/store/store';
import * as MS from './style/MypageStyledComponents';
import TypeRedux from '../redux/reducer/typeRedux';

type bookBucketlistInfo = { nickname: string; id: number }[];
const Mypage = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState(0);
  const [bookBucketlist, setBookBucketlist] = useState<bookBucketlistInfo>();
  const handleListChange = (list: number) => {
    setList(list);
  };
  const navigate = useNavigate();
  const stateUserInfo: TypeRedux.TypeUserInfo = useSelector(
    (state: TypeRootReducer) => state.userInfo
  );

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
    if (nicknameChange.isNickNameCheck) {
      axiosInstance
        .patch('/nickname', { nickname: nicknameChange.nickname })
        .then((res) => {
          dispatch(modalOpen('닉네임이 변경되었습니다.'));
          setNicknameChange({
            ...nicknameChange,
            is: false,
            isNickNameCheck: false,
          });
          dispatch(userNicknameEdit(nicknameChange.nickname));
        })
        .catch((err) => {
          console.log(err, 'nickname edit err');
        });
    }
  }, [nicknameChange.isNickNameCheck]);

  const handlePasswordEdit = () => {
    if (!stateUserInfo.domain) {
      dispatch(modalOpen('password'));
    } else {
      dispatch(modalOpen('SNS이용자는 변경하실 수 없습니다.'));
    }
  };
  //회원탈퇴 클릭
  const handleSignout = () => {
    if (stateUserInfo.domain) {
      axiosInstance
        .post('/user/email')
        .then((res) => {})
        .catch((err) => console.log(err));
    }
    dispatch(modalOpen('signout'));
  };
  const photoInput = useRef<HTMLInputElement>(null);
  const handlePhotoInput = () => {
    if (photoInput.current) {
      photoInput.current.click();
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
  const onLoadFile = (e: { target: HTMLInputElement }) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      const fileList = e.target.files; //선택한 사진 파일
      let imgUrl = URL.createObjectURL(fileList[0]); //미리보기를 위한 파일 변경

      dispatch(userPhotoEdit(imgUrl));
      setFile(fileList);
      setFileName(fileList[0].name); //선택한 사진 파일 이름
    }
  };

  //server로 부터 s3접급 key 받아오기
  useEffect(() => {
    axiosInstance
      .get(`/profile/presigned-post?file_name=${fileName}`) //server 파일이름 전송
      .then((res) => {
        setPresignedPost(res.data); // server로 부터 받은 s3 key값과 url
      })
      .catch((err) => {
        console.log('photo err');
      });
  }, [fileName]);

  const handleS3ImgUpload = () => {
    const formData = new FormData(); //fromdata 생성
    if (presignedPost && file) {
      // server로 받은 정보와 선택한 사진파일 정보가 있을때
      Object.entries(presignedPost.fields).forEach((entry) => {
        const [key, value] = entry;
        formData.append(key, value); //server로 받은 정보를 fromdata에 append
      });
      formData.append('file', file[0]); // 선택한 사진 정보 또한 append
      axios
        .post(presignedPost.url, formData, {
          //server로 부터 받은 정보 url
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };
  //로컬에서 항상 가져오기 사진
  //사진 수정 버튼 클릭 시
  const handleImgEdit = () => {
    if (!stateUserInfo.image_path) {
      dispatch(modalOpen('사진을 선택해주세요.'));
    } else {
      handleS3ImgUpload();
      axiosInstance
        .patch(`/profile`, { image_path: presignedPost?.fields.key })
        .then((res) => {
          dispatch(modalOpen('수정되었습니다.'));
          navigate('/mypage');
        })
        .catch((err) => {
          console.log(err, 'new bucketlist create err');
        });
    }
  };

  return (
    <>
      <Headers></Headers>
      <Modal></Modal>
      <MS.MypageBack>
        <MS.ListBox>
          <MS.ListTitle onClick={() => handleListChange(0)}>
            <BsBucketFill size={20} />
            버킷리스트 관리
          </MS.ListTitle>
          <MS.ListTitle onClick={() => handleListChange(1)}>
            <FaUserEdit size={20} />
            프로필 설정
          </MS.ListTitle>
        </MS.ListBox>
        <MS.ContentBox className={list ? 'profile' : ''}>
          {list === 0 && (
            <>
              <MS.BookBucketlistBack>
                <MS.BookTitle>
                  <BiBook size={20} />
                  북마크한 버킷리스트
                </MS.BookTitle>
                <MS.BookBucketlistBox>
                  {bookBucketlist &&
                    bookBucketlist.map((el, idx) => {
                      return (
                        <MS.BookBucketlist
                          key={el.id}
                          onClick={() => navigate(`/post/${el.id}`)}
                        >
                          {idx + 1}. {el.nickname}님의 버킷리스트
                        </MS.BookBucketlist>
                      );
                    })}
                </MS.BookBucketlistBox>
              </MS.BookBucketlistBack>
            </>
          )}
          {list === 1 && (
            <>
              <MS.ProfilList>
                <MS.DivLine>
                  <MS.ProfilTilte>프로필 사진</MS.ProfilTilte>
                </MS.DivLine>
                <MS.DivLine>
                  {stateUserInfo.image_path ? (
                    <MS.PostPhoto
                      alt="sample"
                      src={stateUserInfo.image_path}
                      onClick={() => handlePhotoInput()}
                    />
                  ) : (
                    <FaUserCircle
                      size={40}
                      onClick={() => handlePhotoInput()}
                    ></FaUserCircle>
                  )}
                </MS.DivLine>
                <MS.ImgInput
                  type="file"
                  accept="image/*"
                  name="file"
                  ref={photoInput}
                  onChange={onLoadFile}
                />

                <MS.DivLine>
                  <MS.Btn onClick={() => handleImgEdit()}>수정</MS.Btn>
                </MS.DivLine>
              </MS.ProfilList>
              <MS.Line></MS.Line>
              <MS.ProfilList>
                <MS.DivLine>
                  <MS.ProfilTilte>닉네임</MS.ProfilTilte>
                </MS.DivLine>
                <MS.DivLine>
                  {nicknameChange.is ? (
                    <MS.ProfilContentInput
                      type="text"
                      value={nicknameChange.nickname}
                      placeholder={`${stateUserInfo.nickname}`}
                      onChange={handleNicknameInput('nickname')}
                    />
                  ) : (
                    <MS.ProfilContent>
                      {stateUserInfo.nickname}
                    </MS.ProfilContent>
                  )}
                </MS.DivLine>
                <MS.DivLine>
                  {nicknameChange.is ? (
                    <MS.NicknameBtn>
                      <MS.Btn
                        onClick={() => {
                          handleNicknameEdit();
                        }}
                      >
                        수정
                      </MS.Btn>
                      <MS.Btn
                        onClick={() => {
                          setNicknameChange({ ...nicknameChange, is: false });
                        }}
                      >
                        취소
                      </MS.Btn>
                    </MS.NicknameBtn>
                  ) : (
                    <MS.Btn
                      className="change"
                      onClick={() => {
                        setNicknameChange({ ...nicknameChange, is: true });
                      }}
                    >
                      닉네임 변경
                    </MS.Btn>
                  )}
                </MS.DivLine>
              </MS.ProfilList>
              <MS.Line></MS.Line>
              <MS.ProfilList>
                <MS.DivLine>
                  <MS.ProfilTilte>이메일</MS.ProfilTilte>
                </MS.DivLine>
                <MS.DivLine>
                  <MS.ProfilContent>{stateUserInfo.email}</MS.ProfilContent>
                </MS.DivLine>
                <MS.DivLine></MS.DivLine>
              </MS.ProfilList>
              <MS.Line></MS.Line>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <MS.Btn className="change" onClick={() => handlePasswordEdit()}>
                  비밀번호 변경
                </MS.Btn>
                <MS.Btn className="delete" onClick={() => handleSignout()}>
                  회원탈퇴
                </MS.Btn>
              </div>
            </>
          )}
        </MS.ContentBox>
      </MS.MypageBack>
    </>
  );
};

export default Mypage;

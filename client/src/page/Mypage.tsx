import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../components/axios';
import Headers from '../components/Headers';

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
export const ProfilTilte = styled.div``;
export const ProfilContent = styled.div``;
export const Btn = styled.div`
  border-radius: 10px;
  text-align: center;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  cursor: pointer;
  width: 100px;
  &.delete {
    background-color: #cd5c5c;

    &:hover {
      background-color: #c77171;
    }
  }
  &.change {
    width: 100px;
    &:hover {
      background-color: #6495ed;
    }
  }
`;
type bookBucketlistInfo = { title: string; id: number }[];
const Mypage = () => {
  const [list, setList] = useState(0);
  const [bookBucketlist, setBookBucketlist] = useState<bookBucketlistInfo>();
  const handleListChange = (list: number) => {
    setList(list);
  };
  const navigate = useNavigate();
  let getPostId = window.localStorage.getItem('user');
  let parse_post_id: number;
  if (getPostId !== null) {
    parse_post_id = Number(JSON.parse(getPostId).post_id);
  }

  useEffect(() => {
    axiosInstance
      .get('/bookmark')
      .then((res) => {
        //가져온 게시물들 관리

        //let {title, id} = res.data
        setBookBucketlist(
          res.data.map((el: { title: string; id: number }) => {
            return { title: el.title, id: el.id };
          })
        );
      })
      .catch((err) => {
        console.log(err, 'bookmark get err');
      });
  }, []);
  console.log(bookBucketlist);

  return (
    <>
      <Headers></Headers>
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
                  navigate(`/post/${parse_post_id}`);
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
                          {idx + 1}. {el.title}
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
                <ProfilTilte>닉네임</ProfilTilte>
                <ProfilContent>코코</ProfilContent>
                <Btn className="change">닉네임 변경</Btn>
              </ProfilList>
              <ProfilList>
                <ProfilTilte>이메일</ProfilTilte>
                <ProfilContent>coco@example.com</ProfilContent>
              </ProfilList>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Btn className="change">비밀번호 변경</Btn>
                <Btn className="delete">회원탈퇴</Btn>
              </div>
            </>
          )}
        </ContentBox>
      </MypageBack>
    </>
  );
};

export default Mypage;

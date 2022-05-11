//library
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//components
import Headers from '../components/Headers';
import { TypeRootReducer } from '../redux/store/store';
import TypeRedux from '../redux/reducer/typeRedux';
import { postEach } from '../redux/action';

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
  justify-content: space-evenly;
  min-width: 200px;
`;
export const MainPostBack = styled.div`
  flex-grow: 3;
  height: 100%;
  width: 80%;
  display: flex;
  flex-flow: row wrap;
  row-gap: 30px;
  column-gap: 30px;
  text-align: center;
  margin-left: 50px;
`;

export const MainRankingBox = styled.div`
  flex-grow: 1;
  width: 200px;
  height: 400px;
  border-radius: 10px;
  margin-right: 50px;
  background-color: ${({ theme }) => theme.mode.background2};
  box-shadow: 0px 0px 1px 1px ${({ theme }) => theme.mode.borderBox};
  @media screen and (max-width: 950px) {
    width: 0px;
    height: 0px;
    box-shadow: 0px 0px 0px 0px;
    overflow: hidden;
  }
`;
export const MainPostSort = styled.div``;
export const MainPost = styled.div`
  height: 310px;
  width: 270px;
  z-index: 0px;
  padding: 15px;
  padding-top: 0px;
  background-color: ${({ theme }) => theme.mode.background2};
  box-shadow: 0px 0px 1px 1px ${({ theme }) => theme.mode.borderBox};
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  transition: 600ms;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &:hover {
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
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border: 1px solid;
  padding: 10px;

  width: 100%;
  height: 100px;
`;
export const PostContentBox = styled.div`
  border: 1px solid;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100px;
`;
export const PostBoxNickname = styled.div`
  border: 1px solid;
  text-align: right;

  width: 100%;
  height: 30px;
`;
export const PostBucketlist = styled.div`
  border: 1px solid;
  text-align: left;
`;
function Main() {
  const stateAllPost: TypeRedux.TypePostsData[] = useSelector(
    (state: TypeRootReducer) => state.postsReducer
  );

  const navigate = useNavigate();

  //! POST 클릭시
  const handlePostClick = (id: number) => {
    navigate(`/post/${id}`);
  };
  return (
    <>
      <Headers></Headers>
      <MainBack>
        <MainPostBack>
          {stateAllPost.map((el: TypeRedux.TypePostsData) => {
            return (
              <MainPost
                key={el.id}
                onClick={() => {
                  handlePostClick(el.id);
                }}
              >
                <PostImg />
                <PostContentBox>
                  {el.title}
                  <PostBucketlist>
                    {el.bucketlist
                      .filter((el, idx) => {
                        return idx < 3;
                      })
                      .map((el, idx) => {
                        return (
                          <div key={idx}>
                            {idx + 1}. {el.content}
                          </div>
                        );
                      })}
                  </PostBucketlist>
                </PostContentBox>
                <PostBoxNickname>닉네임:{el.nickname}</PostBoxNickname>
              </MainPost>
            );
          })}
        </MainPostBack>
        {/* <MainRankingBox>랭킹</MainRankingBox> */}
      </MainBack>
    </>
  );
}

export default Main;

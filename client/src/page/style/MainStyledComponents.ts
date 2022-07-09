import styled from 'styled-components';

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
  min-height: 100vh;
`;

export const MainPostBack = styled.div`
  height: 100%;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  justify-items: center;
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;

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
    width: 100%;
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

export const SearchFail = styled.div`
  position: absolute;
  width: 100%;
  font-size: 25px;
  text-align: center;
`;

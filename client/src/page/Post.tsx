//library
import styled from 'styled-components';
//component
import Headers from '../components/Headers';

export const PostBack = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.mode.background1};
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const PostBox = styled.div`
  margin-top: 100px;
  margin-bottom: 20px;
  height: 90vh;
  width: 80vw;
  display: flex;

  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.mode.background2};
  box-shadow: 0px 0px 1px 1px ${({ theme }) => theme.mode.borderBox};
  border-radius: 50px;
`;
export const PostTitle = styled.div`
  padding: 50px;
  border: 1px solid;
  width: 80%;
  height: 1%;
`;
export const BucketlistBox = styled.div`
  padding: 50px;
  border: 1px solid;
  width: 80%;
  height: 60%;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    height: 30px;
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: lightblue;
  }
  ::-webkit-scrollbar-track-piece {
    background-color: ${({ theme }) => theme.mode.background2};
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: ${({ theme }) => theme.mode.background1};
  }
`;
export const BucketlistBody = styled.div`
  border: 1px solid;
  width: 100%;
  height: 30%;
`;
export const BucketlistView = styled.div`
  padding: 15px;
  border: 1px solid;
  display: flex;
  width: 100%;
  height: 50%;
  margin-top: 20px;
  &.create {
    flex-direction: column;

    justify-content: center;

    > div {
      width: 100%;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-content: space-around;
    }
  }
`;
export const BucketlistImg = styled.img`
  border: 1px solid;
  border-radius: 30px;
  width: 45%;

  height: 180px;
  background-color: grey;
`;

export const BucketlistContent = styled.div`
  border: 1px solid;
  display: flex;
  width: 55%;

  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  > h1 {
    font-size: 20px;
  }
`;

function Post() {
  return (
    <>
      <Headers></Headers>
      <PostBack>
        <PostBox>
          <PostTitle>코코의 버킷리스트</PostTitle>
          <BucketlistBox>
            바디
            <BucketlistView>
              뷰<button>삭제</button>
              <button>수정</button>
              <BucketlistImg />
              <BucketlistContent>
                <h1> 1. 제주도 협재해변가서 서핑하기!!</h1>
                <div>
                  365일 기계처럼 일하는 내 인생 언젠간 서핑만은 해보고싶다!!
                </div>
              </BucketlistContent>
            </BucketlistView>
            <BucketlistView>
              뷰<button>삭제</button>
              <button>수정</button>
              <BucketlistImg />
              <BucketlistContent>버킷리스트 내용</BucketlistContent>
            </BucketlistView>
            <BucketlistView>
              뷰<button>삭제</button>
              <button>수정</button>
              <BucketlistImg />
              <BucketlistContent>버킷리스트 내용</BucketlistContent>
            </BucketlistView>
            <button>추가</button>
            <BucketlistView className="create">
              새로작성
              <div>
                <BucketlistImg />
                <BucketlistContent>
                  <h1> 버킷리스트를 작성 해주세요.</h1>
                  <div>100이내로 간략하게 작성해주세요.</div>
                </BucketlistContent>
              </div>
              <div>
                <button>완료</button>
                <button>취소</button>
              </div>
            </BucketlistView>
          </BucketlistBox>
        </PostBox>
      </PostBack>
    </>
  );
}

export default Post;

/*
게시물 보기 페이지? 작성 페이지?
게시물 공유하기 안하기
로그인 상태에서는 내 게시물 보기
비로그인 클릭시 '먼저 로그인을 해주세요' 문구 후 로그인 페이지로

내 게시물 들어왔을때 구분
만약 id와 유저 아이디 같으면 내 게시물 보여주기
로그인시 로컬 스토리지에 유저정보 저장?
내 게시물 들어 왔을때
게시물 수정 버튼 보이게 하고 -> 클릭 -> 버킷 리스트 +,x 버튼 생성
그리고 타이틀도 수정 가능 하게, 공개 비공개 설정도 하기
1. 다른 유저가 게시물 볼때
2. 해당 유저가 게시물 볼때(게시물 수정 버튼 추가)
*/

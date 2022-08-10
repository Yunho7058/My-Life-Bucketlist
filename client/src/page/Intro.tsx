import { useNavigate } from 'react-router-dom';

import * as IS from './style/IntroStyledComponents';
import backImg from '../assets/poto/back.png';

const IntroPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <IS.Back>
        <IS.FirstIntro>
          <IS.BackImg src={backImg}></IS.BackImg>
          <IS.TextBox>
            <IS.TextLogo>MY LIFE BUCKETLIST</IS.TextLogo>
            <IS.TextContent className="black">
              나만의 버킷리스트를 설계하고 작성해보세요.
            </IS.TextContent>
            <IS.StartBtn
              onClick={() => {
                navigate('/main');
              }}
            >
              시작하기
            </IS.StartBtn>
          </IS.TextBox>
        </IS.FirstIntro>
      </IS.Back>
    </>
  );
};

export default IntroPage;

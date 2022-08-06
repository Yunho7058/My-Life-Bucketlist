import { useNavigate } from 'react-router-dom';

import * as IS from './style/IntroStyledComponents';
// import introImageTop from '../assets/poto/intro.png';
// import introImageBottom from '../assets/poto/introBottom.png';
// import renderingPoto from '../assets/poto/renderingAdd.gif';
// import bucketlistPoto from '../assets/poto/bucketlistAdd.gif';

const IntroPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <IS.Back>
        <IS.FirstIntro>
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

// 기존 intro
// import { useNavigate } from 'react-router-dom';

// import * as IS from './style/IntroStyledComponents';
// import introImageTop from '../assets/poto/intro.png';
// import introImageBottom from '../assets/poto/introBottom.png';
// import renderingPoto from '../assets/poto/renderingAdd.gif';
// import bucketlistPoto from '../assets/poto/bucketlistAdd.gif';

// const IntroPage = () => {
//   const navigate = useNavigate();
//   return (
//     <>
//       <IS.Test12>
//         <IS.FirstIntro>
//           <IS.TextBox>
//             <IS.TextLogo>MY LIFE BUCKETLIST</IS.TextLogo>
//             <IS.TextContent className="black">
//               나만의 버킷리스트를 설계하고 작성해보세요.
//             </IS.TextContent>
//             <IS.StartBtn
//               onClick={() => {
//                 navigate('/main');
//               }}
//             >
//               시작하기
//             </IS.StartBtn>
//           </IS.TextBox>
//           <img src={introImageTop} />
//         </IS.FirstIntro>
//         <IS.SecondIntro>
//           <IS.GifBox>
//             <img src={renderingPoto} />
//             <IS.TextContent className="content">
//               여러사람의 버킷리스트를 구경해보세요.
//             </IS.TextContent>
//           </IS.GifBox>
//         </IS.SecondIntro>
//         <IS.TreeIntro>
//           <IS.GifBox className="Tree">
//             <IS.TextContent className="content">
//               나만의 버킷리스트를 작성해보세요.
//             </IS.TextContent>
//             <img src={bucketlistPoto} />
//           </IS.GifBox>
//         </IS.TreeIntro>
//         <IS.FourIntro>
//           <IS.StartBtn
//             className="last"
//             onClick={() => {
//               navigate('/main');
//             }}
//           >
//             지금 바로 시작하기
//           </IS.StartBtn>
//           <img src={introImageBottom} />
//         </IS.FourIntro>
//       </IS.Test12>
//     </>
//   );
// };

// export default IntroPage;

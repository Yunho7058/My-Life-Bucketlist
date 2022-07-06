import styled, { keyframes } from 'styled-components';

export const FirstIntro = styled.div`
  background-color: white;

  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    top: 0px;
    position: absolute;
    width: 100vw;
    height: 100vh;
    opacity: 1;
    z-index: 10;
  }
`;
export const TextBox = styled.div`
  width: 50%;
  height: 50%;
  padding: 15px;
  z-index: 100;
  /* display: grid; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const SecondIntro = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  @media screen and (max-width: 600px) {
    height: 60vh;
  }
`;

export const TreeIntro = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;

  @media screen and (max-width: 600px) {
    height: 60vh;
  }
`;

export const textAnimation = keyframes`
  0% {
    transform: translateY(0);
    transform-origin: 50% 50%;
    text-shadow: none;
  }
  100% {
    transform: translateY(-40px);
    transform-origin: 50% 50%;
    text-shadow: 0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc, 0 1px 0 #cccccc, 0 1px 0 #cccccc, 0 1px 0 #cccccc, 0 1px 0 #cccccc, 0 1px 0 #cccccc, 0 1px 0 #cccccc, 0 20px 20px rgba(255, 255, 255, 0.2);
  }
`;

export const TextLogo = styled.div`
  animation: ${textAnimation} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  z-index: 999;
  font-size: 80px;
  @media screen and (max-width: 600px) {
    font-size: 32px;
    height: 50px;
  }
`;

export const TextContent = styled.div`
  color: black;
  font-size: 21px;
  line-height: 30px;
  z-index: 10;
  &.black {
    font-size: 15px;
    color: white;
  }
`;
export const StartBtn = styled.div`
  width: 220px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border: 1px solid;
  border-radius: 15px;
  z-index: 10;
  margin-top: 15px;
  cursor: pointer;
  &:hover {
    background-color: #3f3e3e;
  }
  &.last {
    width: 320px;
    height: 80px;
    line-height: 80px;
    background-color: #3f3e3e;
    font-size: 20px;
  }
`;
export const GifBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    width: 65%;
    border-radius: 5px;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > img {
      width: 80%;
      border-radius: 5px;
    }
  }
`;

export const FourIntro = styled.div`
  width: 100%;
  height: 30vh;
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    top: 0px;
    position: absolute;
    width: 100%;
    height: 50vh;
    opacity: 1;
    z-index: 1;
  }
`;

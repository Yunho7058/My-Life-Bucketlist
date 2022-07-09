import styled, { keyframes } from 'styled-components';

export const Test12 = styled.div`
  background-color: white;
  color: white;
`;

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
  height: 80vh;
  background-color: white;
  @media screen and (max-width: 600px) {
    height: 60vh;
    display: flex;
  }
`;

export const TreeIntro = styled.div`
  width: 100%;
  height: 80vh;
  background-color: white;

  @media screen and (max-width: 600px) {
    height: 60vh;
    display: flex;
  }
`;

export const TextLogo = styled.div`
  z-index: 999;
  font-size: 80px;
  margin-bottom: 50px;
  margin-top: -60px;
  text-shadow: 15px 15px 10px rgba(0, 0, 0, 0.7);
  @media screen and (max-width: 600px) {
    font-size: 35px;
    height: 50px;
  }
`;

export const TextContent = styled.div`
  color: black;
  font-size: 21px;
  line-height: 15px;
  z-index: 10;
  &.black {
    font-size: 15px;
    color: white;
  }
  &.content {
    line-height: 30px;
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
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
  }
  @media screen and (max-width: 600px) {
    width: 160px;
    height: 50px;
  }
`;
export const GifBox = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  > img {
    width: 65%;
    height: 500px;
    border-radius: 5px;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.Tree {
      flex-direction: column-reverse;
    }
    > img {
      width: 80%;
      height: 300px;
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

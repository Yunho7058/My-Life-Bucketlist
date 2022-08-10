import styled from 'styled-components';

export const Back = styled.div`
  color: white;
`;
export const BackImg = styled.img`
  height: 100vh;
  width: 100%;
  position: absolute;
  right: 0px;
  opacity: 0.7;
  @media screen and (max-width: 600px) {
    width: 0%;
  }
`;

export const FirstIntro = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TextBox = styled.div`
  width: 50%;
  height: 50%;
  padding: 15px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 25px;
`;

export const TextLogo = styled.div`
  z-index: 999;
  font-size: 80px;
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
  background-color: white;
  color: black;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  z-index: 10;
  margin-top: 15px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }

  @media screen and (max-width: 600px) {
    width: 160px;
    height: 50px;
  }
`;

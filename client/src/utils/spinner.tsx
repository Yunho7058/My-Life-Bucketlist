import styled, { keyframes } from 'styled-components';

const Back = styled.div`
  background-color: ${({ theme }) => theme.mode.background1};
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &.img {
    width: 250px;
    height: 200px;
    border-radius: 15px;
  }
`;

const Rotate = keyframes`     
  from {transform: rotate(0deg)}
  to {transform: rotate(360deg)}
`;
const SpinnerMain = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 4px solid #6495ed;
  border-top-color: transparent;
  border-left-color: transparent;
  animation: ${Rotate} 0.7s infinite linear;
`;

const Spinner = (type: { type?: string }) => {
  return (
    <>
      {type.type === 'img' ? (
        <Back className="img">
          <SpinnerMain></SpinnerMain>
        </Back>
      ) : (
        <Back>
          <SpinnerMain></SpinnerMain>
        </Back>
      )}
    </>
  );
};

export default Spinner;

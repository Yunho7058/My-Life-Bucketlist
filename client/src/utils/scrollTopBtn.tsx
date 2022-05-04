import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const ScrollBtn = styled.div`
  position: fixed;
  top: 100px;
  width: 50px;
  height: 50px;
  border: 2px solid;
`;

const ScrollTopBtn = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isBtnOn, setIsBtnOn] = useState(false);

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (scrollY > 100) {
      // 100 이상이면 버튼이 보이게
      setIsBtnOn(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setIsBtnOn(false);
    }
  };

  const handleTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setScrollY(0); // ScrollY 의 값을 초기화
    setIsBtnOn(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });

  return (
    <>
      {isBtnOn && (
        <ScrollBtn
          onClick={() => {
            handleTop();
          }}
        ></ScrollBtn>
      )}
    </>
  );
};

export default ScrollTopBtn;

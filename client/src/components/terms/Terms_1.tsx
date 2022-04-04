import styled from 'styled-components';
const Back = styled.div`
  color: ${({ theme }) => theme.mode.fontColor};
  padding: 5px;
`;
const H1 = styled.h1`
  font-size: 15px;
`;
const H2 = styled.h2`
  font-size: 20px;
`;
const H3 = styled.h3`
  font-size: 13px;
`;
export function Terms_1() {
  return (
    <Back>
      <H1>여러분을 환영합니다</H1>
      <br />
      <H3>
        My Life Bucketlist(이하 '회사')가 제공하는 서비스를 찾아주신 이용자(이하
        '회원')님을 환영합니다. 회사가 제공 하는 다양한 서비스를 회원님이
        편리하고 가깝게 다가갈 수 있도록 ‘My Life Bucketlist 서비스
        이용약관’(이하 ‘본 약관’)을 마련하였습니다.
      </H3>
    </Back>
  );
}

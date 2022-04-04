import styled from 'styled-components';
const Back = styled.div`
  color: ${({ theme }) => theme.mode.fontColor};
  padding: 5px;
`;
const H1 = styled.h1`
  color: #d3d3d3;
  font-size: 15px;
`;
const H2 = styled.h2`
  font-size: 15px;
`;

const H3 = styled.h3`
  font-size: 13px;
`;
export function Terms_2() {
  return (
    <Back>
      <H3>
        개인정보보호법에 따라 MyLifeBucketlist에 회원가입 신청하신분께 수집하는
        개인정보의 항목,개인정보의 수집 및 이용목적,개인정보 보유및
        이용시간,동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니
        자세히 읽은 후 동의하여 주시기 바랍니다.
      </H3>
      <br />
      <H2>1. 수집하는 개인정보</H2>
    </Back>
  );
}

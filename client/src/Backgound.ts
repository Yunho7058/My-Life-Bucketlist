import styled from 'styled-components';

export const Backgound = styled.div`
  background-color: ${({ theme }) => theme.mode.mainBackground};
  color: ${({ theme }) => theme.mode.primaryText};
  font-family: 'IBM Plex Sans KR', sans-serif;
  transition: 500ms;
`;

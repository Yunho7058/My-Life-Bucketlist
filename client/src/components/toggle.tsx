import styled from 'styled-components';

interface IToggle {
  themeMode: string;
  toggleTheme: () => void;
}

interface IWrapper {
  themeMode: string;
}

const Wrapper = styled.button<IWrapper>`
  background: ${({ theme }) => theme.mode.mainBackground};
  border: 1px solid ${({ theme }) => theme.mode.border};
  box-shadow: 0 1px 3px ${({ theme }) => theme.mode.divider};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.5rem;
  position: fixed;
  z-index: 1;
  width: 4rem;
  height: 2rem;
  bottom: 2rem;
  right: 1rem;
  svg {
    color: ${({ theme }) => theme.mode.themeIcon};
    &:first-child {
      transform: ${({ themeMode }) =>
        themeMode === 'light' ? 'translateY(0)' : 'translateY(2rem)'};
      transition: background 0.25s ease 2s;
    }
    &:nth-child(2) {
      transform: ${({ themeMode }) =>
        themeMode === 'dark' ? 'translateY(0)' : 'translateY(-2rem)'};
      transition: background 0.25s ease 2s;
    }
  }
`;

export const Toggle = ({ themeMode, toggleTheme }: IToggle) => {
  return (
    <>
      <Wrapper onClick={toggleTheme} themeMode={themeMode}></Wrapper>
    </>
  );
};

export {};

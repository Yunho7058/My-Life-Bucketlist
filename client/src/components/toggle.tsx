import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import isDarkeMode from '../redux/reducer/isDarkMode';
import { darkMode } from '../redux/action';
import { TypeRootReducer } from '../redux/store/store';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

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

  overflow: hidden;
  padding: 0.5rem;
  z-index: 1;
  width: 80px;
  height: 30px;

  svg {
    color: ${({ theme }) => theme.mode.themeIcon};
    &:first-child {
      transform: ${({ themeMode }) =>
        themeMode === 'light' ? 'translateX(22px)' : 'translateX(6rem)'};
      transition: 300ms;
    }
    &:nth-child(2) {
      transform: ${({ themeMode }) =>
        themeMode === 'dark' ? 'translateX(-19px)' : 'translateX(-6rem)'};
      transition: 300ms;
    }
  }
`;

const Toggle = () => {
  const dispatch = useDispatch();
  const stataThemeMode = useSelector(
    (state: TypeRootReducer) => state.isDarkeMode
  );
  return (
    <>
      <Wrapper onClick={() => dispatch(darkMode())} themeMode={stataThemeMode}>
        <BsFillSunFill size={18} />
        <BsFillMoonStarsFill size={18} />
      </Wrapper>
    </>
  );
};

export default Toggle;

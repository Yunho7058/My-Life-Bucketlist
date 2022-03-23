//library
import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components
import Main from './page/Main';
import { light, dark, fontSizes, fontWeights } from './components/style/theme';
import { Toggle } from './components/toggle';
import { useDarkMode } from './components/hook/useDarkMode';
import Login from './page/Login';
// import ReduxTest from './page/ReduxTest';
import Signup from './page/Signup';

function App() {
  const [themeMode, toggleTheme] = useDarkMode();
  const theme =
    themeMode === 'light'
      ? { mode: light, fontSizes, fontWeights }
      : { mode: dark, fontSizes, fontWeights };

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Reset />
          <Toggle themeMode={themeMode} toggleTheme={toggleTheme} />
          <Backgound>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* <Route path="/reduxtest" element={<ReduxTest />} /> */}
            </Routes>
          </Backgound>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

//추가 수정 필요(다크모드) global style로 구분하기?
const Backgound = styled.div`
  background-color: ${({ theme }) => theme.mode.mainBackground};
  color: ${({ theme }) => theme.mode.primaryText};
  font-family: 'IBM Plex Sans KR', sans-serif;
  transition: 500ms;
`;

export default App;

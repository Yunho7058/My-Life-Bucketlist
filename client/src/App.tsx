//library
import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {
  lazy,
  Suspense,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useSelector } from 'react-redux';
import { TypeRootReducer } from './redux/store/store';

//components
//import ReduxTest from './page/ReduxTest';
import { light, dark, fontSizes, fontWeights } from './components/style/theme';
import { Toggle } from './components/toggle';
import { useDarkMode } from './components/hook/useDarkMode';
import Modal from './components/Modal';
//import Main from './page/Main';
// import Signup from './page/Signup';
// import Post from './page/Post';
//import Login from './page/Login';
let ReduxTest = lazy(() => import('./page/ReduxTest'));
let Main = lazy(() => import('./page/Main'));
let Login = lazy(() => import('./page/Login'));
let Signup = lazy(() => import('./page/Signup'));
let Post = lazy(() => import('./page/Post'));
let Mypage = lazy(() => import('./page/Mypage'));

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
            <Suspense fallback={<div>....로딩중</div>}>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/reduxtest" element={<ReduxTest />} />
              </Routes>
            </Suspense>
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

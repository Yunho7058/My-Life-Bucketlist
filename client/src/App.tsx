//library
import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { TypeRootReducer } from './redux/store/store';
import ScrollToTop from './utils/scrollTopFix';

//components

import { light, dark } from './components/style/theme';
import Spinner from './utils/spinner';

let Intro = lazy(() => import('./page/Intro'));
let Main = lazy(() => import('./page/Main'));
let Login = lazy(() => import('./page/Login'));
let Signup = lazy(() => import('./page/Signup'));
let Post = lazy(() => import('./page/Post'));
let Mypage = lazy(() => import('./page/Mypage'));
let Kakao = lazy(() => import('./components/oauth/Kakao'));
let Google = lazy(() => import('./components/oauth/Google'));
let Naver = lazy(() => import('./components/oauth/Naver'));

function App() {
  const stateDarkMode = useSelector(
    (state: TypeRootReducer) => state.isDarkeMode
  );
  const theme = stateDarkMode === 'light' ? { mode: light } : { mode: dark };
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ScrollToTop />
          <Reset />

          <Backgound>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/main" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/oauth/naver" element={<Naver />} />
                <Route path="/oauth/kakao" element={<Kakao />} />
                <Route path="/oauth/google" element={<Google />} />
              </Routes>
            </Suspense>
          </Backgound>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

const Backgound = styled.div`
  background-color: ${({ theme }) => theme.mode.mainBackground};
  color: ${({ theme }) => theme.mode.primaryText};
  font-family: 'IBM Plex Sans KR', sans-serif;
  transition: 500ms;
`;

export default App;

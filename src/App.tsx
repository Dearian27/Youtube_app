import { useState, useEffect } from 'react'
import styled, { ThemeProvider } from "styled-components";
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { darkTheme, lightTheme } from './utils/Theme';
import { BrowserRouter, Routes, Route, HashRouter, Router } from 'react-router-dom';

import Home from './pages/Home';
import Video from './pages/Video';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AddVideo from './pages/AddVideo';
import './App.css';
import { useAppSelector } from './hooks';
import Search from './pages/Search';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/notFoundPage';
import Library from './pages/Library';

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  background-color: #101010;
  display: flex;
  `

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
  transition: background-color 0.25s ease-in-out;
  padding: 22px 50px;
  min-height: 100vh;
  @media (max-width: 1366px) {
    padding: 22px 80px;
  }
`

const App: React.FC = () => {
  const { darkMode } = useAppSelector(state => state.user);

  return (
    <HashRouter>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Navbar darkMode={darkMode} />
        <Container>
          <Menu darkMode={darkMode} />
          <Main>
            <Routes>
              <Route path="/" >
                <Route index element={<Home type="random" />} />
                <Route path='trends' element={<Home type="trend" />} />
                <Route path='subscriptions' element={<Home type="sub" />} />
                <Route path='special' element={<Home type="special" />} />
                <Route path='upload' element={<AddVideo />} />
                <Route path='signin' element={<SignIn darkMode={darkMode} />} />
                <Route path='signup' element={<SignUp darkMode={darkMode} />} />
                <Route path='library' element={<Library />} />
                <Route path='admin' element={<AdminPage />} />
                <Route path='search' element={<Search />} />
                <Route path="video">
                  <Route path=":id" element={<Video darkMode={darkMode} />} />
                </Route>
                <Route path='*' element={<NotFoundPage />} />
              </Route>
            </Routes>
          </ Main>
        </Container>
      </ThemeProvider>
    </HashRouter>
  )
}

export default App;
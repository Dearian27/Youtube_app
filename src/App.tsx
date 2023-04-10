import { useState } from 'react'
import styled, { ThemeProvider } from "styled-components";
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { darkTheme, lightTheme } from './utils/Theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AddVideo from './pages/AddVideo';
import './App.css';

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  background-color: #101010;
  display: flex;
  /* height: calc(100vh - 54px); */
  /* overflow: hidden; */
`

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
  transition: background-color 0.25s ease-in-out;
  padding: 22px 50px;
  min-height: 100vh;
`

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Navbar darkMode={darkMode} />
        <Container>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            {/* <Wrapper> */}
            <Routes>
              <Route path="/" >
                <Route index element={<Home type="random" />} />
                <Route path='trends' element={<Home type="trend" />} />
                <Route path='subscriptions' element={<Home type="sub" />} />
                <Route path='upload' element={<AddVideo />} />
                <Route path='signin' element={<SignIn />} />
                <Route path='signup' element={<SignUp />} />
                <Route path="video">
                  <Route path=":id" element={<Video />} />
                </Route>
              </Route>
            </Routes>
            {/* </Wrapper> */}
          </ Main>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
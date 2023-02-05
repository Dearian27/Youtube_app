import { useState } from 'react'
import styled, { ThemeProvider } from "styled-components";
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { darkTheme } from './utils/Theme';

const Container = styled.div`
  display: flex;
  `
const Main = styled.div`
flex: 7;
`;
const Wrapper = styled.div`

`;

const App: React.FC = () => {

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Menu />
        <Main>
          <Navbar />
          <Wrapper>
            fds
          </Wrapper>
        </ Main>
      </Container>
    </ThemeProvider>
  )
}

export default App

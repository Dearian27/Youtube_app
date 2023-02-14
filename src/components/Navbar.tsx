import React from 'react';
import styled from 'styled-components';
import { Button } from './Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  transition: background-color 0.25s ease-in-out;
  height: 56px;
`
const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0 20px;
`
const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`
const Input = styled.input`
  border: none;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`

interface NavBarProps {
  darkMode: boolean;
}

const Navbar: React.FC<NavBarProps> = ({ darkMode }) => {

  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <Search>
          <Input type="text" placeholder="Search" />
          <SearchIcon style={{ fill: `${darkMode ? "white" : "black"}` }} />
        </Search>

        <Button onClick={() => navigate('/signin')}>
          <AccountCircleIcon />
          Sign in
        </Button>
      </Wrapper>
    </Container>
  )
}

export default Navbar;
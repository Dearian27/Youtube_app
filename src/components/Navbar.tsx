import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from './Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useAppDispatch, useAppSelector } from '../hooks';
import LogoFile from '../assets/logo.png';

const Metube = styled.div`
  z-index: 6;
  height: 100%;
  display: flex;
  align-items: center;
  &:focus {
    outline: none;
  }
`
const Logo = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  text-decoration: none;
  font-family: 'Poppins';
  `
const Img = styled.img`
  height: 32px;
`
const Container = styled.div`
  z-index: 10;
  position: sticky;
  height: 56px;
`
const Fixed = styled.div`
  position: fixed;
  height: inherit;
  width: 100%;
  background-color: ${({ theme }) => theme.bgLighter};
  transition: background-color 0.25s ease-in-out;
`
const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  /* justify-content: flex-end; */
  justify-content: space-between;
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
  width: 100%;
  &:focus {
    outline: none;
  }
`
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`
const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`
const UserName = styled.span`
  font-size: 18px;
`

type NavBarProps = {
  darkMode: boolean;
}

const Navbar: React.FC<NavBarProps> = ({ darkMode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let { isAuth, user } = useAppSelector(state => state.user);

  return (
    <Container>
      <Fixed>
        <Wrapper>
          <Metube>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Logo>
                <Img src={LogoFile} />
                Metube
              </Logo>
            </Link>
          </Metube>
          <Search>
            <Input type="text" placeholder="Search" />
            <SearchIcon style={{ cursor: 'pointer', fill: `${darkMode ? "white" : "black"}` }} />
          </Search>
          {isAuth !== true ?
            <Button onClick={() => navigate('/signin')}>
              <AccountCircleIcon />
              Sign in
            </Button>
            :
            <User>
              <UserName>{user?.name}</UserName>
              <Avatar />
            </User>
          }
        </Wrapper>
      </Fixed>
    </Container>
  )
}

export default Navbar;
import React from 'react';
import styled from 'styled-components';
import { Button } from './Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useAppDispatch, useAppSelector } from '../hooks';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';

const Container = styled.div`
  z-index: 5;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  transition: background-color 0.25s ease-in-out;
  height: 56px;
`
const Wrapper = styled.div`
  box-sizing: border-box;
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

  const { isAuth, user } = useAppSelector(state => state.user);

  return (
    <Container>
      <Wrapper>
        <Search>
          <Input type="text" placeholder="Search" />
          <SearchIcon style={{ fill: `${darkMode ? "white" : "black"}` }} />
        </Search>
        {isAuth !== true ?
          <Button onClick={() => navigate('/signin')}>
            <AccountCircleIcon />
            Sign in
          </Button>
          :
          <User>
            <VideoCallOutlinedIcon style={{ height: "100%" }} />
            <UserName>{user?.name}</UserName>
            <Avatar />
          </User>
        }
      </Wrapper>
    </Container>
  )
}

export default Navbar;
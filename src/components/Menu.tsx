import React from 'react'
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import HistoryIcon from '@mui/icons-material/History';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import TheatersIcon from '@mui/icons-material/Theaters';
import Newspaper from '@mui/icons-material/Newspaper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, persistor } from '../redux/store';
import LogoutIcon from '@mui/icons-material/Logout';
import { LogOut, setDarkMode, setSpecialTag } from '../redux/slices/userSlice';
import { useAppDispatch } from '../hooks';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
const Container = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  transition: background-color 0.25s ease-in-out;
  font-size: 14px;
  z-index: 9;
  position: sticky;
`
const Wrapper = styled.div`
  max-width: 190px;
  position: fixed;
  background: inherit;
  z-index: 9;
  background-color: ${({ theme }) => theme.bgLighter};
  transition: background-color 0.25s ease-in-out;
  overflow-y: scroll;
  height: calc(100vh - 60px);
  flex: 1;
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.theme === "light" ? "#dadada" : "#363636"};
    border-radius: 50px;
    transition:  0.25s ease-in-out;
  }
  &::-webkit-scrollbar {
    background-color: inherit;
    background-color: none;
    /* background-color: ${({ theme }) => theme.theme === "light" ? "#ffffff" : "#1f1f1f"}; */
    width: 6px;
    padding: 5px;
    border-radius: 50px;
    transition:  0.25s ease-in-out;
  }
`
const Item = styled.div`
  background-color: inherit;
  z-index: 9;
  font-family: 'Poppins';
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 15px;
  padding: 10px 26px;
  user-select: none;
  &:hover {
    background-color: ${({ theme }) => theme.hrColor};
  }
  &:focus {
    outline: none;
  }
`
const Hr = styled.hr`
  border: 1px solid ${({ theme }) => theme.hrColor};
  transition:  0.25s ease-in-out;
  margin: 10px 26px;
`
const H3 = styled.h3`
  font-size: 15px;
  margin: 0px 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.textSoft};
  transition:  0.25s ease-in-out;
  opacity: 0.7;
  margin-bottom: 10px;
  text-transform: uppercase;
`
const H4 = styled.h4`
  margin: 0px 26px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  transition:  0.25s ease-in-out;
  margin-bottom: 10px;
  font-family: 'Poppins';
`
export const Button = styled.button`
  margin: 0px 26px;
  border: 1px solid ${({ theme }) => theme.blueShade};
  border-radius: 5px;
  background-color: transparent;
  color: ${({ theme }) => theme.blueShade};
  transition:  2s ease-in-out;
  transition:  background-color 0.4s ease-in-out;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 10px;
  cursor: pointer;
  font-size: 15px;
  text-transform: uppercase;
  &:hover {
    background-color: ${({ theme }) => theme.blueShade}44;
  }
  &:focus {
    outline: none;
  }
`
interface MenuProps {
  darkMode: boolean;
}
const Menu: React.FC<MenuProps> = ({ darkMode }) => {
  const { isAuth, user } = useSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logOutHandler = () => {
    LogOut();
    window.localStorage.removeItem('token');
    persistor.purge();
    navigate('/');
    window.location.reload()
  }
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Item>
            <HomeIcon />Home
          </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none" }}>
          <Item>
            <ExploreIcon />Explore
          </Item>
        </Link>
        {isAuth &&
          <Link to="subscriptions" style={{ textDecoration: "none" }}>
            <Item>
              <SubscriptionsIcon />Subscriptions
            </Item>
          </Link>
        }
        {isAuth &&
          <>
            <Hr />
            <Link to="library" style={{ textDecoration: "none" }}>
              <Item>
                <LibraryAddIcon />Library
              </Item>
            </Link>
            <Link to="upload" style={{ textDecoration: "none" }}>
              <Item>
                <VideoCallOutlinedIcon />Add video
              </Item>
            </Link>
            <Item>
              <HistoryIcon />History
            </Item>
          </>
        }
        {
          !isAuth &&
          <><Hr />
            <H4 >Sign in to like, comment videos and subscribe.</H4>
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleIcon />
                Sign in
              </Button>
            </Link>
          </>
        }
        <Hr />
        <H3>Best of Metube</H3>
        <Item onClick={() => {
          dispatch(setSpecialTag("Music"))
          navigate("/special")
        }}>
          <LibraryMusicIcon />Music
        </Item>
        <Item onClick={() => {
          dispatch(setSpecialTag("Sports"))
          navigate("/special")
        }}>
          <SportsSoccerIcon />Sports
        </Item>
        <Item onClick={() => {
          dispatch(setSpecialTag("Movie"))
          navigate("/special")
        }}>
          <TheatersIcon />Movie
        </Item>
        <Item onClick={() => {
          dispatch(setSpecialTag("News"))
          navigate("/special")
        }}>
          <Newspaper />News
        </Item>
        <Hr />
        <Item>
          <SettingsIcon />Settings
        </Item>
        {user?.isAdmin &&
          <Link to="admin" style={{ textDecoration: "none" }}>
            <Item>
              <AdminPanelSettingsIcon />Admin
            </Item>
          </Link>
        }
        <Item>
          <FlagIcon />Report
        </Item>
        <Item onClick={() => {
          dispatch(setDarkMode(!darkMode));
        }}>
          <SettingsBrightnessIcon />{darkMode ? "Light" : "Dark"} Mode
        </Item>
        {isAuth &&
          <Item onClick={logOutHandler}>
            <LogoutIcon />Log out
          </Item>
        }
      </Wrapper>
    </Container>
  )
}
export default Menu
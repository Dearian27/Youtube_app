import React from 'react'
import styled from 'styled-components';
import LogoFile from '../assets/logo.png';
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
import FlagIcon from '@mui/icons-material/Flag';

const Container = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgLighter};
  transition: background-color 0.25s ease-in-out;
  height: 100vh;
  font-size: 14px;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 10px;
`
const Img = styled.img`
  height: 32px;

`
const Item = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 15px;
  padding: 10px 0px;
  user-select: none;
`
const Hr = styled.hr`
  /* border: 1px solid white; */
  border: 1px solid ${({ theme }) => theme.hrColor};
  transition:  0.25s ease-in-out;
  margin: 10px 0;
`
const H3 = styled.h3`
  font-weight: 700;
  color: ${({ theme }) => theme.textSoft};
  transition:  0.25s ease-in-out;
  opacity: 0.7;
  margin-bottom: 10px;
  text-transform: uppercase;
`
const H4 = styled.h4`
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  transition:  2s ease-in-out;
  margin-bottom: 10px;
  font-family: 'Poppins';
`
export const Button = styled.button`
  border: 1px solid ${({ theme }) => theme.blueShade};
  border-radius: 5px;
  background-color: transparent;
  color: ${({ theme }) => theme.blueShade};
  transition:  2s ease-in-out;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 10px;
  cursor: pointer;
  font-size: 15px;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }
`
interface MenuProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}


const Menu: React.FC<MenuProps> = ({ darkMode, setDarkMode }) => {
  const isAuth = false;

  return (
    <Container>
      <Wrapper>
        <Logo>
          <Img src={LogoFile} />
          Metube
        </Logo>

        <Item>
          <HomeIcon />Home
        </Item>
        <Item>
          <ExploreIcon />Explore
        </Item>
        <Item>
          <SubscriptionsIcon />Subscriptions
        </Item>
        <Hr />
        <Item>
          <LibraryAddIcon />Library
        </Item>
        <Item>
          <HistoryIcon />History
        </Item>
        {
          !isAuth &&
          <><Hr />
            <H4>Sign in to like, comment videos and subscribe.</H4>
            <Button>
              <AccountCircleIcon />
              Sign in
            </Button>
          </>
        }

        <Hr />
        <H3>Best of Metube</H3>
        <Item>
          <LibraryMusicIcon />Music
        </Item>
        <Item>
          <SportsSoccerIcon />Sports
        </Item>
        <Item>
          <TheatersIcon />Movie
        </Item>
        <Item>
          <Newspaper />News
        </Item>
        <Hr />
        <Item>
          <SettingsIcon />Settings
        </Item>
        <Item>
          <FlagIcon />Report
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessIcon />Light Mode
        </Item>
      </Wrapper>
    </Container>
  )
}

export default Menu
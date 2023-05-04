import styled from "styled-components";
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { darkTheme } from "../utils/Theme";
import Comments from "../components/Comments";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { format } from 'timeago.js';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchVideoData, setDislike, setError, setLike, setSubscribers } from "../redux/slices/videosSlice";
import { useAppDispatch } from "../hooks";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { dislikeVideo, likeVideo, subscribeChannel, unsubscribeChannel } from "../redux/slices/videosSlice";
import { setSubscribe, setUnsubscribe } from "../redux/slices/userSlice";
import Recommendations from "../components/Recommendations";
import ReactPlayer from 'react-player';
import ShareModal from "../components/ShareModal";

const Container = styled.div`
    display: flex;
    gap: 24px;    
`
const Content = styled.div`
    flex: 5;
`
const VideoWrapper = styled.div`
`
const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  `
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
  `
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};

`
const Button = styled.button`
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  border: none;
  background: transparent;
  font-size: 15px;
`
const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.hrColor};
`
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`
const ImageIcon = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`
const ChannelName = styled.span`
  font-weight: 500;
  font-size: 18px;
`
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  `
const Description = styled.div`
  color: ${({ theme }) => theme.theme === 'light' ? "#5e5e5e" : "#f0f0f0"};
  font-size: 18px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.theme === 'light' ? "#f0f0f0" : "#272727"};  
  padding: 5px 10px;
  border-radius: 5px;
  width: 100%;
  transition: background-color 0.25s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.theme === 'light' ? "#e5e5e5" : "#3F3F3F"};
  }
  @media (max-width: 1366px) {
    font-size: 13px;
	}
`
// background-color: "#dfdfdf";
// color: "#bbbbbb";

// background-color: "#cc1a00";
// color: "#fff";
const Subscribe = styled.button`
  font-weight: 700;
  border: none;
  border-radius: 3px;
  height: max-content;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
`
type VideoParams = {
  darkMode: boolean
}

const Video: React.FC<VideoParams> = ({ darkMode }) => {

  const [isPlayed, setIsPlayed] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const { user, isAuth } = useSelector((state: RootState) => state.user);
  const { currentVideo, currentChannel, isError } = useSelector((state: RootState) => state.video);
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;

  const handlePlayEvent = () => {
    if (!isPlayed) {
      addView();
    }
    setIsPlayed(true)
  }

  const addView = async () => {
    await axios.put(`/videos/view/${id}`);
    return;
  }

  const subscribeHandler = async () => {
    if (!isAuth || !user) {
      navigate('/signin')
      return;
    };
    if (user && isAuth && user?._id !== currentChannel?._id) {
      if (currentChannel.subscribers.includes(user._id)) {
        try {
          const res = await axios.put(`/users/unsubscribe/${currentChannel._id}`);
          if (res.status === 200) {
            dispatch(setUnsubscribe(currentChannel._id));
            dispatch(setSubscribers(user._id));
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const res = await axios.put(`/users/subscribe/${currentChannel._id}`);
          if (res.status === 200) {
            dispatch(setSubscribe(currentChannel._id));
            dispatch(setSubscribers(user._id));
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  const likeHandler = async () => {
    if (!isAuth) {
      navigate('/signin')
      return;
    };
    try {
      if (currentVideo.likes.includes(user._id)) {
        await axios.put(`/users/clear/${id}`);
      } else {
        dispatch(likeVideo({ videoId: id }));
      }
      dispatch(setLike(user._id));
    } catch (error) {
      console.log(error)
    }
  };

  const dislikeHandler = async () => {
    if (!isAuth) {
      navigate('/signin')
      return;
    };
    try {
      if (currentVideo.dislikes.includes(user._id)) {
        await axios.put(`/users/clear/${id}`);
      } else {
        dispatch(dislikeVideo({ videoId: id }))
      }
      dispatch(setDislike(user._id));
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, [window.innerWidth])

  useEffect(() => {
    dispatch(fetchVideoData(id));
  }, [id, dispatch])

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <ReactPlayer style={{ backgroundColor: "black" }}
            url={currentVideo?.videoUrl}
            width="100%"
            height={
              `${screenWidth <= 1400 ? '400px' : screenWidth <= 2048 ? '555px' : "600px"}`
            }
            playing
            onPlay={handlePlayEvent}
            controls={true}
            progressInterval={1000}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  controls: 0,
                  disablekb: 1,
                },
              },
            }}
          />
          <Title>
            {currentVideo?.title}
          </Title>
          <Details>
            <Info>
              {currentVideo?.views} views • {currentVideo?.createdAt && format(currentVideo?.createdAt)}
            </Info>
            <Buttons>
              <Button onClick={likeHandler}>
                {currentVideo?.likes?.includes(user?._id) ?
                  <>
                    <ThumbUpIcon style={{ fill: `${darkMode ? "white" : "black"}` }} /> {currentVideo?.likes?.length}
                  </>
                  :
                  <>
                    <ThumbUpAltOutlinedIcon style={{ fill: `${darkMode ? "white" : "black"}` }} /> {currentVideo?.likes?.length}
                  </>
                }
              </Button>
              <Button onClick={dislikeHandler}>
                {currentVideo?.dislikes?.includes(user?._id) ?
                  <>
                    <ThumbDownIcon style={{ fill: `${darkMode ? "white" : "black"}` }} />{currentVideo?.dislikes?.length}
                  </>
                  :
                  <>
                    <ThumbDownAltOutlinedIcon style={{ fill: `${darkMode ? "white" : "black"}` }} />
                    {currentVideo?.dislikes?.length}
                  </>
                }
              </Button>
              <ShareModal />
              <Button><AddTaskIcon style={{ cursor: 'pointer', fill: `${darkMode ? "white" : "black"}` }} />Save</Button>
            </Buttons>
          </Details>
        </VideoWrapper>
        <Hr />
        <Channel>
          <ChannelInfo>
            <ImageIcon src="/user.png" />
            <ChannelDetail>
              <ChannelName>{currentChannel?.name || "loading..."}</ChannelName>
              <ChannelCounter> {currentChannel?.subscribers.length} {currentChannel?.subscribers.length === 1 ? "subscriber" : "subscribers"}</ChannelCounter>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe style={{
            backgroundColor: `${user?._id === currentChannel?._id || currentChannel?.subscribers?.includes(user?._id) ? "#dfdfdf" : "#cc1a00"}`,
            color: `${user?._id === currentChannel?._id || currentChannel?.subscribers?.includes(user?._id) ? "#bbbbbb" : "#fff"}`,
          }} onClick={subscribeHandler}>
            {user?._id === currentChannel?._id ? "Your" : user?.subscribedUsers?.includes(currentChannel?._id) ? "Subscribed" : "Subscribe"}
          </Subscribe>
        </Channel>
        <Description>{currentVideo?.desc}</Description>
        <Comments />
      </Content>
      <Recommendations tags={currentVideo?.tags} videoId={currentVideo?._id} />
    </Container >
  )
}

export default Video;
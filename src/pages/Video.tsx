import styled from "styled-components";
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ReplyIcon from '@mui/icons-material/Reply';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { darkTheme } from "../utils/Theme";
import Comments from "../components/Comments";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react';
import axios from '../utils/axios';
import { videoI } from "./Home";
import { format } from 'timeago.js';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchVideoData, setDislike, setLike, setSubscribers } from "../redux/slices/videosSlice";
import { useAppDispatch } from "../hooks";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { dislikeVideo, likeVideo, subscribeChannel, unsubscribeChannel } from "../redux/slices/videosSlice";
import { setSubscribe, setUnsubscribe } from "../redux/slices/userSlice";
import Recommendations from "../components/Recommendations";

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
const Description = styled.p`
`
const Video: React.FC = () => {

  const navigate = useNavigate();
  const { user, isAuth } = useSelector((state: RootState) => state.user);
  const { currentVideo, currentChannel } = useSelector((state: RootState) => state.video);
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;

  const addView = async () => {
    await axios.put(`/videos/view/${id}`);
    return;
  }

  const subscribeHandler = async () => {
    if (!isAuth || !user) {
      navigate('/signin')
      return;
    };
    if (user && isAuth) {
      if (user?.subscribedUsers?.includes(currentChannel._id)) {
        dispatch(unsubscribeChannel(currentChannel._id))
      } else {
        dispatch(subscribeChannel(currentChannel._id))
      }
      if (user?.subscribedUsers?.includes(currentChannel._id)) {
        dispatch(setUnsubscribe(currentChannel?._id));
        dispatch(setSubscribers(user?._id));
      }
      else {
        dispatch(setSubscribe(currentChannel?._id));
        dispatch(setSubscribers(user?._id));
      }
    }
  }

  const likeHandler = async () => {
    if (!isAuth) {
      navigate('/signin')
      return;
    };
    try {
      dispatch(setLike(user._id));
      dispatch(likeVideo({ videoId: id }))
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
      dispatch(setDislike(user._id));
      dispatch(dislikeVideo({ videoId: id }))
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    dispatch(fetchVideoData(id));
    // addView();
  }, [id, dispatch])

  const Subscribe = styled.button`
    background-color: ${user?.subscribedUsers?.includes(currentChannel?._id) || user?._id === currentChannel?._id ? "#dfdfdf" : "#cc1a00"};
    color: ${user?.subscribedUsers?.includes(currentChannel?._id) || user?._id === currentChannel?._id ? "#a8a8a8" : "#fff"};
    font-weight: 700;
    border: none;
    border-radius: 3px;
    height: max-content;
    font-size: 16px;
    padding: 10px 20px;
    cursor: pointer;
  `

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="555px"
            src={currentVideo?.videoUrl} //https://www.youtube.com/embed/yIaXoop8gl4
            title={currentVideo?.title}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            scrolling="no"
          ></iframe>
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
                    <ThumbUpIcon /> {currentVideo?.likes?.length}
                  </>
                  :
                  <>
                    <ThumbUpAltOutlinedIcon /> {currentVideo?.likes?.length}
                  </>
                }
              </Button>
              <Button onClick={dislikeHandler}>
                {currentVideo?.dislikes?.includes(user?._id) ?
                  <>
                    <ThumbDownIcon />{currentVideo?.dislikes?.length}
                  </>
                  :
                  <>
                    <ThumbDownAltOutlinedIcon style={{ fill: "black" }} />
                    {currentVideo?.dislikes?.length}
                  </>
                }
              </Button>
              <Button><ReplyIcon style={{ height: "30px", width: "30px", }} />Share</Button>
              <Button><AddTaskIcon />Save</Button>
            </Buttons>
          </Details>
        </VideoWrapper>
        <Hr />
        <Channel>
          <ChannelInfo>
            <ImageIcon src="https://yt3.ggpht.com/FfMduny7Y5_hyUl-GrXLNsTF_hTckVTU-PCXo6_WJEjuZw6FhwhaVb4BJ0WWntRtGQyu8-6ZBA=s48-c-k-c0x00ffffff-no-rj" />
            <ChannelDetail>
              <ChannelName>{currentChannel?.name || "loading..."}</ChannelName>
              <ChannelCounter> {currentChannel?.subscribers.length} {currentChannel?.subscribers.length === 1 ? "subscriber" : "subscribers"}</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={subscribeHandler}>
            {user?._id === currentChannel?._id ? "Your" : user?.subscribedUsers?.includes(currentChannel?._id) ? "Subscribed" : "Subscribe"}
          </Subscribe>
        </Channel>
        <Comments />
      </Content>
      <Recommendations tags={currentVideo.tags} videoId={currentVideo._id} />
    </Container >
  )
}

export default Video;
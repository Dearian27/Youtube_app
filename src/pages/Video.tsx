import styled from "styled-components";
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ReplyIcon from '@mui/icons-material/Reply';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { darkTheme } from "../utils/Theme";
import Comments from "../components/Comments";
import Card, { channelType } from "../components/Card";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { videoI } from "./Home";
import { format } from 'timeago.js';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchVideoData, setDislike, setLike } from "../redux/slices/videosSlice";
import { useAppDispatch } from "../hooks";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { dislikeVideo, likeVideo } from "../redux/slices/videosSlice";

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

const Recommendations = styled.div`
  flex: 2;
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
const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 700;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`

const Video: React.FC = () => {

  const { user } = useSelector((state: RootState) => state.user);
  const { currentVideo, currentChannel } = useSelector((state: RootState) => state.video);
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;

  const addView = async () => {
    await axios.put(`/videos/view/${id}`);
    return;
  }

  const likeHandler = async () => {
    try {
      dispatch(setLike(user._id));
      dispatch(likeVideo({ videoId: id }))
    } catch (error) {
      console.log(error)
    }
  };

  const dislikeHandler = async () => {
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
  // }, [])


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
                {currentVideo?.likes?.includes(user._id) ?
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
                {currentVideo?.dislikes?.includes(user._id) ?
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
              <Button><ReplyIcon style={{ height: "30px", width: "30px", }} />share</Button>
              <Button><AddTaskIcon />save</Button>
            </Buttons>
          </Details>
        </VideoWrapper>
        <Hr />
        <Channel>
          <ChannelInfo>
            <ImageIcon src="https://yt3.ggpht.com/FfMduny7Y5_hyUl-GrXLNsTF_hTckVTU-PCXo6_WJEjuZw6FhwhaVb4BJ0WWntRtGQyu8-6ZBA=s48-c-k-c0x00ffffff-no-rj" />
            <ChannelDetail>
              <ChannelName>{currentChannel?.name || "loading..."}</ChannelName>
              <ChannelCounter> {currentChannel?.subscribers} {currentChannel?.subscribers === 1 ? "subscriber" : "subscribers"}</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>{currentChannel.subscribedUsers.includes(user._id) ? "Subscribed" : "Subscribe"}</Subscribe>
        </Channel>
        <Comments />
      </Content>
      <Recommendations>
        {/* <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" /> */}
      </Recommendations>
    </Container >
  )
}

export default Video;
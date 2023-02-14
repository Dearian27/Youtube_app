import styled from "styled-components";
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ReplyIcon from '@mui/icons-material/Reply';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { darkTheme } from "../utils/Theme";
import Comments from "../components/Comments";
import Card from "../components/Card";


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
const Image = styled.img`
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
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="555px"
            src="https://www.youtube.com/embed/yIaXoop8gl4"
            title="video player"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <Title>
            The video fdfafds dfsaf
          </Title>
          <Details>
            <Info>
              606,000 views • 1 day ago
            </Info>
            <Buttons>
              <Button><ThumbDownAltOutlinedIcon style={{ fill: "black" }} />34</Button>
              <Button><ThumbUpAltOutlinedIcon />0</Button>
              <Button><ReplyIcon style={{ height: "30px", width: "30px", }} />share</Button>
              <Button><AddTaskIcon />save</Button>
            </Buttons>
          </Details>
        </VideoWrapper>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src="https://yt3.ggpht.com/FfMduny7Y5_hyUl-GrXLNsTF_hTckVTU-PCXo6_WJEjuZw6FhwhaVb4BJ0WWntRtGQyu8-6ZBA=s48-c-k-c0x00ffffff-no-rj" />
            <ChannelDetail>
              <ChannelName> 24 канал</ChannelName>
              <ChannelCounter> 200K subscribers</ChannelCounter>
              <Description> Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque molestiae placeat voluptates, veritatis deleniti laboriosam similique, quaerat quasi aut doloribus, id qui dolores illum nihil nam accusamus fugiat dicta atque.</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>Subscribe</Subscribe>
        </Channel>
        <Comments />
      </Content>
      <Recommendations>
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
      </Recommendations>
    </Container >
  )
}

export default Video;
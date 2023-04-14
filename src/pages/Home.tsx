import styled from "styled-components";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAppSelector } from "../hooks";

const Container = styled.div`
  display: flex;
  /* justify-content: space-between; */
  background-color: ${({ theme }) => theme.bg};
  transition: background-color 0.25s ease-in-out;
  flex-wrap: wrap;
  column-gap: 20px;
  /* position: absolute; */
`
const Text = styled.div`
  font-size: 25px;
  color: ${({ theme }) => theme.soft};
  margin: 25% 0 0 50%;
  transform: translate(-50%, -50%);
`

export interface videoI {
  createdAt: string;
  desc: string;
  dislikes: string[];
  imgUrl: string;
  likes: string[];
  tags: string[];
  title: string;
  updatedAt: string;
  userId: string;
  videoUrl: string;
  views: number;
  __v: number;
  _id: string;
}

interface HomePropsI {
  type: string;
}

const Home: React.FC<HomePropsI> = ({ type }) => {

  const { specialTag } = useAppSelector(state => state.user);
  const [videos, setVideos] = useState<videoI[]>([]);

  const fetchVideos = async () => {
    if (type === "special") {
      const { data } = await axios.post(`/videos/special`, { specialTag });
      setVideos(data);
    } else {
      const { data } = await axios.get(`/videos/${type}`);
      setVideos(data);
    }
  }

  useEffect(() => {
    fetchVideos();
  }, [type, specialTag])

  if (videos) {
    console.log("videos true");
  } else {
    console.log("videos false");
  }
  console.log(videos, !!videos)
  return (
    <Container>
      {videos.length > 0 ?
        videos.map((video) => {
          return <Card key={video._id} video={video} type="lg" />
        })
        :
        <Text>There are no videos.</Text>
      }
    </Container>
  )
}

export default Home;
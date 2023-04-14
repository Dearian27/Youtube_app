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
      console.log("dsda");
      const { data } = await axios.post(`/videos/special`, specialTag);
      setVideos(data);
    } else {
      const { data } = await axios.get(`/videos/${type}`);
      setVideos(data);
    }
  }

  useEffect(() => {
    fetchVideos();
  }, [type])

  return (
    <Container>
      {videos.map((video) => {
        return <Card key={video._id} video={video} type="lg" />
      })}
    </Container>
  )
}

export default Home;
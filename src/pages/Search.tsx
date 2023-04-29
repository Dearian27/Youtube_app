import Card from "../components/Card";
import axios from "../utils/axios";
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { videoType } from "../redux/slices/videosSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
`

const Search = () => {
  const navigate = useNavigate();
  const query = useLocation().search;
  const [videos, setVideos] = useState([]);
  if (query === '?q=') {
    navigate("/");
  }
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/search${query}`);
      const data = res.data;
      setVideos(data);
    }
    fetchVideos();
  }, [query])

  return (
    <Container>
      {videos.map((video: videoType) => {
        return <Card type="sm" key={video?._id} video={video} />
      })}
    </Container>
  )
}

export default Search;
import axios from '../utils/axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { videoType } from '../redux/slices/videosSlice';

const Container = styled.div`
  flex: 2;
`
type RecommendationsParams = {
  tags: string[],
  videoId: string
}

const Recommendations: React.FC<RecommendationsParams> = ({ tags, videoId }) => {
  const [videos, setVideos] = useState([]);
  const fetchVideos = async () => {
    const res = await axios.post(`/videos/tags?tags=${tags}`, { videoId });
    if (res.status === 200) setVideos(res.data)
  }
  useEffect(() => {
    fetchVideos();
  }, [tags])

  return (
    <Container>
      {videos.map((video: videoType) => {
        return <Card type="sm" key={video?._id} video={video} />
      })}
    </Container>
  )
}

export default Recommendations;
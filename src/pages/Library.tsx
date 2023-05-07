import Card from "../components/Card";
import axios from "../utils/axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { videoType } from "../redux/slices/videosSlice";
import { useAppSelector } from "../hooks";
import { Triangle, Watch } from "react-loader-spinner";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
`
const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`
const Status = styled.div`
  color: #ffbb00;
  font-size: 20px;
  display: flex;
  align-items: center;
`
const Text = styled.div`
  font-size: 25px;
  color: ${({ theme }) => theme.soft};
  margin: 25% 0 0 50%;
  transform: translate(-50%, -50%);
`
const Library = () => {
  const { isAuth } = useAppSelector(state => state.user);
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
    const fetchVideos = async () => {
      const res = await axios.get("/videos/your");
      const data = res.data;
      setIsLoading(false);
      setVideos(data);
    }
    fetchVideos();
  }, [])
  return (
    <Container>
      {isLoading ?
        <Text
          style={{ justifyContent: "center" }}
        >
          <Triangle
            height="80"
            width="80"
            color="#F44336"
            ariaLabel="triangle-loading"
            wrapperStyle={{ justifyContent: "center" }}
            visible={true}
          />
        </Text>
        : videos.length > 0 ?
          videos.map((video: videoType) => (
            <CardContainer key={video?._id}>
              <Card type="sm" key={video?._id + "0"} video={video} />
              {video?.status === "pending" &&
                <Status>
                  pending
                  <Watch
                    height="20"
                    width="20"
                    radius="48"
                    color="#ffbb00"
                    ariaLabel="watch-loading"
                    wrapperStyle={{ marginLeft: "5px", marginTop: "5px" }}
                    visible={true}
                  />
                </Status>
              }
            </CardContainer>
          ))
          :
          <Text>You don't have any videos.</Text>
      }
    </Container>
  )
}
export default Library;
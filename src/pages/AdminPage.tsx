import Card from "../components/Card";
import axios from "../utils/axios";
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { videoType } from "../redux/slices/videosSlice";
import { useAppSelector } from "../hooks";
import { Triangle } from "react-loader-spinner";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteObject, getStorage, ref } from "firebase/storage";
import app from "../firebase";
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
const Buttons = styled.div`
  display: flex;
  /* flex-direction: column; */
  /* justify-items: center; */
  gap: 20px;
`
const Text = styled.div`
  font-size: 25px;
  color: ${({ theme }) => theme.soft};
  margin: 25% 0 0 50%;
  transform: translate(-50%, -50%);
`
const AdminPage = () => {
  const storage = getStorage(app);
  const { isAuth, user } = useAppSelector(state => state.user);
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const deleteVideo = async (videoId: string) => {
    const res = await axios.get(`/videos/find/${videoId}`);
    await axios.delete(`/videos/${videoId}`);
    if (res.status === 200) {
      setVideos(videos.filter((video: any) => video?._id !== videoId))
      deleteVideoFromStorage(res.data.videoUrl);
    } else alert("An error occurred.");
  }
  const approveVideo = (videoId: string) => {
    axios.put(`/videos/approve/${videoId}`);
    setVideos(videos.filter((video: any) => video?._id !== videoId))
  }
  const deleteVideoFromStorage = (videoUrl: string) => {
    const video = ref(storage, videoUrl);
    deleteObject(video).then(() => {
    }).catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    if (!isAuth && user?.isAdmin) {
      navigate("/");
    }
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/pending`);
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
        :
        videos.map((video: videoType) => (
          <CardContainer key={video?._id}>
            <Card type="sm" key={video?._id + "0"} video={video} />
            <Buttons>
              <ControlPointIcon key={video?._id + "1"} onClick={() => approveVideo(video._id)} style={{ cursor: "pointer" }} />
              <DeleteOutlineIcon key={video?._id + "2"} onClick={() => deleteVideo(video._id)} style={{ cursor: "pointer" }} />
            </Buttons>
          </CardContainer>
        ))
      }
    </Container>
  )
}
export default AdminPage;
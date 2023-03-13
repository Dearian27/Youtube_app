import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../../utils/axios';

type videoType = any;
type channelType = any;

type videoStateParams = {
  currentVideo: null | videoType;
  isLoading: boolean;
  isError: boolean;
  currentChannel: null | channelType,
}

const initialState: videoStateParams = {
  currentVideo: null,
  currentChannel: null,
  isLoading: false,
  isError: false,
}


export const fetchVideoData: any = createAsyncThunk("/video/fetch", async (id:number) => {
  try{
    const videoRes = await axios.get(`/videos/find/${id}/`);
    const channelRes = await axios.get(`/users/${videoRes.data?.userId}/`);
    return {video:videoRes.data, channel:channelRes.data}
  }catch(error) {
    console.log(error);
  }
})

export const likeVideo: any = createAsyncThunk ("/like/video",
  async ({videoId}: {videoId: string}) => {
    try{
      await axios.put(`/users/like/${videoId}`);
    }catch(error) {
      console.log(error);
    }
  }
  )
  
  export const dislikeVideo: any = createAsyncThunk ("/dislike/video",
  async ({videoId}: {videoId: string}) => {
    try{
      await axios.put(`/users/dislike/${videoId}`);
    }catch(error) {
      console.log(error);
    }
  }
)

const videosSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchVideoData.pending]: (state:any) => {
      state.isLoading = true;
    },
    [fetchVideoData.fulfilled]: (state:any, action:PayloadAction<any>) => {
      state.currentVideo = action.payload.video;
      state.currentChannel = action.payload.channel;
      state.isLoading = false;
    },
    [fetchVideoData.rejected]: (state: any, action:PayloadAction<any>) => {
      state.isLoading = false;
      state.isError = true;
    },
    [likeVideo.pending]: (state:any) => {
      state.isLoading = true;
    },
    [likeVideo.fulfilled]: (state:any, action:PayloadAction<any>) => {
      state.isLoading = false;
    },
    [likeVideo.rejected]: (state: any, action:PayloadAction<any>) => {
      state.isLoading = false;
      state.isError = true;
    },
    [dislikeVideo.pending]: (state:any) => {
      state.isLoading = true;
    },
    [dislikeVideo.fulfilled]: (state:any, action:PayloadAction<any>) => {
      state.isLoading = false;
    },
    [dislikeVideo.rejected]: (state: any, action:PayloadAction<any>) => {
      state.isLoading = false;
      state.isError = true;
    },
  }
})


export default videosSlice.reducer;
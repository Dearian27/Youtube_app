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
})
  
export const dislikeVideo: any = createAsyncThunk ("/dislike/video",
  async ({videoId}: {videoId: string}) => {
    try{
      await axios.put(`/users/dislike/${videoId}`);
    }catch(error) {
      console.log(error);
    }
  }
)

export const subscribeChannel: any = createAsyncThunk("/subscribe/channel",
  async (channelId: string) => {
    try{
      await axios.put(`/users/subscribe/${channelId}`);
    }catch(error) {
      console.log(error);
    }
    finally {
      console.log("Subscribed to channel")
    }
  }
)

export const unsubscribeChannel: any = createAsyncThunk("/unsubscribe/channel",
  async (channelId: string) => {
    try{
      await axios.put(`/users/unsubscribe/${channelId}`);
    }catch(error) {
      console.log(error);
    }
  }
)

const videosSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setLike: (state, action: PayloadAction<string>) => {
      state.currentVideo.likes.push(action.payload);
      state.currentVideo.dislikes = state.currentVideo.dislikes.filter(
        (userId: string) => userId !== action.payload
      );
    },
    setDislike: (state, action: PayloadAction<string>) => {
      state.currentVideo.dislikes.push(action.payload);
      state.currentVideo.likes = state.currentVideo.likes.filter(
        (userId: string) => userId !== action.payload
      );
    },
    setSubscribers: (state, action: PayloadAction<number>) => {
      state.currentChannel.subscribers += action.payload;
    }
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
    [likeVideo.rejected]: (state: any, action:PayloadAction<any>) => {
      state.isError = true;
    },
    [dislikeVideo.rejected]: (state: any, action:PayloadAction<any>) => {
      state.isError = true;
    },
    [subscribeChannel.rejected]: (state: any, action:PayloadAction<any>) => {
      state.isError = true;
    },   
    [unsubscribeChannel.rejected]: (state: any, action:PayloadAction<any>) => {
      state.isError = true;
    },
  }
})


export const {setLike, setDislike, setSubscribers} = videosSlice.actions;
export default videosSlice.reducer;
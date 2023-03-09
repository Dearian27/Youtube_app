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
  console.log("fetching video")
  try{
    const videoRes = await axios.get(`/videos/find/${id}/`);
    const channelRes = await axios.get(`/users/${videoRes.data?.userId}/`);
    return {video:videoRes.data, channel:channelRes.data}
  }catch(error) {
    console.log(error);
  }
})

const videosSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchVideoData.pending]: (state:any) => {
      console.log("pending");
      state.isLoading = true;
    },
    [fetchVideoData.fulfilled]: (state:any, action:PayloadAction<any>) => {
      console.log("fulfilled", action.payload);
      state.currentVideo = action.payload.video;
      state.currentChannel = action.payload.channel;
      state.isLoading = false;
      console.log("fulfilled");
    },
    [fetchVideoData.rejected]: (state: any, action:PayloadAction<any>) => {
      state.isLoading = false;
      state.isError = true;
      console.log("rejected");
    },
  }
})


export default videosSlice.reducer;
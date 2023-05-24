import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../../utils/axios';

export type videoType = any;
type channelType = any;
type commentType = any;

type videoStateParams = {
  currentVideo: null | videoType;
  currentChannel: null | channelType,
  comments: null | commentType,
  isLoading: boolean;
  isError: boolean;
}

const initialState: videoStateParams = {
  currentVideo: null,
  currentChannel: null,
  comments: null,
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
  async ({channelId, userId}:{channelId: string, userId: string}) => {
    try{
      await axios.put(`/users/subscribe/${channelId}`);
      console.log(channelId, userId);
      console.log({channelId, userId});
      return {channelId, userId};
    }catch(error) {
      console.log(error);
    }
  }
)

export const unsubscribeChannel: any = createAsyncThunk("/unsubscribe/channel",
  async ({channelId, userId}:{channelId: string, userId: string}) => {
    try{
      await axios.put(`/users/unsubscribe/${channelId}`);
      return {channelId, userId};
    }catch(error) {
      console.log(error);
    }
  }
)

export const fetchCommentsData: any = createAsyncThunk("/comments",
  async (id) => {
    try {
      const {data} = await axios.get(`/comments/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
})

export const addComment: any = createAsyncThunk("/comments/add",
  async ({videoId, text}: {videoId: string;  text: string}) => {
    try {
      const {data} = await axios.post(`/comments/${videoId}`, {text: text});
      return data;
    } catch (error) {
      console.log(error);
    }
  }
)

const videosSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    setLike: (state, action: PayloadAction<string>) => {
      if (state.currentVideo.likes.includes(action.payload)) {
        state.currentVideo.likes = state.currentVideo.likes.filter(
          (userId: string) => userId !== action.payload
        );
      }else {
        state.currentVideo.likes.push(action.payload);
        state.currentVideo.dislikes = state.currentVideo.dislikes.filter(
          (userId: string) => userId !== action.payload
        );
      }
    },
    setDislike: (state, action: PayloadAction<string>) => {
      if (state.currentVideo.dislikes.includes(action.payload)) {
        state.currentVideo.dislikes = state.currentVideo.dislikes.filter(
          (userId: string) => userId !== action.payload
        );
      }else {
        state.currentVideo.dislikes.push(action.payload);
        state.currentVideo.likes = state.currentVideo.likes.filter(
          (userId: string) => userId !== action.payload
        );
      }
    },
    setSubscribers: (state, action: PayloadAction<string>) => {
      if (state.currentChannel.subscribers.includes(action.payload)) {
        state.currentChannel.subscribers = state.currentChannel.subscribers.filter(
          (userId: string) => userId !== action.payload
        );
      }else {
        state.currentChannel.subscribers.push(action.payload);
      }
    }
  },
  extraReducers: {
    [fetchVideoData.pending]: (state:any) => {
      state.isLoading = true;
    },
    [fetchVideoData.fulfilled]: (state:any, action:PayloadAction<any>) => {
      state.currentVideo = action.payload?.video;
      state.currentChannel = action.payload?.channel;
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
    [subscribeChannel.fulfilled]: (state: any, action:PayloadAction<any>) => {
      if(action.payload) {
        state.currentChannel.subscribers.push(action.payload.userId);
      }
    },   
    [unsubscribeChannel.fulfilled]: (state: any, action:PayloadAction<any>) => {
      if(action.payload) {
        state.currentChannel.subscribers = state.currentChannel.subscribers.filter(
          (userId: string) => userId !== action.payload.userId
        );
      }
    },   
    [subscribeChannel.rejected]: (state: any, action:PayloadAction<any>) => {
      state.isError = true;
    },   
    [unsubscribeChannel.rejected]: (state: any, action:PayloadAction<any>) => {
      state.isError = true;
    },
    [fetchCommentsData.fulfilled]: (state:any, action:PayloadAction<any>) => {
      state.comments = action.payload;
    },
    [fetchCommentsData.rejected]: (state: any, action:PayloadAction<any>) => {
      state.isError = true;
    },
    [addComment.fulfilled]: (state:any, action:PayloadAction<any>) => {
      state.comments?.unshift(action.payload);
    },
    [addComment.rejected]: (state: any, action:PayloadAction<any>) => {
      state.isError = true;
    },
  }
})


export const {setLike, setDislike, setSubscribers, setError} = videosSlice.actions;
export default videosSlice.reducer;
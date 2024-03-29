import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from '../../utils/axios';

type userStateParams = {
  isAuth: boolean;
  user: any;
  isError: boolean;
  isLoading: boolean;
  specialTag: string | null;
  darkMode: boolean;
}

const initialState: userStateParams = {
  isAuth: false,
  user: null,
  isError: false,
  isLoading: false,
  specialTag: null,
  darkMode: false
}


export const signInGoogle: any = createAsyncThunk("/auth/google", 
  async ({name, email}: {name: string; email: string}) => {
    try {
      const { data } = await axios.post('/auth/google', { name, email});     
      if(data) {
        setAuth(true);
      }
      window.localStorage.setItem('token', data.token);
      return data.user;
    }catch(error) {
      console.log(error)
    }
})

export const logIn: any = createAsyncThunk ("/auth/signin", 
  async ({email, password}:{email: string; password: string;}) => {
  try { 
    const { data } = await axios.post('/auth/signin', { email, password });
    setAuth(true);
    return data;
  } catch (err) {
    console.log(err);
  }
}) 

export const signUp:any = createAsyncThunk ("/auth/signup", 
  async ({name, email, password}:{name: string, email: string; password: string;}) => {
  try { 
    const { data } = await axios.post('/auth/signup', { name, email, password });
    setAuth(true);
    return data;
  } catch (err) {
    console.log(err);
  }
}) 

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload
    },
    LogOut: (state) => {
      state.user = null;
      state.isAuth = false;
    },
    setSpecialTag: (state, action: PayloadAction<string>) => {
      state.specialTag = action.payload;
    },
    setSubscribe: (state, action: PayloadAction<string>) => {  //? payload === currentChannel._id
      if (!state.user.subscribedUsers) {
        state.user.subscribedUsers = [];
        state.user.subscribedUsers.push(action.payload);
      } else {
        state.user?.subscribedUsers?.push(action.payload);
      }
    },
    setUnsubscribe: (state, action: PayloadAction<string>) => {  
      state.user.subscribedUsers = state.user.subscribedUsers.filter(
        (userId: string) => userId !== action.payload
      );
      console.log(state.user.subscribedUsers)
    },
  },
  extraReducers: {
    [logIn.pending]: (state:any, action: PayloadAction<any>) => {
      state.isLoading = true;
    },
    [logIn.fulfilled]: (state:any, action:PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
    },
    [logIn.rejected]: (state, action:PayloadAction<any>) => {
      state.isLoading = false;
      state.isError = true;
    },
    [signUp.pending]: (state:any, action: PayloadAction<any>) => {
      state.isLoading = true;
    },
    [signUp.fulfilled]: (state:any, action:PayloadAction<any>) => {
      state.user = action.payload.user;
      state.isAuth = true;
      state.isLoading = false;
    },
    [signUp.rejected]: (state, action:PayloadAction<any>) => {
      state.isLoading = false;
      state.isError = true;
    },   
    [signInGoogle.pending]: (state: userStateParams, action: PayloadAction<any>) => {
      state.isLoading = true;
    },
    [signInGoogle.fulfilled]: (state:any, action:PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
    },
    [signInGoogle.rejected]: (state, action:PayloadAction<any>) => {
      state.isLoading = false;
      state.isError = true;
    },
  }
})

export const { setAuth, setSubscribe, setUnsubscribe, LogOut, setSpecialTag, setDarkMode, setIsAuth } = userSlice.actions;
export default userSlice.reducer;
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from '../../utils/axios';

type userStateParams = {
  isAuth: boolean;
  user: any;
  isError: boolean;
  isLoading: boolean;
}

const initialState: userStateParams = {
  isAuth: false,
  user: null,
  isError: false,
  isLoading: false,
}

export const signInGoogle: any = createAsyncThunk("/auth/google", 
  async ({name, email}: {name: string; email: string}) => {
    try {
      const { data } = await axios.post('/auth/google', { name, email});
      if (data.token) {
        window.localStorage.setItem('token', data.token)
      }
      
      setAuth(true);
      console.log(data, "success")
      return data;
    }catch(error) {
      console.log(error)
    }
})

export const logIn: any = createAsyncThunk ("/auth/signin", 
  async ({email, password}:{email: string; password: string;}) => {
  try { 
    const { data } = await axios.post('/auth/signin', { email, password });
    if (data.token) {
      window.localStorage.setItem('token', data.token)
    }

    setAuth(true);
    return data;
  } catch (err) {
    console.log(err);
  }
}) 

export const signUp:any = createAsyncThunk ("/auth/signin", 
  async ({name, email, password}:{name: string, email: string; password: string;}) => {
  try { 
    const { data } = await axios.post('/auth/signup', { name, email, password });
    // console.log(data);

    if (data.token) {
      window.localStorage.setItem('token', data.token)
    }

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
    setAuth: (state, action: PayloadAction<boolean>) => {
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
  },
  extraReducers: {
    [logIn.pending]: (state:any, action: PayloadAction<any>) => {
      state.isLoading = true;
    },
    [logIn.fulfilled]: (state:any, action:PayloadAction<any>) => {
      state.user = action.payload.user;
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
      state.user = action.payload.user;
      state.isAuth = true;
      state.isLoading = false;
    },
    [signInGoogle.rejected]: (state, action:PayloadAction<any>) => {
      state.isLoading = false;
      state.isError = true;
    },
  }
})

export const { setAuth } = userSlice.actions;
export default userSlice.reducer;
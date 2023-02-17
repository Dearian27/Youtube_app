import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from '../../utils/axios';

interface userStateI {
  isAuth: boolean;
  user: any;
  isError: boolean;
  isLoading: boolean;
}

const initialState: userStateI = {
  isAuth: false,
  user: null,
  isError: false,
  isLoading: false,
}

export const logIn: any = createAsyncThunk ("/auth/signin", 
  async ({email, password}:{email: string; password: string;}) => {
  try { 
    const { data } = await axios.post('/auth/signin', { email, password });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}) 


const userSlice: any = createSlice({
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
      console.log("pending");
      state.isLoading = true;
    },
    [logIn.fulfilled]: (state:any, action:PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
      console.log("fulfilled");
      // state.isError = false;
    },
    [logIn.rejected]: (state, action:PayloadAction<any>) => {
      state.isLoading = false;
      state.isError = true;
      console.log("rejected");
    },
  }
})

export const { setAuth } = userSlice.actions;
export default userSlice.reducer;
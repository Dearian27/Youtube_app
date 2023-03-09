import { createSlice } from "@reduxjs/toolkit"


type userType = any;

type videoStateParams = {
  user: null | userType;
}

const initialState: videoStateParams = {
  user: null
}

const videosSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {

  }
})


export default videosSlice.reducer;
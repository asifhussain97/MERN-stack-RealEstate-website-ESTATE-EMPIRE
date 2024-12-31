import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, initialSate } from "../../../types";


const initialState: initialSate = {
  loading: false,
  user:null,
  token:null,
  userId:null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: ApiResponse }>) => {
      state.user = action.payload.user.user;
      state.token = action.payload.user.token;
      state.userId = action.payload.user.userId;
      state.refreshToken = action.payload.user.refreshToken;


    },
    logout: (state) => {
      console.log('sucesss1',state.user,  state.token, state.userId,state.refreshToken);

      state.user = null;
      state.token = null;
      state.userId = null;
      state.refreshToken = null;

console.log('sucesss',state.user,  state.token, state.userId,state.refreshToken);

    },
  },
});

export const { logout, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
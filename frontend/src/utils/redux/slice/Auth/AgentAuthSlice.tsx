import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, agentSate } from "../../../types";
const agent = JSON.parse(localStorage.getItem('admin') || 'null');
const agentToken = JSON.parse(localStorage.getItem('agentToken') || 'null');
const agentId = JSON.parse(localStorage.getItem('agentId') || 'null');
const refreshToken = JSON.parse(localStorage.getItem('refreshToken') || 'null');

const initialState: agentSate = {
  loading: false,
  agent: agent || null,
  agentToken: agentToken || null,
  agentId: agentId || null,
  refreshToken: refreshToken || null,
};

const agentAuthSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: ApiResponse }>) => {
      state.agent = action.payload.user.user;
      state.agentToken = action.payload.user.token;
      state.agentId = action.payload.user.userId;
      state.refreshToken = action.payload.user.refreshToken;
    },
    logout: (state) => {
      state.agent = null;
      state.agentToken = null;
      state.agentId = null;
      state.refreshToken = null;
    },
  },
});

export const { logout, loginSuccess } = agentAuthSlice.actions;
export default agentAuthSlice.reducer;

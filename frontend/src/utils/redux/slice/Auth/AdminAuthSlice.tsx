import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, initialSate } from "../../../types";



const initialState: initialSate = {
    loading: false,
    user:  null,
    adminToken:   null,
    userId:   null,
    adminrefreshToken:  null,
  };


  
const adminAuthSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      loginSuccess: (state, action: PayloadAction<{ user: ApiResponse }>) => {
        console.log(action.payload,"fdhfhdjfdgf");
        
        state.admin = action.payload.user.admin;
        state.adminToken = action.payload.user.token;
        state.adminId = action.payload.user.adminId;
        state.adminrefreshToken = action.payload.user.refreshToken;



      },
      logout: (state) => {
        state.admin = null;
        state.adminToken = null;
        state.adminId = null;
    

      },
    },
  });

  export const { logout, loginSuccess } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
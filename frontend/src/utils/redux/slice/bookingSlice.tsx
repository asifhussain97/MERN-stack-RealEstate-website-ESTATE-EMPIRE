import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface Booking {
    loading: boolean;
    data: string|undefined|null
  }
const initialState:Booking = {
  loading: false,
  data:null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    bookingAdd: (state, action: PayloadAction<{ data: string|undefined }>) => {

        console.log(action.payload.data,'ghdghfgj');
        
      state.data = action.payload.data;
    },
  },
});

export const { bookingAdd } = bookingSlice.actions;
export default bookingSlice.reducer;
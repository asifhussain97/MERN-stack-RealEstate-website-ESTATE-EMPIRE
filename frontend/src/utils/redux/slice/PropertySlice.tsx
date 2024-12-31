import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { propertyDataTypes, propertyState } from "../../types";




const initialState:propertyState = {
    loading: false,
    data:[]

  };


  
const propertySlice = createSlice({
    name: "property",
    initialState,
    reducers: {
        propertyAdd: (state, action: PayloadAction<{ data:propertyDataTypes[]  }>) => {
        action.payload.data.forEach(newProperty => {
          const exists = state.data?.some(property => property._id === newProperty._id);
          if (!exists) {
            state.data?.push(newProperty);
          }
        });
 
       
   
      },

    },
  });

  export const {  propertyAdd } = propertySlice.actions;
export default propertySlice.reducer;
import { createSlice } from "@reduxjs/toolkit";





const initialState = {
    guestSearchedMovieData:[],
}


const guestSlice = createSlice({
    name:"guest",
    initialState,
    reducers:{
        setGuestSearchedMovie: (state, action) => {
            state.guestSearchedMovieData = action.payload;
          },
        
    }
});

export const { setGuestSearchedMovie } = guestSlice.actions;
export default guestSlice.reducer
    
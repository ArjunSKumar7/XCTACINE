import { createSlice } from "@reduxjs/toolkit";
const checkusertoken = () => {
  const theatreToken = localStorage.getItem("theatreToken"); //CHANGED TOKEN TO USERTOKEN
  if (theatreToken) {
    return theatreToken;
  } else {
    return "";
  }
};
const initialState = {
  theatreToken: checkusertoken(),
  theatreDetails:{},
  addedMovies:[],
  movieToList:[],
};

const theatreSlice = createSlice({
  name: "theatre",
  initialState,
  reducers: {
    setTheatreToken: (state, action) => {
      state.theatreToken = action.payload;

      localStorage.setItem("theatreToken", action.token);
    },
    
    setTheatreDetails: (state, action) => {
      console.log("theatre details", action.payload);
      state.theatreDetails = action.payload;
    },
    setAddedMovies: (state, action) => {
      state.addedMovies = action.payload;
    },

    theatreLogout: (state) => {
      state.theatreToken = null;
      localStorage.removeItem("theatreToken");
    },
    setMovieToList: (state, action) => {
      console.log("setMovieToList", action.payload);
      state.movieToList = action.payload;
    }
  },
});

export const { setTheatreToken, theatreLogout,setTheatreDetails,setAddedMovies,setMovieToList } = theatreSlice.actions;
export default theatreSlice.reducer;

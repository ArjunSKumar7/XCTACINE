import { createSlice } from "@reduxjs/toolkit";
const checkusertoken = () => {
  const theatreToken = localStorage.getItem("theatreToken"); 
  if (theatreToken) {
    return theatreToken;
  } else {
    return "";
  }
};



const checkTheatreData = () => {
  const theatreDetails = localStorage.getItem("theatreDetails"); 
  if (theatreDetails) {
    return JSON.parse(theatreDetails);
  } else {
    return "";
  }
};

const initialState = {
  theatreToken: checkusertoken(),
  theatreDetails: checkTheatreData(),
  addedMovies: [],
  movieToList: [],
  screenToList: [],
  locationList: [],
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
        console.log("setTheatreDetails", action.payload);
        
      state.theatreDetails = action.payload;
    },
      setAddedMovies: (state, action) => {
      state.addedMovies = action.payload;
    },

      theatreLogout: (state) => {
      state.theatreToken = null;
      localStorage.removeItem("theatreToken");
      localStorage.removeItem("theatreDetails");
    },
    setMovieToList: (state, action) => {
      state.movieToList = action.payload;
    },
    setScreenToList: (state, action) => {
      console.log("setScreenToList", action.payload);

      state.screenToList = action.payload;
    }, 

    setLocationList: (state, action) => {
      console.log("setLocationList", action.payload);
      state.locationList = action.payload;
    },
  },
});


export const {
  setTheatreToken,
  theatreLogout,
  setTheatreDetails,
  setAddedMovies,
  setMovieToList,
  setScreenToList,
  setLocationList,
} = theatreSlice.actions;
export default theatreSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const checkusertoken = () => {
  const theatreToken = localStorage.getItem("theatreToken"); //CHANGED TOKEN TO USERTOKEN
  if (theatreToken) {
    return theatreToken;
  } else {
    return "";
  }
};
const checkTheatreData = () => {
  const theatreDetails = JSON.parse(localStorage.getItem("theatreDetails")); //CHANGED TOKEN TO USERTOKEN
  console.log("theatreDetails", theatreDetails);
  if (theatreDetails) {
    return {
      theatreName: theatreDetails.theatreName,
      theatreId: theatreDetails.theatreId,
      theatreApprovalStatus: theatreDetails.theatreApprovalStatus,
    };
  } else {
    return { theatreName: "", theatreId: "", theatreApprovalStatus: "" };
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

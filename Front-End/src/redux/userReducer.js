import { createSlice } from "@reduxjs/toolkit";
const checkusertoken = () => {
  const userToken = localStorage.getItem("userToken"); //CHANGED TOKEN TO USERTOKEN
  if (userToken) {
    return userToken;
  } else {
    return "";
  }
};

const checklocationselected = () => {
  const locationSelected = localStorage.getItem("selectedLocation");
  if (locationSelected) {
    return locationSelected;
  } else {
    return "No selection";
  }
};
const checkbookingOperation=()=>{
  const bookingOperation = localStorage.getItem("bookingOperation");
  if (bookingOperation) {
    return bookingOperation;
  } else {
    return "";
  }
}

const initialState = {
  userToken: checkusertoken(),
  userId: "",
  movieHomeData: [],
  searchedMovieData: [],
  locationSelected: checklocationselected(),
  bookingOperation:checkbookingOperation()
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      console.log("setToken", action.payload);
      state.userToken = action?.payload.userToken;
      state.userId = action?.payload.userId;
      localStorage.setItem("userToken", action.payload.userToken);
      localStorage.setItem("userId", action.payload.userId);
      // localStorage.removeItem("token")
    },
    userLogout: (state) => {
      state.userToken = null;
      state.userId = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("userToken");
      localStorage.removeItem("selectedLocation");
      localStorage.removeItem("bookingOperation");
      localStorage.removeItem("activePage");
    },

    setMovieHomeData: (state, action) => {
      state.movieHomeData = action.payload;
    },
    setSearchedMovie: (state, action) => {
      state.searchedMovieData = action.payload;
    },

    setLocationSelected: (state, action) => {
      state.locationSelected = action.payload;
    },

    setBookingOperation:(state,action)=>{
      console.log("setBookingOperation",action.payload)
      state.bookingOperation=action.payload
    }



  },
});

export const { setToken, userLogout, setMovieHomeData, setSearchedMovie, setLocationSelected,setBookingOperation } = userSlice.actions;
export default userSlice.reducer;

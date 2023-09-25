import { createSlice } from "@reduxjs/toolkit";
const checkusertoken = () => {
  const userToken = localStorage.getItem("userToken"); //CHANGED TOKEN TO USERTOKEN
  if (userToken) {
    return userToken;
  } else {
    return "";
  }
};
const initialState = {
  userToken: checkusertoken(),
  userId: "",
  movieHomeData: [],
  searchedMovieData: [],
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
    },

    setMovieHomeData: (state, action) => {
      state.movieHomeData = action.payload;
    },
    setSearchedMovie: (state, action) => {
      state.searchedMovieData = action.payload;
    },






  },
});

export const { setToken, userLogout, setMovieHomeData, setSearchedMovie } = userSlice.actions;
export default userSlice.reducer;

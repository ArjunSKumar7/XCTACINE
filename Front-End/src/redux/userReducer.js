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
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.userToken = action.payload;
      console.log("action.payload", action.payload);
      localStorage.setItem("userToken", action.token);
      // localStorage.removeItem("token")
    },
    userLogout: (state) => {
      state.userToken = null;
      localStorage.removeItem("userToken");
    },
  },
});

export const { setToken, userLogout } = userSlice.actions;
export default userSlice.reducer;

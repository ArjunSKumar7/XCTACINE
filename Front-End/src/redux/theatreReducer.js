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
};

const theatreSlice = createSlice({
  name: "theatre",
  initialState,
  reducers: {
    setTheatreToken: (state, action) => {
      console.log("Theatre action.payload", action.payload);
      state.theatreToken = action.payload;
      
      
      localStorage.setItem("theatreToken", action.token);
     
    },
    theatreLogout: (state) => {
      state.theatreToken = null;
      localStorage.removeItem("theatreToken");
    },
  },
});

export const { setTheatreToken, theatreLogout } = theatreSlice.actions;
export default theatreSlice.reducer;

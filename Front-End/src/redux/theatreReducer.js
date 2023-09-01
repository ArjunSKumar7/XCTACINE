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
  theatreDetails:{}
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

    theatreLogout: (state) => {
      state.theatreToken = null;
      localStorage.removeItem("theatreToken");
    },
  },
});

export const { setTheatreToken, theatreLogout,setTheatreDetails } = theatreSlice.actions;
export default theatreSlice.reducer;

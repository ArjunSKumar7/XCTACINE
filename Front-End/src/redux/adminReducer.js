import { createSlice } from "@reduxjs/toolkit";
const checkusertoken = () => {
  const adminToken = localStorage.getItem("adminToken"); //CHANGED TOKEN TO USERTOKEN
  if (adminToken) {
    return adminToken;
  } else {
    return "";
  }
};
const initialState = {
  adminToken: checkusertoken(),
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminToken: (state, action) => {
      state.adminToken = action.payload;

      localStorage.setItem("adminToken", action.token);
    },
    adminLogout: (state) => {
      state.adminToken = null;
      localStorage.removeItem("adminToken");
    },
  },
});

export const { setAdminToken, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;

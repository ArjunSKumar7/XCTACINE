import { createSlice } from "@reduxjs/toolkit";
const checkusertoken = () => {
  const theatreToken = localStorage.getItem("theatreToken"); //CHANGED TOKEN TO USERTOKEN
  if (theatreToken) {
    return theatreToken;
  } else {
    return "";
  }
};
const checkTheatreData =()=>{
  const theatreDetails = JSON.parse(localStorage.getItem("theatreDetails")); //CHANGED TOKEN TO USERTOKEN
  console.log("theatreDetails", theatreDetails);
  if (theatreDetails) {
    return {theatreName:theatreDetails.theatreName, theatreId:theatreDetails.theatreId,theatreApprovalStatus:theatreDetails.theatreApprovalStatus};
  } else {
    return {theatreName:"",theatreId:"",theatreApprovalStatus:""};
  }
}



const initialState = {
  theatreToken: checkusertoken(),
  theatreDetails:checkTheatreData(),
  addedMovies:[],
  movieToList:[],
  addedScreens:[],
};

const theatreSlice = createSlice({
  name: "theatre",
  initialState,
  reducers: {
    setTheatreToken: (state, action) => {
      state.theatreToken = action.payload;
console.log("theatreToken", action.payload);
      localStorage.setItem("theatreToken", action.token);
    },
    
    setTheatreDetails: (state, action) => {
      console.log("theatre details", action.payload);
    //  localStorage.setItem("theatreId",action.payload._id );
    
     
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
      console.log("setMovieToList", action.payload);
      state.movieToList = action.payload;
    },

    setAddedScreens: (state, action) => {
      console.log("setAddedScreens", action.payload);
      state.addedScreens = action.payload;
    }





  },
});

export const { setTheatreToken, theatreLogout,setTheatreDetails,setAddedMovies,setMovieToList,setAddedScreens } = theatreSlice.actions;
export default theatreSlice.reducer;

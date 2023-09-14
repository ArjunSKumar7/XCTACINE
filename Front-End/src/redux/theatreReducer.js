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
    return {theatreName:theatreDetails.Name, theatreId:theatreDetails._id,};
  } else {
    return "";
  }
}



const initialState = {
  theatreToken: checkusertoken(),
  theatreDetails:checkTheatreData(),
  addedMovies:[],
  movieToList:[],
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
     localStorage.setItem("theatreId",action.payload._id );
     localStorage.setItem("theatreApprovalStatus",action.payload.approvalStatus );
     localStorage.setItem("theatreDetails",JSON.stringify(action.payload));
      state.theatreDetails = action.payload;
    },
    setAddedMovies: (state, action) => {
      state.addedMovies = action.payload;
    },

    theatreLogout: (state) => {
      state.theatreToken = null;
      
      localStorage.removeItem("theatreToken");
      localStorage.removeItem("theatreId");
      localStorage.removeItem("theatreApprovalStatus" );
      localStorage.removeItem("theatreDetails");
    },
    setMovieToList: (state, action) => {
      console.log("setMovieToList", action.payload);
      state.movieToList = action.payload;
    }
  },
});

export const { setTheatreToken, theatreLogout,setTheatreDetails,setAddedMovies,setMovieToList } = theatreSlice.actions;
export default theatreSlice.reducer;

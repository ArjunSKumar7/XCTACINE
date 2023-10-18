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
  console
  if (locationSelected) {
    return locationSelected;
  } else {
    return "No Location Selected";
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
const checkuserId=()=>{
  const userId = localStorage.getItem("userId");
  if (userId) {
    return userId;
  } else {
    return "";
  }
}

const checkStripeId=()=>{
  const stripeId = localStorage.getItem("stripeId");
  if (stripeId) {
    return stripeId;
  } else {
    return "";
  }
}

const initialState = {
  userToken: checkusertoken(),
  userId: checkuserId(),
  movieHomeData: [],
  searchedMovieData: [],
  locationSelected: checklocationselected(),
  bookingOperation:checkbookingOperation(),
  selectedDate:"",
  userSelectedSeats: [],
  userSeatCount: 0,
  stripeId:checkStripeId()
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
      localStorage.removeItem("stripeId");
     
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
    },
 setSelectedDate :(state,action)=>{
    state.selectedDate=action.payload
 },

 setUserSelectedSeats: (state, action) => {
  state.userSelectedSeats = action.payload;
},
    
setUserSeatCount: (state, action) => {
  state.userSeatCount = state.userSeatCount + action.payload;
},

setStripeId:(state,action)=>{
  state.stripeId=action.payload
}




  },
});

export const { setToken, userLogout, setMovieHomeData, setSearchedMovie, setLocationSelected,setBookingOperation,setSelectedDate ,setUserSelectedSeats,setUserSeatCount,setStripeId,} = userSlice.actions;
export default userSlice.reducer;

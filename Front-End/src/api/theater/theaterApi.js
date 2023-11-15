import theatre_baseURL  from "./theaterAxios";

export const signup = async (endpoint, values) => {
  try {
    const response = await theatre_baseURL.post(endpoint, values);
    return response?.data;
  } catch (error) {
    console.error("Theatre Signup error:", error);
    throw error;
  }
};

export const login = async (endpoint, values) => {
  try {
    const response = await theatre_baseURL.post(endpoint, values);
    return response?.data;
  } catch (error) {
    console.error("Theatre login error:", error);
    throw error;
  }
};


export const addMovieData = async (endpoint, movieData, theatreData) => {
  try {
    const value={movieData:movieData,theatreData:theatreData}
    const response = await theatre_baseURL.post(endpoint, value);
    return response?.data;
  } catch (error) {
    console.error("Theatre add movie to list error:", error);
    throw error;
  }
}


export const movieListDataFetch= async (theatreId) => {
  try{
    const response =await theatre_baseURL.get(`/theatre/fetchmovielist/${theatreId}`,);
    return response?.data
  }catch(error){
    console.log("movieListDataFetch api error:",error)

  }
}


export const deleteTheatreMovie = async (movieId,theatreId) => {
  try{
    const response =await theatre_baseURL.delete(`/theatre/deletemovie?movieId=${movieId}&theatreId=${theatreId}`);
    return response?.data
  }catch(error){
    console.log("deleteTheatreMovie api error:",error)
}
}


export const addScreen= async (values) => {
  try{
    const response =await theatre_baseURL.post(`/theatre/addscreen`,values);
    return response?.data
  }catch(error){
    console.log("addScreen api error:",error)
}
}

export const ScreenListDataFetch= async (theatreId) => {
  try{
    const response =await theatre_baseURL.get(`/theatre/fetchscreenlist/${theatreId}`,);
    return response?.data
  }catch(error){
    console.log("ScreenListDataFetch api error:",error)
}
}


export const deleteTheatreScreen = async (screenId) => {
  try{
    const response =await theatre_baseURL.delete(`/theatre/deletescreen?screenId=${screenId}`);
    return response?.data
  }catch(error){
    console.log("deleteTheatreScreen api error:",error)
  
}
}



export const fetchLocation=async()=>{
  try {
    const response =await theatre_baseURL.get(`/theatre/fetchlocation`);
    return response?.data
    
  } catch (error) {
    console.log("fetchLocation api error:",error)
  }
}

export const movieScreenAllocation =async(data)=>{
  console.log(data)
  try {
    const response =await theatre_baseURL.post(`/theatre/moviescreenallocation`,data);
    return response?.data
    
  } catch (error) {
    console.log("fetchLocation api error:",error)
  }
}

export const fetchDashInfo = async (theatreId) => {
  try {
    const response =await theatre_baseURL.get(`/theatre/fetchdashinfo/${theatreId}`);
    return response?.data
  } catch (error) {
    console.log("fetchDashInfo api error:",error)
  }
}

export const theatreGraphInfo =async (theatreId)=>{
  try {
    const response = await theatre_baseURL.get(`/theatre/fetchGraphInfo?theatreId=${theatreId}`)
    return response?.data
    
  } catch (error) {
    console.log(`fetchDashInfo api error:${error}`)
  }
}


export const fetchBookings = async (theatreId,page,limit) => {
  try {
    const response =await theatre_baseURL.get(`/theatre/fetchbookings?theatreId=${theatreId}&page=${page}&limit=${limit}`);
    return response?.data
  } catch (error) {
    console.log("fetchBookings api error:",error)
  }
}

export const fetchShowManagement =async (theatreId)=>{
  try {
    const response =await theatre_baseURL.get(`/theatre/fetchshowmanagement?theatreId=${theatreId}`);
    return response?.data
    
  } catch (error) {
    console.log("fetchShowManagement api error:",error)
  }
}
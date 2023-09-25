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
  console.log("add movie api called",movieData)
  try {
    const value={movieData:movieData,theatreData:theatreData}
    const response = await theatre_baseURL.post(endpoint, value);
   console.log("responseeeeee",response)
    return response?.data;
  } catch (error) {
    console.error("Theatre add movie to list error:", error);
    throw error;
  }
}


export const movieListDataFetch= async (theatreId) => {
  try{
    console.log("theatreId",theatreId)
    const response =await theatre_baseURL.get(`/theatre/fetchmovielist/${theatreId}`,);
    // console.log("movieListDataFetch api",response.data);
    return response?.data
  }catch(error){
    console.log("movieListDataFetch api error:",error)

  }
}


export const deleteTheatreMovie = async (movieId,theatreId) => {
  console.log("theatreIdaaaaaaaaaaaaaaaaaaapi",theatreId)
  try{
    const response =await theatre_baseURL.delete(`/theatre/deletemovie?movieId=${movieId}&theatreId=${theatreId}`);
    // console.log("movieListDataFetch api",response.data);
    return response?.data
  }catch(error){
    console.log("deleteTheatreMovie api error:",error)
}
}


export const addScreen= async (values) => {
  try{
    const response =await theatre_baseURL.post(`/theatre/addscreen`,values);
    console.log("addScreen api",response.data);
    return response?.data
  }catch(error){
    console.log("addScreen api error:",error)
}
}

export const ScreenListDataFetch= async (theatreId) => {
  try{
    console.log("theatreId",theatreId)
    const response =await theatre_baseURL.get(`/theatre/fetchscreenlist/${theatreId}`,);
    console.log("ScreenListDataFetch api",response.data);
    return response?.data
  }catch(error){
    console.log("ScreenListDataFetch api error:",error)
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
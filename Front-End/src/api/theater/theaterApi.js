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


export const addMovieData = async (endpoint, values) => {
  console.log("api called")
  try {
    const response = await theatre_baseURL.post(endpoint, values);
    return response?.data;
  } catch (error) {
    console.error("Theatre add movie to list error:", error);
    throw error;
  }
}


export const movieListDataFetch= async () => {
  try{
    const response =await theatre_baseURL.get("/theatre/fetchmovielist");
    // console.log("movieListDataFetch api",response.data);
    return response?.data
  }catch(error){
    console.log("movieListDataFetch api error:",error)

  }
}


export const deleteTheatreMovie = async (movieId) => {
  try{
    const response =await theatre_baseURL.delete(`/theatre/deletemovie/${movieId}`);
    // console.log("movieListDataFetch api",response.data);
    return response?.data
  }catch(error){
    console.log("deleteTheatreMovie api error:",error)
}
}
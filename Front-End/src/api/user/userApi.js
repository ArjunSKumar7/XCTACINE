// import { theatreAppoval } from "../admin/adminApi";
import user_baseURL from "./userAxios";

export const  signup = async (endpoint, values) => {
  try {
    const response = await user_baseURL.post(endpoint, values);
    return response?.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const login = async (endpoint, values) => {
  try {
    const response = await user_baseURL.post(endpoint, values);
    return response?.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const googleLogIn = async (values) => {
  try {
    const response = await user_baseURL.post("/auth/user/glogin", values);
    return response?.data;
  } catch (error) {
    console.error(" Google Signup error:", error);
    throw error;
  }
}

export const moviesFetchUser = async (locationValue,page, limit) => {
  try {
    const response = await user_baseURL.get(`/user/usermovielist?page=${page}&limit=${limit}&locationValue=${locationValue}`);
    console.log("moviesFetchUser api",response?.data);
    return response?.data;
  } catch (error) {
    console.error("users movie data fetch api error:", error);
    throw error;
  }
}


export const findNumber = async (phoneNumber) => {
  try {
    const response = await user_baseURL.get(`/user/findnumber?number=${phoneNumber}`);
    console.log("findNumber api",response?.data);
    return response?.data;
  } catch (error) {
    console.error("findNumber api error:", error);
    throw error;
  }
}

export const getMoviesBySearch = async (search) => {
  try {
    console.log("getMoviesBySearch api",search);
    const response = await user_baseURL.get(`/user/moviename-search?search=${search}`);
    console.log("getMoviesBySearch api",response?.data);
    return response?.data;
  } catch (error) {
    console.error("getMoviesBySearch api error:", error);
    throw error;
  }
}


export const getLocation=async()=>{
  try {
    const response =await user_baseURL.get(`/user/fetchtheatrelocation`);
    return response?.data
  } catch (error) {
    console.log("fetchLocation api error:",error)
  }
}

export const columnsAndRowsFetch=async()=>{
  try {
    const response =await user_baseURL.get(`/user/fetchcolumnsandrows`);
    return response?.data
  }catch(error){
    console.log("columnsAndRowsFetch api error:",error)
  }
}

export const moviePageData = async (movieId,location) => {
  try {
    console.log("movieId",movieId,"location",location);
    const response =await user_baseURL.get(`/user/moviepagedata?movieId=${movieId}&location=${location}`);
    return response?.data
  }catch(error){
    console.log("moviePageData api error:",error)
  }
}

export const fetchUserData = async (userId) => {
  try {
    const response =await user_baseURL.get(`/user/fetchuserdata?userId=${userId}`);
    return response?.data
  }catch(error){
    console.log("fetchUserData api error:",error)
  }
}


export const bookingMovieFetch = async (movieId) => {
  try {
    const response =await user_baseURL.get(`/user/bookingmoviefetch?movieId=${movieId}`);
    return response?.data
    
  } catch (error) {
    console.log("bookingMovieFetch api error:",error)
    
  }
}

export const stripeGateWay = async (bookingData) => {
  try {
    const response =await user_baseURL.post(`/user/booking/stripeGateWay`,bookingData);
    return response?.data
  } catch (error) {
    console.log("stripeGateWay api error:",error)
  }
}

export const PaymentStatusReturn = async (bookingData) => {
  try {
    const response =await user_baseURL.post(`/user/booking/confirmation`,bookingData);
    return response?.data
  } catch (error) {
    console.log("PaymentStatusReturn api error:",error)
  }
}
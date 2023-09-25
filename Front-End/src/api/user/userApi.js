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
    console.error("Signup error:", error);
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

export const moviesFetchUser = async (page, limit) => {
  try {
    const response = await user_baseURL.get(`/user/usermovielist?page=${page}&limit=${limit}`);
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
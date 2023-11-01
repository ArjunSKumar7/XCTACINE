// import { theatreAppoval } from "../admin/adminApi";
import user_baseURL from "./userAxios";

export const signup = async (endpoint, values) => {
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
};

export const moviesFetchUser = async (locationValue, page, limit) => {
  try {
    const response = await user_baseURL.get(
      `/user/usermovielist?page=${page}&limit=${limit}&locationValue=${locationValue}`
    );
    return response?.data;
  } catch (error) {
    console.error("users movie data fetch api error:", error);
    throw error;
  }
};

export const findNumber = async (phoneNumber) => {
  try {
    const response = await user_baseURL.get(
      `/user/findnumber?number=${phoneNumber}`
    );
    return response?.data;
  } catch (error) {
    console.error("findNumber api error:", error);
    throw error;
  }
};

export const getMoviesBySearch = async (search) => {
  try {
    const response = await user_baseURL.get(
      `/user/moviename-search?search=${search}`
    );
    return response?.data;
  } catch (error) {
    console.error("getMoviesBySearch api error:", error);
    throw error;
  }
};

export const getLocation = async () => {
  try {
    const response = await user_baseURL.get(`/user/fetchtheatrelocation`);
    return response?.data;
  } catch (error) {
    console.log("fetchLocation api error:", error);
  }
};

export const columnsAndRowsFetch = async () => {
  try {
    const response = await user_baseURL.get(`/user/fetchcolumnsandrows`);
    return response?.data;
  } catch (error) {
    console.log("columnsAndRowsFetch api error:", error);
  }
};

export const moviePageData = async (movieId, location) => {
  try {
    const response = await user_baseURL.get(
      `/user/moviepagedata?movieId=${movieId}&location=${location}`
    );
    return response?.data;
  } catch (error) {
    console.log("moviePageData api error:", error);
  }
};

export const fetchUserData = async (userId) => {
  try {
    const response = await user_baseURL.get(
      `/user/fetchuserdata?userId=${userId}`
    );
    return response?.data;
  } catch (error) {
    console.log("fetchUserData api error:", error);
  }
};

export const bookingMovieFetch = async (movieId) => {
  try {
    const response = await user_baseURL.get(
      `/user/bookingmoviefetch?movieId=${movieId}`
    );
    return response?.data;
  } catch (error) {
    console.log("bookingMovieFetch api error:", error);
  }
};

export const stripeGateWay = async (bookingData) => {
  try {
    const response = await user_baseURL.post(
      `/user/booking/stripeGateWay`,
      bookingData
    );
    return response?.data;
  } catch (error) {
    console.log("stripeGateWay api error:", error);
  }
};

export const PaymentStatusReturn = async (bookingData) => {
  try {
    const response = await user_baseURL.post(
      `/user/booking/confirmation`,
      bookingData
    );
    return response?.data;
  } catch (error) {
    console.log("PaymentStatusReturn api error:", error);
  }
};

export const editProfile = async (values, userId) => {
  try {
    const response = await user_baseURL.put(
      `/user/editprofile?userId=${userId}`,
      values
    );
    return response?.data;
  } catch (error) {
    console.log("editProfile api error:", error);
  }
};

export const fetchUserBookings = async (userId) => {
  try {
    const response = await user_baseURL.get(
      `/user/fetchuserbookings?userId=${userId}`
    );
    return response?.data;
  } catch (error) {
    console.log("fetchUserBookings api error:", error);
  }
};

export const fetchBookedSeatsData = async (data) => {
  try {
    const response = await user_baseURL.post(`/user/fetchbookedseats`, data);
    return response?.data;
  } catch (error) {
    console.log("fetchBookedSeatsData api error:", error);
  }
};

export const profilePicEdit = async (userId, image) => {
  try {
    const formData = new FormData();
    formData.append("ProfilePic", image);
    const response = await user_baseURL.patch(
      `/user/profilepicedit/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.log("profilePicEdit api error:", error);
  }
};

export const fetchBanners = async () => {
  try {
    const response = await user_baseURL.get(`/user/fetchBanners`);
    return response?.data;
  } catch (error) {
    console.log("fetchBanners api error:", error);
  }
};

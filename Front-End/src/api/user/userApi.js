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
    return response?.data;
  } catch (error) {
    console.error("users movie data fetch api error:", error);
    throw error;
  }
}


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


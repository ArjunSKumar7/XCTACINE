import admin_baseURL  from "./adminAxios";

export const signup = async (endpoint, values) => {
  try {
    const response = await admin_baseURL .post(endpoint, values);
    return response?.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const login = async (endpoint, values) => {
  try {
    const response = await admin_baseURL .post(endpoint, values);
    return response?.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

import axios from "axios";

const BaseUrl = "http://localhost:3000/api";

const baseURL = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json", // Set the content type to JSON
  },
});
// console.log("baseURL",baseURL)

baseURL.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("adminToken");
    // console.log("userAxios",token)
    if (adminToken) {
      config.headers["Authorization"] = `Bearer ${adminToken}`;
    } else {
      delete config.headers["Authorization"];
    }
    return config;
  },
  (error) => {
    console.log("interceptor error");
    return Promise.reject(error);
  }
);

export default baseURL;

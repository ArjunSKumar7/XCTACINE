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
    const userToken = localStorage.getItem("userToken");
    console.log("userAxios",userToken)
    if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
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

import axios from "axios";

const BaseUrl = "https://xctacine.online/api";

const admin_baseURL = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json", // Set the content type to JSON
  },
});
// console.log("baseURL",baseURL)

admin_baseURL.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("adminToken");
    // console.log("adminAxios",adminToken)
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

export default admin_baseURL;
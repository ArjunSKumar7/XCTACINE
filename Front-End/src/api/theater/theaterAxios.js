import axios from "axios";

const BaseUrl = "http://localhost:3000/api";

const theatre_baseURL = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json", // Set the content type to JSON
  },
});
// console.log("baseURL",baseURL)

theatre_baseURL .interceptors.request.use(
  (config) => {
    const theatreToken = localStorage.getItem("theatreToken");
    console.log("theatreToken",theatreToken)
    if (theatreToken) {
      config.headers["Authorization"] = `Bearer ${theatreToken}`;
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

export default theatre_baseURL ;

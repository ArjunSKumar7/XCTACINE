import axios from "axios";

const BaseUrl = "https://xctacine.online/api";

const theatre_baseURL = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json", // Set the content type to JSON
  },
});


theatre_baseURL.interceptors.request.use(
  (config) => {
    const theatreToken = localStorage.getItem("theatreToken");
   
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

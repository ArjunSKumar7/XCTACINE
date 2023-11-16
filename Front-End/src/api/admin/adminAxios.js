import axios from "axios";

// const BaseUrl = "http://localhost:3000/api";

const BaseUrl = "https://xctacine.online/api";

const admin_baseURL = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json", // Set the content type to JSON
  },
});

admin_baseURL.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("adminToken");
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

// admin_baseURL.interceptors.response.use(
//   (response) => {
//     return response;
//   },(error) => {

//     if (error.response) {
//       const status = error.response.status;
//       if (status === 404) {
//        window.location.href = '/404'
//       }
//     } else if (error.request) {
//       window.location.href = '/404'
//       console.error('Network Error:', error.request);
//       window.location.href = '/404'

//     } else {
//       window.location.href = '/500
//       console.error('Error:', error.message);
//     }
   
//     return Promise.reject(error);
//   }
// )

export default admin_baseURL;
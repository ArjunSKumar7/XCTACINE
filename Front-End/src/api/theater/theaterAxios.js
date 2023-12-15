import axios from "axios";
import {theatreLogout} from "../../redux/theatreReducer"

const BaseUrl = "http://localhost:3000/api";
// const BaseUrl = "https://xctacine.online/api";

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

theatre_baseURL.interceptors.response.use((response)=>{
  console.log("theatreinterceptorresponse",response)
  if (response.data && response.data.isBlocked) {
    logoutTheater();
  }
  else{
    return response
  }
},(error)=>{
  console.log("theatreinterceptorerror",error)
})

function logoutTheater(){
  localStorage.removeItem('theatreDetails')
  localStorage.removeItem('theatreBookListPage')
  localStorage.removeItem("theatreToken")
  window.location.href = '/theatre/login'
}


export default theatre_baseURL ;

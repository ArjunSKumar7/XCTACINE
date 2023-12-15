import axios from "axios";

// const BaseUrl = "http://localhost:3000/api";

const BaseUrl = "https://xctacine.online/api";


const guest_baseURL = axios.create({
    baseURL: BaseUrl,
    headers: {
        "Content-Type": "application/json",
    }
   
})

export default guest_baseURL;
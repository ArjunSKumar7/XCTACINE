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
  
    const response = await admin_baseURL.post(endpoint, values);
    return response?.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

export const userdetailsfetch = async () => {
try {
    
    const response = await admin_baseURL.get("/admin/userlist");
  
    return response?.data;
  } catch (error) {
    console.error("users data fetch api error:", error);
    throw error;
  }
}

export const  theatredetailsfetch = async () => {
  try {
      console.log("adminapi") 
      const response = await admin_baseURL.get("/admin/theatrelist");
      console.log("admindetailsfetchresponsaxios",response.data);
      return response?.data;
    } catch (error) {
      console.error("users data fetch api error:", error);
      throw error;
    }
  }


  export const theatreAppoval = async (data) => {
    console.log("theatreappoval",data)
    try {
      const response = await admin_baseURL.put("/admin/theatrelist/approval",data);
      console.log("theatreappovalresponse",response)
      return response?.data
    }catch(err){
      console.log("theatreAppoval api error:",err)
    }
  }


  export const userApproval = async (data) => {
    console.log("userApproval",data)
    try {
      const response = await admin_baseURL.put("/admin/userlist/approval",data);
      console.log("userApprovalresponse",response)
      return response?.data
      
    }catch(err){
      console.log("userApproval api error:",err)
    }
    
  }

export const addLocation = async (data) => {
  console.log("addLocation",data)
  try {
    const response = await admin_baseURL.post("/admin/addlocation",data);
    console.log("addLocationresponse",response)
    return response?.data
  }catch(err){
    console.log("addLocation api error:",err)
  }
}

export const addBannerData = async (data,image) => {
  console.log("addBannerData",data,image)
  
  try {
    const formData = new FormData();
    formData.append("bannerImage", image);
    formData.append("bannerName", data.bannerName);
    formData.append("bannerDescription", data.bannerDescription);
    
    const response = await admin_baseURL.post("/admin/addbanner",formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("addBannerDataresponse",response)
    return response?.data
    
  } catch (error) {
    console.log("addBannerData api error:", error);
  
  }
}
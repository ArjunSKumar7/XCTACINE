import admin_baseURL  from "./adminAxios";

export const signup = async (endpoint, values) => {
  try {
    const response = await admin_baseURL .post(endpoint, values);
    return response?.data;
  } catch (error) {
    const err = new Error("Signup error");
    err.status = 500;
    throw err;
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
      const response = await admin_baseURL.get("/admin/theatrelist");
      return response?.data;
    } catch (error) {
      console.error("users data fetch api error:", error);
      throw error;
    }
  }


  export const theatreAppoval = async (data) => {
    try {
      const response = await admin_baseURL.put("/admin/theatrelist/approval",data);
      return response?.data
    }catch(err){
      console.log("theatreAppoval api error:",err)
    }
  }


  export const userApproval = async (data) => {
    try {
      const response = await admin_baseURL.put("/admin/userlist/approval",data);
      return response?.data
    }catch(err){
      console.log("userApproval api error:",err)
    }
    
  }

export const addLocation = async (data) => {
  try {
    const response = await admin_baseURL.post("/admin/addlocation",data);
    return response?.data
  }catch(err){
    console.log("addLocation api error:",err)
  }
}

export const addBannerData = async (data,image) => {
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
    return response?.data
    
  } catch (error) {
    console.log("addBannerData api error:", error);
  
  }
}

export const getBannerData = async () => {
  try {
    const response = await admin_baseURL.get("/admin/fetchbanner");
    return response?.data
  } catch (error) {
    console.log("getBannerData api error:", error);
  }
}

export const deleteBanner= async (data) => {
  try {
    const response = await admin_baseURL.delete(`/admin/deletebanner?bannerId=${data}`);
    return response?.data
  } catch (error) {
    console.log("deleteBanner api error:", error);
  }
}
export const bannerStateChange = async (id,state) => {
  console.log(id,state)
  try {
    const response = await admin_baseURL.patch("/admin/bannerstatechange",id,state);
    return response?.data
  } catch (error) {
    console.log("bannerStateChange api error:", error);
  }
}

export const fetchLocations = async () => {
  try {
    const response = await admin_baseURL.get("/admin/fetchlocation");
    return response?.data
  } catch (error) {
    console.log("fetchLocations api error:", error);
  }
}

export const deleteLocation = async (id) => {
  try {
    const response = await admin_baseURL.delete(`/admin/deletelocation?locationId=${id}`);
    return response?.data
  } catch (error) {
    console.log("deleteLocation api error:", error);
  }
}


export const adminGraphInfo = async () => {
  try {
    const response = await admin_baseURL.get("/admin/fetchgraphinfo");
    return response?.data
  } catch (error) {
    console.log("adminGraphInfo api error:", error);
  }
}

export const fetchDashBoxInfo = async()=>{
  try {
    const response =await admin_baseURL.get("/admin/fetchdashboxinfo")
    return response?.data

  } catch (error) {
    console.log("adminfetchDashBoxInfo api error:", error);
  }
}
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
    console.log("adminlogin",values)
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

export const theatredetailsfetch = async () => {
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


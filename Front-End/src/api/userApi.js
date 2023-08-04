import baseURL from "./userAxios";

const signup = async (values) => {
    console.log('valuesuserapi',values)
    const response= await baseURL.post("/auth/signup", values)
    console.log('res',response);


return response?.data
}

export default signup;
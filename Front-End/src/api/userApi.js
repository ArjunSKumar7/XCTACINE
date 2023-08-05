// import baseURL from "./userAxios";

// const signup = async (values) => {
//     console.log('valuesuserapi',values)
//     const response= await baseURL.post("auth/signup", values)
//     console.log('res',response);


// return response?.data
// }

// export default signup;

import baseURL from "./userAxios";

const signup = async (values) => {
  try {
    console.log('valuesuserapi', values);
    const response = await baseURL.post("/auth/signup", values);
    console.log('res', response);
    return response?.data;
  } catch (error) {
    // Handle errors here
    console.error('Signup error:', error);
    throw error; // Re-throw the error to handle it at the calling location if necessary
  }
};

export default signup;

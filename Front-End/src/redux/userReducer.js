
import {createSlice} from "@reduxjs/toolkit";
const checkusertoken=()=>{
    const userToken = localStorage.getItem("token");
    if(userToken){
        return userToken
    }else{
        return ""
}
}
const initialState={
        userToken:checkusertoken()


}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setToken:(state,action)=>{
            state.userToken=action.payload
            localStorage.setItem("token", action.token)
            // localStorage.removeItem("token")
        },
        userLogout:(state)=>{
            state.userToken=null
            localStorage.removeItem("token")

        }
       
    }
})

export const {setToken,userLogout}=userSlice.actions;
export default userSlice.reducer
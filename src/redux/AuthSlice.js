import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name:"auth",
    initialState:{name:"",email:""},
    reducers:{
        addOwner:(state,action)=>{
            console.log("add owner")
            state.name = action.payload.name,
            state.email = action.payload.email
        },
        removeOwner:(state)=>{
            console.log("remove owner")
            state.name = "",
            state.email = ""
        }
    }
})
export const {addOwner,removeOwner} = AuthSlice.actions;
export default AuthSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name:"auth",
    initialState:{owner:{}},
    reducers:{
        addOwner:(state,action)=>{
            console.log("add owner")
            state.owner = {};
           state.owner = action.payload
        },
        removeOwner:(state)=>{
            console.log("remove owner")
           state.owner = {}
        }
    }
})
export const {addOwner,removeOwner} = AuthSlice.actions;
export default AuthSlice.reducer
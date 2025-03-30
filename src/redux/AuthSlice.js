import { createSlice } from "@reduxjs/toolkit";


const owner = JSON.parse(localStorage.getItem("owner")) || {};
const storedOwner = owner
console.log(storedOwner)
const AuthSlice = createSlice({
    name: "auth",
    initialState: { owner: storedOwner ,category:[]},
    reducers: {
        addOwner: (state, action) => {
            //console.log("add owner",action.payload);
            state.owner = action.payload;
           // state.category = action.payload.category
            // Store updated owner in localStorage
            localStorage.setItem("owner", JSON.stringify(action.payload));
        },
        removeOwner: (state) => {
           // console.log("remove owner");
            state.owner = {};

            // Remove from localStorage
            localStorage.removeItem("owner");
        }
    }
});

export const { addOwner, removeOwner } = AuthSlice.actions;
export default AuthSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";


const storedOwner = JSON.parse(localStorage.getItem("owner")) || {};

const AuthSlice = createSlice({
    name: "auth",
    initialState: { owner: storedOwner },
    reducers: {
        addOwner: (state, action) => {
            console.log("add owner");
            state.owner = action.payload;

            // Store updated owner in localStorage
            localStorage.setItem("owner", JSON.stringify(action.payload));
        },
        removeOwner: (state) => {
            console.log("remove owner");
            state.owner = {};

            // Remove from localStorage
            localStorage.removeItem("owner");
        }
    }
});

export const { addOwner, removeOwner } = AuthSlice.actions;
export default AuthSlice.reducer;

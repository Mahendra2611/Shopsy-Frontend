import { createSlice } from "@reduxjs/toolkit";

const ShopSlice = createSlice({
    name:"shop",
    initialState:{shop:{},shopDetails:{}},
    reducers:{
        addShop:(state,action)=>{
            
            state.shop = action.payload
           
        },
        addShopDetails:(state,action)=>{
            state.shopDetails = action.payload
        }
       
    }
})
export const {addShop,addShopDetails} = ShopSlice.actions;
export default ShopSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: {
        "Pending":[],
        "Accepted":[],
        "Cancelled":[],
        "Delivered":[]

    }, // { "status": [orders] }
  },
  reducers: {
    addOrders: (state, action) => {
        state.orders =  {
            "Pending":[],
            "Accepted":[],
            "Cancelled":[],
            "Delivered":[]
    
        }
      action.payload.forEach((product) => {
        state.orders[product.status].push(product);
      });
    },
    
    updateOrder: (state, action) => {
      const { status, _id } = action.payload;
      if(status === "Accepted" || status==="Cancelled"){
        state.orders["Pending"] = state.orders["Pending"].filter((order)=>{
            return order._id != _id;
        })
      }
      else if(status === "Delivered"){
        state.orders["Accepted"] = state.orders["Accepted"].filter((order)=>{
            return order._id != _id;
        })
      }
      state.orders[status].push(action.payload)
    },
  },
});

export const {addOrders, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;

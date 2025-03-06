import { configureStore } from "@reduxjs/toolkit";
  import authReducer from "./AuthSlice";
 import productReducer from "./ProductSlice";
 import orderReducer from "./OrderSlice"
 import lowStockReducer from "./LowStockSlice"



// Wrap rootReducer with persistReducer
  
// Create store
const Store = configureStore({
 reducer:{
  auth: authReducer,
  products: productReducer,
  orders:orderReducer,
  lowStock:lowStockReducer,
 }
});



export default Store;

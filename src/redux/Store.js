import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import authReducer from "./AuthSlice";
import productReducer from "./ProductSlice"
import orderReducer from "./OrderSlice"
import sessionStorage from "redux-persist/lib/storage/session";
import lowStockReducer from "./LowStockSlice"



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

import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import authReducer from "./AuthSlice";
import shopReducer from "./ShopSlice";
import sessionStorage from "redux-persist/lib/storage/session";


const persistConfig = { key: "root", storage: sessionStorage };


// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  shop: shopReducer,
});

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const Store = configureStore({
  reducer: persistedReducer,
});

// Create persistor
export const persistor = persistStore(Store);

export default Store;

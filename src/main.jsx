import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import Store, { persistor } from "./redux/Store";
import Routing from "./Routing";
import { SocketProvider } from "./socketContext";
ReactDOM.createRoot(document.getElementById("root")).render(
 
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
<SocketProvider>
<Routing />
</SocketProvider>
         
      
      </PersistGate>
    </Provider>
  
);

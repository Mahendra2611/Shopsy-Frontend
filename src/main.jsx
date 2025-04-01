import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Store from "./redux/Store";
import Routing from "./Routing";
import { SocketProvider } from "./context/SocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
 
    <Provider store={Store}>
     
<SocketProvider>
<Routing />
</SocketProvider>
         
      
     
    </Provider>
  
);

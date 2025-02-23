import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/index.css"

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import Routing from './Routing';
import { Provider } from 'react-redux';
import Store from './redux/Store';

ReactDOM.createRoot(document.getElementById("root")).render(
 
   <Provider store={Store}>
     <Routing />
   </Provider>
  
);


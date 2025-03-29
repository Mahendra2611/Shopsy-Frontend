
import { Outlet } from "react-router-dom"
import Navbar from "./components/layout/Navbar.jsx"
import { useEffect } from "react"
import {Toaster} from "react-hot-toast"
function App() {
 

  return (
    <div>
        <Toaster position="top-right" reverseOrder={false} />
    <Navbar/>
    
    <Outlet/>
  </div> 
  )
}

export default App

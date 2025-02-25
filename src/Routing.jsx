import React from 'react'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'

import App from './App'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import RegisterShop from './pages/RegisterShop'
import Dashboard from './pages/Dashboard'
import AddProducts from './pages/AddProducts'
import Analytics from './pages/Analytics'
const Routing = () => {
    
    const BrowserRouter  = createBrowserRouter([
        {
            path:"/",
            element:<App/>,
            errorElement:<Error/>,
            children:[
                {
                    path:"/",
                    element:<Home/>,
                    errorElement:<Error/>
                },
                {
                    path:"/login",
                    element:<Login/>,
                    errorElement:<Error/>
                },
                {
                    path:"/signup",
                    element:<Signup/>,
                    errorElement:<Error/>
                },
                {
                    path:"/dashboard",
                    element:<Dashboard/>,
                    errorElement:<Error/>
                },
                {
                    path:"/addProducts",
                    element:<AddProducts/>,
                    errorElement:<Error/>
                },
                {
                    path:"/analytics",
                    element:<Analytics/>,
                    errorElement:<Error/>
                }
            ]
        },
        {
            path:"/registerShop",
            element:<RegisterShop/>,
            errorElement:<Error/>
        }
       
    ])
   
  return (
    <RouterProvider router={BrowserRouter}/>
  )
}

export default Routing

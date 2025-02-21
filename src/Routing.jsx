import React from 'react'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'

import App from './App'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
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
                }
            ]
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
        }
    ])
  return (
    <RouterProvider router={BrowserRouter}/>
  )
}

export default Routing
